({
    refreshComponent: function(component) {
        let action1 = component.get('c.getFromBasket');
        action1.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let result = response.getReturnValue();

                component.set("v.products", result);
            } else {
                this.doShowToast(component, response.getErrors()[0].message, 'Error' , 'Error');
            }
        });
        $A.enqueueAction(action1);
    },

    showBasketContainer: function(component) {
        let isBasketSmallVisible = component.get("v.isBasketSmallVisible");

        if(!isBasketSmallVisible) {
            this.openBasketSmall(component);
        } else {
            this.hideBasketSmall(component);
        }
    },

    openBasketSmall: function(component) {
        document.getElementById("basket_container").style = "position: fixed; top: 21em; width: 100%; z-index: 1000; background-color: transparent;"
        document.getElementById("basket_inner").style = "float: left; background-color: white; display: block; width: 90%; border: 2px solid #88c651;"
        document.getElementById("basket_icon").style = "float: left; background-color: transparent; display: block; width: 10%;"

        component.set("v.isBasketSmallVisible", true);
    },

    hideBasketSmall: function(component) {
        document.getElementById("basket_container").style = "position: fixed; top: 21em; right: 0; z-index: 1000; background-color: transparent;"
        document.getElementById("basket_inner").style = "display: none;"
        document.getElementById("basket_icon").style = "display: block;"

        component.set("v.isBasketSmallVisible", false);
    },

    goToBasket: function(component) {
        this.hideBasketSmall(component);

        let toBasketUrl= $A.get("e.force:navigateToURL");
        toBasketUrl.setParams({
            "url" : "/basket"
        });
        toBasketUrl.fire();
    },

    doShowToast: function(component, message, title, typeToast) {
        const toastComponent = component.find('toast');
        if (toastComponent) {
            toastComponent.showToast(message, title, typeToast);
        } else {
            console.error("'Toast Component' does not exist");
        }
    },

    sessionStorageRecordId: function(component, event) {
        let recordId = event.target.getAttribute('data-index');
        sessionStorage.setItem('customPart--recordId', recordId);
    },

})