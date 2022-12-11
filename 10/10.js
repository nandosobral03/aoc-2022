const fs = require("fs");
const input = fs.readFileSync("./test.txt", "utf8");


const part1 = (input) => {
    let strength = [];
    let X = 1;
    let currentCycle = 1;
    const instructions = input.split("\r\n");
    for(let instruction of instructions){
       let toAdd = 0;
       switch(instruction.split(" ")[0]){
        case "noop":
            currentCycle+=1;
            addStrength(currentCycle, X, strength)
            break;
        case "addx":
            currentCycle+=1;
            addStrength(currentCycle, X, strength)
            currentCycle+=1;
            X+=parseInt(instruction.split(" ")[1]) ;
            addStrength(currentCycle, X, strength)
            break
        default:
            break;
        }
    }    
    console.log("Part 1: ", strength.reduce((a,b) => a+b, 0));
}

 
const addStrength = (currentCycle, X, strength) => {
    if(currentCycle == 20){
        strength.push(X * 20);
    }
    if(currentCycle > 20 && ((currentCycle-20) % 40 === 0)){
        strength.push(X * currentCycle);
    }

}


const part2 = (input) => {
    let cursorPosition = 1;
    let currentCycle = 1;
    let output = "";
    const instructions = input.split("\r\n");
    for(let instruction of instructions){
       output += getPixel(cursorPosition, currentCycle);
       switch(instruction.split(" ")[0]){
        case "noop":
            currentCycle+=1;
            break;
        case "addx":
            currentCycle+=1;
            output += getPixel(cursorPosition, currentCycle);
            currentCycle+=1;
            cursorPosition+=parseInt(instruction.split(" ")[1]) ;
            break
        default:
            break;
        }
    }
    console.log(output);
}

const getPixel = (cursorPosition, currentCycle) => {
    let beamPosition = (currentCycle % 40 || 40) -1;
    if(Math.abs(cursorPosition - beamPosition) <= 1){
        return beamPosition === 39 ? "#\r\n" :"#" 
    }else{
        return beamPosition === 39 ? ".\r\n" :"."
    }
}


part1(input);
part2(input);