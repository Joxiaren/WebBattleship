import '../../styles/gameboardSetupPage.css';

import Gameboard from "../gameboard";
import ShipSet from '../shipSet';

import DOMManager from "../DOMManager";
const DOMM = DOMManager.getManager();

export default class GameboardSetup{
    constructor(continueFunction){
        this.continueFunction = continueFunction;

        this.gameboard1 = new Gameboard();
        this.gameboard2 = new Gameboard();

        this.shipSet1 = new ShipSet();
        this.shipSet2 = new ShipSet();

        this.movableShip = null;
        this.mousePosX = null;
        this.mousePosY = null;

        this.DOMElement = undefined;
        this.shipContainer = undefined;
        this.continueButton = undefined;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'gameboard-setup');
        
        this.gameboard1.setDOMElement();
        this.gameboard2.setDOMElement();
        
        this.shipContainer = DOMM.createDOM('div', 'gameboard-ship-container');
        this.shipSet1.setDOMElement(this.setMovableShip.bind(this));
        this.shipSet1.ships.forEach(ship =>{
            DOMM.addChild(this.shipContainer, ship.DOMElement);
        })

        this.continueButton = DOMM.createDOM('div', 'gameboard-setup-continue')
        DOMM.setTextContent(this.continueButton, 'Continue');

        DOMM.addChild(this.DOMElement, this.shipContainer);
        DOMM.addChild(this.DOMElement, this.gameboard1.DOMElement);
        //DOMM.addChild(this.DOMElement, this.gameboard2.DOMElement);
        DOMM.addChild(this.DOMElement, this.continueButton);

        this.setDOMEvents();
    }
    setDOMEvents(){
        let gm1 = this.gameboard1;
        let gm2 = this.gameboard2;
        DOMM.addEvent(this.continueButton, 'click', () =>{
            this.continueFunction(gm1, gm2);
        });

        DOMM.addEvent(this.DOMElement, 'mousemove', this.onMouseMove.bind(this));
    }
    setMovableShip(ship, mousePosX, mousePosY){
        console.log(`movable ${this.movableShip} = ${ship}`);
        this.movableShip = ship;
        console.log(`this.movableShip is now ${this.movableShip}`);
        this.mousePosX = mousePosX;
        this.mousePosY = mousePosY;
    }
    onMouseMove(e){
        if(!this.movableShip) return;
        console.log('mouse is moving ' + this.movableShip);
        console.log('mouse is moving' + `${this.movableShip.id}`);
        this.movableShip.style.top = `${e.clientY + this.mousePosY}px`;
        this.movableShip.style.left = `${e.clientX + this.mousePosX}px`;
        console.log('mouse movedi inside container');
    }
}