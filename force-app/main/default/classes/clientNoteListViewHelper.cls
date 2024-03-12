public with sharing class clientNoteListViewHelper {
    // AuraEnabled exposes our class to our LWC which is a requirement
    @AuraEnabled(cacheable=True)
    public static List<caseman__ClientNote__c> getClientNotes(){ // Get the data we need
        return [SELECT Id, caseman__Client__r.Name, caseman__Content__c, caseman__ProgramEngagement__r.Name, caseman__InteractionDate__c 
        FROM caseman__ClientNote__c LIMIT 2000];
    }
}