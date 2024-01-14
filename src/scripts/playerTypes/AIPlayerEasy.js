import DOMManager from '../DOMManager.js';
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
}