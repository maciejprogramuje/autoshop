public with sharing class Auto_Pricebooks {
    @AuraEnabled
    public static List<PricebookEntry> searchPricebookEntries(String pricebookId) {
        List<PricebookEntry> pricebookEntries = [SELECT Id, IsActive, UnitPrice, Product2Id, Pricebook2Id FROM PricebookEntry WHERE Pricebook2Id = :pricebookId];

        return pricebookEntries;
    }

}