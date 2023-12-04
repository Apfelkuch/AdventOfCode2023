const fs = require("fs");
const filenames = ["part1_example.txt", "part1.txt", "part2_example.txt", "test.txt"];

fs.readFile(filenames[1], "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    process(data);
});

const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function process(data) {
    let lines = data.split("\n");
    let sum = 0;
    for (let line of lines) {
        let indexe = [];
        let number = [];
        if (line.length < 1) {
            continue;
        }
        // for (let idx = 0; idx < line.length; idx++) {
        //     if (Number.isInteger(Number.parseInt(line[idx]))) {
        //         if (indexe.length < 2) {
        //             indexe.push(idx);
        //             number.push(line[idx]);
        //         } else {
        //             indexe[1] = idx;
        //             number[1] = line[idx];
        //         }
        //     }
        // }
        // console.log("Numbers");
        // console.log(indexe);
        // console.log(number);
        for (let i = 0; i < numbers.length; i++) {
            let idxs = [];
            idxs[0] = line.indexOf(numbers[i]);
            idxs[1] = line.lastIndexOf(numbers[i]);
            let n = i < 9 ? i+1 : Number.parseInt(numbers[i]);
            for (let idx of idxs) {
                if (idx < 0) {
                    continue;
                }if (indexe.length < 2) {
                    indexe.push(idx);
                    number.push(n);
                } else if (idx < indexe[0]) {
                    if (indexe.length == 1) {
                        indexe[1] = indexe[0];
                        number[1] = number[0];
                    }
                    indexe[0] = idx;
                    number[0] = n;
                } else if(idx > indexe[1]) {
                    indexe[1] = idx;
                    number[1] = n;
                }
            }
        }
        if (indexe.length == 1) {
            number[1] = number[0];
        }
        // console.log("Numbers & Words");
        // console.log(indexe);
        // console.log(number);
        sum += 10*Number.parseInt(number[0]) + Number.parseInt(number[1]);
    }
    console.log(sum);
}
