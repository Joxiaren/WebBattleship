import DOMManager from '../DOMManager.js';
import shuffleArray from '../shuffle.js';
const DOMM = DOMManager.getManager();

export default class AIPlayerEasy{
    static AIE = undefined;

    static create(){
        AIPlayerEasy.AIE = new AIPlayerEasy();
    }
    static getSingleton(){
        if(AIPlayerEasy.AIE === undefined){
            this.create();
        }
        return AIPlayerEasy.AIE;
    }
    fire(gameboard){
        let cellArray = Array.from(gameboard.availableCells);
        shuffleArray(cellArray, 3);
        return gameboard.receiveFire([parseInt(cellArray[0]/10), parseInt(cellArray[0]%10)]);
    }
}