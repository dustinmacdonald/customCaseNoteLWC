public with sharing class getHudInvocable {
    public getHudInvocable() {
    }

    @InvocableMethod(label='Get FPL' description='Returns the FPL for the given income.' category='Account')
    
    public static List<String> getFPL(List<String> id) {
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