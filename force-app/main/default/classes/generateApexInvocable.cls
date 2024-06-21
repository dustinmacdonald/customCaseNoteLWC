public with sharing class generateApexInvocable {
    public generateApexInvocable() {

    }
    @InvocableMethod(label='Generate Report V2' description='Generates CSVs and stores them in Files.' category='Reporting')
    public static void generateReport(List<List<ID>> reportIds) {
        // Get the reports
        List<Report> ReportList = [SELECT Id, Name FROM Report WHERE Id IN :reportIds[0]];

        // Get the size of list so we can iterate
        Integer sizeOfList = reportList.size();
        Integer counterVar = 0;

        System.debug('Size of List: ' + sizeOfList);
        while (counterVar < sizeOfList) {
            String reportId = (String)reportList.get(counterVar).get('Id');
            System.debug('Report ID: ' + reportId);
            //String reportName = 'Dustin Report';
            String reportName = (String)reportList.get(counterVar).get('Name');
    
            // Run the report
            Reports.ReportResults results = Reports.ReportManager.runReport(reportId, true);
            String finalReport;
    
            // Get the headers
            for (String colName : results.getReportMetadata().getDetailColumns()) {
                String currentHeader = results.getReportExtendedMetadata().getDetailColumnInfo().get(colName).getLabel();
                System.debug(currentHeader);
                if (currentHeader.startsWithIgnoreCase('null')) {
                    System.debug('Null');
                    System.debug('currentHeader:' + currentHeader);
                    currentHeader = currentHeader.replace('null','');
                }
                finalReport = finalReport + currentHeader + ','; 
            }
            finalReport = finalReport + '\r\n';
            
            Reports.ReportFactWithDetails factWithDetails = (Reports.ReportFactWithDetails) results.getFactMap().get('T!T');
            for (Reports.ReportDetailRow row : factWithDetails.getRows()) {
            for (Reports.ReportDataCell cell : row.getDataCells()) {
                String newCell;
                if(cell.getLabel().startsWithIgnoreCase('$')) {
                    // Escape commas
                    newCell = cell.getLabel().replace(',', '');
                    finalReport = finalReport + newCell + ',';
                } else {
                    finalReport = finalReport + cell.getLabel() + ',';
                }
                
                //System.debug('The cell data: ' + cell.getLabel());
            }
            finalReport = finalReport + '\r\n';
        }  
            counterVar++;
            System.debug(finalReport);
            ContentVersion newCSVFile = new ContentVersion();
            newCSVFile.title = reportName + ': ' + System.now();
            newCSVFile.VersionData = Blob.valueOf(finalReport);
            newCSVFile.PathOnClient = newCSVFile.title +'.csv';
            insert newCSVFile;
        }
    }
}