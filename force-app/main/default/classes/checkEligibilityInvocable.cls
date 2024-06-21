public with sharing class checkEligibilityInvocable {
    public checkEligibilityInvocable() {
    }

    @InvocableMethod(label='Get Program Eligibility' description='Returns the list of eligible programs' category='Account')
    
    public static List<String> getEligibility(List<String> id) {
        List<String> myList = new List<String>();

        for (String i : id) {
            String tempJSON = L_EligibilityCheck.getEligibilityRules(i);
            
            Map<String, Object> params = (Map<String, Object>)JSON.deserializeUntyped(tempJSON);
            Object obj = params.get(i);
            myList.add(obj.toString());
            return myList;
        }
        return myList;
      }
}