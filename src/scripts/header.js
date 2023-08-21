import '../styles/header.css';
import DOMManager from './DOMManager.js';
const DOMM = DOMManager.getManager();

export default class Header{
    constructor(title){
        this.title = title;
        this.DOMElement = undefined;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('header');
        DOMM.setTextContent(this.DOMElement, this.title);
    }
}