let alphabetUpper = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

let alphabetLower = [
"a",
"b",
"c",
"d",
"e",
"f",
"g",
"h",
"i",
"j",
"k",
"l",
"m",
"n",
"o",
"p",
"q",
"r",
"s",
"t",
"u",
"v",
"w",
"x",
"y",
"z",
];


function encrypt(string, num) {
  if (string === undefined ) throw new Error("Incorrect arguments!");
  string = string.split("");
  let res=[];
  string.forEach(element => {
    if(/[A-Z]/.test(element))
    {
      res.push(alphabetUpper[(alphabetUpper.indexOf(element) + num )%26])
    }
    else if( /[a-z]/.test(element)){
      res.push(alphabetLower[(alphabetLower.indexOf(element) + num )%26])
    }
    else
    res.push(element);
  });
  return res.join("");
}

function decrypt(string, num) {
  if (string === undefined ) throw new Error("Incorrect arguments!");
  string = string.split("");
  let res=[];
  string.forEach(element => {
    if(/[A-Z]/.test(element))
    {
      res.push(alphabetUpper[(alphabetUpper.indexOf(element) + 26 - num)%26])
    }
    else if( /[a-z]/.test(element)){
      res.push(alphabetLower[(alphabetLower.indexOf(element) + 26 - num)%26])
    }
    else
    res.push(element);
  });
  return res.join("");
}

function encryptC(string){
  return encrypt(string,1);
}

function decryptC(string){
  return decrypt(string,1);
}

function encryptR(string){
  return encrypt(string,13);
}

function decryptR(string){
  return decrypt(string,13);
}
function encryptA(string){
  if (string === undefined) throw new Error("Incorrect arguments!");
  string = string.split("");
  let alphabetUpperReversed = alphabetUpper.slice().reverse();
  let alphabetLowerReversed = alphabetLower.slice().reverse();
  let res=[];
  string.forEach(element => {
    if(/[A-Z]/.test(element))
    {
      res.push(alphabetUpperReversed[alphabetUpper.indexOf(element)]);
    }    else
    if(/[a-z]/.test(element))
    {
      res.push(alphabetLowerReversed[alphabetLower.indexOf(element)]);
    }
    else
    res.push(element);
  });
  return res.join("") ;
}


module.exports = {encryptA, encryptC, encryptR, decryptC, decryptR};