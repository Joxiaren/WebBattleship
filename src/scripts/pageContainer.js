import PlayerSetup from './pages/playerSetupPage';
import GameboardSetup from './pages/gameboardSetupPage';
import Game from './pages/gamePage';

import '../styles/pageContainer.css';

import DOMManager from "./DOMManager";
const DOMM = DOMManager.getManager();

export default class PageContainer{
    constructor(){
        this.pages = [new PlayerSetup(), new GameboardSetup(), new Game()];
        this.currentPage = undefined;
        this.DOMElement = undefined;
    }
    initPages(){
        this.pages.forEach(page => {
            page.setPageFunction(this.setPage.bind(this));    
        });
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