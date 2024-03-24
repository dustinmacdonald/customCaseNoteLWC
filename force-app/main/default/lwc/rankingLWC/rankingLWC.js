import { LightningElement, track, api } from 'lwc';

var indexFrom;
var indexTo;

export default class rankingLWC extends LightningElement {
    @api objectValue; // The object whose picklist we are getting
    @api picklistValue; // The field we are pulling into the component
    
    @track originalValue = 0; // The original value of the picklist value being re-sorted
    @track newValue = 0; // The updated value of the picklist value being re-sorted

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

        indexTo = this.getIndex(parseInt(event.target.dataset.item));
        console.log('indexTo: ' + indexTo);
        console.log('newValue:' + newValue);
        let cutOut = this.dataArray.splice(indexFrom,1) [0]; // cut the element at index 'from'
            this.dataArray.splice(indexTo, 0, cutOut);
        // console.log(JSON.stringify(this.dataArray));

    }

    handleDragover(event) {
      event.preventDefault();
    }

}