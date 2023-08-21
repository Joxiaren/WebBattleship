import '../styles/footer.css';
import DOMManager from './DOMManager.js';
const DOMM = DOMManager.getManager();

export default class Footer{
    constructor(title){
        this.title = title;
        this.DOMElement = undefined;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('footer');
        DOMM.setTextContent(this.DOMElement, this.title);
    }
}