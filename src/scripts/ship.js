import '../styles/ship.css';
import IDManager from "./IDManager";
import DOMManager from "./DOMManager";
const DOMM = DOMManager.getManager();

export default class Ship{
    constructor(size, position, orientation){
        this.id = IDManager.getID();
        this.size = size;
        this.position = position;
        this.orientation = orientation;
        this.health = size;
        this.DOMElement = undefined;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM("div", "ship");
    }
    hit(){
        this.health -= 1;
    }
    isSunk(){
        return this.health <= 0;
    }

}