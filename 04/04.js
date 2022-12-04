const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

const part1 = (input) => {
  const pairs = input.split("\r\n").map((x) => x.split(",").map((x) => x.split("-").map((x) => parseInt(x.trim()))));
  let count = 0;
  for(let pair of pairs) {
    let [a, b] = pair;
    if((a[0]<=b[0] && a[1]>=b[1]) || (b[0]<=a[0] && b[1]>=a[1])) {
      count++;
    }
  }
  console.log("Part 1:", count);
};  

const part2 = (input) => {
  const pairs = input.split("\r\n").map((x) => x.split(",").map((x) => x.split("-").map((x) => parseInt(x.trim()))));
  let count = 0;
  for(let pair of pairs) {
    let [a, b] = pair;
    if((a[0]<=b[0] && a[1]>=b[0]) || (b[0]<=a[0] && b[1]>=a[0])) {
        count++;
    }
  }
  console.log("Part 2:", count);
};  



part1(input);
part2(input);
