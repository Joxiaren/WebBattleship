import "../../styles/playerSetupPage.css";

import DOMManager from "../DOMManager";
const DOMM = DOMManager.getManager();

export default class PlayerSetup{
    constructor(){
        this.pageFunction = undefined;

        this.player1 = undefined;
        this.player2 = undefined;


        this.DOMElement = undefined;
        this.continueButton = undefined;
    }
    setPageFunction(pageFunction){
        this.pageFunction = pageFunction;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'player-setup');   

        this.player1Label = DOMM.createDOM('div', 'player-setup-label')
        DOMM.setTextContent(this.player1Label, "Enter player1 Name:");
        this.player1Text = DOMM.createDOM('input');
        DOMM.setAttribute(this.player1Text, 'type', 'text');

        this.player2Label = DOMM.createDOM('div', 'player-setup-label');
        DOMM.setTextContent(this.player2Label, "Enter player2 Name:");
        this.player2Text = DOMM.createDOM('input');
        DOMM.setAttribute(this.player2Text, 'type', 'input');

        this.player2SelectLabel = DOMM.createDOM('div', 'player-setup-select-label');
        DOMM.setTextContent(this.player2SelectLabel, "Select Player2");

        this.player2Radio = DOMM.createDOM('div', 'player-select-radio-container');
        this.player2SelectHuman = DOMM.createDOM('input');
        DOMM.setAttribute(this.player2SelectHuman, 'type', 'radio');
        DOMM.setAttribute(this.player2SelectHuman, 'value', 'Human');
        DOMM.setAttribute(this.player2SelectHuman, 'name', 'player2');
        DOMM.setAttribute(this.player2SelectHuman, 'checked', 'checked');
        this.player2SelectAIEasy = DOMM.createDOM('input');
        DOMM.setAttribute(this.player2SelectAIEasy, 'type', 'radio');
        DOMM.setAttribute(this.player2SelectAIEasy, 'value', 'AIEasy');
        DOMM.setAttribute(this.player2SelectAIEasy, 'name', 'player2');
        this.player2SelectAIHard = DOMM.createDOM('input');
        DOMM.setAttribute(this.player2SelectAIHard, 'type', 'radio');
        DOMM.setAttribute(this.player2SelectAIHard, 'value', 'AIHard');
        DOMM.setAttribute(this.player2SelectAIHard, 'name', 'player2');
        DOMM.addChild(this.player2Radio, this.player2SelectHuman);
        DOMM.addChild(this.player2Radio, this.player2SelectAIEasy);
        DOMM.addChild(this.player2Radio, this.player2SelectAIHard);

        this.continueButton = DOMM.createDOM('div', 'player-setup-continue')
        DOMM.setTextContent(this.continueButton, 'Continue Button');


        DOMM.addChild(this.DOMElement, this.player1Label);
        DOMM.addChild(this.DOMElement, this.player2Label);
        DOMM.addChild(this.DOMElement, this.player1Text);
        DOMM.addChild(this.DOMElement, this.player2Text);
        DOMM.addChild(this.DOMElement, this.player2SelectLabel);
        DOMM.addChild(this.DOMElement, this.player2Radio);
        DOMM.addChild(this.DOMElement, this.continueButton);
    }
}