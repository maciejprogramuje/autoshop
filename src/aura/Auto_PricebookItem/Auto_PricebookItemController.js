({
    init: function(component, event, helper) {
        let productId = component.get("v.pricebookEntry.Product2Id");

        let action1 = component.get('c.searchProductDetails');
        action1.setParam("productId", productId);
        action1.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let result = response.getReturnValue();

                component.set("v.product", result);
            }
        });
        $A.enqueueAction(action1);


        let pricebookEntryId = component.get("v.pricebookEntry.Id");
        let globalDiscount = component.get("v.globalDiscount");

        let action2 = component.get('c.applyGlobalDiscount');
        action2.setParam("pricebookEntryId", pricebookEntryId);
        action2.setParam("globalDiscount", globalDiscount);
        action2.setCallback(this, function(response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let result = response.getReturnValue();

                console.log("result >> "+result);

                component.set("v.pricebookEntry.UnitPrice", result.UnitPrice);

                let temp = component.get("v.pricebookEntry.UnitPrice");
                console.log("temp >> "+temp);
            }
        });
        $A.enqueueAction(action2);
    },

})