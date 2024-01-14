import DOMManager from '../DOMManager.js';
const DOMM = DOMManager.getManager();

export default class HumanPlayer{
    static HUM = undefined;

    static create(){
        HumanPlayer.HUM = new HumanPlayer();
    }
    static getSingleton(){
        if(HumanPlayer.HUM === undefined){
            this.create();
        }
        return HumanPlayer.HUM;
    }
}