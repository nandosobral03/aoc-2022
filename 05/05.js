const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");


const part1 = (input) => {
    const [stacks,moves] = createStacksAndMoves(input);
    for(let move of moves.split("\r\n")){
        let [_move,amount,_from,from,_to,to] = move.split(" ");
        amount = parseInt(amount);
        from = parseInt(from) -1;
        to = parseInt(to) -1;
        let toMove = stacks[from].splice(0,amount);
        stacks[to] = (toMove.reverse()).concat(stacks[to]);
    }
    const result = stacks.map(stack => stack[0] ? stack[0] : " ").reduce((a,b) => a+b);
    console.log(result)
};  
  
const part2 = (input) => {
    const [stacks,moves] = createStacksAndMoves(input);
    for(let move of moves.split("\r\n")){
        let [_move,amount,_from,from,_to,to] = move.split(" ");
        amount = parseInt(amount);
        from = parseInt(from) -1;
        to = parseInt(to) -1;
        let toMove = stacks[from].splice(0,amount);
        stacks[to] = toMove.concat(stacks[to]);
    }
    const result = stacks.map(stack => stack[0] ? stack[0] : " ").reduce((a,b) => a+b);
    console.log(result)
};  


const createStacksAndMoves = (input) => {
    const [structure, moves] = input.split("\r\n\r\n");
    const stacks = []
    let boxes = structure.split("\r\n");
    boxes.splice(-1);
    for(let row of boxes) {
        for(let i = 1; i < row.length; i+=4) {
            if(row[i] !== " ") {
                let pos = Math.floor((i+1)/4);
                stacks[pos] = stacks[pos] || [];
                stacks[pos].push(row[i]);
            }
        }
    }
    return [stacks,moves];
}
part1(input);
part2(input);