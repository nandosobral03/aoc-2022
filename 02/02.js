const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

const part1 = (inputs) => {
    const lines = inputs.replace(/A/g, "R").replace(/X/g, "R").replace(/B/g, "P").replace(/Y/g, "P").replace(/C/g, "S").replace(/Z/g, "S").split("\r\n");
    const values = lines.map(l => l.split(" "))
    let points = 0;
    for(let round of values){
        points += get_points(round[0], round[1]);
        points += get_shape_points(round[1]);
    }
    console.log(`Part 1: ${points}`)
}

const get_shape_points = (val) => {
    if(val === "R"){
        return 1;
    }
    if(val === "P"){
        return 2;
    }
    if(val === "S"){
        return 3;
    }
}

const get_points = (val1, val2) => {
    if(val1 === val2){
        return 3;
    }
    if(val1 === "R" && val2 === "P"){
        return 6;
    }
    if(val1 === "P" && val2 === "S"){
        return 6;
    }
    if(val1 === "S" && val2 === "R"){
        return 6;
    }
    return 0;
}


const part2 = (inputs) => {
    const lines = inputs.replace(/A/g, "R").replace(/B/g, "P").replace(/C/g, "S").split("\r\n");
    const values = lines.map(l => l.split(" "))
    let points = 0;
    for(let round of values){
        points += get_points_part2(round[0], round[1]);
    }
    console.log(`Part 2: ${points}`)
}

const get_points_part2 = (val, instruction) => {
    if (instruction === "Y"){
        return 3 + get_shape_points(val);
    }
    if (instruction === "Z"){
        if(val === "R"){
            return 6 + get_shape_points("P");
        }
        if(val === "P"){
            return 6 + get_shape_points("S");
        }
        if(val === "S"){
            return 6 + get_shape_points("R");
        }
    }
    if (instruction === "X"){
        if(val === "R"){
            return get_shape_points("S");
        }
        if(val === "P"){
            return get_shape_points("R");
        }
        if(val === "S"){
            return get_shape_points("P");
        }
    }
}

part1(input);
part2(input);