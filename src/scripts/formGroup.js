import DOMManager from './DOMManager.js';

export default class FormGroup{
    constructor(label, type, name, value){
        this.DOMElement = undefined;
        this.labelElement = undefined;
        this.inputElement = undefined;
        this.label = label;
        this.type = type;
        this.name = name;
        this.value = value ? value : "";
    }
    setDOMElement(){
        this.DOMElement = DOMManager.createDOM('div', 'form-group');
        
        this.labelElement = DOMManager.createDOM('label');
        DOMManager.setAttribute(this.labelElement, 'for', this.name);
        DOMManager.setTextContent(this.labelElement, this.label);

        this.inputElement = DOMManager.createDOM('input');
        DOMManager.setAttribute(this.inputElement, 'type', this.type);
        DOMManager.setAttribute(this.inputElement, 'name', this.name);
        DOMManager.setAttribute(this.inputElement, 'value', this.value);
        DOMManager.addEvent(this.inputElement, 'input', function(e){
            this.value = e.target.value;
            console.log(`Value changed to: ${this.value}`);
        }.bind(this));
        
        DOMManager.addChild(this.DOMElement, this.labelElement);
        DOMManager.addChild(this.DOMElement, this.inputElement);
    }
}   