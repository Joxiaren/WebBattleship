export default function shuffleArray(array, repeat=1){
    let temp;
    for(let j = 0; j < repeat; j++){
        for(let i = array.length; i > 1; i--){
            temp = Math.floor(Math.random() * (i));
            [array[0], array[temp]] = [array[temp], array[0]];
        }
    }
}