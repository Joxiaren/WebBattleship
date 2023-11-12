import '../../styles/gameboardSetupPage.css';

import Gameboard from "../gameboard";

import DOMManager from "../DOMManager";
const DOMM = DOMManager.getManager();

export default class GameboardSetup{
    constructor(continueFunction){
        this.continueFunction = continueFunction;

        this.gameboard1 = undefined;
        this.gameboard2 = undefined;

        this.DOMElement = undefined;
        this.continueButton = undefined;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'gameboard-setup');
        
        this.gameboard1 = new Gameboard();
        this.gameboard1.setDOMElement();
        this.gameboard2 = new Gameboard();
        this.gameboard2.setDOMElement();

        this.continueButton = DOMM.createDOM('div', 'gameboard-setup-continue')
        DOMM.setTextContent(this.continueButton, 'Continue');

        DOMM.addChild(this.DOMElement, this.gameboard1.DOMElement);
        DOMM.addChild(this.DOMElement, this.gameboard2.DOMElement);
        DOMM.addChild(this.DOMElement, this.continueButton);

        this.setDOMEvents();
    }
    setDOMEvents(){
        let gm1 = this.gameboard1;
        let gm2 = this.gameboard2;
        DOMM.addEvent(this.continueButton, 'click', () =>{
            this.continueFunction(gm1, gm2);
        });
    }
}