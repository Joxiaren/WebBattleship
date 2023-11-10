import DOMManager from "../DOMManager";
const DOMM = DOMManager.getManager();

export default class Game{
    constructor(){
        this.players = undefined;
        this.gameboards = undefined;

        this.DOMElement = undefined;
    }
    setPlayers(players){
        this.players = players;
    }
    setGameboards(gameboards){
        this.gameboards = gameboards;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'game');
        DOMM.setTextContent(this.DOMElement, "Game Setup");
    }

}