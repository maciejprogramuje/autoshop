public with sharing class Auto_PricebookItem {
    @AuraEnabled
    public static Product2 searchProductDetails(String productId) {
        Product2 product = [SELECT Id, Name, Family FROM Product2 WHERE Id = :productId];

        return product;
    }

    @AuraEnabled
    public static PricebookEntry applyGlobalDiscount(String pricebookEntryId, Decimal globalDiscount) {
        PricebookEntry pricebookEntry = [SELECT Id, IsActive, UnitPrice, Product2Id, Pricebook2Id FROM PricebookEntry WHERE Id = :pricebookEntryId];
        pricebookEntry.UnitPrice = pricebookEntry.UnitPrice - pricebookEntry.UnitPrice * globalDiscount * 0.01;

        update pricebookEntry;

        return pricebookEntry;
    }

}