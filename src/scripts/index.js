import '../styles/reset.css';
import '../styles/index.css';

import Header from './header';
import Footer from './footer';


import DOMManager from './DOMManager';
const DOMM = DOMManager.getManager();

const main = DOMM.createDOM('main');
const header = new Header('Welcome To Joxi Battleship');
const game = DOMM.createDOM('div', 'game');
const footer = new Footer('Made By Joxi©');
header.setDOMElement();
footer.setDOMElement();

DOMM.addChild(main, header.DOMElement);
DOMM.addChild(main, game);
DOMM.addChild(main, footer.DOMElement);
DOMM.addToBody(main);