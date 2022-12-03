const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

const values = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];

const part1 = (input) => {
  let prioritiesSum = 0;
  const rucksacks = input.split("\r\n");
  const bags = rucksacks.map((s) => [s.slice(0, s.length / 2),s.slice(s.length / 2, s.length),]);
  for (let bag of bags) {
    let set = new Set(bag[0].split(""));
    let added = new Set();
    bag[1].split("").forEach((c) => {
      if (set.has(c) && !added.has(c)) {
        prioritiesSum += values.indexOf(c) + 1;
        added.add(c);
      }
    });
  }
  console.log(`Part 1: ${prioritiesSum}`);
};

const part2 = (input) => {
    const groups = input.split("\r\n");
    let sum = 0;
    for(let i = 0; i < groups.length ; i+=3){
        const firstSet = new Set(groups[i].split(""));
        const secondSet = new Set(groups[i+1].split(""));
        const thirdSet = new Set(groups[i+2].split(""));
        const intersection = new Set([...firstSet].filter(x => secondSet.has(x) && thirdSet.has(x)));
        if(intersection.size == 1){
            sum += values.indexOf([...intersection][0]) + 1;
        }else{
            throw new Error("Intersection size is not 1");
        }
        
    }
    console.log(`Part 2: ${sum}`);
};

part1(input);
part2(input);
