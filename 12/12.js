const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

class Graph
{
     
    // Constructor
    constructor(v)
    {
        this.V = v;
        this.adj = new Array(v);
        for(let i = 0; i < v; i++)
            this.adj[i] = [];
    }
     
    // Function to add an edge into the graph
    addEdge(v, w)
    {
         
        // Add w to v's list.
        this.adj[v].push(w);
    }

    dijkstra(src){
        const dist = new Array(this.V).fill(Infinity);
        const visited = new Array(this.V).fill(false);
        dist[src] = 0;
        for(let i = 0; i < this.V; i++){
            let u = this.minDistance(dist, visited);
            visited[u] = true;
            for(let j = 0; j < this.adj[u].length; j++){
                let v = this.adj[u][j];
                if(!visited[v] && dist[u] != Infinity && dist[u] + 1 < dist[v]){
                    dist[v] = dist[u] + 1;
                }
            }
        }
        return dist;
    }
     
    minDistance(dist, visited){
        let min = Infinity;
        let minIndex = -1;
        for(let i = 0; i < this.V; i++){
            if(!visited[i] && dist[i] <= min){
                min = dist[i];
                minIndex = i;
            }
        }
        return minIndex;
    }
}

const part1 = (input) => {
    const map = input.split("\r\n").map(line => line.split("").map(char => char == "S" ? 1 : char == "E" ?  26 : char.charCodeAt(0) - 96));
    const original = input.split("\r\n").map(line => line.split(""))
    const startPos = [original.findIndex(line => line.includes("S")), original[original.findIndex(line => line.includes("S"))].findIndex(char => char == "S")];
    const endPos = [original.findIndex(line => line.includes("E")), original[original.findIndex(line => line.includes("E"))].findIndex(char => char == "E")];
    const g = createGraph(map);
    const path = g.dijkstra(endPos[0]*map[0].length+endPos[1])[startPos[0]*map[0].length+startPos[1]]
    console.log("Part 1:", path);
}


//The graph is created inverted to allow dijkstra to be executed from end to start making part 2 easier
const createGraph = (map) => {
    const graph = new Graph(map.length * map[0].length);
    for(let x = 0; x < map.length; x++){
        for(let y = 0; y < map[x].length; y++){
                if(map[x+1] && map[x+1][y] && map[x+1][y] >= (map[x][y]-1)){
                    graph.addEdge(x*map[0].length+y, (x+1)*map[0].length+y);
                }
                if(map[x-1] && map[x-1][y] && map[x-1][y] >= (map[x][y]-1)){
                    graph.addEdge(x*map[0].length+y, (x-1)*map[0].length+y);
                }
                if(map[x][y+1] && map[x][y+1] >= (map[x][y]-1)){
                    graph.addEdge(x*map[0].length+y, x*map[0].length+y+1);
                }
                if(map[x][y-1] && map[x][y-1] >= (map[x][y]-1)){
                    graph.addEdge(x*map[0].length+y, x*map[0].length+y-1);
                }
            }
    }
    return graph;
}

const part2 = (input) => {
    const map = input.split("\r\n").map(line => line.split("").map(char => char == "S" ? 1 : char == "E" ?  26 : char.charCodeAt(0) - 96));
    const original = input.split("\r\n").map(line => line.split(""))
    const endPos = [original.findIndex(line => line.includes("E")), original[original.findIndex(line => line.includes("E"))].findIndex(char => char == "E")];
    const g = createGraph(map, true);
    const paths = g.dijkstra(endPos[0]*map[0].length+endPos[1]);
    const allANodes = [];
    for(let x = 0; x < map.length; x++){
        for(let y = 0; y < map[x].length; y++){
            if(map[x][y] == 1){
                allANodes.push(x*map[0].length+y); //Same nomencalture as the graph
            }
        }
    }
    const shortestToA = allANodes.reduce((acc, node) => paths[node] < acc ? paths[node] : acc, Infinity);
    console.log("Part 2:", shortestToA);
}





part1(input);
part2(input);