({
    init: function(component, event, helper) {
        let pricebookId = component.get("v.recordId");

        let action1 = component.get('c.searchPricebookEntries');
        action1.setParam("pricebookId", pricebookId);
        action1.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let result = response.getReturnValue();

                component.set("v.pricebookEntries", result);
            }
        });
        $A.enqueueAction(action1);
    },

    showConfirmDialog: function(component, event, helper) {
        component.set("v.isOpenConfirmDialog", true);
    },

    closeConfirmDialog: function(component, event, helper) {
        component.set("v.isOpenConfirmDialog", false);
    },

    clickUpdatePricebook: function(component, event, helper) {
        console.log("clickUpdatePricebook");
    },

})