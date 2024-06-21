public with sharing class profilerLWCHelper {
    public profilerLWCHelper() {

    }

    @AuraEnabled(cacheable=True)
    public static List<String> getProfiles() {
        // Pull
        List<Profile> profiles = [SELECT Id, Name FROM Profile];
        List<String> profileNames = new List<String>();

        for (Profile listEntries : profiles) {
            profileNames.add(listEntries.Name);
        }
        return profileNames;

    }
}