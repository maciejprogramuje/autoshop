({
    refreshPage: function(component, event) {
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

    makeOrder: function(component, event) {
        let action1 = component.get('c.makeOrder');
        action1.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
               let result = response.getReturnValue();

               let makeOrderEvent = $A.get("e.c:Auto_MakeOrderEvent");
               makeOrderEvent.fire();

               let toastEvent = $A.get("e.force:showToast");
               if (toastEvent) {
                   toastEvent.setParams({
                       "title": "Order successful",
                       "message": "You has been made an order successfully.",
                       "type": "success"
                   });
                   toastEvent.fire();
               }

               component.set("v.isButtonMakeOrderVisible", false);
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
        } else {
            console.error("'Toast Component' does not exist");
        }
    },

})