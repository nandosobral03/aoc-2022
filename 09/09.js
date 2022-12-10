const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

const performBestMove = (headPos, tailPos) => {
    if(headPos[0] === tailPos[0]){
        if(headPos[1] > tailPos[1]){
            tailPos[1]++;
        }else{
            tailPos[1]--;
        }
    }
    if(headPos[1] === tailPos[1]){
        if(headPos[0] > tailPos[0]){
            tailPos[0]++;
        }else{
            tailPos[0]--;
        }
    }
    if(headPos[0] > tailPos[0] && headPos[1] > tailPos[1]){
        tailPos[0]++;
        tailPos[1]++;
    }
    if(headPos[0] > tailPos[0] && headPos[1] < tailPos[1]){
        tailPos[0]++;
        tailPos[1]--;
    }
    if(headPos[0] < tailPos[0] && headPos[1] > tailPos[1]){
        tailPos[0]--;
        tailPos[1]++;
    }
    if(headPos[0] < tailPos[0] && headPos[1] < tailPos[1]){
        tailPos[0]--;
        tailPos[1]--;
    }
    return tailPos;
}


const checkIfTouching = (pos1, pos2) => {
    if(pos1[0] === pos2[0] && Math.abs(pos1[1] - pos2[1]) === 1){
        return true;
    }
    if(pos1[1] === pos2[1] && Math.abs(pos1[0] - pos2[0]) === 1){
        return true;
    }
    if(Math.abs(pos1[0] - pos2[0]) === 1 && Math.abs(pos1[1] - pos2[1]) === 1){
        return true;
    }
    if(pos1[0] === pos2[0] && pos1[1] === pos2[1]){
        return true;
    }
    return false;
}

const moveHead = (move, headPos, knots, visitedSet) => {
    for(let i = 0; i < move.distance; i++){
        switch(move.direction){
            case 'U':
                headPos[1]++;
                break;
            case 'D':
                headPos[1]--;
                break;
            case 'L':
                headPos[0]--;
                break;
            case 'R':
                headPos[0]++;
                break;
        }
        let previousNode = headPos
        for(let i = 0; i < knots.length; i++){
            if(!checkIfTouching(previousNode, knots[i])){
                performBestMove(previousNode, knots[i]);
            }
            previousNode = knots[i];
        }
        visitedSet.add(previousNode.reduce((a,b) => a +"|"+ b));

    }
}


const part1 = (input) => {
    const lines = input.split("\r\n");
    const moves = lines.map(line => {return {direction: line[0], distance: parseInt(line.slice(1))}});
    
    let headPos = [0,0];
    let tailPos = [0,0];
    let visitedSet = new Set();
    for(let move of moves){
        moveHead(move, headPos, [tailPos], visitedSet);
    }
    console.log("Part 1: ",visitedSet.size)
}
 



const part2 = (input) => {
    const lines = input.split("\r\n");
    const moves = lines.map(line => {return {direction: line[0], distance: parseInt(line.slice(1))}});
    
    let headPos = [0,0];
    let tailPos = Array.from({length: 9}, () => [0,0]);
    let visitedSet = new Set();
    for(let move of moves){
        moveHead(move, headPos, tailPos, visitedSet);
        
    }
    console.log("Part 2: ",visitedSet.size)
}


const printVisted = (visitedSet) => {
    let maxX = 0;
    let maxY = 0;
    let minX = 0;
    let minY = 0;
    for(let pos of visitedSet){
        let [x,y] = pos.split("|").map(x => parseInt(x));
        if(x > maxX){
            maxX = x;
        }
        if(x < minX){
            minX = x;
        }
        if(y > maxY){
            maxY = y;
        }
        if(y < minY){
            minY = y;
        }
    }
    for(let y = maxY; y >= minY; y--){
        let line = "";
        for(let x = minX; x <= maxX; x++){
            if(visitedSet.has(x+"|"+y)){
                line += "X";
            }else{
                line += ".";
            }
        }
        console.log(line);
    }
}


part1(input);
part2(input);