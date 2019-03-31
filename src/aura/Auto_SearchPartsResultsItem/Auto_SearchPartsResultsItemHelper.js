({
    initComponent: function(component, event) {
        let recordId = component.get('v.recordId');
        let action = component.get('c.searchForPartsDetails');

        action.setParam("recordId", recordId);
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let result = response.getReturnValue();

                component.set("v.partPrice", result);
            } else {
                this.doShowToast(component, response.getErrors()[0].message, 'Error' , 'Error');
            }
        });
        $A.enqueueAction(action);
    },

    showDetails: function(component, event) {
        let recordId = component.get('v.recordId');
        sessionStorage.setItem('customPart--recordId', recordId);
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