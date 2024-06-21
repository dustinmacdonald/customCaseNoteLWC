import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/homePageFilesController.getAccounts';

const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Title', type: 'text' },
    { label: 'URL', fieldName: 'url', type: 'url' },
];
export default class HomePageFilesLWC extends LightningElement {
    @track accountList;
    columns = columns;

    @wire (getAccounts, {recordId: '$recordId'}) wiredAccounts({data,error}){
         if (data) {
              this.accountList = data;
              let options = []; // The options we're pulling in
               
              for (var key in data) {
                  options.push({ label: data[key], value: key  }); // Build our list
              }
              this.accountList = options;
         console.log(data); 
         } else if (error) {
         console.log(error);
         }
    }
}