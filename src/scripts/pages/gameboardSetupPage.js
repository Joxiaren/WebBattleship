import DOMManager from "../DOMManager";
const DOMM = DOMManager.getManager();

export default class GameboardSetup{
    constructor(){
        this.DOMElement = undefined;
        this.pageFunction = undefined;
    }
    setPageFunction(pageFunction){
        this.pageFunction = pageFunction;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'gameboard-setup');
        DOMM.setTextContent(this.DOMElement, "Gameboard Setup");
    }
}