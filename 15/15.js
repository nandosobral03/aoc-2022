
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

const part1 = (input, position) => {
    const data = input.split("\r\n").map((line) => line.split(":").map(
        item =>[
            parseInt(item.split("x=")[1].split(",")[0]),
            parseInt(item.split("y=")[1]),
        ]
    ));
    let sensors = [];
    let beacons = [];
    for(let line of data){
        let [[sensorX, sensorY], [beaconX, beaconY]] = line;
        let sensor = {
            x: sensorX,
            y: sensorY,
            distance: Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY),
        }
        sensors.push(sensor);
        beacons.push({
            x: beaconX,
            y: beaconY,
        })
    }

    let dimensions = getDimensions(sensors);
    let horizontalSize = dimensions[1] - dimensions[0];
    const arr = new Array(horizontalSize).fill(".");
    for(let sensor of sensors){
        for(let i =0; i < arr.length; i++){
            let distance = Math.abs(sensor.x - (dimensions[0] + i)) + Math.abs(sensor.y - position);
            if(distance <= sensor.distance){
                arr[i] = "#";
            }
        }    
    }
    for(let beacon of beacons){
        if(beacon.y == position){
            arr[beacon.x - dimensions[0]] = "X";
        }
    }

    console.log("Part 1: " + arr.filter(item => item === "#").length);
}



const part1WithLowNumbers = (input, position) => {
    const data = input.split("\r\n").map((line) => line.split(":").map(
        item =>[
            parseInt(item.split("x=")[1].split(",")[0]),
            parseInt(item.split("y=")[1]),
        ]
    ));
    let sensors = [];
    for(let line of data){
        let [[sensorX, sensorY], [beaconX, beaconY]] = line;
        let sensor = {
            x: sensorX,
            y: sensorY,
            distance: Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY),
        }
        sensors.push(sensor);
    }

    let dimensions = getDimensions(sensors);
    let map = new Map();
    for(let i = dimensions[0]; i <= dimensions[1]; i++){
        map.set(i, new Map());
        for(let j = dimensions[2]; j <= dimensions[3]; j++){
            map.get(i).set(j, ".");
        }
    }
    for(let sensor of sensors){
        map.get(sensor.x).set(sensor.y, `${sensor.distance}`);
        for(let i = 0; i < sensor.distance; i++){
            for(let j = 0; j < sensor.distance; j++){
                if(i + j <= sensor.distance){
                    map.get(sensor.x + i).set(sensor.y + j, "#");
                    map.get(sensor.x + i).set(sensor.y - j, "#");
                    map.get(sensor.x - i).set(sensor.y + j, "#");
                    map.get(sensor.x - i).set(sensor.y - j, "#");
                    
                }
            }
        }
    }

    let count = 0;
    for(let value of map.get(position).values()){
        if(value === "#"){
            count++;
        }
    }
    printMap(map);
    console.log("Part 1: " + count);
}
const printMap = (map) => {
    let output = "";
    let min = Math.min(...map.keys());
    let max = Math.max(...map.keys());
    for(let i = min; i <= max; i++){
        let min2 = Math.min(...map.get(i).keys());
        let max2 = Math.max(...map.get(i).keys());
        let line = map.get(i);
        for(let j = min2; j <= max2; j++){
            output += line.get(j);
        }
        output += "\r\n";
    }
    console.log(output);
}

const part2 = (input, max) => {
    const data = input.split("\r\n").map((line) => line.split(":").map(
        item =>[
            parseInt(item.split("x=")[1].split(",")[0]),
            parseInt(item.split("y=")[1]),
        ]
    ));
    let sensors = [];
    let beacons = [];
    for(let line of data){
        let [[sensorX, sensorY], [beaconX, beaconY]] = line;
        let sensor = {
            x: sensorX,
            y: sensorY,
            distance: Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY),
        }
        sensors.push(sensor);
        beacons.push({
            x: beaconX,
            y: beaconY,
        })
    }
    for(let j = 0 ; j < max; j++){
        let coveredRange = []
        for(let sensor of sensors){
            let distanceToLine = Math.abs(sensor.y - j);
            if(distanceToLine > sensor.distance){
                continue
            }else{
                let newDistance = Math.abs(sensor.distance - distanceToLine);
                let newRange = [Math.max(0,sensor.x - newDistance), Math.min(max,sensor.x + newDistance)];
                coveredRange = unionRanges(coveredRange, newRange);
                
            }

        }
        const coveredElements = coveredRange.reduce((acc, range) => acc + (range[1] - range[0] + 1), 0);
        if(coveredElements !== max+1){
            const missingElement = findMissingElement(coveredRange.sort((a,b) => a[0] - b[0]));
            console.log("Part 2: " + (missingElement * 4000000 + j));

        }
    }

}

const findMissingElement = (ranges) => {
    for (let i = 0; i < ranges.length-1; i++) {
       let currentRange = ranges[i];
        let nextRange = ranges[i+1];
        let lastElementOfCurrentRange = currentRange[1];
        let firstElementOfNextRange = nextRange[0];
        if(lastElementOfCurrentRange + 1 !== firstElementOfNextRange){
            return lastElementOfCurrentRange + 1;
        }
    }        
}    

const unionRanges = (ranges, newRange) => {
    for (let i = 0; i < ranges.length; i++) {
      const r = ranges[i];
      if (rangeOverlaps(r, newRange)) {
        const combined = [
          Math.min(r[0], newRange[0]),
          Math.max(r[1], newRange[1]),
        ];
        return unionRanges(ranges.slice(0, i).concat(ranges.slice(i+1)), combined);
      }
    }
    return [...ranges, newRange];
  }
  

const rangeOverlaps = (range1, range2) => {
    return range1[0] <= range2[1] && range2[0] <= range1[1];
}


const getDimensions = (input) => {
    let [minX, maxX, minY, maxY] = [Infinity, 0, Infinity, 0];
    for(let sensor of input){
        if((sensor.x - sensor.distance) < minX){
            minX = sensor.x - sensor.distance;
        }
        if((sensor.x + sensor.distance) > maxX){
            maxX = sensor.x + sensor.distance;
        }
        if((sensor.y - sensor.distance) < minY){
            minY = sensor.y - sensor.distance;
        }
        if((sensor.y + sensor.distance) > maxY){
            maxY = sensor.y + sensor.distance;
        }
    }

    return [
        minX,
        maxX,
        minY,
        maxY,
    ]
}


part1(input, input.split("\r\n").length > 20 ? 2000000 : 10 );
part2(input, input.split("\r\n").length > 20 ? 4000000 : 20 );