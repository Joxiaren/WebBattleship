import '../styles/victoryScreen.css';
import DOMManager from './DOMManager';

const DOMM = DOMManager.getManager();

export default class VictoryScreen{
    constructor(playerName){
        this.DOMElement = undefined;
        this.window = undefined;
        this.rematchButton = undefined;
        this.startOverButton = undefined;
        
        this.playerName = playerName;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'victory-screen');
        this.window = DOMM.createDOM('div', 'victory-screen-window');
        DOMM.setTextContent(this.window, `${this.playerName} is victorious!!!`);

        this.rematchButton = DOMM.createDOM('div', 'victory-screen-rematch');
        DOMM.setTextContent(this.rematchButton, 'Rematch');
        this.startOverButton = DOMM.createDOM('div', 'victory-screen-reset');
        DOMM.setTextContent(this.startOverButton, 'New Game');

        DOMM.addChild(this.window, this.rematchButton);
        DOMM.addChild(this.window, this.startOverButton);
        DOMM.addChild(this.DOMElement, this.window);
    }
    setDOMEvents(rematchCB, startOverCB){
        if(this.DOMElement === undefined) return;
        DOMM.addEvent(this.rematchButton, 'click', rematchCB);
        DOMM.addEvent(this.startOverButton, 'click', startOverCB);
    }
    removeDOMElement(){
        DOMM.removeAllChildren(this.DOMElement);
        DOMM.removeDOM(this.DOMElement);
    }
}