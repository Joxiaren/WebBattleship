import '../styles/ship.css';
import orientation from '../enums/orientation';
import IDManager from "./IDManager";
import DOMManager from "./DOMManager";
const DOMM = DOMManager.getManager();

export default class Ship{
    constructor(size){
        this.id = IDManager.getID(this);
        this.size = size;
        this.position = undefined;
        this._orientation = orientation.North;
        this.health = size;
        this.DOMElement = undefined;
        this.shipParts = undefined;
    }
    get orientation() { return this._orientation}
    set orientation(orient){
        if(orient == -1) orient = 3;
        orient %= 4;
        console.log(orient);
        this._orientation = orient;
        if(!this.DOMElement) return;
        if(this._orientation == orientation.East || this._orientation == orientation.West){
            DOMM.setStyle(this.DOMElement, 'height', `35px`);
            DOMM.setStyle(this.DOMElement, 'width', `${this.size * 35}px`);
        }
        else{
            DOMM.setStyle(this.DOMElement, 'width', `35px`);
            DOMM.setStyle(this.DOMElement, 'height', `${this.size * 35}px`);
        }
    }
    setDOMElement(setMoveFunction){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM("div", "ship");
        DOMM.setStyle(this.DOMElement, 'height', `${this.size * 35}px`);
        DOMM.setStyle(this.DOMElement, 'width', `35px`);
        for(let i = 0; i < this.size; i++){
            let tempDOM = DOMM.createDOM('div', 'ship-part');
            DOMM.addChild(this.DOMElement, tempDOM);
        }
        this.setDOMEvents(setMoveFunction);
    }
    setDOMEvents(setMoveFunction){
        let thisShip = this;
        DOMM.addEvent(this.DOMElement, 'mousedown', function(e){
            console.log('mouse is down ' + `${this.id}`);
            let elementPosX = this.getBoundingClientRect().left; 
            let elementPosY = this.getBoundingClientRect().top;
            let mousePosX =  elementPosX - e.clientX;
            let mousePosY =  elementPosY - e.clientY;

            this.style.top = `${e.clientY + mousePosY}px`;
            this.style.left = `${e.clientX + mousePosX}px`;
            this.style.position = 'absolute';
            this.style.pointerEvents = 'none';

            setMoveFunction(thisShip, mousePosX, mousePosY);
        });
    }
    hit(){
        this.health -= 1;
    }
    isSunk(){
        return this.health <= 0;
    }
    report(){
        console.log('ytes i am ship');
    }
}