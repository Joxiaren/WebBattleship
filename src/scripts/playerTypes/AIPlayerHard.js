import DOMManager from '../DOMManager.js';
import shuffleArray from '../shuffle.js';
const DOMM = DOMManager.getManager();

export default class AIPlayerHard{
    static AIH = undefined;

    static create(){
        AIPlayerHard.AIH = new AIPlayerHard();
    }
    static getSingleton(){
        if(AIPlayerHard.AIH === undefined){
            this.create();
        }
        return AIPlayerHard.AIH;
    }
    fire(gameboard){
        let cellArray = Array.from(gameboard.availableCells);
        shuffleArray(cellArray, 3);
        return gameboard.receiveFire([parseInt(cellArray[0]/10), parseInt(cellArray[0]%10)]);
    }
}