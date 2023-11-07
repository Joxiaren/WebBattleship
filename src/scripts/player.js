import DOMManager from "./DOMManager";
const DOMM = DOMManager.getManager();

export default class Player{
    constructor(name){
        this.DOMElement = undefined;
        this.name = name;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
    }
}