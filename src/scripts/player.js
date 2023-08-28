import DOMManager from "./DOMManager";
const DOMM = DOMManager.getManager();

export default class Player{
    constructor(){
        this.DOMElement = undefined;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
    }
}