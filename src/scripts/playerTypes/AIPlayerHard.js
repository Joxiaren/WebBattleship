import DOMManager from '../DOMManager.js';
import shuffleArray from '../shuffle.js';
import orientation from '../../enums/orientation.js';
import hitReport from '../../enums/hitReport.js';
const DOMM = DOMManager.getManager();



export default class AIPlayerHard{
    static AIH = undefined;
    constructor(){
        this.state = undefined;
        this.firstHit = undefined;
        this.lastHit = undefined;
        this.possibleDirection = undefined;
        this.cheatPercentage = undefined;
        
        this.cheatPerShot = 15;
        
        this.variableReset();
    }

    static create(){
        AIPlayerHard.AIH = new AIPlayerHard();
    }
    static getSingleton(){
        if(AIPlayerHard.AIH === undefined){
            this.create();
        }
        return AIPlayerHard.AIH;
    }
    variableReset(){
        this.state = 0;
        this.firstHit = null;
        this.lastHit = null;
        this.possibleDirection = new Set([orientation.North, orientation.East, orientation.South, orientation.West]);
        this.lastDirection = null;
        this.cheatPercentage = 0;
    }
    fire(gameboard){
        let report = null;
        if(this.state == 0){
            let chance = Math.random() * 101;
            let cellFire;
            if(chance < this.cheatPercentage){
                let shipCells = Object.keys(gameboard.shipCells);
                shuffleArray(shipCells, 3);
                cellFire = shipCells[0];
                this.cheatPercentage = 0;
            }
            else{
                let cellArray = Array.from(gameboard.availableCells);
                shuffleArray(cellArray, 3);
                cellFire = cellArray[0];
            }

            report = gameboard.receiveFire( [parseInt(cellFire/10), parseInt(cellFire%10)]);
            if(report === hitReport.Miss){
                this.cheatPercentage += this.cheatPerShot;
            }
            else if(report === hitReport.Hit){
                this.firstHit = cellFire;
                this.lastHit = cellFire;
                this.state = 1;
            }
        }
        else if(this.state == 1){
            let firePosition = [];
            let index;
            while(true){
                firePosition = [];
                if(this.lastDirection){
                    firePosition.push(parseInt(this.lastHit / 10));
                    firePosition.push(parseInt(this.lastHit % 10));
                }
                else{
                    let directionArray = Array.from(this.possibleDirection);
                    this.lastDirection = directionArray[0];
                    
                    firePosition.push(parseInt(this.firstHit / 10));
                    firePosition.push(parseInt(this.firstHit % 10));
                }

                if(this.lastDirection == orientation.North) firePosition[0] -= 1;
                else if(this.lastDirection == orientation.South) firePosition[0] += 1;
                else if(this.lastDirection == orientation.East) firePosition[1] += 1;
                else if(this.lastDirection == orientation.West) firePosition[1] -= 1;

                index = firePosition[0] * 10 + firePosition[1];

                if(gameboard.availableCells.has(index) && (firePosition[0] >= 0 || firePosition[0] < 10 || firePosition[1] >= 0 || firePosition[1] < 10)) break;
                else{
                    this.possibleDirection.delete(this.lastDirection);
                    this.lastDirection = null;
                }
            }
            
            this.lastHit = index;
            report = gameboard.receiveFire(firePosition);

            if(report === hitReport.Miss){
                //change direction
                this.possibleDirection.delete(this.lastDirection);
                this.lastDirection = null;
            }
            else if (report === hitReport.Hit){
                if(this.lastDirection === orientation.North || this.lastDirection === orientation.South){
                    this.possibleDirection.delete(orientation.East);
                    this.possibleDirection.delete(orientation.West);
                }
                else{
                    this.possibleDirection.delete(orientation.North);
                    this.possibleDirection.delete(orientation.South);
                }
            }
            else if(report === hitReport.Sunk) this.variableReset();
        }
        if(report == hitReport.Sunk) this.variableReset();
        return report;
    }
}