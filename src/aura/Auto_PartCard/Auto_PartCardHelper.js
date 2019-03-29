({
    initComponent: function(component, event) {
        let id = sessionStorage.getItem('customPart--recordId');
        component.set('v.recordId', id);

        let action1 = component.get('c.searchProductDetails');
        action1.setParam("id", id);
        action1.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let result = response.getReturnValue();

                component.set("v.partProduct", result);
            } else {
                this.doShowToast(component, response.getErrors()[0].message, 'Error' , 'Error');
            }
        });
        $A.enqueueAction(action1);


        let action2 = component.get('c.searchPricebookEntriesDetails');
        action2.setParam("id", id);
        action2.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let result = response.getReturnValue();
                component.set("v.partPricebookEntries", result);

                let indexMax = result.length - 1;
                component.set("v.partStandardPrice", result[indexMax].UnitPrice);
            } else {
                this.doShowToast(component, response.getErrors()[0].message, 'Error' , 'Error');
            }
        });
        $A.enqueueAction(action2);


        let action3 = component.get('c.getImagesToCarousel');
        action3.setParam("id", id);
        action3.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let result = response.getReturnValue();

                component.set("v.imagesURLs", result);
            } else {
                this.doShowToast(component, response.getErrors()[0].message, 'Error' , 'Error');
            }
        });
        $A.enqueueAction(action3);
    },

    addToBasket: function(component, event) {
        let productId = component.get("v.recordId");
        let price = component.get("v.partPricebookEntries[0].UnitPrice");

        let action3 = component.get('c.addToBasket');
        action3.setParam("productId", productId);
        action3.setParam("price", price);
        action3.setParam("quantity", 1);

        action3.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let addToBasketEvent = $A.get("e.c:Auto_AddToBasketEvent");
                addToBasketEvent.fire();

                let toastEvent = $A.get("e.force:showToast");
                if (toastEvent) {
                    toastEvent.setParams({
                        "title": "Product has been added",
                        "message": "Product has been added to basket successfully to basket.",
                        "type": "success"
                    });
                    toastEvent.fire();
                }
            } else {
                this.doShowToast(component, response.getErrors()[0].message, 'Error' , 'Error');
            }
        });
        $A.enqueueAction(action3);
    },

    doShowToast: function(component, message, title, typeToast) {
        const toastComponent = component.find('toast');
        if (toastComponent) {
            toastComponent.showToast(message, title, typeToast);
        } else {
            console.error("'Toast Component' does not exist");
        }
    },

})