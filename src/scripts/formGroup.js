import DOMManager from './DOMManager.js';
const DOMM = DOMManager.getManager();

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
        this.DOMElement = DOMM.createDOM('div', 'form-group');
        
        this.labelElement = DOMM.createDOM('label');
        DOMM.setAttribute(this.labelElement, 'for', this.name);
        DOMM.setTextContent(this.labelElement, this.label);

        this.inputElement = DOMM.createDOM('input');
        DOMM.setAttribute(this.inputElement, 'type', this.type);
        DOMM.setAttribute(this.inputElement, 'name', this.name);
        DOMM.setAttribute(this.inputElement, 'value', this.value);
        DOMM.addEvent(this.inputElement, 'input', function(e){
            this.value = e.target.value;
            console.log(`Value changed to: ${this.value}`);
        }.bind(this));
        
        DOMM.addChild(this.DOMElement, this.labelElement);
        DOMM.addChild(this.DOMElement, this.inputElement);
    }
    setClassNameLabel(className){
        if(!this.labelElement) return;
        DOMM.addClass(this.labelElement, className);
    }
    setClassNameInput(className){
        if(!this.inputElement) return;
        DOMM.addClass(this.inputElement, className);
    }
    setMaxLength(length){
        if(!this.inputElement) return;
        DOMM.setAttribute(this.inputElement, 'maxlength', `${length}`);
    }
}   

export class RadioGroup{
    constructor(name, labels, values){
        this.DOMElement = undefined;
        this.labels = labels;
        this.name = name;
        this.values = values;
        this.selectedValue = undefined;
        this.radioGroupElements = [];
        this.labelElements = [];
        this.radioElements = [];
    }
    setDOMElement(){
        if(this.labels.length != this.values.length) return;

        this.DOMElement = DOMM.createDOM('div', 'radio-group');
        
        for(let j = 0; j < this.labels.length; j++){

            this.radioGroupElements.push(DOMM.createDOM('div', 'radio-group-elements'));
            this.labelElements.push(DOMM.createDOM('label'));
            DOMM.setAttribute(this.labelElements[j], 'for', `${this.name}${j}`);
            DOMM.setTextContent(this.labelElements[j], this.labels[j]);

            this.radioElements.push(DOMM.createDOM('input', '', `${this.name}${j}`));
            DOMM.setAttribute(this.radioElements[j], 'type', 'radio');
            DOMM.setAttribute(this.radioElements[j], 'name', this.name);
            DOMM.setAttribute(this.radioElements[j], 'value', this.values[j]);
            DOMM.addEvent(this.radioElements[j], 'change', function(e){
                if(this.selectedValue !== e.target.value){
                    this.selectedValue = e.target.value;
                }
                console.log(this.selectedValue);
            }.bind(this))
            DOMM.addChild(this.radioGroupElements[j], this.radioElements[j]);
            DOMM.addChild(this.radioGroupElements[j], this.labelElements[j]);
            DOMM.addChild(this.DOMElement, this.radioGroupElements[j]);
        }
    }
    disableElement(i){
        DOMM.DOMList[this.radioElements[i]].disabled = true;
    }
}