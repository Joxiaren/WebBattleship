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
        this.gameboards[0].setDOMElement();
        this.gameboards[1].setDOMElement();
        this.gameboards[0].updateDOMElement();
        this.gameboards[1].updateDOMElement();
        DOMM.addChild(this.DOMElement, this.gameboards[0].DOMElement);
        DOMM.addChild(this.DOMElement, this.gameboards[1].DOMElement);
    }

}