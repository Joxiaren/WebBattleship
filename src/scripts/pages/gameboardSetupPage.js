import '../../styles/gameboardSetupPage.css';

import Gameboard from "../gameboard";
import ShipSet from '../shipSet';

import DOMManager from "../DOMManager";
import playerType from '../../enums/playerType';
const DOMM = DOMManager.getManager();

export default class GameboardSetupPage{
    constructor(continueFunction){
        this.gameboardSetup = undefined;
        this.cf = continueFunction;

        this.i = 0;
        this.gameboards = [new Gameboard(), new Gameboard()];
        this.shipSets = [new ShipSet(), new ShipSet()];
        this.players = undefined;
        
        this.DOMElement = undefined;
    }
    setDOMElement(){
        this.DOMElement = DOMM.createDOM('div', 'gameboard-setup-page');

        this.gameboardSetup = new GameboardSetup(this.continueFunction.bind(this));
        this.gameboardSetupping();
        DOMM.addChild(this.DOMElement, this.gameboardSetup.DOMElement);
    }
    setPlayers(players){
        this.players = players;
    }
    gameboardSetupping(){
        this.gameboardSetup.setShipSet(this.shipSets[this.i]);
        this.gameboardSetup.setGameboard(this.gameboards[this.i]);
        this.gameboardSetup.setDOMElement();
        this.i++;
    }
    continueFunction(){
        if(this.i >= 2){
            //delete this.gameboardSetup
            this.cf(this.gameboards);
        }
        this.gameboardSetupping();
    }
}
class GameboardSetup{
    constructor(continueFunction){
        this.continueFunction = continueFunction;

        this.setupableGameboard = undefined;
        this.shipSet = undefined;
        this.playerType = undefined;

        this.movableShip = null;
        this.mousePosX = null;
        this.mousePosY = null;

        this.selectedCell = null;

        this.DOMElement = undefined;
        this.shipContainer = undefined;
        this.continueButton = undefined;
    }

    setDOMElement(){
        if(this.playerType !== playerType.Human){
            //ai placement logic
            this.continueCB();
        }
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'gameboard-setup');
        
        this.setupableGameboard.setDOMElement(this.cellCB.bind(this));
        
        this.shipContainer = DOMM.createDOM('div', 'gameboard-ship-container');
        this.shipSet.setDOMElement(this.setMovableShip.bind(this));
        this.shipSet.ships.forEach(ship =>{
            DOMM.addChild(this.shipContainer, ship.DOMElement);
        })

        this.continueButton = DOMM.createDOM('div', 'gameboard-setup-continue')
        DOMM.setTextContent(this.continueButton, 'Continue');

        DOMM.addChild(this.DOMElement, this.shipContainer);
        DOMM.addChild(this.DOMElement, this.setupableGameboard.DOMElement);
        DOMM.addChild(this.DOMElement, this.continueButton);

        this.setDOMEvents();
    }
    setDOMEvents(){
        DOMM.addEvent(this.continueButton, 'click', this.continueCB.bind(this));
        DOMM.addEvent(this.DOMElement, 'wheel', this.onMouseWheel.bind(this));
    }

    continueCB(){
        if(Object.keys(this.setupableGameboard.ships).length === 10) this.continueFunction();
        else alert('Please place all the ships on the gameboard');
    }
    cellCB(cell){
        this.selectedCell = cell;
    }
    setShipSet(shipSet){
        this.shipSet = shipSet;
    }
    setGameboard(gameboard){
        this.setupableGameboard = gameboard;
    }

    setMovableShip(ship, mousePosX, mousePosY){
        if(ship){
            DOMM.addEvent(this.DOMElement, 'mousemove', this.onMouseMove.bind(this));
            DOMM.addEvent(this.DOMElement, 'mouseup', this.onMouseUp.bind(this));
            this.setupableGameboard.removeShip(ship);   
        } 
        else {
            DOMM.removeEvent(this.DOMElement, 'mousemove', this.onMouseMove.bind(this));
            DOMM.removeEvent(this.DOMElement, 'mouseup', this.onMouseUp.bind(this));
        }
        this.movableShip = ship;
        this.setupableGameboard.setMovableShip(ship);

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
        if(this.selectedCell && this.setupableGameboard.validPlace(this.movableShip, this.selectedCell)){
            this.setupableGameboard.placeShip(this.movableShip, this.selectedCell);
        }
        else{
            DOMM.addChild(this.shipContainer, this.movableShip.DOMElement);
            this.setupableGameboard.removeShip(this.movableShip);
        }
        DOMM.setStyle(this.movableShip.DOMElement, 'position', 'static');
        DOMM.setStyle(this.movableShip.DOMElement, 'pointerEvents', 'auto');
        this.setMovableShip(null, 0, 0);
        this.setupableGameboard.setMovableShip(null);
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