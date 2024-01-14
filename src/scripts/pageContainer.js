import PlayerSetup from './pages/playerSetupPage';
import GameboardSetupPage from './pages/gameboardSetupPage';
import Game from './pages/gamePage';
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
        
        this.gameboard1 = undefined;
        this.gameboard2 = undefined;

        this.DOMElement = undefined;
    }
     initPages(){
        this.pages.push(new PlayerSetup(this.playerSetupContinueFunction.bind(this)));
        this.pages.push(new GameboardSetupPage(this.gameboardSetupContinueFunction.bind(this)));
        this.pages.push(new Game());
    }
    playerSetupContinueFunction(player1Name, player2Name, player2Type){
        console.log(`Received Player names: ${player1Name} and ${player2Name} and player2 type: ${player2Type}`);
        
        this.pages[1].setPlayers([new Player(player1Name, 'Human'), new Player(player2Name, player2Type)]);
        this.pages[2].setPlayers([new Player(player1Name, 'Human'), new Player(player2Name, player2Type)]); // change to player type;
        this.setPage(1);
    }
    gameboardSetupContinueFunction(gameboards){
        console.log(`Received Gameboards: ${gameboards[0]} and ${gameboards[1]}`);
        this.pages[2].setGameboards(gameboards);
        this.setPage(2);
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
