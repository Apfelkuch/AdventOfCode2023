const fs = require("fs");
const filenames = ["part1_example.txt", "part1.txt", "part2_example.txt","t.txt"];

fs.readFile(filenames[3], "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    process(data);
});

const valid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const validSymbol = ["+", "*", "$", "#"]

function process(data) {
    let lines = data.split("\n");
    let field = [];
    for (let i=0; i < lines.length; i++) {
        field[i] = lines[i].split(""); 
    }
    console.log(field);
    let num = "";
    let sum = 0;
    let validpart = false;
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < lines.length; x++) {
            let tmp = field[y][x];
            if (Number.isInteger(Number.parseInt(tmp))) {
                num += tmp;
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (y + i < 0) continue;
                        if (x + j < 0) continue;
                        if (y + i >= field.length) continue;
                        if (x + j >= lines.length) continue;
                        let sym = field[y + i][x + j];
                        if (!valid.includes(sym)) {
                            validpart = true;
                        }
                        // if (validSymbol.includes(sym)) {
                        //     validpart = true;
                        // }
                    }
                }
            } else {
                console.log(num)
                if (validpart && num.length > 1) {
                    sum += Number.parseInt(num);
                    console.log(num);
                }
                num = "";
                validpart = false;
            }
        }
    }
    console.log(sum);
}
