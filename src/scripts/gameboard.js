import '../styles/gameboard.css';
import DOMManager from "./DOMManager";

import Ship from "./ship";
import GameboardCell from './gameboardCell';

import hitReport from '../enums/hitReport';
import orientation from '../enums/orientation';
const DOMM = DOMManager.getManager();

export default class Gameboard{
    constructor(){
        this.ships = {};
        this.destroyed = 0;
        this.hitPositions = [];
        this.DOMElement = undefined;
        this.gameboard = undefined;
        this.shipContainer = undefined;
        this.cells = [];
        this.emptyMarking = undefined;
        this.markings = [];
    }
    setDOMElement(cellCB){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'gameboard-container');
        this.gameboard = DOMM.createDOM('div', 'gameboard');
        this.shipContainer = DOMM.createDOM('div', 'gameboard-ship-container');

        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                let gameboardCell = new GameboardCell([i,j]);
                gameboardCell.setDOMElement(cellCB);
                this.cells.push(gameboardCell);
                DOMM.addChild(this.gameboard, gameboardCell.DOMElement);
            }
        }
        for(const [shipID, ship] of Object.entries(this.ships)){
            ship.setDOMElement();
            DOMM.addChild(this.gameboard, ship.DOMElement);
        }
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
        for(const [shipID, ship] of Object.entries(this.ships)){
            ship.setDOMElement();

            console.log('this is part of gameboard:');
            console.log(ship);
            let row = ship.size;
            let column = 1;
            if(ship._orientation == orientation.North || ship._orientation == orientation.South) [row, column] = [column, row];
            console.log(row);
            console.log(column);
            // DOMM.setStyle(ship.DOMElement, 'gridRow', `span ${row}`);
            // DOMM.setStyle(ship.DOMElement, 'gridColumn', `span ${column}`);
            DOMM.addChild(this.cells[ship.position[0] * 10 + ship.position[1]].DOMElement, ship.DOMElement);
            
            ship.position;
            ship._orientation;
        }
    }
    placeShip(ship, position){
        if(ship.id in this.ships){
            this.removeShip(ship);
        }
        this.ships[ship.id] = ship;
        ship.position = position;
        let row = ship.size;
        let column = 1;
        if(ship._orientation == orientation.North || ship._orientation == orientation.South) [row, column] = [column, row];
        for(let i = ship.position[0] - 1; i <= ship.position[0] + column; i++){
            for(let j = ship.position[1] - 1; j <= ship.position[1] + row; j++){
                let index = i*10+j;
                if(index >= 0 && index <= 99) this.cells[i * 10 + j].disabled += 1;
            }
        }
        this.updateDOMElement();
    }
    removeShip(ship){
        if(!ship) return; 
        if(!(ship.id in this.ships)) return;
        let row = ship.size;
        let column = 1;
        if(ship._orientation == orientation.North || ship._orientation == orientation.South) [row, column] = [column, row];
        for(let i = ship.position[0] - 1; i <= ship.position[0] + column; i++){
            for(let j = ship.position[1] - 1; j <= ship.position[1] + row; j++){
                let index = i*10+j;
                if(index >= 0 && index <= 99) this.cells[i * 10 + j].disabled -= 1;
            }
        }
        delete this.ships[ship.id];
        this.updateDOMElement();
    }
    receiveFire(position){
        if(position in this.hitPositions) return hitReport.Miss;
        
        for(const [shipID, ship] of Object.entries(this.ships)){
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
        }
    }
    isGameOver(){
        return;
    }
}
