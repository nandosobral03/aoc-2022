const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");
const TOTAL_SIZE = 70000000;
const REQUIRED_FOR_UPDATE = 30000000

const create_tree = (line) => {
    let directoryTree = {
        parent: null,
        name: '/',
        children: [],
        files: []
    }
    let currentDirectory = directoryTree;
    let lines = input.split("\r\n");
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        if (line.startsWith("$ cd")) {
            let [_, _cd, directory] = line.split(" ");
            switch (directory) {
                case "..":
                    currentDirectory = currentDirectory.parent;
                    break;
                case "/":
                    currentDirectory = directoryTree;
                    break;
                default:
                    let newDirectory = {
                        parent: currentDirectory,
                        name: directory,
                        children: [],
                        files: []
                    }
                    if (currentDirectory.children.find(child => child.name === directory)) {
                        currentDirectory = currentDirectory.children.find(child => child.name === directory)
                    } else {
                        currentDirectory.children.push(newDirectory);
                        currentDirectory = newDirectory;
                    }
            }

        }
        if (line.startsWith("$ ls")) {
            next_line = lines[i + 1] ? lines[i + 1] : "";
            while (!next_line.startsWith("$") ) {
                if(!next_line) break;
                if (next_line.startsWith('dir')) {
                    let [_dir, directory] = next_line.split(" ");

                    if (!currentDirectory.children.find(child => child.name === directory)) {
                        let newDirectory = {
                            parent: currentDirectory,
                            name: directory,
                            children: [],
                            files: []
                        }
                        currentDirectory.children.push(newDirectory);
                    }
                } else {
                    let [size, name] = next_line.split(" ");
                    if (!currentDirectory.files.find(file => file.name === name)) {
                        let newFile = {
                            name,
                            size:parseInt(size)
                        }
                        currentDirectory.files.push(newFile);
                    }
                }
                i++;
                next_line = lines[i + 1] ? lines[i + 1] : "";
            }
        }
    }
    return directoryTree;
}

const anotate_tree_with_size = (tree) => {
    const file_size = tree.files.reduce((acc, file) => acc + file.size, 0);
    const children_size = tree.children.reduce((acc, child) => acc + anotate_tree_with_size(child), 0);
    tree.size = file_size + children_size;
    return tree.size;
}    
    

const flatten_directories = (tree) => {
    const obj = {
        name : tree.name,
        size: tree.size
    }
    return [obj, ...tree.children.map(child => flatten_directories(child)).flat()];
}


const part1 = (input) => {
    const tree = create_tree(input);
    anotate_tree_with_size(tree);
    const directories = flatten_directories(tree);
    const sizes_under_100mb = directories.filter(dir => dir.size < 100000).reduce((acc,dir) => acc + dir.size,0);
    console.log("Part 1: ", sizes_under_100mb);
}



const part2 = (line) => {
    const tree = create_tree(input);
    anotate_tree_with_size(tree);
    const availabe_size = TOTAL_SIZE - tree.size 
    const amount_required = REQUIRED_FOR_UPDATE - availabe_size;
    const directories = flatten_directories(tree);
    const smallest_over_required = directories.filter(dir => dir.size > amount_required).sort((a,b) => a.size - b.size)[0];
    console.log("Part 2: ", smallest_over_required.size);
}



part1(input);
part2(input);