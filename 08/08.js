const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");




const part1 = (input) => {
    const forest = input.split("\n").map(line => line.split("").filter(x => x != " ").map(char => {
        return {
            height: parseInt(char),
            visible: {
                top: true,
                bottom: true,
                left: true,
                right: false
            }
        }
    }));
    setVisibility(forest, "top");
    setVisibility(forest, "bottom");
    setVisibility(forest, "left");
    setVisibility(forest, "right");
    const visible = countVisible(forest);
    console.log("Part 1: ", visible)
}

const countVisible = (forest) => {
    const total = forest.map(line => line.reduce((acc, tree) => tree.visible.top || tree.visible.bottom || tree.visible.left || tree.visible.right ? acc + 1 : acc, 0))
    return total.reduce((acc, line) => acc + line, 0);
}
const setVisibility = (forest, direction) => {
    const indexes = {
        top: { x: [0, forest.length, 1], y: [0, forest[0].length, 1] },
        bottom: { x: [0, forest.length, 1], y: [forest[0].length - 1, 0, -1] },
        left: { x: [0, forest.length, 1], y: [0, forest[0].length, 1] },
        right: { x: [forest.length - 1, 0, -1], y: [0, forest[0].length, 1] }
    }
    const maxInLine = Array(direction === "top" || direction === "bottom" ? forest.length : forest[0].length).fill(0);
    const index = indexes[direction];
    if (direction === "top" || direction === "bottom") {
        for (let y = index.y[0]; ; y += index.y[2]) {
            for (let x = index.x[0]; x < index.x[1]; x += index.x[2]) {
                if (y == index.y[0]) {
                    forest[y][x].visible[direction] = true;
                    maxInLine[x] = forest[y][x].height;
                } else {
                    if (forest[y][x].height <= maxInLine[x]) {
                        forest[y][x].visible[direction] = false;
                    } else {
                        forest[y][x].visible[direction] = true;
                        maxInLine[x] = forest[y][x].height;
                    }
                }

            }
            if (direction === "top" && y == index.y[1] - 1) {
                break;
            }
            if (direction === "bottom" && y == 0) {
                break;
            }
        }
    }
    if (direction === "left" || direction === "right") {
        for (let x = index.x[0]; ; x += index.x[2]) {
            for (let y = index.y[0]; y < index.y[1]; y += index.y[2]) {
                if (x == index.x[0]) {
                    forest[y][x].visible[direction] = true;
                    maxInLine[y] = forest[y][x].height;
                } else {
                    if (forest[y][x].height <= maxInLine[y]) {
                        forest[y][x].visible[direction] = false;
                    } else {
                        forest[y][x].visible[direction] = true;
                        maxInLine[y] = forest[y][x].height;
                    }
                }
            }
            if (direction === "left" && x == index.x[1] - 1) {
                break;
            }
            if (direction === "right" && x == 0) {
                break;
            }
        }
    }
}


const part2 = (line) => {
    const forest = input.split("\n").map(line => line.split("").filter(x => x != " ").map(char => {
        return {
            height: parseInt(char),
            visibilityScore: 0
        }
    }));
    let max = 0;
    for (let i = 0; i < forest.length; i++) {
        for (let j = 0; j < forest[0].length; j++) {
            if(calculateVisibilityScore(forest, i, j) > max){
                max = calculateVisibilityScore(forest, i, j);
            }
        }
    }
    console.log("Part 2: ", max);
}
const calculateVisibilityScore = (forest, i, j) => {
    let score = 1;
    let tree = forest[i][j];
    let count = 0;
    for (let y = i; y < forest.length; y++) {
        if (i != y) {
            if (forest[y][j].height < tree.height) {
                count++;
            } else {
                count++;
                break;
            }
        }
    }
    //Looking up
    score *= count;
    count = 0;
    for (let y = i; y >= 0; y--) {
        if (i != y) {
            if (forest[y][j].height < tree.height) {
                count++;
            } else {
                count++;
                break;
            }
        }
    }
    //Looking left
    score *= count;
    count = 0;
    for (let x = j; x >= 0; x--) {
        if (j != x) {
            if (forest[i][x].height < tree.height) {
                count++;
            } else {
                count++;
                break;
            }
        }
    }
    //Looking right
    score *= count;
    count = 0;  
    for (let x = j; x < forest[0].length; x++) {
        if (j != x) {
            if (forest[i][x].height < tree.height) {
                count++;
            } else {
                count++;
                break;
            }
        }
    }
    score*= count;
    return score;
}
part1(input);
part2(input);