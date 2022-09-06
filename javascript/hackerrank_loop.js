const readline = require("readline");
const { CLOSING } = require("ws");
const ac = new AbortController();
const signal = ac.signal;

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let nums = [2, 3, 6, 6, 5];

r1.question("Please enter a number", function () {
  let s = "javascriptloops";
  let splitted = s.split("");
  let vowels = [];
  let consonants = [];

  for (let i = 0; i <= splitted.length; i++) {
    if (
      splitted[i] === "a" ||
      splitted[i] === "e" ||
      splitted[i] === "i" ||
      splitted[i] === "o" ||
      splitted[i] === "u"
    ) {
      vowels.push(splitted[i]);
    }
  }
  for (let i = 0; i <= splitted.length; i++) {
    if (
      splitted[i] === "b" ||
      splitted[i] === "c" ||
      splitted[i] === "d" ||
      splitted[i] === "f" ||
      splitted[i] === "g" ||
      splitted[i] === "j" ||
      splitted[i] === "k" ||
      splitted[i] === "l" ||
      splitted[i] === "m" ||
      splitted[i] === "n" ||
      splitted[i] === "o" ||
      splitted[i] === "p" ||
      splitted[i] === "q" ||
      splitted[i] === "s" ||
      splitted[i] === "t" ||
      splitted[i] === "v" ||
      splitted[i] === "x" ||
      splitted[i] === "z" ||
      splitted[i] === "h" ||
      splitted[i] === "w" ||
      splitted[i] === "y"
    ) {
      consonants.push(splitted[i]);
    }
  }
  console.log(vowels, consonants);
});

signal.addEventListener(
  "abort",
  () => {
    console.log("Timed Out!");
  },
  { once: true }
);

setTimeout(() => {
  ac.abort();
  process.exit();
}, 10000);
