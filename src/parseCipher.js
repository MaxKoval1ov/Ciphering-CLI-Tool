const { pipeline } = require("stream");
const { object } = require("webidl-conversions");
const { parseConsole } = require("./CmdLine");

const {
  MyWriteStream,
  MyReadStream,
  myTransformR,
  myTransformA,
  myTransformC,
} = require("./Mystreams");

let input, output;
let commands = [];

function parseCommands(commandsArr) {
  let commands = [];
  commandsArr.forEach((el) => {
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
  let obj = {};
  map.forEach((value, key) => {
    if (key == "c") {
      obj["commands"] = value;
    }
    if (key == "i") {
      obj["inputFile"] = value;
      // input = new MyReadStream(value);
    }
    if (key == "o") {
      obj["outputFile"] = value;
      // output = new MyWriteStream(value)
    }
  });
return obj;
}

function getConfigObject(args){
  return parseMap(parseConsole(args))
}


module.exports = { parseCommands, parseMap, getConfigObject}