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

        this.player1 = null;
        this.player2 = null;

        this.movableShip = null;
        this.mousePosX = null;
        this.mousePosY = null;

        this.selectedCell = null;

        this.DOMElement = undefined;
        this.shipContainer = undefined;
        this.continueButton = undefined;
    }

    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'gameboard-setup');
        
        this.gameboard1.setDOMElement(this.cellCB.bind(this));
        
        this.shipContainer = DOMM.createDOM('div', 'gameboard-ship-container');
        this.shipSet1.setDOMElement(this.setMovableShip.bind(this));
        this.shipSet1.ships.forEach(ship =>{
            DOMM.addChild(this.shipContainer, ship.DOMElement);
        })

        this.continueButton = DOMM.createDOM('div', 'gameboard-setup-continue')
        DOMM.setTextContent(this.continueButton, 'Continue');

        DOMM.addChild(this.DOMElement, this.shipContainer);
        DOMM.addChild(this.DOMElement, this.gameboard1.DOMElement);
        DOMM.addChild(this.DOMElement, this.continueButton);

        this.setDOMEvents();
    }
    setDOMEvents(){
        DOMM.addEvent(this.continueButton, 'click', () =>{
            if(Object.keys(this.gameboard1.ships).length === 10 && Object.keys(this.gameboard2.ships).length === 10) this.continueFunction(this.gameboard1, this.gameboard2);
            else alert('Please place all the ships on the gameboard');

        });
        DOMM.addEvent(this.DOMElement, 'wheel', this.onMouseWheel.bind(this));
    }


    cellCB(cell){
        this.selectedCell = cell;
    }
    setPlayers(players){
        this.player1 = players[0];
        this.player2 = players[1]; 
    }

    setMovableShip(ship, mousePosX, mousePosY){
        if(ship){
            DOMM.addEvent(this.DOMElement, 'mousemove', this.onMouseMove.bind(this));
            DOMM.addEvent(this.DOMElement, 'mouseup', this.onMouseUp.bind(this));
            this.gameboard1.removeShip(ship);   
        } 
        else {
            DOMM.removeEvent(this.DOMElement, 'mousemove', this.onMouseMove.bind(this));
            DOMM.removeEvent(this.DOMElement, 'mouseup', this.onMouseUp.bind(this));
        }
        this.movableShip = ship;
        this.gameboard1.setMovableShip(ship);

        console.log(ship);
        this.mousePosX = mousePosX;
        this.mousePosY = mousePosY;
    }
    onMouseMove(e){
        if(!this.movableShip) return;
        this.updateShipPosition(e);
    }
    onMouseUp(e){
        if(!this.movableShip) return;
        if(this.selectedCell && this.gameboard1.validPlace(this.movableShip, this.selectedCell)){
            this.gameboard1.placeShip(this.movableShip, this.selectedCell);
        }
        else{
            DOMM.addChild(this.shipContainer, this.movableShip.DOMElement);
            this.gameboard1.removeShip(this.movableShip);
        }
        DOMM.setStyle(this.movableShip.DOMElement, 'position', 'static');
        DOMM.setStyle(this.movableShip.DOMElement, 'pointerEvents', 'auto');
        this.setMovableShip(null, 0, 0);
        this.gameboard1.setMovableShip(null);
    }
    onMouseWheel(e){
        if(!this.movableShip) return;
        if(e.deltaY > 0) {
            this.movableShip.orientation += 1;
        }
        else{
            this.movableShip.orientation -= 1;
        } 
        [this.mousePosX, this.mousePosY] = [this.mousePosY, this.mousePosX];
        this.updateShipPosition(e);

    }
    updateShipPosition(e){
        DOMM.setStyle(this.movableShip.DOMElement, 'top', `${e.clientY + this.mousePosY}px`);
        DOMM.setStyle(this.movableShip.DOMElement, 'left', `${e.clientX + this.mousePosX}px`);
    }
}