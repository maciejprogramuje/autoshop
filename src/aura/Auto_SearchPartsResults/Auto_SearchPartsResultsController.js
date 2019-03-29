({
    init: function(component, event, helper) {
        helper.doInit(component, event);
    },

    clickSortPriceLow: function(component, event, helper) {
        helper.sortBy(component, event, 'c.sortByPriceLow');
    },

    clickSortPriceHigh: function(component, event, helper) {
        helper.sortBy(component, event, 'c.sortByPriceHigh');
    },

    clickSortNameA: function(component, event, helper) {
        helper.sortBy(component, event, 'c.sortByNameA');
    },

    clickSortNameZ: function(component, event, helper) {
        helper.sortBy(component, event, 'c.sortByNameZ');
    },

    clickChangeFamily: function(component, event, helper) {
        helper.useFilters(component, event);
    },

    clickCheckPrice: function(component, event, helper) {
        helper.useFilters(component, event);
    }
})