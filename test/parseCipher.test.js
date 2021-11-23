const { test, expect, describe } = require("@jest/globals");
const fs = require("fs");
const path = require("path");

const { getConfigObject } = require("../src/parseCipher");
const { parseConsole } = require("../src/CmdLine");
const {
  encryptA,
  encryptC,
  encryptR,
  decryptC,
  decryptR,
} = require("../src/Encoder");
const { pipeline } = require("stream");

function clg(){
    console.log("Done!");
}

const A = encryptA;
const R1 = encryptR;
const R0 = decryptR;
const C1 = encryptC;
const C0 = decryptC;

console.log(A);

let text1 = `This is secret. Message about "_" symbol!`;
let text2 = `Это секрет`;
let text3 = `123456789`;

describe("Atbash", () => {
  test("correct encoding", () => {
    expect(A(text1)).toBe(`Gsrh rh hvxivg. Nvhhztv zylfg "_" hbnylo!`);
  });

  test("russian alphabet", () => {
    expect(A(text2)).toBe(`Это секрет`);
  });

  test("different characters", () => {
    expect(A(text3)).toBe(`123456789`);
  });
});

describe("Rot-13", () => {
  test("correct encoding", () => {
    expect(R1(text1)).toBe(`Guvf vf frperg. Zrffntr nobhg "_" flzoby!`);
  });

  test("russian alphabet", () => {
    expect(R1(text2)).toBe(`Это секрет`);
  });

  test("different characters", () => {
    expect(R1(text3)).toBe(`123456789`);
  });

  test("correct decoding", () => {
    expect(R0(R1(text1))).toBe(`This is secret. Message about "_" symbol!`);
  });
});

describe("Cipher", () => {
  test("correct encoding", () => {
    expect(C1(text1)).toBe(`Uijt jt tfdsfu. Nfttbhf bcpvu "_" tzncpm!`);
  });

  test("russian alphabet", () => {
    expect(C1(text2)).toBe(`Это секрет`);
  });

  test("different characters", () => {
    expect(C1(text3)).toBe(`123456789`);
  });

  test("correct decoding", () => {
    expect(C0(C1(text1))).toBe(`This is secret. Message about "_" symbol!`);
  });
});

const configArr1 = [null, null, "-c", "R1-A"];
const configArr2 = [
  null,
  null,
  "-c",
  "R1-A-R0-A-C1",
  "-i",
  "inp.txt",
  "-o",
  "out.txt",
];

describe("Console parsing", () => {
  test("correct parsing1", () => {
    expect(getConfigObject(configArr1)).toEqual({
      commands: ["R1", "A"],
      inputFile: "/home/maksim/Ciphering-CLI-Tool/src/input.txt",
      outputFile: "/home/maksim/Ciphering-CLI-Tool/src/output.txt",
    });
  });

  test("correct parsing2", () => {
    expect(getConfigObject(configArr2)).toEqual({
      commands: ["R1", "A", "R0", "A", "C1"],
      inputFile: "inp.txt",
      outputFile: "out.txt",
    });
  });
});


