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
    let points = 0;
    for (line of lines) {
        let content = line.split(":")[1].split("|");
        let winning = [];
        let gamepoints = 0;
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
                    ++gamepoints;
                    break;
                }
            }
        }
        gamepoints = 1<<(gamepoints-1);
        if (gamepoints < 0) gamepoints = 0;
        // console.log(gamepoints);
        points += gamepoints;
    }
    console.log(points);
}
