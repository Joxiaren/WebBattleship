import '../../styles/gameboardSetupPage.css';

import Gameboard from "../gameboard";

import DOMManager from "../DOMManager";
const DOMM = DOMManager.getManager();

export default class GameboardSetup{
    constructor(continueFunction){
        this.continueFunction = undefined;

        this.gameboard1 = undefined;
        this.gameboard2 = undefined;

        this.DOMElement = undefined;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'gameboard-setup');
        
        this.gameboard1 = new Gameboard();
        this.gameboard1.setDOMElement();
        this.gameboard2 = new Gameboard();
        this.gameboard2.setDOMElement();

        DOMM.addChild(this.DOMElement, this.gameboard1.DOMElement);
        DOMM.addChild(this.DOMElement, this.gameboard2.DOMElement);
    }
}