public with sharing class rankingLWChelper {
    public rankingLWChelper() {
}

@AuraEnabled(cacheable=True)
 public static List<String> getData(String objToGet, String fldToGet){
    List<String> fakeList = new List<String>();
    fakeList.add(JSON.serialize(getPicklistValues(objToGet, fldToGet)));
    //fakeList.add(fieldResult);
    return fakeList;
}

@AuraEnabled 
public static List<String> getPicklistValues(String objectName, String picklistFields) {
    List<String> LabelsWithoutFieldName = new List<String>();

    if(string.isNotBlank(picklistFields)){            
        Map<String, Map<String,String>> picklistValuesMap = new Map<String, Map<String,String>>();

        for(String picklistField : picklistFields.split(',')){                
            picklistField = picklistField.trim();
            Schema.DescribeFieldResult stagesFR = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap().get(picklistField).getDescribe();
            List<Schema.PicklistEntry> stagesPle = stagesFR.getPicklistValues();

            Map<String,String> valuesList = new Map<String,String>();

            for( Schema.PicklistEntry s : stagesPle){
                valuesList.put(s.getValue(), s.getLabel());
                LabelsWithoutFieldName.add(s.getLabel());
            }                
            picklistValuesMap.put(picklistField, valuesList);      
        }           
        return LabelsWithoutFieldName;            
    }        
    return null;
}
}