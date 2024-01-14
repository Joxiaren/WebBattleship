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
pageContainer.initPages();

const footer = new Footer('Made By Joxi©');
header.setDOMElement();
pageContainer.setDOMElement();
footer.setDOMElement();

DOMM.addChild(main, header.DOMElement);
DOMM.addChild(main, pageContainer.DOMElement);
DOMM.addChild(main, footer.DOMElement);
DOMM.addToBody(main);

pageContainer.initPages();
pageContainer.pages[1].setPlayers([new Player('Joxi', 'Human'), new Player('Poxi', 'AIHard')])
pageContainer.setPage(1);

