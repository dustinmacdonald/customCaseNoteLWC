import { LightningElement, api, track } from 'lwc';
import createNewOutreach from '@salesforce/apex/createOutreachHelper.createNewOutreach';
import updateOutreach from '@salesforce/apex/createOutreachHelper.updateOutreach';

import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

// Create on outreach
// Fill in Lead, Health Plan

export default class CreateOutreachLWC extends NavigationMixin(LightningElement) {
    @api recordId; // Current record
    @api outreachId; // This is the record we're going to create
    @api recordIsCreated = false; // We only want to create our record once, when this is true it won't run
  
    showNotification() {
      const evt = new ShowToastEvent({
        title: 'Record created!',
        message: 'Please use the button to visit it',
        variant: 'success',
      });
      this.dispatchEvent(evt);
      console.log('outreach ID at toast:' + this.outreachId);
      console.log('record ID at toast:' + this.recordId);
    }

    async init() {
        //this.recordId = recordId;
        try {
            this.outreachId = await createNewOutreach(recordId);
            console.log('outreach ID from async init function:' + this.outreachId);
        } catch (error) {
            this.error = error;
            console.log('Async error: + ' + JSON.stringify(error));
        } finally {
            console.log('Async finished finally');
        }
    }
    
    renderedCallback() {
        if (this.recordIsCreated === false) {
            this.init(); // async function that waits for this value to be populated
            console.log('OUTREACH ID =' + this.outreachId);
            }
            this.showNotification();
            this.recordIsCreated = true;
            updateOutreach(this.outreachIdToUpdate, this.recordId);
        }
    handleClick() {
        const myOutreachId = this.outreachId;
        const fullURL = "https://upliftfamilyservices--dev.sandbox.lightning.force.com/lightning/r/Outreach__c/" + myOutreachId + "/view";
        window.open(fullURL);
    }
}