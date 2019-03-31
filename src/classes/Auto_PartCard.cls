public with sharing class Auto_PartCard {
    @AuraEnabled
    public static Product2 searchProductDetails(String id) {
        List<Product2> products = [
                SELECT Id, Name, ProductCode, Description, Family
                FROM Product2
                WHERE Id = :id
        ];

        if (products.isEmpty()) {
            return null;
        } else {
            return products.get(0);
        }
    }

    @AuraEnabled
    public static List<PricebookEntry> searchPricebookEntriesDetails(String id) {
        List<PricebookEntry> pricebookEntries = [
                SELECT Id, Name, UnitPrice, Pricebook2Id
                FROM PricebookEntry
                WHERE Product2Id = :id
                ORDER BY UnitPrice
        ];

        return pricebookEntries;
    }

    @AuraEnabled
    public static List<String> getImagesToCarousel(String id) {
        List<String> contentDocumentIds = new List<String>();
        List<String> contentDocumentURLs = new List<String>();

        List<ContentDocumentLink> contentDocumentLinks = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :id];
        for (ContentDocumentLink contentLink : contentDocumentLinks) {
            contentDocumentIds.add(contentLink.ContentDocumentId);
        }

        List<ContentDistribution> contentDistributions = [SELECT ContentDownloadUrl FROM ContentDistribution WHERE ContentDocumentId IN :contentDocumentIds];
        for (ContentDistribution contentDistribution : contentDistributions) {
            contentDocumentURLs.add(contentDistribution.ContentDownloadUrl);
        }

        return contentDocumentURLs;
    }


    @AuraEnabled
    public static void addToBasket(String productId, Decimal price, Decimal quantity) {
        List<Account> accounts = [SELECT Id FROM Account WHERE Name = :getCustomSettingValue('Account_Name')];
        List<Pricebook2> standardPricebook = [SELECT Id FROM Pricebook2 WHERE IsStandard = TRUE];
        List<PricebookEntry> pricebookEntries = [SELECT Id FROM PricebookEntry WHERE Pricebook2Id = :standardPricebook.get(0).Id AND Product2Id = :productId];

        String userId = UserInfo.getUserId();

        Contract contract;
        List<Contract> contracts = [SELECT Id, AccountId FROM Contract WHERE OwnerId = :UserInfo.getUserId() AND Status = :getCustomSettingValue('Status_Activated')];
        if (contracts != null && !contracts.isEmpty()) {
            contract = contracts[0];
        } else {
            contract = new Contract(AccountId = accounts.get(0).Id, Pricebook2Id = standardPricebook.get(0).Id, Status = getCustomSettingValue('Status_Draft'), StartDate = Date.today(), ContractTerm = 1);
            insert contract;
            contract.Status = getCustomSettingValue('Status_Activated');
            update contract;
        }

        Order newOrder;

        List<Order> orders = [SELECT Id FROM Order WHERE OwnerId = :userId AND Status = 'Basket' LIMIT 1];
        if (orders == null || orders.isEmpty()) {
            newOrder = new Order();
            newOrder.AccountId = contract.AccountId;
            newOrder.Status = getCustomSettingValue('Status_Basket');
            newOrder.ContractId = contract.Id;
            newOrder.EffectiveDate = System.TODAY();
            newOrder.Pricebook2Id = standardPricebook.get(0).Id;

            insert newOrder;
        } else {
            newOrder = orders.get(0);
        }

        OrderItem newProduct = new OrderItem();

        List<OrderItem> items = [SELECT Id, Quantity FROM OrderItem WHERE Order.OwnerId = :UserInfo.getUserId() AND Order.Status = :getCustomSettingValue('Status_Basket') AND Product2Id = :productId];
        if (items.isEmpty()) {
            newProduct.OrderId = newOrder.Id;
            newProduct.PricebookEntryId = pricebookEntries.get(0).Id;
            newProduct.UnitPrice = price;
            newProduct.Quantity = 1;

            insert newProduct;
        } else {
            newProduct = items.get(0);
            newProduct.Quantity = newProduct.Quantity + 1;

            update newProduct;
        }
    }


    public static String getCustomSettingValue(String csName) {
        Auto_Part__c csItem = Auto_Part__c.getInstance(csName);
        if (csItem == null) {
            return null;
        }

        return csItem.Value__c;
    }
}