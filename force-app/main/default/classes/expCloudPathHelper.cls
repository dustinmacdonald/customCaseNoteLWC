public with sharing class expCloudPathHelper {
    public expCloudPathHelper() {

    }
 
    @AuraEnabled(cacheable=True)
    public static String getContactId(){ // Get the data we need
        // Define our list
        String currentUserId = UserInfo.getUserId();
        List<User> contactIdList = [SELECT ContactId FROM User WHERE Id =: currentUserId];
        String contactIdVar;
        contactIdVar = contactIdList[0].toString();
        return contactIdVar;
    }

    @AuraEnabled(cacheable=True)
    public static String getStageList(String contactId) {
        List<Contact> listOfStages = [SELECT Stage__c FROM Contact WHERE Id =: contactId];
        String output = SYSTEM.JSON.serialize(listOfStages[0].Stage__c); // This is the name of the stage
        return output.replace('"',''); // Remove the quotes
    }
}