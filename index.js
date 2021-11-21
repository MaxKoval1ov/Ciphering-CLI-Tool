const readline = require("readline");
const { stdin: input, stdout: output, config } = require("process");
const Encoder = require("./Encoder");

const encoder = new Encoder();

let commands = [];
let inputFile = "";
let outputFile = "";
let conf = "";
let parsedConf = "";

function parseConsole(){
  process.argv.forEach((el,index) => {
    if(el == "-i" || el == "--input")
      inputFile = process.argv[index + 1];
    if(el == "-o" || el == "--output")
      outputFile = process.argv[index + 1];
    if(el == "-c" || el == "--config")
      {
        conf = process.argv[index + 1];
        parsedConf = conf.match(/[A-Fa-f]\d*/g);
      }
  })
  
}



function paeseConfig(configMas){
  configMas.forEach((el) => {
    console.log(el)
  })
}



parseConsole();
console.log(encoder.encryptC(encoder.encryptC(encoder.encryptC('This is secret. Message about "_" symbol!'))));
console.log(encoder.encryptA("abc"));
console.log(encoder.encryptAA("abc"));