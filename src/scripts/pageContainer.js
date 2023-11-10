import PlayerSetup from './pages/playerSetupPage';
import GameboardSetup from './pages/gameboardSetupPage';
import Game from './pages/gamePage';
import Player from './player';

import '../styles/pageContainer.css';

import DOMManager from "./DOMManager";
const DOMM = DOMManager.getManager();

export default class PageContainer{
    constructor(){
        this.pages = [];
        this.currentPage = undefined;
        this.DOMElement = undefined;
    }
     initPages(){
        this.pages.push(new PlayerSetup(this.playerSetupContinueFunction.bind(this)));
        this.pages.push(new GameboardSetup());
        this.pages.push(new Game());
    }
    playerSetupContinueFunction(player1Name, player2Name, player2Type){
        console.log(`Received Player names: ${player1Name} and ${player2Name} and player2 type: ${player2Type}`)
        this.pages[2].setPlayers([new Player(player1Name), new Player(player2Name)]) // change to player type;
        this.setPage(1);
    }
    setPage(pageNumber){
        this.currentPage = this.pages[pageNumber];
        this.setDOMElement();
        this.updatePage();
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'page-container');
    }
    updatePage(){
        if(this.currentPage !== undefined) {
            console.log("updating page");
            DOMM.removeAllChildren(this.DOMElement);
            this.currentPage.setDOMElement();
            DOMM.addChild(this.DOMElement, this.currentPage.DOMElement)
        }
    }
}