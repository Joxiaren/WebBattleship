import '../styles/ship.css';
import IDManager from "./IDManager";
import DOMManager from "./DOMManager";
const DOMM = DOMManager.getManager();

export default class Ship{
    constructor(size, position){
        this.id = IDManager.getID();
        this.size = size;
        this.position = position;
        this.health = size;
        this.DOMElement = undefined;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;

    }
    hit(){
        this.health -= 1;
    }
    isSunk(){
        return this.health <= 0;
    }

}