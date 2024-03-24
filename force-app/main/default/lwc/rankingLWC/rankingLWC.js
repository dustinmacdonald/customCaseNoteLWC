import { LightningElement, track, api, wire } from 'lwc';
import getData from "@salesforce/apex/rankingLWChelper.getData";

var indexFrom;
var indexTo;

export default class rankingLWC extends LightningElement {
    
    @api objectValue; // The object whose picklist we are getting
    @api fieldValue; // The field we are pulling into the component
    @api retData;

    @track originalValue = 0; // The original value of the picklist value being re-sorted
    @track newValue = 0; // The updated value of the picklist value being re-sorted
    
    @track dataArray = [{}];
    /**
    @track dataArray = [{
        seqNumber: 1,
        name: 'Item 1',

    },
    {
        seqNumber: 2,
        name: 'Item 2',
    },
    {
        seqNumber: 3,
        name: 'Item 3',
    },
    {
        seqNumber: 4,
        name: 'Item 4',
    },
    {
        seqNumber: 5,
        name: 'Item 5',
    }]
*/

    //@wire(getData, {objToGet:'Contact', fldToGet: 'Stage__c'}) picklistData;
    @wire(getData, {objToGet:'Contact', fldToGet: 'Stage__c'})
    wireParam({ error, data }){
       if (data) {
            //console.error('data: ' + data);
            let dataToSplit = JSON.stringify(data);
            //replace(/[^0-9$.,]/g, ''
            dataToSplit = dataToSplit.replace(/[^?=a-z,+]/ig, ''); // Remove opening brackets
            //console.error('datatosplit: ' + dataToSplit);
            //dataToSplit = dataToSplit.split(',');
            var myArray = dataToSplit.split(",");
            //console.error('myArray: ' + myArray);
            var x = 1;
            var item = '';
            for(item in myArray) {
                this.dataArray.push({seqNumber:x,name:myArray[item]});
                //console.error('seqNumber:' + x);
                //console.error('item: ' + myArray[item]);
                x++;
                item++;
            }
            //this.dataArray.push({seqNumber:6,name:"test"});
            console.error(this.dataArray);
        }
    else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    handleDragStart(event) {
        var originalValue;
        event.dataTransfer.dropEffect = 'move';

        indexFrom = this.getIndex(parseInt(event.target.dataset.item));
        originalValue = indexFrom;
        console.log('indexFrom: ' + indexFrom);
        console.log('originalValue:' + originalValue);
    }

    getIndex(index) {
        return this.dataArray.map(function(e) { return e.seqNumber; }).indexOf(index);
    }

    handleDrop(event) {
        var newValue;
        newValue = indexTo;
        //console.log(this.picklistData);

        indexTo = this.getIndex(parseInt(event.target.dataset.item));
        //console.log('indexTo: ' + indexTo);
        //console.log('newValue:' + newValue);
        let cutOut = this.dataArray.splice(indexFrom,1) [0]; // cut the element at index 'from'
            this.dataArray.splice(indexTo, 0, cutOut);
        // console.log(JSON.stringify(this.dataArray));


    }

    handleDragover(event) {
      event.preventDefault();
    }

    onClick(event) {
        console.error('test');
        console.error(JSON.stringify(this.dataArray));
//        console.error(getIndex(1));
    }
}