import { LightningElement, api } from 'lwc';

export default class PrintableViewLWC extends LightningElement {
@api invoke() {
    //Simple headless LWC that opens the print menu, to replicate the Printable View functionality 
    window.print(); 
}
}