import orientation from "../enums/orientation";
import Ship from "./ship";

export default class ShipSet{
    constructor(){
        this.ships = [];
        this.ships.push(new Ship(4));
        this.ships.push(new Ship(3));
        this.ships.push(new Ship(3));
        this.ships.push(new Ship(2));
        this.ships.push(new Ship(2));
        this.ships.push(new Ship(2));
        this.ships.push(new Ship(1));
        this.ships.push(new Ship(1));
        this.ships.push(new Ship(1));
        this.ships.push(new Ship(1));
    }
    setDOMElement(setMoveFunction){
        this.ships.forEach(ship =>{
            ship.setDOMElement(setMoveFunction);
            ship.rotate(orientation.East);
        })
    }
}
