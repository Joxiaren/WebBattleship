import DOMManager from "./DOMManager";
const DOMM = DOMManager.getManager();

export default class GameboardCell{
    constructor(position){
        this.position = position;
        this.disabled = 0;
        this.DOMElement = undefined;
    }
    setDOMElement(cellCBEnter, cellCBOut){
        this.DOMElement = DOMM.createDOM('div', 'gameboard-cell');
        DOMM.addEvent(this.DOMElement, 'mouseenter', this.generateMouseEnter(cellCBEnter).bind(this));
        DOMM.addEvent(this.DOMElement, 'mouseout', this.generateMouseOut(cellCBOut).bind(this));
    }
    generateMouseEnter(cellCB){
        return function(e){
            if(this.disabled) return;
            if(e.target !== e.currentTarget) return;
            e.preventDefault();
            cellCB(this.position);  
        }.bind(this);
    }
    generateMouseOut(cellCB){
        return function(e){
            if(this.disabled) return;
            if(e.target !== e.currentTarget) return;
            e.target.style.backgroundColor = '';
            e.preventDefault();
            cellCB(this.position);
        }.bind(this);
    }
}