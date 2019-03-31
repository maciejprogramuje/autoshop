({
    doInit: function(component, event) {
        let idsJson = sessionStorage.getItem('customSearch--recordIds');

        let tempSortBySession = sessionStorage.getItem('searchResults--tempSortBy');
        let productFamilySession = sessionStorage.getItem('searchResults--productFamily');
        let priceFromSession = sessionStorage.getItem('searchResults--priceFrom');
        let priceToSession = sessionStorage.getItem('searchResults--priceTo');

        if (!$A.util.isUndefinedOrNull(tempSortBySession)) {
            component.set("v.tempSortBy", tempSortBySession);
        } else {
            component.set("v.tempSortBy", "c.sortByPriceLow");
        }

        if (!$A.util.isUndefinedOrNull(productFamilySession)) {
            component.set("v.productFamily", productFamilySession);
        } else {
            component.set("v.productFamily", "All products");
        }

        if (!$A.util.isUndefinedOrNull(priceFromSession)) {
            component.set("v.priceFrom", priceFromSession);
        }

        if (!$A.util.isUndefinedOrNull(priceToSession)) {
            component.set("v.priceTo", priceToSession);
        }

        if (!$A.util.isUndefinedOrNull(idsJson)) {
            let ids = JSON.parse(idsJson);
            component.set('v.recordIds', ids);
            component.set('v.tempRecordIds', ids);

            let sort = component.get("v.tempSortBy");
            this.sortBy(component, event, sort);

            let action = component.get('c.productsFamiliesSet');

            action.setParam("ids", component.get('v.recordIds'));
            action.setCallback(this, function(response) {
                let state = response.getState();
                if (state === 'SUCCESS') {
                    let result = response.getReturnValue();

                    if (!$A.util.isUndefinedOrNull(productFamilySession)) {
                        this.useFilters(component, event);
                    }

                    component.set("v.productsFamilies", result);
                } else {
                    this.doShowToast(component, response.getErrors()[0].message, 'Error' , 'Error');
                }
            });
            $A.enqueueAction(action);
        }
    },

    sortBy: function(component, event, sortType) {
        let ids = component.get("v.recordIds");
        let action = component.get(sortType);

        action.setParam("ids", ids);
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let result = response.getReturnValue();

                component.set("v.recordIds", result);
                component.set("v.tempSortBy", sortType);

                sessionStorage.setItem('searchResults--tempSortBy', sortType);
            } else {
                this.doShowToast(component, response.getErrors()[0].message, 'Error' , 'Error');
            }
        });
        $A.enqueueAction(action);
    },

    useFilters: function(component, event) {
        let ids = component.get("v.tempRecordIds");
        let family = component.get("v.productFamily");
        let tempSort = component.get("v.tempSortBy");
        let priceFrom = Number(component.get("v.priceFrom"));
        let priceTo = Number(component.get("v.priceTo"));

        if(priceTo == 0) {
            priceTo = NaN;
        }

        if ($A.util.isUndefinedOrNull(priceFrom) || $A.util.isUndefinedOrNull(priceTo)) {
            this.doShowToast(component, 'Price not defined. Change it, please.', 'warning' , 'Not correct prices');
        } else if(priceFrom > priceTo) {
            this.doShowToast(component, 'Price from is higher than price to. Change it, please.', 'warning' , 'Not correct prices');
        } else {
            let action = component.get("c.useFilters");
            action.setParam("ids", ids);
            action.setParam("family", family);
            action.setParam("priceFrom", priceFrom);
            action.setParam("priceTo", priceTo);
            action.setCallback(this, function(response) {
                let state = response.getState();
                if (state === 'SUCCESS') {
                    let result = response.getReturnValue();

                    component.set("v.recordIds", result);

                    this.sortBy(component, event, tempSort);

                    sessionStorage.setItem('searchResults--productFamily', family);
                    sessionStorage.setItem('searchResults--priceFrom', priceFrom);
                    sessionStorage.setItem('searchResults--priceTo', priceTo);
                } else {
                    this.doShowToast(component, response.getErrors()[0].message, 'Error' , 'Error');
                }
            });
            $A.enqueueAction(action);
        }
    },

    doShowToast: function(component, message, title, typeToast) {
        const toastComponent = component.find('toast');
        if (toastComponent) {
            toastComponent.showToast(message, title, typeToast);
        }
        else {
            console.error("'Toast Component' does not exist");
        }
    },

})