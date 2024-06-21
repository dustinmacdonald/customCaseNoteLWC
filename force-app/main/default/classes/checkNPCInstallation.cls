public with sharing class checkNPCInstallation {
    public checkNPCInstallation() {

    }
    
    @AuraEnabled(cacheable=True)
    public static String getAccountObject() {
        return Schema.getGlobalDescribe().containsKey('Account').toString();
}
@AuraEnabled(cacheable=True)
public static String getPermissionSet() {
    List<PermissionSet> myPermissionSet = [SELECT Id FROM PermissionSet WHERE Name = 'Dustin_Test' LIMIT 1];
    if(myPermissionSet.size() > 0) {
        System.debug('Permission Set Found');
        return 'true';
    } else {
        System.debug('Permission Set not found');
        return 'false';
    }
}
}