public with sharing class Auto_SearchPartsResultsItem {
    @AuraEnabled
    public static Decimal searchForPartsDetails(String recordId) {
        List<PricebookEntry> pricebookEntries = [
                SELECT Id, Name, UnitPrice, Pricebook2Id
                FROM PricebookEntry
                WHERE Product2Id = :recordId
                ORDER BY UnitPrice
                LIMIT 1
        ];

        if (pricebookEntries.isEmpty()) {
            return null;
        } else {
            return pricebookEntries.get(0).UnitPrice;
        }
    }
}