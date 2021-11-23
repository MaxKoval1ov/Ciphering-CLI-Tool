const path = require("path");
const fs = require("fs");

function checkFile(path) {
  if (fs.existsSync(path)) {
    fs.stat(path, (err, stats) => {
      if (!stats.isFile()) {
        throw new Error("File error");
      }
    });
  } else {
    throw new Error("Invalid path");
  }
}

function parseConsole(args) {
  let map = new Map();
  let count = 0;
  const regExp = /(C1|C0|R1|R0|A)((-C1|-C0|-R1|-R0|-A))*\s/gm;

  args.forEach((el, index) => {
    if (el == "-c" || el == "--config") {
      if (map.has("c")) {
        throw new Error("You provided -c argument more than once");
      } else {
        map.set("c", args[index + 1].match(/(C1|C0|R1|R0|A)/g));
        count++;
      }
    }

    if (el == "-i" || el == "--input") {
      if (map.has("i")) {
        throw new Error("You provided -i argument more than once");
      } else {
        map.set("i", args[index + 1]);
        count++;
      }
    }

    if (el === "-o" || el === "--output") {
      if (map.has("o")) {
        throw new Error("You provided -o argument more than once");
      } else {
        map.set("o", args[index + 1]);
        count++;
      }
    }
  });


  if (!map.has("c")) {
    throw new Error("Config not found");
  }

  if (!map.has("i")) {
    map.set("i",path.join(__dirname,"./input.txt"));
  }

  if (!map.has("o")) {
    map.set("o",path.join(__dirname,"./output.txt"))
  }

  if (count * 2 != args.length - 2) {
    throw new Error("Args error");
  }

  map.forEach((value, key) => {
    if (key == "o" || key == "i") {
      checkFile(path.resolve(value));
    } else if (`${value} `.match(regExp) == null) {
      throw new Error("Config error");
    }
  });

  return map;
}

module.exports = {
  parseConsole,
};
