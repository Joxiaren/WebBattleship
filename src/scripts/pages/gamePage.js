import DOMManager from "../DOMManager";
import playerType from "../../enums/playerType";
import '../../styles/gamePage.css';
import hitReport from "../../enums/hitReport";
import TransitionScreen from "../transitionScreen";
import VictoryScreen from "../victoryScreen";
const DOMM = DOMManager.getManager();

export default class GamePage{
    constructor(rematchCB, startOverCB){
        this.players = undefined;
        this.gameboards = undefined;

        this.selectedCell = [null,null]
        this.selectedCells = new Array(2);
        this.DOMElement = undefined;
        this.pvp = false;
        this.currentTurn = 0;
        
        this.rematchCB = rematchCB;
        this.startOverCB = startOverCB;
        
        this.onMouseDownBinded = this.onMouseDown.bind(this);
    }
    setPlayers(players){
        this.players = players;
        if(players[0].playerType === 'Human' && players[1].playerType === 'Human'){
            console.log('PVP mode');
            this.pvp = true;
        } 
        else{
            console.log('PVE mode');
            this.pvp = false;
        }   
    }
    setGameboards(gameboards){
        this.gameboards = gameboards;
    }
    setSelectedCell(i){
        return function(cell){
            this.selectedCell = [i, cell];
            this.selectedCells[i] = cell;
        }.bind(this);
    }
    setDOMElement(){
        if(this.DOMElement !== undefined) return;
        this.DOMElement = DOMM.createDOM('div', 'game-page');
        

        this.gameboardContainer1 = DOMM.createDOM('div', 'game-gameboard-container');
        this.gameboardContainer2 = DOMM.createDOM('div', 'game-gameboard-container');

        this.player1Label = DOMM.createDOM('div', 'game-player-label');
        this.player2Label = DOMM.createDOM('div', 'game-player-label');
        DOMM.setTextContent(this.player1Label, `${this.players[0].name} Board`)
        DOMM.setTextContent(this.player2Label, `${this.players[1].name} Board`)

        for(let i = 0; i < this.gameboards.length; i++){
            this.gameboards[i].setDOMElement(this.setSelectedCell(i));
            this.gameboards[i].updateDOMElement();
            this.gameboards[i].clearDisable();
            
        }

        DOMM.addChild(this.gameboardContainer1, this.player1Label);
        DOMM.addChild(this.gameboardContainer1, this.gameboards[0].DOMElement);

        DOMM.addChild(this.gameboardContainer2, this.player2Label);
        DOMM.addChild(this.gameboardContainer2, this.gameboards[1].DOMElement);

        if(this.pvp){
            this.gameboards[1].hideAllShips();
        }
        else{
            for(let i = 0; i < this.players.length; i++){
                if(this.players[i].playerType !== 'Human') this.gameboards[i].hideAllShips();
            }
        }

        DOMM.addChild(this.DOMElement, this.gameboardContainer1);
        DOMM.addChild(this.DOMElement, this.gameboardContainer2);

        this.gameLoop();
    }
    removeDOMElement(){
        DOMM.removeAllChildren(this.DOMElement);
        DOMM.removeDOM(this.DOMElement);
    }
    onMouseDown(){
        if(this.players[this.currentTurn].playerType !== 'Human') return null;
        let report;
        if(this.selectedCell[1]){ 
            if(this.selectedCell[0] === this.currentTurn) return null;
            report = this.gameboards[this.selectedCell[0]].receiveFire(this.selectedCell[1]);
        }
        return report;
    }
    async handleTurn(){
        let report;
        if(this.players[this.currentTurn].playerType === 'Human'){
            report = await this.humanTurn(this).then((value)=>value);
        }
        else{
            report = await this.AITurn(this).then((r)=>r);
        }
        if(report === 0){
            if(this.pvp) this.gameboards[this.currentTurn].hideAllShips();
            if(this.pvp) await this.humanTransition(this);
            this.currentTurn = (this.currentTurn + 1) % 2;
            if(this.pvp) this.gameboards[this.currentTurn].uncoverAllShips();
        }
        return report;
    }
    AITurn(gamePage){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                let AI = playerType[this.players[this.currentTurn].playerType];
                let r = AI.fire(this.gameboards[(this.currentTurn + 1) % 2]);
                resolve(r)
            }, 1200);
        });
    }
    humanTurn(gamePage){
        return new Promise((resolve)=>{
            const listener = ()=>{
                let report = gamePage.onMouseDownBinded();
                if(report !== null){
                    DOMM.removeEvent(gamePage.DOMElement, 'click', listener);
                    resolve(report);
                }
            }
            DOMM.addEvent(gamePage.DOMElement, 'click', listener);
        })
    }
    humanTransition(gamePage){
        let transitionWindow = new TransitionScreen(`Ready player ${gamePage.players[(gamePage.currentTurn + 1) % 2].name}`);
        transitionWindow.setDOMElement();
        return new Promise((resolve)=>{
            const listener = () => {
                transitionWindow.removeDOMElement();
                resolve();
            }
            transitionWindow.setDOMEvents(listener);
            DOMM.addChild(gamePage.DOMElement, transitionWindow.DOMElement);
        })
    }
    popUp(text, time){
        let popWindow = DOMM.createDOM('div', 'popup-window');
        DOMM.setTextContent(popWindow, text);
        DOMM.addChild(this.DOMElement, popWindow);
        //wait

        setTimeout(()=> {DOMM.removeChild(this.DOMElement, popWindow);}, time);
    }
    
    async gameLoop(){
        let report;
        let popupTime = 2400;
        while(true){
            report = await this.handleTurn();
            if(report === hitReport.Miss){
                this.popUp(`Player ${this.players[(this.currentTurn + 1) % 2].name} missed`, popupTime);
                console.log(`Player ${this.players[(this.currentTurn + 1) % 2].name} missed`);
            }
            else if(report === hitReport.Hit){
                this.popUp(`Player ${this.players[this.currentTurn].name} hit a ship`, popupTime);
                console.log(`Player ${this.players[this.currentTurn].name} hit a ship`);
            }
            else if(report === hitReport.Sunk){
                this.popUp(`Player ${this.players[this.currentTurn].name} sunk a ship`, popupTime);
                console.log(`Player ${this.players[this.currentTurn].name} sunk a ship`);
            }
            else if(report === hitReport.Won){
                this.popUp(`Player ${this.players[this.currentTurn].name} has won!!!`, popupTime);
                console.log(`Player ${this.players[this.currentTurn].name} has won!!!`);
                break;
            }
        }
        //victory screen
        let victoryScreen = new VictoryScreen(this.players[this.currentTurn].name);
        victoryScreen.setDOMElement();
        victoryScreen.setDOMEvents(this.rematchCB, this.startOverCB);
        DOMM.addChild(this.DOMElement, victoryScreen.DOMElement);
    }

}