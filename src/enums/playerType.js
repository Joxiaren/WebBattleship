import HumanPlayer from "../scripts/playerTypes/humanPlayer";
import AIPlayerEasy from "../scripts/playerTypes/AIPlayerEasy";
import AIPlayerHard from "../scripts/playerTypes/AIPlayerHard";

const HUM = HumanPlayer.getSingleton();
const AIE = AIPlayerEasy.getSingleton();
const AIH = AIPlayerHard.getSingleton();


export default{
    'Human' : HUM,
    'AIEasy' : AIE,
    'AIHard' : AIH, 
}