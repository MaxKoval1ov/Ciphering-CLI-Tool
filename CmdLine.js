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

function parseConsole() {
  let map = new Map();
  let count = 0;
  const regExp = /(C1|C0|R1|R0|A)((-C1|-C0|-R1|-R0|-A))*\s/gm;

  process.argv.forEach((el, index) => {
    if (el == "-c" || el == "--config") {
      if (map.has("c")) {
        throw new Error("Multi c");
      } else {
        map.set("c", process.argv[index + 1].match(/(C1|C0|R1|R0|A)/g));
        count++;
      }
    }

    if (el == "-i" || el == "--input") {
      if (map.has("i")) {
        throw new Error("Multi input");
      } else {
        map.set("i", process.argv[index + 1]);
        count++;
      }
    }

    if (el === "-o" || el === "--output") {
      if (map.has("o")) {
        throw new Error("Multi output");
      } else {
        map.set("o", process.argv[index + 1]);
        count++;
      }
    }
  });


  if (!map.has("c")) {
    throw new Error("Config not found");
  }

  if (!map.has("i")) {
    map.set("i","./input.txt")
  }

  if (!map.has("o")) {
    map.set("o","./output.txt")
  }

  if (count * 2 != process.argv.length - 2) {
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
