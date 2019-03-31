({
    removeItem: function(component, event) {
        let action1 = component.get('c.removeFromBasket');
        action1.setParam('orderItemId', component.get("v.product.Id"));
        action1.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {

                let removeFromBasketEvent = $A.get("e.c:Auto_RemoveFromBasketEvent");
                removeFromBasketEvent.fire();

                this.doShowToast(component, 'Product has been removed successfully.', 'success' , 'Remove successful');
            } else {
                this.doShowToast(component, response.getErrors()[0].message, 'Error' , 'Error');
            }
        });
        $A.enqueueAction(action1);
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

    sessionStorageRecordId: function(component, event) {
        let recordId = event.target.getAttribute('data-index');
        sessionStorage.setItem('customPart--recordId', recordId);
    },

    changeQuantity: function(component, event, quantityOne) {

        console.log("changeQuantity >> "+quantityOne);

        let action1 = component.get('c.changeQuantityInBasket');
        action1.setParam('orderItemId', component.get("v.product.Id"));
        action1.setParam('quantityOne', quantityOne);
        action1.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let removeFromBasketEvent = $A.get("e.c:Auto_RemoveFromBasketEvent");
                removeFromBasketEvent.fire();
            } else {
                this.doShowToast(component, response.getErrors()[0].message, 'Error' , 'Error');
            }
        });
        $A.enqueueAction(action1);
    },

})