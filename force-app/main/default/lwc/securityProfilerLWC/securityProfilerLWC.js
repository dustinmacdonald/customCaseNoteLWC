import { LightningElement, wire } from 'lwc';
import getProfiles from '@salesforce/apex/profilerLWCHelper.getProfiles';

export default class SecurityProfilerLWC extends LightningElement {
    @wire(getProfiles)
    profileList;
}