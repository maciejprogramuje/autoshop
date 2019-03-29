({
    refresh: function(component, event, helper) {
        helper.refreshComponent(component, event);
    },

    clickShowBasketContainer: function(component, event, helper) {
        helper.showBasketContainer(component);
    },

    clickGoToBasket: function(component, event, helper) {
        helper.goToBasket(component);
    },

    setSessionStorageRecordId: function(component, event, helper) {
        helper.sessionStorageRecordId(component, event);
    },
})