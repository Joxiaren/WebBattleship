import '../styles/reset.css';
import '../styles/index.css';

import Header from './header';
import Footer from './footer';

// import Player from './player';
// import Gameboard from './gameboard';
// import Game from './game';
import PageContainer from './pageContainer';

import DOMManager from './DOMManager';
const DOMM = DOMManager.getManager();

const main = DOMM.createDOM('main');
const header = new Header('Welcome To Joxi Battleship');

const pageContainer = new PageContainer();
pageContainer.initPages();
// const player1 = new Player("Mirko");
// const player2 = new Player("Marko");
// const gameboard1 = new Gameboard();
// const gameboard2 = new Gameboard();

// const game = new Game([player1, player2], [gameboard1, gameboard2]);

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

