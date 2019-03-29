public with sharing class Auto_BasketItem {
    @AuraEnabled
    public static void removeFromBasket(String orderItemId) {
        List<OrderItem> items = [SELECT Id FROM OrderItem WHERE Id = :orderItemId];
        if(!items.isEmpty()) {
            delete items.get(0);
        }
    }

    @AuraEnabled
    public static void changeQuantityInBasket(String orderItemId, Integer quantityOne) {
        List<OrderItem> items = [SELECT Id, Quantity FROM OrderItem WHERE Id = :orderItemId];
        if(!items.isEmpty()) {
            if(quantityOne == -1 && items.get(0).Quantity > 1) {
                items.get(0).Quantity = items.get(0).Quantity + quantityOne;

                update items.get(0);
            } else if(quantityOne == 1) {
                items.get(0).Quantity = items.get(0).Quantity + quantityOne;

                update items.get(0);
            }
        }
    }
}