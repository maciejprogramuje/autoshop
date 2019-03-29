({
    clickRemoveItem: function(component, event, helper) {
        helper.removeItem(component, event);
    },

    clickOpenModal: function(component, event, helper) {
        component.set("v.isOpenConfirmDialog", true);
    },

    clickCloseModal: function(component, event, helper) {
        component.set("v.isOpenConfirmDialog", false);
    },

    setSessionStorageRecordId: function(component, event, helper) {
        helper.sessionStorageRecordId(component, event);
    },

    clickMinusQuantity: function(component, event, helper) {
        helper.changeQuantity(component, event, -1);
    },

    clickPlusQuantity: function(component, event, helper) {
        helper.changeQuantity(component, event, 1);
    },
})