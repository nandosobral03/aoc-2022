
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

const drawLineMap = (grid, points) => {
    for (let i = 0; i < points.length - 1; i++) {
        if (points[i][0] === points[i + 1][0]) {
            drawVerticalMap(grid, points[i], points[i + 1]);
        } else {
            drawHorizontalMap(grid, points[i], points[i + 1]);
        }
    }
}

const drawVerticalMap = (grid, point1, point2) => {
    let y1 = Math.min(point1[1], point2[1]);
    let y2 = Math.max(point1[1], point2[1]);
    for (let y = y1; y <= y2; y++) {
        grid.get(point1[0])[y] = "#";
    }
}

const drawHorizontalMap = (grid, point1, point2) => {
    let x1 = Math.min(point1[0], point2[0]);
    let x2 = Math.max(point1[0], point2[0]);
    for (let x = x1; x <= x2; x++) {
        grid.get(x)[point1[1]] = "#";
    }
}

const getDimensions = (rockLines) => {
    let xDimension = [Infinity, 0]
    let yDimension = [Infinity, 0]
    for (let line of rockLines) {
        for (let entry of line) {
            if (entry[0] < xDimension[0]) {
                xDimension[0] = entry[0];
            }
            if (entry[0] > xDimension[1]) {
                xDimension[1] = entry[0];
            }
            if (entry[1] < yDimension[0]) {
                yDimension[0] = entry[1];
            }
            if (entry[1] > yDimension[1]) {
                yDimension[1] = entry[1];
            }

        }
    }
    return {
        x: xDimension,
        y: yDimension
    }
}

const part1 = (input) => {
    const rockLines = input.split("\r\n").map((line) => line.split("->").map((line) => line.split(",").map(s => s.trim()).map(x => parseInt(x))));
    const { x, y } = getDimensions(rockLines);
    let grid = new Map();
    for (let i = x[0]; i <= x[1]; i++) {
        grid.set(i, Array.from({ length: y[1]}, () => "."));
    }

    for (let line of rockLines) {
        drawLineMap(grid, line, y[1]);
    }
    let continueDropingSand = true;
    let sandDropped = 0;
    while (continueDropingSand) {
        continueDropingSand = dropSandUntilVoid(grid, 500, 0);
        sandDropped++;
    }
    console.log("Part 1: " + (sandDropped - 1))

}

const dropSandUntilVoid = (grid, x, y) => {
    //y+1 is always defined
    if (!grid.has(x)) {
        return false;
    }
    if (grid.get(x)[y+1] == ".") {
        return dropSandUntilVoid(grid, x, y + 1);
    }
    else {
        if (!grid.has(x - 1)) {
            return false;
        }
        if (!grid.has(x + 1)) {
           return false;
        }
        if (grid.get(x - 1)[y + 1] == ".") {
            return dropSandUntilVoid(grid, x - 1, y + 1);
        }
        if (grid.get(x + 1)[y + 1] == ".") {
            return dropSandUntilVoid(grid, x + 1, y + 1);
        }
        if ((grid.get(x - 1)[y + 1] == "#" || grid.get(x - 1)[y + 1] == "o") && (grid.get(x + 1)[y + 1] == "#" || grid.get(x + 1)[y + 1] == "o")) {
            grid.get(x)[y] = "o";
            return true
        }
    }
}

const part2 = (input) => {
    const rockLines = input.split("\r\n").map((line) => line.split("->").map((line) => line.split(",").map(s => s.trim()).map(x => parseInt(x))));
    const { x, y } = getDimensions(rockLines);
    let height = y[1] + 3;
    let grid = new Map();
    for (let i = x[0]; i <= x[1]; i++) {
        grid.set(i, [...Array.from({ length: height - 1 }, () => "."), "#"]);
    }

    for (let line of rockLines) {
        drawLineMap(grid, line, height);
    }
    let continueDropingSand = true;
    let sandDropped = 0;
    while (continueDropingSand) {
        continueDropingSand = dropSandUntilStopped(grid, 500, 0, height);
        sandDropped++;
    }
    console.log("Part 2: " + (sandDropped))

}

const dropSandUntilStopped = (grid, x, y,height) => {
    if (!grid.has(x)) {
        grid.set(x, [...Array.from({ length: height - 1 }, () => "."), "#"]);
    }
    if (grid.get(x)[y+1] == ".") {
        return dropSandUntilStopped(grid, x, y + 1, height);
    }
    else {
        if (!grid.has(x - 1)) {
            grid.set(x - 1, [...Array.from({ length: height - 1 }, () => "."), "#"]);
        }
        if (!grid.has(x + 1)) {
            grid.set(x + 1, [...Array.from({ length: height - 1 }, () => "."), "#"]);
        }
        if (grid.get(x - 1)[y + 1] == ".") {
            return dropSandUntilStopped(grid, x - 1, y + 1, height);
        }
        if (grid.get(x + 1)[y + 1] == ".") {
            return dropSandUntilStopped(grid, x + 1, y + 1, height);
        }
        if ((grid.get(x - 1)[y + 1] == "#" || grid.get(x - 1)[y + 1] == "o") && (grid.get(x + 1)[y + 1] == "#" || grid.get(x + 1)[y + 1] == "o")) {
            grid.get(x)[y] = "o";
            return !(x === 500 && y === 0)
        }
    }
}

const printGridMap = (grid) => {
    let offset = Math.min(...grid.keys());
    let height = Math.max(grid.get(500).length);
    for (let y = 0; y < height; y++) {
        let row = "";
        for (let x = 0; x < grid.size; x++) {
            if (grid.has(x + offset)) {
                row += grid.get(x + offset)[y] || ".";
            }
            else {
                row += ".";
            }
        }
    }
}


part1(input);
part2(input);