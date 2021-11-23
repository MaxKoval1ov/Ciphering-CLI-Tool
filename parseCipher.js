const { pipeline } = require("stream");
const { parseConsole } = require("./CmdLine");

const {
  MyWriteStream,
  MyReadStream,
  myTransformR,
  myTransformA,
  myTransformC,
} = require("./Mystreams");

let inputFile, outputFile;
let input, output;
let commands = [];

function parseCommands(commandsArr) {
  let commands = [];
  commandsArr.forEach((el) => {
      console.log(el);
    if (el.length == 2) {
      el[1] == "1" ? (encode = true) : (encode = false);
      el[0] == "C"
        ? commands.push(new myTransformC(encode))
        : commands.push(new myTransformR(encode));
    } else {
        commands.push(new myTransformA());
    }
  });
  return commands;
}

function parseMap(map) {
  map.forEach((value, key) => {
    if (key == "c") {
      commands = parseCommands(value);
    }
    if (key == "i") {
      inputFile = value;
      input = new MyReadStream(value);
    }
    if (key == "o") {
      outputFile = value;
      output = new MyWriteStream(value)
    }
  });
}

parseMap(parseConsole());

console.log(inputFile, outputFile, commands.length);

function success(){
    console.log("Success!");
}

pipeline(input, ...commands,output,success);