const { pipeline } = require("stream");
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
  if (!output) {
    output = process.stdout;
}
if (!input) {
    input = process.stdin;
    process.stdin.resume();
    process.stdin.on('data', (data) => {
        if(data.toString().match('exit')){
            process.exit(0);
        }
    });
}
}





parseMap(parseConsole());


function success(){
    console.log("Success!");
}

pipeline(input, ...commands,output,success);