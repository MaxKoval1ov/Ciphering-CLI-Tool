const { parseConsole } = require("./CmdLine");


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


module.exports = {  parseMap, getConfigObject}