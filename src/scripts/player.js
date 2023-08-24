import DOMManager from "./DOMManager";
const DOMM = DOMManager.getManager();

export default class Player{
    constructor(gameboard){
        this.DOMElement = undefined;
        this.gameboard = gameboard;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
    }
}