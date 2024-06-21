public with sharing class createOutreachHelper {

    public createOutreachHelper() { // Creates a Contact and returns the ID
    }    
    @AuraEnabled()
    
    public static String createNewOutreach(Id recordId) {
        Outreach__c contactToInsert = New Outreach__c();
        //contactToInsert.Voice_Call__c = myRecordId;
        contactToInsert.Communication_Method__c = 'Phone';
        contactToInsert.Duration__c = 15;
        contactToInsert.Disposition__c = 'Successful';
        contactToInsert.Voicecall_ID__c = recordId;
        //contactToInsert.Notes = 'Auto-generated';
        //Account HealthPlan = [SELECT Id FROM Account WHERE Id =: '0017f00000ulj8mAAA' LIMIT 1];
        //contactToInsert.Health_Plan__c = HealthPlan.id;
        Insert contactToInsert;
        return contactToInsert.Id;
    }
    
    @AuraEnabled
    public static void updateOutreach(String outreachIdToUpdate, String voiceCallToUpdate) {
        // What outreach are we updating?
        Outreach__c outreachToUpdateRecord;
        outreachToUpdateRecord = [SELECT Id, Voice_Call__c FROM Outreach__c WHERE Id =: outreachIdToUpdate];

        // Update the Voice Call fields
        outreachToUpdateRecord.Voice_Call__c = voiceCallToUpdate;
        outreachToUpdateRecord.Voicecall_ID__c = voiceCallToUpdate;
        
        // Make the update call.
        update outreachToUpdateRecord;
    }
}