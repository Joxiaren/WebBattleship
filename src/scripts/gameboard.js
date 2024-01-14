import '../styles/gameboard.css';
import DOMManager from "./DOMManager";

import Ship from "./ship";
import GameboardCell from './gameboardCell';

import hitReport from '../enums/hitReport';
import orientation from '../enums/orientation';
const DOMM = DOMManager.getManager();

export default class Gameboard {
    constructor() {
        this.ships = {};
        this.destroyed = 0;
        this.hitPositions = [];
        this.DOMElement = undefined;
        this.gameboard = undefined;
        this.cells = [];
        this.availableCells = new Set();
        this.emptyMarking = undefined;
        this.markings = [];
        this.movableShip = null;
    }
    setDOMElement(cellCBSetup) {
        if (this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'gameboard-container');
        this.gameboard = DOMM.createDOM('div', 'gameboard');

        let cellCBEnter = function(cell){
            let index = cell[0] * 10 + cell[1];
            if(this.movableShip){
                let step = this.movableShip._orientation === orientation.North || this.movableShip === orientation.South ? 10 : 1;
                for(let i = index; i < index + step * this.movableShip.size; i+=step){
                    if(i > 99 || i < 0) continue;
                    DOMM.setStyle(this.cells[index].DOMElement, 'backgroundColor', 'green');
                }
            }
            else{
                DOMM.setStyle(this.cells[index].DOMElement, 'backgroundColor', 'red');
            }
            cellCBSetup(cell);
        }.bind(this);
        let cellCBOut = function(cell){
            let index = cell[0] * 10 + cell[1];
            if(this.movableShip){
                let step = this.movableShip._orientation === orientation.North || this.movableShip === orientation.South ? 10 : 1;
                for(let i = index; i < index + step * this.movableShip.size; i+=step){
                    if(i > 99 || i < 0) continue;
                    DOMM.setStyle(this.cells[index].DOMElement, 'backgroundColor', '');
                }
            }
            else{
                DOMM.setStyle(this.cells[index].DOMElement, 'backgroundColor', '');
            }
            cellCBSetup(null);
        }.bind(this);
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let gameboardCell = new GameboardCell([i, j]);
                gameboardCell.setDOMElement(cellCBEnter, cellCBOut);
                this.cells.push(gameboardCell);
                this.availableCells.add(i * 10 + j);
                DOMM.addChild(this.gameboard, gameboardCell.DOMElement);
            }
        }
        DOMM.addChild(this.DOMElement, this.gameboard);

        this.emptyMarking = DOMM.createDOM('div', 'gameboard-marking');
        DOMM.addChild(this.DOMElement, this.emptyMarking);

        let markingCreater = function (mark) {
            let tempDOM = DOMM.createDOM('div', 'gameboard-marking');
            DOMM.setTextContent(tempDOM, mark);
            this.markings.push[tempDOM];
            DOMM.addChild(this.DOMElement, tempDOM);
        }.bind(this);

        for (let i = 0; i < 10; i++) {
            markingCreater(`${i + 1}`);
        }
        for (let i = 0; i < 10; i++) {
            markingCreater(String.fromCharCode('A'.charCodeAt() + i));
        }
        this.updateDOMElement();
    }
    updateDOMElement() {
        console.log('updating gameboard dom element');
        for (const [shipID, ship] of Object.entries(this.ships)) {
            ship.setDOMElement();
            let row = ship.size;
            let column = 1;
            if (ship._orientation == orientation.North || ship._orientation == orientation.South) [row, column] = [column, row];
            DOMM.addChild(this.cells[ship.position[0] * 10 + ship.position[1]].DOMElement, ship.DOMElement);
        }
    }
    validPlace(ship, position){
        let row = ship.size;
        let column = 1;
        if (ship._orientation == orientation.North || ship._orientation == orientation.South) [row, column] = [column, row];
        for (let i = position[0]; i < position[0] + column; i++) {
            for (let j = position[1]; j < position[1] + row; j++) {
                let index = i * 10 + j;
                if (i >= 0 && i < 10 && j >= 0 && j < 10) {
                    if(this.cells[index].disabled) return false;
                }
                else return false;
            }
        }
        return true;
    }
    placeShip(ship, position) {
        if (ship.id in this.ships) {
            this.removeShip(ship);
        }
        this.ships[ship.id] = ship;
        ship.position = position;
        let row = ship.size;
        let column = 1;
        if (ship._orientation == orientation.North || ship._orientation == orientation.South) [row, column] = [column, row];
        for (let i = ship.position[0] - 1; i <= ship.position[0] + column; i++) {
            for (let j = ship.position[1] - 1; j <= ship.position[1] + row; j++) {
                let index = i * 10 + j;
                if (i >= 0 && i < 10 && j >= 0 && j < 10) {
                    this.cells[index].disabled += 1;
                    this.availableCells.delete(index);
                }
            }
        }
        this.updateDOMElement();
    }
    randomPlace(ship){
        ship.orientation = Math.floor(Math.random() * 4);
        for(const validCell of this.availableCells){
            let i = parseInt(validCell / 10);
            let j = parseInt(validCell % 10);
            if(this.validPlace(ship, [i,j])){
                console.log(`placed ${ship} oriented ${ship.orientation} on ${i}, ${j}`);
                this.placeShip(ship, [i,j]);
                return;
            }
        }
        console.log(ship);
        console.log(this.gameboard);
        alert('Could not place the ship on the board');
    }
    removeShip(ship) {
        if (!ship) return;
        if (!(ship.id in this.ships)) return;
        let row = ship.size;
        let column = 1;
        if (ship._orientation == orientation.North || ship._orientation == orientation.South) [row, column] = [column, row];
        for (let i = ship.position[0] - 1; i <= ship.position[0] + column; i++) {
            for (let j = ship.position[1] - 1; j <= ship.position[1] + row; j++) {
                let index = i * 10 + j;
                if (i >= 0 && i < 10 && j >= 0 && j < 10) {
                    this.cells[index].disabled -= 1;
                    this.availableCells.add(index);
                }
            }
        }
        delete this.ships[ship.id];
        this.updateDOMElement();
    }
    setMovableShip(ship) {
        this.movableShip = ship;
    }
    receiveFire(position) {
        if (position in this.hitPositions) return hitReport.Miss;

        for (const [shipID, ship] of Object.entries(this.ships)) {
            //check if already hit
            if (ship.position.some(shipPosition => shipPosition === position)) {
                ship.hit();
                if (ship.isSunk()) {
                    //sunk logic otherwise carry on
                    this.destroyed++;
                    if (this.destroyed >= this.ships.length) gameOver();
                    return hitReport.Sunk;
                }
                return hitReport.Hit;
            }
        }
    }
    isGameOver() {
        return;
    }
}
