const fs = require("fs");
const filenames = ["part1_example.txt", "part1.txt", "part2_example.txt"];

fs.readFile(filenames[1], "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    process(data);
});

let conversions = new Map();

let seeds = [];

function process(data) {
    parts = data.split("\n\n");
    for (let part of parts) {
        content = part.split(":");
        if (content[0] === "seeds") {
            content[1].split(" ").forEach(element => {
                if (element.length < 1) return;
                seeds.push(Number.parseInt(element));
            });
        }
        else if (content[0].includes("map")) {
            let category = content[0].slice(0, -4).split("-");
            let conversion = {};
            conversion.to = category[2];
            conversion.maps = [];
            
            content[1].split("\n").forEach(line => {
                if (line.length < 1) return;
                let range = [];
                line.split(" ").forEach(num => {
                    range.push(Number.parseInt(num));
                });
                let map = {};
                map.sourceStart = range[1];
                map.destinationStart = range[0];
                map.length = range[2];
                conversion.maps.push(map);
            });
            
            conversions.set(category[0], conversion);
        }
        else {
            console.log(content);
            console.log("ERROR: part is not recognized")
        }
    }
    // console.log(seeds);
    // console.log(conversions);

    let locations = [];
    for (let seed of seeds) {
        let currentNumber = seed;
        let currentCategory = "seed";
        let path = [];
        while (currentCategory != "location") {
            path.push(currentNumber);
            let conversion = conversions.get(currentCategory);
            if (conversion == undefined) return -1;
            currentCategory = conversion.to;
            for (let map of conversion.maps) {
                let offsetToStart = currentNumber - map.sourceStart;
                if (offsetToStart >= 0 && offsetToStart < map.length) {
                    currentNumber = map.destinationStart + offsetToStart;
                    break;
                }
            }
        }
        let location = {};
        location.number = currentNumber;
        location.path = path;
        locations.push(location);
    }
    // console.log(locations);
    let minLocation = Infinity;
    locations.forEach( e => minLocation = Math.min(minLocation, e.number));
    console.log(minLocation);
}
