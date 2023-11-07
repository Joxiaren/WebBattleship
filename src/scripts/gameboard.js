import '../styles/gameboard.css';
import DOMManager from "./DOMManager";

import Ship from "./ship";

import hitReport from '../enums/hitReport';
const DOMM = DOMManager.getManager();

export default class Gameboard{
    constructor(){
        this.ships = [];
        this.destroyed = 0;
        this.hitPositions = [];
        this.DOMElement = undefined;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
    }
    placeShip(size, position){
        let ship = new Ship(size, position)
        this.ships.push(ship);
    }
    receiveFire(position){
        if(position in this.hitPositions) return hitReport.Miss;

        this.ships.forEach(ship => {
            //check if already hit
            if(ship.position.some(shipPosition => shipPosition === position)){
                ship.hit();
                if(ship.isSunk()){
                    //sunk logic otherwise carry on
                    this.destroyed++;
                    if(this.destroyed >= this.ships.length) gameOver();
                    return hitReport.Sunk;
                }
                return hitReport.Hit;
            }
        })
    }
    isGameOver(){
        return;
    }
}
