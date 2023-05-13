public with sharing class RecordFetchHelper {
    @AuraEnabled(cacheable = true)
    public static Map<String,String> fetchAllObjectList(){
        Map<String,String> mapOfAllObjects = new Map<String,String>();
        for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().values()){
            String name = objTyp.getDescribe().getLocalName();
            String label = objTyp.getDescribe().getLabel();
            mapOfAllObjects.put(name, label);
        }
        return mapOfAllObjects;
    }
    @AuraEnabled(cacheable = true)
    public static Map<String,String> fetchAllFieldsForSelectedObject(String strObjectName){
        Map<String,Schema.SObjectType> detail = Schema.getGlobalDescribe();
        Map<String,String> mapOfFields = new Map<String,String>();
        for(Schema.SObjectField fields :detail.get(strObjectName).getDescribe().fields.getMap().values()){
            mapOfFields.put(fields.getDescribe().getName(), fields.getDescribe().getName());
        }
        return mapOfFields;
    }
    @AuraEnabled(cacheable = true)
    public static List<Sobject> fetchAllRecordsOfSelectedObject(String strObjectName){
        Map<String,Schema.SObjectType> detail = Schema.getGlobalDescribe();
        List<String> allFieldsOfSelectedObject = new List<String>();
        for(Schema.SobjectField fields: detail.get(strObjectName).getDescribe().fields.getMap().values()){
            allFieldsOfSelectedObject.add(fields.getDescribe().getName());
        }
        String allFields = string.join(allFieldsOfSelectedObject,',');
        String query = 'SELECT '+ allFields + ' FROM '+strObjectName;
        return Database.query(query);
    }

}