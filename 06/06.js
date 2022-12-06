const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

const part1 = (line) =>{
    const queue = [];
    for(let i = 0; i < line.length; i++){
        queue.push(line[i]);
        if(allDifferent(queue) && queue.length === 4){
            console.log('Part 1 :', i+1)
            return
        }
        if(queue.length == 4){
            queue.shift();
        }
    }
}

const part2 = (line) =>{
    const queue = [];
    for(let i = 0; i < line.length; i++){
        queue.push(line[i]);
        if(allDifferent(queue) && queue.length === 14){
            console.log('Part 2 :', i+1)
            return
        }
        if(queue.length == 14){
            queue.shift();
        }
    }
}

const allDifferent = (arr) => {
    const set = new Set(arr);
    return set.size === arr.length;
}

part1(input);
part2(input);