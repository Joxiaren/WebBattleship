import '../styles/reset.css';
import '../styles/index.css';

import Header from './header';
import Footer from './footer';

import Player from './player';
import PageContainer from './pageContainer';

import DOMManager from './DOMManager';
const DOMM = DOMManager.getManager();

const main = DOMM.createDOM('main');
const header = new Header('Welcome To Joxi Battleship');

const pageContainer = new PageContainer();

const footer = new Footer('Made By Joxi©');
header.setDOMElement();
pageContainer.setDOMElement();
footer.setDOMElement();

DOMM.addChild(main, header.DOMElement);
DOMM.addChild(main, pageContainer.DOMElement);
DOMM.addChild(main, footer.DOMElement);
DOMM.addToBody(main);

pageContainer.initPages();
pageContainer.setPage(0);

// let hardcodedPlayer1 = new Player('Joxi', 'AIHard');
// let hardcodedPlayer2 = new Player('Poxi', 'AIEasy');
// pageContainer.setPlayers(hardcodedPlayer1, hardcodedPlayer2);
// pageContainer.setPage(1);