const fs = require("fs");
const filenames = ["part1_example.txt", "part1.txt", "part2_example.txt"];

fs.readFile(filenames[1], "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    process(data);
});

function process(data) {
    lines = data.split("\n");
    // let points = 0;
    let copies = [0];
    let totalcarts = 0;
    for (let i = 0; i < lines.length; i++) {
        let content = lines[i].split(":")[1].split("|");
        let winning = [];
        // let gamepoints = 0;
        let pairs = 0;
        content[0].split(" ").forEach(element => {
            let num = Number.parseInt(element);
            if (Number.isInteger(num)) {
                winning.push(num);
            }
        });
        let numbers = [];
        content[1].split(" ").forEach(element => {
            let num = Number.parseInt(element);
            if (Number.isInteger(num)) {
                numbers.push(num);
            }
        });
        for (let n of numbers) {
            for (let w of winning) {
                if (w === n) {
                    // ++gamepoints;
                    ++pairs;
                    break;
                }
            }
        }
        // console.log("Pairs: " + pairs);
        let instances = 1 + copies.shift();
        if (copies.length < 1 ) copies.push(0);
        for (let j = 0; j < pairs; j++) {
            if(copies[j] === undefined) {
                copies[j] = instances;
            } else {
                copies[j] += instances;
            } 
        }
        totalcarts += instances;
        // gamepoints = 1<<(gamepoints-1);
        // if (gamepoints < 0) gamepoints = 0;
        // console.log(gamepoints);
        // points += gamepoints;
        // console.log("Instances: " + instances);
        // console.log("Copies: " + copies)
    }
    // console.log(points);
    console.log(totalcarts);
}
