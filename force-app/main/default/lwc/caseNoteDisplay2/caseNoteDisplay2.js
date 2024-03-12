import { LightningElement, track, wire } from 'lwc';
import getClientNotes from '@salesforce/apex/clientNoteListViewHelper.getClientNotes'; // Import our Apex method so we can use its results later

const columns = [ // Define the columns, fieldName is the field on the object
{ label: 'ID', fieldName: 'Id', initialWidth:150},
{ label: 'Client Name', fieldName: 'caseman__Client__r.Name' },
{ label: 'Program Engagement', fieldName: 'caseman__ProgramEngagement__r.Name' },
{ label: 'Interaction Date', fieldName: 'caseman__InteractionDate__c', type:'date'},
{ label: 'Content', fieldName: 'caseman__Content__c'}
];

const data = '';

export default class caseNoteDisplay2 extends LightningElement {
    @track data;
    @track error;
    @track columns = columns;
    @track searchString;
    @track initialRecords;

@wire(getClientNotes)
wireParam({ error, data }){
   if (data) {
        this.data = data;
	    this.data = data.map( // Creates a copy of the array, applying the function Object.assign to it
	    record => Object.assign( 
        // Create a copy of our returned data, iterate through and assign these fields:
		{ "caseman__Client__r.Name": record.caseman__Client__r.Name},
        { "caseman__ProgramEngagement__r.Name": record.caseman__ProgramEngagement__r?.Name}, //the ? checks if it exists before it uses this
		record
	    )
		);
        this.initialRecords = this.data;
	}

else if (error) {
		this.error = error;
		this.data = undefined;
	}
}

handleSearch(event) {
    //         const fieldName = event.target.name; //what is the name of the field triggering this?
    //         if(fieldName === 'clientNameSearch') { } // If they are entering into our search text box, do something
               
               console.log('Value to filter by: ' + event.target.value); // event.target.value = text entered into the textbox
               console.log('Initial Records: ' + JSON.stringify(this.initialRecords));
               console.log('Data: ' + JSON.stringify(this.data));

               //console.log('data' + data);
               //this.data = wireParam.data;
               //console.log('this.data: ' + this.data);
               //console.log('Wire param: ' + this.wireParam);
               
               const searchKey = event.target.value.toLowerCase();
 
               if (searchKey) {
                   this.data = this.initialRecords;                   
                   if (this.data) {
                       let searchRecords = [];
        
                       for (let record of this.data) {
                            //console.log(JSON.stringify(record)); 
                           let valuesArray = Object.values(record);
        
                           for (let val of valuesArray) {
                               //console.log('val is ' + val);
                               let strVal = String(val);
                               if (strVal) {
                                   if (strVal.toLowerCase().includes(searchKey)) {
                                       searchRecords.push(record);
                                       break;
                                   }
                               }
                           }
                       }
        
                       //console.log('Matched Accounts are ' + JSON.stringify(searchRecords));
                       this.data = searchRecords;
                   }
               } else {
                   this.data = this.initialRecords;
               }
           }
onClick(event) {
    console.log('export button clicked')
    this.downloadCSVFile();
}

downloadCSVFile() {   
// this method validates the data and creates the csv file to download
// this method from https://www.salesforcecodecrack.com/2019/05/export-data-as-csv-file-with-javascript.html
    console.log('downloadCSV method activated')
    let rowEnd = '\n';
    let csvString = '';
    // this set elminates the duplicates if have any duplicate keys
    let rowData = new Set();

    // getting keys from data
    this.data.forEach(function (record) {
        Object.keys(record).forEach(function (key) {
            rowData.add(key);
        });
    });

    // Array.from() method returns an Array object from any object with a length property or an iterable object.
    rowData = Array.from(rowData);
    
    // splitting using ','
    csvString += rowData.join(',');
    csvString += rowEnd;

    // main for loop to get the data based on key value
    for(let i=0; i < this.data.length; i++){
        let colValue = 0;

        // validating keys in data
        for(let key in rowData) {
            if(rowData.hasOwnProperty(key)) {
                // Key value 
                // Ex: Id, Name
                let rowKey = rowData[key];
                // add , after every value except the first.
                if(colValue > 0){
                    csvString += ',';
                }
                // If the column is undefined, it as blank in the CSV file.
                let value = this.data[i][rowKey] === undefined ? '' : this.data[i][rowKey];
                csvString += '"'+ value +'"';
                colValue++;
            }
        }
        csvString += rowEnd;
    }

    // Creating anchor element to download
    let downloadElement = document.createElement('a');

    // This  encodeURI encodes special characters, except: , / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
    downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
    downloadElement.target = '_self';
    // CSV File Name
    downloadElement.download = 'case_note.csv';
    // below statement is required if you are using firefox browser
    document.body.appendChild(downloadElement);
    // click() Javascript function to download CSV file
    downloadElement.click(); 
}
}