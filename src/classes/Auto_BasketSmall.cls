public with sharing class Auto_BasketSmall {
    @AuraEnabled
    public static List<OrderItem> getFromBasket() {
        List<OrderItem> productsInBasket = [SELECT Product2Id, Product2.Name, Quantity, UnitPrice, TotalPrice, Order.TotalAmount
            FROM OrderItem
            WHERE Order.OwnerId = :UserInfo.getUserId()
            AND Order.Status = 'Basket'];

        return productsInBasket;
    }
}