import AIPlayerEasy from "../scripts/playerTypes/AIPlayerEasy";
import AIPlayerHard from "../scripts/playerTypes/AIPlayerHard";

const AIE = AIPlayerEasy.getSingleton();
const AIH = AIPlayerHard.getSingleton();


export default{
    'Human' : null,
    'AIEasy' : AIE,
    'AIHard' : AIH, 
}
