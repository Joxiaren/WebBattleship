import '../styles/gameboard.css';
import DOMManager from "./DOMManager";

import Ship from "./ship";
import GameboardCell from './gameboardCell';

import hitReport from '../enums/hitReport';
import orientation from '../enums/orientation';
import shuffleArray from './shuffle';
const DOMM = DOMManager.getManager();

export default class Gameboard {
    constructor() {
        this.ships = {};
        this.shipCells = {};
        this.destroyed = 0;
        this.cells = [];

        this.availableCells = new Set();
        this.emptyMarking = undefined;
        this.markings = [];
        this.movableShip = null;
        
        this.DOMElement = undefined;
        this.gameboard = undefined;
        this.crosshairElement = undefined;
    }
    setDOMElement(cellCBSetup) {
        if (this.DOMElement !== undefined) this.clearDOMElement();
        this.DOMElement = DOMM.createDOM('div', 'gameboard-container');
        this.gameboard = DOMM.createDOM('div', 'gameboard');
        this.crosshairElement = DOMM.createDOM('div', 'gameboard-crosshair');

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let gameboardCell = new GameboardCell([i, j]);
                this.cells.push(gameboardCell);
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

        this.setDOMEvents(cellCBSetup);
        this.updateDOMElement();
    }
    setDOMEvents(cellCBSetup){
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
                DOMM.addChild(this.cells[index].DOMElement, this.crosshairElement);
                //DOMM.setStyle(this.cells[index].DOMElement, 'backgroundColor', 'red');
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
                DOMM.removeChild(this.cells[index].DOMElement, this.crosshairElement, false);
                //DOMM.setStyle(this.cells[index].DOMElement, 'backgroundColor', '');
            }
            cellCBSetup(null);
        }.bind(this);

        for (let i = 0; i < 100; i++) {
            this.cells[i].setDOMElement(cellCBEnter, cellCBOut);
            this.availableCells.add(i);
            DOMM.addChild(this.gameboard, this.cells[i].DOMElement);
        }
    }
    updateDOMElement() {
        for (const [shipID, ship] of Object.entries(this.ships)) {
            ship.setDOMElement();
            let row = ship.size;
            let column = 1;
            if (ship._orientation == orientation.North || ship._orientation == orientation.South) [row, column] = [column, row];
            DOMM.addChild(this.cells[ship.position[0] * 10 + ship.position[1]].DOMElement, ship.DOMElement);
        }
    }
    clearDOMElement(){
        DOMM.removeAllChildren(this.DOMElement);
        DOMM.removeDOM(this.DOMElement);
    }
    clearDisable(){
        for (let i = 0; i < 100; i++) {
            this.availableCells.add(i);
            this.cells[i].disabled = 0;
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
        for(let i = ship.position[0]; i < ship.position[0] + column; i++){
            for(let j = ship.position[1]; j < ship.position[1] + row; j++){
                let index = i * 10 + j;
                this.shipCells[index] = ship.id;
            }
        }
        this.updateDOMElement();
    }
    randomPlace(ship){
        while(true){
            ship.orientation = Math.floor(Math.random() * 4);
            let cellArray = Array.from(this.availableCells);
            shuffleArray(cellArray, 3);
            for(const validCell of cellArray){
                let i = parseInt(validCell / 10);
                let j = parseInt(validCell % 10);
                if(this.validPlace(ship, [i,j])){
                    this.placeShip(ship, [i,j]);
                    return;
                }
            }
        }
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
        for(let i = ship.position[0]; i < ship.position[0] + column; i++){
            for(let j = ship.position[1]; j < ship.position[1] + row; j++){
                let index = i * 10 + j;
                this.shipCells[index] = null;
            }
        }
        delete this.ships[ship.id];
        this.updateDOMElement();
    }
    hideShip(ship){
        if(ship.isSunk()) return;
        DOMM.setStyle(ship.DOMElement, 'display', 'none');
    }
    uncoverShip(ship){
        DOMM.setStyle(ship.DOMElement, 'display', 'flex');
    }
    hideAllShips(){
        for (const [shipID, ship] of Object.entries(this.ships)) {
            this.hideShip(ship);
        }
    }
    uncoverAllShips(){
        for (const [shipID, ship] of Object.entries(this.ships)) {
            this.uncoverShip(ship);
        }
    }
    setMovableShip(ship) {
        this.movableShip = ship;
    }
    receiveFire(position) {
        if(position[0] < 0 || position[0] > 9 || position[1] < 0 || position[1] > 9) return null;
        
        let index = position[0] * 10 + position[1];
        if(this.cells[index].disabled) return null;

        this.cells[index].disabled += 1;
        this.availableCells.delete(index);
        
        let report = hitReport.Miss;
        let xClass = 'miss';
        if(this.shipCells[index]) {
            console.log('HIT');
            report = hitReport.Hit;
            let ship = this.ships[this.shipCells[index]];
            ship.hit();
            if(ship.isSunk()) {
                console.log('SUNK');
                report = hitReport.Sunk;
                this.destroyed += 1;

                let row = ship.size;
                let column = 1;
                if (ship._orientation == orientation.North || ship._orientation == orientation.South) [row, column] = [column, row];
                for (let i = ship.position[0] - 1; i <= ship.position[0] + column; i++) {
                    for (let j = ship.position[1] - 1; j <= ship.position[1] + row; j++) {
                        if (i >= 0 && i < 10 && j >= 0 && j < 10) {
                            this.receiveFire([i, j]);
                        }
                    }
                }

                this.uncoverShip(ship);
                this.isGameOver();
            }
            xClass = 'hit';
            this.receiveFire([position[0] + 1, position[1] + 1]);
            this.receiveFire([position[0] + 1, position[1] - 1]);
            this.receiveFire([position[0] - 1, position[1] + 1]);
            this.receiveFire([position[0] - 1, position[1] - 1]);
        }
        let x = DOMM.createDOM('div', `gameboard-x ${xClass}`);
        DOMM.addChild(this.cells[index].DOMElement, x);

        console.log(report);
        return report;
    }
    isGameOver() {
        if(this.destroyed >= 10){
            console.log('GAME OVER');
        }
    }
}
