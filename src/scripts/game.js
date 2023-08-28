import DOMManager from "./DOMManager";
const DOMM = DOMManager.getManager();

export default class Game{
    constructor(players, gameboards){
        this.players = players;
        this.gameboards = gameboards;
        this.DOMElement = undefined;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'game');
    }

}