import '../../styles/gameboardSetupPage.css';

import Gameboard from "../gameboard";
import ShipSet from '../shipSet';

import DOMManager from "../DOMManager";

import shuffleArray from '../shuffle';

import playerType from '../../enums/playerType';
import orientation from '../../enums/orientation';

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

        this.playerNameLabel = DOMM.createDOM('div', 'gameboard-name');

        this.gameboardSetup = new GameboardSetup(this.continueFunction.bind(this));
        this.gameboardSetupping();
    }
    setPlayers(players){
        this.players = players;
    }
    gameboardSetupping(){
        this.gameboardSetup.setShipSet(this.shipSets[this.i]);
        this.gameboardSetup.setGameboard(this.gameboards[this.i]);
        this.gameboardSetup.setPlayer(this.players[this.i]);
        DOMM.setTextContent(this.playerNameLabel, `${this.players[this.i].name}, please setup your board`);
        DOMM.addChild(this.DOMElement, this.playerNameLabel);
        let AI = this.gameboardSetup.setDOMElement();
        this.i++;
        if(AI){
            this.continueFunction();
        }
        else{
            DOMM.addChild(this.DOMElement, this.gameboardSetup.DOMElement);
        }
    }
    continueFunction(){
        DOMM.removeAllChildren(this.DOMElement);
        this.gameboardSetup.DOMElement = undefined;
        if(this.i === 2){
            delete this.gameboardSetup
            this.cf(this.gameboards);
        }
        else{
            this.gameboardSetupping();
        }
    }
}
class GameboardSetup{
    constructor(continueFunction){
        this.continueFunction = continueFunction;

        this.setupableGameboard = undefined;
        this.shipSet = undefined;
        this.playerName = undefined;
        this.playerType = undefined;

        this.movableShip = null;
        this.mousePosX = null;
        this.mousePosY = null;

        this.selectedCell = null;

        this.DOMElement = undefined;
        this.visualContainer = undefined;
        this.shipContainer = undefined;
        this.playerNameLabel = undefined;
        this.continueButton = undefined;
    }

    setDOMElement(){
        let AI = false;
        this.setupableGameboard.setDOMElement(this.cellCB.bind(this));
        if(this.playerType !== 'Human'){
            shuffleArray(this.shipSet.ships, 3);
            this.shipSet.ships.forEach((ship) => this.setupableGameboard.randomPlace(ship));
            AI = true;
        }
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'gameboard-setup');
        this.visualContainer = DOMM.createDOM('div', 'gameboard-visual');

        this.shipContainer = DOMM.createDOM('div', 'gameboard-ship-container');
        this.shipSet.setDOMElement(this.setMovableShip.bind(this));
        this.shipSet.ships.forEach(ship =>{
            DOMM.addChild(this.shipContainer, ship.DOMElement);
        })

        this.continueButton = DOMM.createDOM('div', 'gameboard-setup-continue')
        DOMM.setTextContent(this.continueButton, 'Continue');

        DOMM.addChild(this.visualContainer, this.shipContainer);
        DOMM.addChild(this.visualContainer, this.setupableGameboard.DOMElement);
        DOMM.addChild(this.DOMElement, this.visualContainer);
        DOMM.addChild(this.DOMElement, this.continueButton);

        this.setDOMEvents();
        return AI;
    }
    removeDOMElement(){
        DOMM.removeAllChildren(this.DOMElement);
    }
    setDOMEvents(){
        DOMM.addEvent(this.continueButton, 'click', this.continueCB.bind(this));
        DOMM.addEvent(this.DOMElement, 'wheel', this.onMouseWheel.bind(this));
    }

    continueCB(){
        if(Object.keys(this.setupableGameboard.ships).length === 10) {
            this.removeDOMElement();
            this.continueFunction();
        }
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
    setPlayer(player){
        this.playerName = player.name;
        this.playerType = player.playerType;
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
            DOMM.setStyle(this.movableShip.DOMElement, 'position', 'absolute');
        }
        else{
            DOMM.addChild(this.shipContainer, this.movableShip.DOMElement);
            this.setupableGameboard.removeShip(this.movableShip);
            DOMM.setStyle(this.movableShip.DOMElement, 'position', 'relative');
        }
        DOMM.setStyle(this.movableShip.DOMElement, 'top', ``);
        DOMM.setStyle(this.movableShip.DOMElement, 'left', ``);
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