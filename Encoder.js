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

class Encoder {
encrypt(string, num) {
  if (string === undefined ) throw new Error("Incorrect arguments!");
  string=string.split("");
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
decrypt(string, num) {
  if (string === undefined ) throw new Error("Incorrect arguments!");
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

encryptC(string){
  return this.encrypt(string,1);
}

decryptC(string){
  return this.decrypt(string,1);
}

encryptR(string){
  return this.encrypt(string,13);
}

decryptR(string){
  return this.decrypt(string,13);
}
encryptA(string){
  if (string === undefined) throw new Error("Incorrect arguments!");
  string = string.split("");
  let alphabetUpperReversed = alphabetUpper.slice().reverse();
  let alphabetLowerReversed = alphabetLower.slice().reverse();
  let res=[];
  string.forEach(element => {
    if(/[A-Z]/.test(element))
    {
      res.push(alphabetUpperReversed[alphabetUpper.indexOf(element)]);
    }
    if(/[a-z]/.test(element))
    {
      res.push(alphabetLowerReversed[alphabetLower.indexOf(element)]);
    }
    else
    res.push(element);
  });
  return res.join("") ;
}
}

module.exports = Encoder;