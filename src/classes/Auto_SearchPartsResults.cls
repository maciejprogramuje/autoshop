public with sharing class Auto_SearchPartsResults {
    @AuraEnabled
    public static List<String> sortByPriceLow(List<String> ids) {
        List<AggregateResult> pricebookEntries = [
                SELECT MIN(UnitPrice) unitPr, Product2Id
                FROM PricebookEntry
                WHERE Product2Id IN :ids
                GROUP BY Product2Id
                ORDER BY MIN(UnitPrice) ASC NULLS LAST
        ];

        List<String> result = new List<String>();

        for (AggregateResult pricebookEntry : pricebookEntries) {
            String tempId = (String) pricebookEntry.get('Product2Id');
            result.add(tempId);
        }

        return result;
    }

    @AuraEnabled
    public static List<String> sortByPriceHigh(List<String> ids) {
        List<AggregateResult> pricebookEntries = [
                SELECT MIN(UnitPrice) unitPr, Product2Id
                FROM PricebookEntry
                WHERE Product2Id IN :ids
                GROUP BY Product2Id
                ORDER BY MIN(UnitPrice) DESC NULLS LAST
        ];

        List<String> result = new List<String>();

        for (AggregateResult pricebookEntry : pricebookEntries) {
            String tempId = (String) pricebookEntry.get('Product2Id');
            result.add(tempId);
        }

        return result;
    }

    @AuraEnabled
    public static List<String> sortByNameA(List<String> ids) {
        List<Product2> products = [
                SELECT Name, Id
                FROM Product2
                WHERE Id IN :ids
                ORDER BY Name ASC NULLS LAST
        ];

        List<String> result = new List<String>();

        for (Product2 prod : products) {
            result.add(prod.Id);
        }

        return result;
    }

    @AuraEnabled
    public static List<String> sortByNameZ(List<String> ids) {
        List<Product2> products = [
                SELECT Name, Id
                FROM Product2
                WHERE Id IN :ids
                ORDER BY Name DESC NULLS LAST
        ];

        List<String> result = new List<String>();

        for (Product2 prod : products) {
            result.add(prod.Id);
        }

        return result;
    }

    @AuraEnabled
    public static List<String> productsFamiliesSet(List<String> ids) {
        List<AggregateResult> products = [
                SELECT Family
                FROM Product2
                WHERE Id IN :ids
                GROUP BY Family
                ORDER BY Family
        ];

        List<String> result = new List<String>();
        result.add('All products');

        for (AggregateResult prod : products) {
            String tempResult = (String) prod.get('Family');
            result.add(tempResult);
        }

        return result;
    }

    @AuraEnabled
    public static List<String> sortByFamily(List<String> ids, String family) {
        List<Product2> products = new List<Product2>();

        if (family.equals('All products')) {
            products = [
                    SELECT Name, Id
                    FROM Product2
                    WHERE Id IN :ids
            ];
        } else {
            products = [
                    SELECT Name, Id
                    FROM Product2
                    WHERE Id IN :ids
                    AND Family LIKE :family
            ];
        }

        List<String> result = new List<String>();

        for (Product2 prod : products) {
            result.add(prod.Id);
        }

        return result;
    }

    @AuraEnabled
    public static List<String> checkByPrice(List<String> ids, Decimal priceFrom, Decimal priceTo) {
        List<AggregateResult> pricebookEntries = [
                SELECT MIN(UnitPrice) unitPr, Product2Id
                FROM PricebookEntry
                WHERE Product2Id IN :ids
                    AND UnitPrice >= :priceFrom
                    AND UnitPrice <= :priceTo
                GROUP BY Product2Id
        ];

        List<String> result = new List<String>();

        for (AggregateResult pricebookEntry : pricebookEntries) {
            String tempId = (String) pricebookEntry.get('Product2Id');
            result.add(tempId);
        }

        return result;
    }

    @AuraEnabled
    public static List<String> useFilters(List<String> ids, String family, Decimal priceFrom, Decimal priceTo) {
        List<Product2> products = new List<Product2>();

        if (family.equals('All products')) {
            products = [
                    SELECT Name, Id
                    FROM Product2
                    WHERE Id IN :ids
            ];
        } else {
            products = [
                    SELECT Name, Id
                    FROM Product2
                    WHERE Id IN :ids
                    AND Family LIKE :family
            ];
        }

        List<String> tempResult = new List<String>();

        for (Product2 prod : products) {
            tempResult.add(prod.Id);
        }

        List<AggregateResult> pricebookEntries = [
                SELECT MIN(UnitPrice) unitPr, Product2Id
                FROM PricebookEntry
                WHERE Product2Id IN :tempResult
                AND UnitPrice >= :priceFrom
                AND UnitPrice <= :priceTo
                GROUP BY Product2Id
        ];

        List<String> result = new List<String>();

        for (AggregateResult pricebookEntry : pricebookEntries) {
            String tempId = (String) pricebookEntry.get('Product2Id');
            result.add(tempId);
        }

        return result;
    }

}