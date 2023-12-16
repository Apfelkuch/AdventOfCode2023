const fs = require("fs");
const filenames = ["part1_example.txt", "part1.txt"];

fs.readFile(filenames[1], "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  process(data);
});

// const races = [];
const race = {};

function process(data) {
  // let content = [];
  // data.split("\n").forEach((element) => {
  //   content.push(
  //     element
  //       .split(":")[1]
  //       .split(" ")
  //       .filter((elem) => elem)
  //       .map((elem) => Number.parseInt(elem))
  //   );
  // });
  // console.log(content);
  // for (let i = 0; i < content[0].length; i++) {
  //   let race = {};
  //   race.time = content[0][i];
  //   race.distance = content[1][i];
  //   races.push(race);
  // }
  let lines = [];
  data.split("\n").forEach((element) => {
    lines.push(
      Number.parseInt(
        element
          .split(":")[1]
          .split(" ")
          .filter((elem) => elem)
          .join("")
      )
    );
  });
  // console.log(lines);
  race.time = lines[0];
  race.distance = lines[1];
  // console.log(race);
  // console.log(races);

  // let recordBeatingProduct = 1;
  // for (let race of races) {
  let recordBeatingCount = 0;
  let time = race.time;
  let distance = race.distance;
  for (let i = 1; i <= Math.floor(race.time / 2); i++) {
    // console.log(i, time-i);
    // console.log(distance);
    // console.log((i * (time - i)) > distance);
    if (i * (time - i) > distance) {
      ++recordBeatingCount;
    }
  }
  if (time % 2 == 0) {
    recordBeatingCount -= 0.5;
  }
  // console.log("Count", recordBeatingCount);
  recordBeatingCount *= 2;
  // recordBeatingProduct *= recordBeatingCount;
  // }
  // console.log(recordBeatingProduct);
  console.log(recordBeatingCount);
  // Part 1: 500346
  // Part 2: 42515755
}
