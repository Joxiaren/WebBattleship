import DOMManager from "./DOMManager";
const DOMM = DOMManager.getManager();

export default class GameboardCell{
    constructor(position){
        this.position = position;
        this.disabled = 0;
        this.DOMElement = undefined;
    }
    setDOMElement(cellCB){
        this.DOMElement = DOMM.createDOM('div', 'gameboard-cell');
        DOMM.addEvent(this.DOMElement, 'mouseenter', this.generateMouseEnter(cellCB).bind(this));
        DOMM.addEvent(this.DOMElement, 'mouseout', this.generateMouseOut(cellCB).bind(this));
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
            e.preventDefault();
            cellCB(null);
        }.bind(this);
    }
}