//Read file
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");
const calories = input.split("\r\n");

const part1 = (calories) => {
    let caloriesByElf = [];
    let currentElf = 0;
    for (let i = 0; i < calories.length; i++) {
      if (calories[i] === "") {
        currentElf++;
      } else {
        if (caloriesByElf[currentElf]) {
          caloriesByElf[currentElf] += parseInt(calories[i]);
        } else {
          caloriesByElf[currentElf] = parseInt(calories[i]);
        }
      }
    }
    
    console.log(`Part 1: ${Math.max(...caloriesByElf)}`);

}


const part2 = (calories) => {
    let caloriesByElf = [];
    let currentElf = 0;
    for (let i = 0; i < calories.length; i++) {
      if (calories[i] === "") {
        currentElf++;
      } else {
        if (caloriesByElf[currentElf]) {
          caloriesByElf[currentElf] += parseInt(calories[i]);
        } else {
          caloriesByElf[currentElf] = parseInt(calories[i]);
        }
      }
    }
    
    let top3 = caloriesByElf.sort((a, b) => b - a).splice(0, 3)
    console.log(`Part 2 : ${top3.reduce((a, b) => a + b,0)}`);

}

part1(calories)
part2(calories)