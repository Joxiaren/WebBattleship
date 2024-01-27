import DOMManager from "./DOMManager";
const DOMM = DOMManager.getManager();

export default class Player{
    constructor(name, playerType){
        this.DOMElement = undefined;
        this.name = name;
        this.playerType = playerType;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
    }
    toString(){
        return `${this.playerType}: ${this.name}`;
    }
}