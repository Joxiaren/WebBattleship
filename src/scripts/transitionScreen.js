import '../styles/transitionScreen.css';
import DOMManager from './DOMManager';

const DOMM = DOMManager.getManager();

export default class TransitionScreen{
    constructor(text){
        this.DOMElement = undefined;
        this.window = undefined;
        this.okButton = undefined;
        this.text = text;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'transition-screen');
        this.window = DOMM.createDOM('div', 'transition-screen-window');
        DOMM.setTextContent(this.window, this.text);
        this.okButton = DOMM.createDOM('div', 'transition-screen-button');
        DOMM.setTextContent(this.okButton, 'Continue');
        DOMM.addChild(this.window, this.okButton);
        DOMM.addChild(this.DOMElement, this.window);
    }
    setDOMEvents(listener){
        if(this.DOMElement === undefined) return;
        DOMM.addEvent(this.okButton, 'click', listener);
    }
    removeDOMElement(){
        DOMM.removeAllChildren(this.DOMElement);
        DOMM.removeDOM(this.DOMElement);
    }
}