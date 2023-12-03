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
        this.gameboard = undefined;
        this.shipContainer = undefined;
        this.cells = [];
        this.emptyMarking = undefined;
        this.markings = [];
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'gameboard-container');
        this.gameboard = DOMM.createDOM('div', 'gameboard');
        this.shipContainer = DOMM.createDOM('div', 'gameboard-ship-container');

        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                this.cells.push(DOMM.createDOM('div', 'gameboard-cell'));
                DOMM.addChild(this.gameboard, this.cells[this.cells.length - 1]);
                DOMM.addEvent(this.cells[this.cells.length - 1], 'mouseenter',(e)=>{
                    console.log('mouse overed');
                    e.target.style.backgroundColor = 'orange';
                });
                DOMM.addEvent(this.cells[this.cells.length - 1], 'mouseout',(e)=>{
                    console.log('mouse outed');
                    e.target.style.backgroundColor = '';
                });
            }
        }
        this.ships.forEach(ship => {
            ship.setDOMElement();
            DOMM.addChild(this.gameboard, ship.DOMElement);
        });
        DOMM.addChild(this.DOMElement, this.gameboard);

        this.emptyMarking = DOMM.createDOM('div', 'gameboard-marking');
        DOMM.addChild(this.DOMElement, this.emptyMarking);

        let markingCreater = function(mark){
            let tempDOM = DOMM.createDOM('div', 'gameboard-marking');
            DOMM.setTextContent(tempDOM, mark);
            this.markings.push[tempDOM];
            DOMM.addChild(this.DOMElement, tempDOM);
        }.bind(this);

        for(let i = 0; i < 10; i++){
            markingCreater(`${i+1}`);
        }
        for(let i = 0; i < 10; i++){
            markingCreater(String.fromCharCode('A'.charCodeAt() + i));
        }

    }
    updateDOMElement(){

    }
    placeShip(ship, position){
        ship.position = position;
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
