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
        this.orientation = orientation.North;
        this.health = size;
        this.DOMElement = undefined;
        this.shipParts = undefined;
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

        DOMM.addEvent(this.DOMElement, 'mousedown', function(e){
            console.log('mouse is down ' + `${this.id}`);
            let elementPosX = this.getBoundingClientRect().left; 
            let elementPosY = this.getBoundingClientRect().top;
            let mousePosX =  elementPosX - e.clientX;
            let mousePosY =  elementPosY - e.clientY;

            this.style.top = `${e.clientY + mousePosY}px`;
            this.style.left = `${e.clientX + mousePosX}px`;
            this.style.position = 'absolute';

            setMoveFunction(this, mousePosX, mousePosY);
        });
        DOMM.addEvent(this.DOMElement, 'mouseup', function(e){
            console.log('mouse is released ' + `${this.id}`);
            this.style.position = 'static';
            
            setMoveFunction(null, 0, 0);
        });
        //DOMM.addEvent(this.DOMElement, 'mousemove', onMouseMove);
    }
    rotate(orient){
        this.orientation = orient;
        if(this.orientation == orientation.East || this.orientation == orientation.West){
            DOMM.setStyle(this.DOMElement, 'height', `35px`);
            DOMM.setStyle(this.DOMElement, 'width', `${this.size * 35}px`);
        }
    }
    hit(){
        this.health -= 1;
    }
    isSunk(){
        return this.health <= 0;
    }
}