import PlayerSetup from './pages/playerSetupPage';
import GameboardSetupPage from './pages/gameboardSetupPage';
import GamePage from './pages/gamePage';
import Player from './player';
import ShipSet from './shipSet';

import '../styles/pageContainer.css';

import '../enums/playerType';

import DOMManager from "./DOMManager";
import playerType from '../enums/playerType';
const DOMM = DOMManager.getManager();

export default class PageContainer{
    constructor(){
        this.pages = [];
        this.currentPage = undefined;
        
        this.player1 = undefined;
        this.player2 = undefined;

        this.gameboard1 = undefined;
        this.gameboard2 = undefined;

        this.DOMElement = undefined;
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'page-container');
    }
     initPages(){
        this.pages = [];
        this.pages.push(new PlayerSetup(this.playerSetupContinueFunction.bind(this)));
        this.pages.push(new GameboardSetupPage(this.gameboardSetupContinueFunction.bind(this)));
        this.pages.push(new GamePage(this.rematch.bind(this), this.restartGame.bind(this)));
    }
    playerSetupContinueFunction(player1Name, player2Name, player2Type){
        this.player1 = new Player(player1Name, 'Human');
        this.player2 = new Player(player2Name, player2Type);
        this.setPlayers(this.player1, this.player2);
        this.setPage(1);
    }
    gameboardSetupContinueFunction(gameboards){
        this.pages[2].setGameboards(gameboards);
        this.setPage(2);
    }
    rematch(){
        this.initPages();
        this.setPlayers(this.player2, this.player1);
        this.setPage(1);
    }
    restartGame(){
        this.initPages();
        this.setPage(0);
    }
    setPlayers(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.pages[1].setPlayers([player1, player2]);
        this.pages[2].setPlayers([player1, player2]);
    }
    setPage(pageNumber){
        this.currentPage = this.pages[pageNumber];
        this.setDOMElement();
        this.updatePage();
    }
    updatePage(){
        if(this.currentPage !== undefined) {
            DOMM.removeAllChildren(this.DOMElement);
            this.currentPage.setDOMElement();
            DOMM.addChild(this.DOMElement, this.currentPage.DOMElement)
        }
    }
}
