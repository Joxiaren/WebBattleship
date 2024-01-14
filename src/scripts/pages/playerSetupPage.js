import "../../styles/playerSetupPage.css";

import FormGroup, { RadioGroup } from "../formGroup";

import DOMManager from "../DOMManager";
const DOMM = DOMManager.getManager();


export default class PlayerSetup{
    constructor(continueFunction){
        this.continueFunction = continueFunction;

        this.player1NameGroup = undefined;
        this.player2NameGroup = undefined;
        this.player2SelectGroup = undefined;

        this.DOMElement = undefined;
        this.continueButton = undefined;
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
        DOMM.setTextContent(this.player2SelectLabel, "Select Player2 Type:");

        this.player2SelectGroup = new RadioGroup('player2Select', ['Human', 'AIEasy', 'AIHard'], ['Human', 'AIEasy', 'AIHard']);
        this.player2SelectGroup.setDOMElement();

        this.continueButton = DOMM.createDOM('div', 'player-setup-continue')
        DOMM.setTextContent(this.continueButton, 'Continue');


        DOMM.addChild(this.DOMElement, this.player1NameGroup.DOMElement);
        DOMM.addChild(this.DOMElement, this.player2NameGroup.DOMElement);
        DOMM.addChild(this.DOMElement, this.player2SelectLabel);
        DOMM.addChild(this.DOMElement, this.player2SelectGroup.DOMElement);
        DOMM.addChild(this.DOMElement, this.continueButton);

        this.setDOMEvents();
    }
    setDOMEvents(){
        DOMM.addEvent(this.continueButton, 'click', () =>{
            this.continueFunction(this.player1NameGroup.value, this.player2NameGroup.value, this.player2SelectGroup.selectedValue);
        });
    }
}