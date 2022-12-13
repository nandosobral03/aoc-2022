
const fs = require("fs");
const input = fs.readFileSync("./test.txt", "utf8");

const part1 = (input) => {
   const packets = input.split("\r\n\r\n").map((line) => line.split("\r\n").map((JSON.parse)));
   const outOfOrder = [];
    for( let[idx,packet] of packets.entries()){
        const ordered = findOrder(packet[0], packet[1])
        if(ordered === -1){
            outOfOrder.push(idx+1);
        }
    }
    console.log("Part 1: " + outOfOrder.reduce((a,b) => a+b, 0))
}

const findOrder = (m1, m2) => {
    if(typeof m1 === "number" && typeof m2 === "number"){
        return m1 > m2 ? 1 : m1 === m2 ? 0 : -1;
    }
    if(typeof m1 === "number" && typeof m2 === "object"){
        return findOrder([m1], m2);
    }
    if(typeof m1 === "object" && typeof m2 === "number"){
        return findOrder(m1, [m2]);
    }
    if(typeof m1 === "object" && typeof m2 === "object"){
        let max = Math.max(m1.length, m2.length);
        for(let i = 0; i < max; i++){
            if(m1[i] === undefined){
                return -1;
            }
            if(m2[i] === undefined){
                return 1;
            }
            let result = findOrder(m1[i], m2[i]);
            if(result !== 0){
                return result;
            }
        }
        return 0;
    }
}

const part2 = (input) => {
    const packets = input.replaceAll("\r\n\r\n","\r\n").split("\r\n").map((JSON.parse));
    let decoderKey = 1;
    const ordered = [];
    for(let packet of packets){
        insertOrdered(ordered, packet);
    }
    decoderKey *= insertOrdered(ordered,[[2]])+1
    decoderKey *= insertOrdered(ordered,[[6]])+1
    console.log("Part 2: " + decoderKey)
}

const insertOrdered = (ordered, packet) => {
    let i = 0;
    while(i < ordered.length){
        if(findOrder(packet, ordered[i]) === -1){
            ordered.splice(i, 0, packet);
            return i;
        }
        i++;
    }
    ordered.push(packet);
    return i
}

part1(input);
part2(input);