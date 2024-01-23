import DOMManager from "../DOMManager";
import playerType from "../../enums/playerType";
import '../../styles/gamePage.css';
const DOMM = DOMManager.getManager();

export default class GamePage{
    constructor(){
        this.players = undefined;
        this.gameboards = undefined;

        this.selectedCell = [null,null]
        this.selectedCells = new Array(2);
        this.DOMElement = undefined;
        this.pvp = false;
        this.currentTurn = 0;
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

        this.gameboards[1].hideAllShips();

        DOMM.addChild(this.DOMElement, this.gameboardContainer1);
        DOMM.addChild(this.DOMElement, this.gameboardContainer2);

        this.gameLoop();
    }
    setDOMEvents(){
        DOMM.addEvent(this.DOMElement, 'click', this.onMouseDownBinded);
    }
    removeDOMEvents(){
        DOMM.removeEvent(this.DOMElement, 'click', this.onMouseDownBinded);
    }
    onMouseDown(){
        console.log('clicked');
        console.log(this.players[this.currentTurn].playerType);
        if(this.players[this.currentTurn].playerType !== 'Human') return null;
        let report;
        if(this.selectedCell[1]){ 
            if(this.selectedCell[0] === this.currentTurn) return null;
            console.log(`FIRE AT: ${this.selectedCell}`);
            report = this.gameboards[this.selectedCell[0]].receiveFire(this.selectedCell[1]);

            //this.handleTurn();
        }
        return report;
    }
    async handleTurn(){
        let report;
        if(this.players[this.currentTurn].playerType === 'Human'){
            console.log('Human Turn');
            report = await this.humanTurn(this).then((value)=>value);
            console.log(`report is: ${report}`);
        }
        else{
            let AI = playerType[this.players[this.currentTurn].playerType];
            report = AI.fire(this.gameboards[(this.currentTurn + 1) % 2]);
            console.log(`report is: ${report}`);
            //this.handleTurn();
        }
        
        if(this.pvp) this.gameboards[this.currentTurn].hideAllShips();
        if(report === 0) this.currentTurn = (this.currentTurn + 1) % 2;
        if(this.pvp) this.gameboards[this.currentTurn].uncoverAllShips();
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
        return;
    }
    async gameLoop(){
        while(true){
            await this.handleTurn();
        }
    }

}