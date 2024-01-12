import DOMManager from '../DOMManager.js';
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
}