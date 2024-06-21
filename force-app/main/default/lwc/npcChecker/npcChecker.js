import { LightningElement, wire, track } from 'lwc';
import getAccountObject from '@salesforce/apex/checkNPCInstallation.getAccountObject';
import getPermissionSet from '@salesforce/apex/checkNPCInstallation.getPermissionSet';

export default class NpcChecker extends LightningElement {
    accountFound = false;
    @wire(getAccountObject)
    accInfo;

    permissionSetFound;
    permissionSetNotFound;

    @wire(getPermissionSet)
    permissionSetInfo;
    
    async handleClick() {
        try {
            this.accInfo = await getAccountObject();
            console.log('Was Account found?' + this.accInfo);
            if(this.accInfo = 'true') {
                this.accountFound = true;
            }
        } catch (error) {
            this.error = error;
            console.log('Async error: + ' + JSON.stringify(error));
        } finally {
            console.log('');
        }

        try {
            this.permissionSetInfo = await getPermissionSet();
            console.log('Was PS found? ' + this.permissionSetInfo);
            if(this.permissionSetInfo = 'false') {
                this.permissionSetNotFound = true;
                console.log('PS not found');
            } else {
                this.permissionSetFound = true;
                console.log('PS Found');
            }
        } catch (error) {
            this.error = error;
            console.log('Async error PS: + ' + JSON.stringify(error));
        } finally {
            console.log('');
        }
    }
}