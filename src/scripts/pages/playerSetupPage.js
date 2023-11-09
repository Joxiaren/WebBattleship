import "../../styles/playerSetupPage.css";

import FormGroup, { RadioGroup } from "../formGroup";

import DOMManager from "../DOMManager";
const DOMM = DOMManager.getManager();


export default class PlayerSetup{
    constructor(){
        this.pageFunction = undefined;

        this.player1NameGroup = undefined;
        this.player2NameGroup = undefined;

        this.DOMElement = undefined;
        this.continueButton = undefined;
    }
    setPageFunction(pageFunction){
        this.pageFunction = pageFunction;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'player-setup');   


        this.player1NameGroup = new FormGroup('Enter Player1 Name:', 'text', 'player1-label', '');
        this.player1NameGroup.setDOMElement();
        this.player1NameGroup.setClassNameLabel('player-setup-label');
        this.player1NameGroup.setClassNameInput('player-setup-input-name');

        this.player2NameGroup = new FormGroup('Enter Player2 Name:', 'text', 'player2-label', '');
        this.player2NameGroup.setDOMElement();
        this.player2NameGroup.setClassNameLabel('player-setup-label');
        this.player2NameGroup.setClassNameInput('player-setup-input-name');

        this.player2SelectLabel = DOMM.createDOM('div', 'player-setup-select-label');
        DOMM.setTextContent(this.player2SelectLabel, "Select Player2");

        this.player2SelectGroup = new RadioGroup('player2Select', ['Human', 'AIEasy', 'AIHard'], ['Human', 'AIEasy', 'AIHard']);
        this.player2SelectGroup.setDOMElement();

        this.continueButton = DOMM.createDOM('div', 'player-setup-continue')
        DOMM.setTextContent(this.continueButton, 'Continue Button');


        DOMM.addChild(this.DOMElement, this.player1NameGroup.DOMElement);
        DOMM.addChild(this.DOMElement, this.player2NameGroup.DOMElement);
        DOMM.addChild(this.DOMElement, this.player2SelectLabel);
        DOMM.addChild(this.DOMElement, this.player2SelectGroup.DOMElement);
        DOMM.addChild(this.DOMElement, this.continueButton);
    }
}