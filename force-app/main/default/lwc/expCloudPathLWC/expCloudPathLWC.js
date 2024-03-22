// Import needed libraries
import { LightningElement, wire, track, api } from 'lwc';
import getContactId from '@salesforce/apex/expCloudPathHelper.getContactId';
import getStageList from '@salesforce/apex/expCloudPathHelper.getStageList';

import Id from "@salesforce/user/Id";

export default class ExpCloudPathLWC extends LightningElement {
// Define the fields we'll be returning
@api returnedContactId;
@api userId = Id; // This is pulled in by SF automatically, no need to do anything to return the user ID

// Use the wire service to get our field
@wire(getContactId)
wireParam({ error, data }){
   if (data) {
        this.data = data;
        let dataToSplit = JSON.stringify(data);
        console.log(data);
        dataToSplit = dataToSplit.replace('User:{ContactId=','')
        dataToSplit = dataToSplit.split(',')[0];
        dataToSplit = dataToSplit.substring(1);
        this.returnedContactId = dataToSplit;
    }
else if (error) {
        this.error = error;
        this.data = undefined;
    }
}

@wire(getStageList, {contactId:'$returnedContactId'}) contacts;
}