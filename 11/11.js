const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

class Monkey {
    number = 0
    startingItems;
    operation;
    test;
    throwIfTrue;
    throwIfFalse;
    itemsInspected = 0;
    constructor(startingItems, operation, test, throwIfTrue, throwIfFalse, number) {
        this.startingItems = startingItems;
        this.operation = operation;
        this.test = test;
        this.throwIfTrue = throwIfTrue;
        this.throwIfFalse = throwIfFalse;
        this.number = number;
    }


   
}


const part1 = (input) => {
    const monkeys = input.split("\r\n\r\n").map(monkey => monkey.split("\r\n")).map(
        monkey => new Monkey(
            monkey[1].split(":")[1].split(",").map(item => parseInt(item)),
            monkey[2].split("=")[1].trim(),
            parseInt(monkey[3].split("divisible by")[1]),
            parseInt(monkey[4].split("throw to monkey")[1]),
            parseInt(monkey[5].split("throw to monkey")[1])
        )
    )
    for(let i = 0; i<20; i++){
        for(let monkey of monkeys){
            for(let item of monkey.startingItems){
                monkey.itemsInspected+=1;
                worryLevel = eval(monkey.operation.replaceAll("old",item));
                worryLevel = Math.floor(worryLevel / 3);
                if(worryLevel % monkey.test === 0){
                    throwItem(monkeys,worryLevel, monkey.throwIfTrue)
                }else{
                    throwItem(monkeys,worryLevel, monkey.throwIfFalse)
                }
            }
            monkey.startingItems = [];
        }
    }
   
    const sortedMonkeys = monkeys.sort((a,b) => b.itemsInspected - a.itemsInspected);
    console.log("Part 1:", sortedMonkeys[0].itemsInspected *  sortedMonkeys[1].itemsInspected);
}

const throwItem = (monkeys,worryLevel, monkey) => {
    monkeys[monkey].startingItems.push(worryLevel);
}



const part2 = (input) => {
    const monkeys = input.split("\r\n\r\n").map(monkey => monkey.split("\r\n")).map(
        monkey => new Monkey(
            monkey[1].split(":")[1].split(",").map(item => parseInt(item)),
            monkey[2].split("=")[1].trim(),
            parseInt(monkey[3].split("divisible by")[1]),
            parseInt(monkey[4].split("throw to monkey")[1]),
            parseInt(monkey[5].split("throw to monkey")[1]),
            parseInt(monkey[0].split(" ")[1].split(":")[0])
        )
    )
    //(a mod kn) mod n = a mod n
    //instead of storing a which will grow exponentially, we can store a mod kn where kn is the product of all the tests
    const maxStress = monkeys.map(monkey => monkey.test).reduce((a,b) => a*b);


    for(let i = 0; i<10000; i++){
        for(let monkey of monkeys){
            for(let item of monkey.startingItems){
                monkey.itemsInspected+=1;
                worryLevel = eval(monkey.operation.replaceAll("old",item));
                worryLevel = worryLevel % maxStress;
                if(worryLevel % monkey.test === 0){
                    throwItem(monkeys,worryLevel, monkey.throwIfTrue)
                }else{
                    throwItem(monkeys,worryLevel, monkey.throwIfFalse)
                }
            }
            monkey.startingItems = [];
        }
    }
    console.log(
        monkeys.map(monkey => monkey.number + ": " + monkey.itemsInspected).join("\r\n")
    )
    const sortedMonkeys = monkeys.sort((a,b) => b.itemsInspected - a.itemsInspected);
    console.log("Part 2:", sortedMonkeys[0].itemsInspected *  sortedMonkeys[1].itemsInspected);
}


part1(input);
part2(input);