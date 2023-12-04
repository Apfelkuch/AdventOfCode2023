const fs = require("fs");
const filenames = ["part1_example.txt", "part1.txt", "part2_example.txt"];

fs.readFile(filenames[1], "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    process(data);
});

const colors = [["red", 12] , ["green", 13], ["blue", 14]]

function process(data) {
    let lines = data.split("\n");
    let sum = 0;
    for (let line of lines) {
        let id = Number.parseInt(line.slice(5,line.indexOf(":")));
        let possible = true;
        let games = line.slice(line.indexOf(":")+1).split(";");
        for (let game of games) {
            let pulls = game.split(",");
            for (let pull of pulls) {
                let count = Number.parseInt(pull.slice(0,pull.lastIndexOf(" ")));
                for (let idx in colors) {
                    if (pull.indexOf(colors[idx][0]) > 0) {
                        if (count > colors[idx][1]) {
                            possible = false;
                        }
                    }
                }
            }
        }
        if (possible) {
            sum += id;
        }

    }
    console.log(sum);
}
