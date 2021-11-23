const { test, expect, describe } = require("@jest/globals");
const streams = require("../src/Mystreams");
const { parseCommands, parseMap } = require("../src/parseCipher");
const { parseConsole } = require("../src/CmdLine");
const  {encryptA, encryptC, encryptR, decryptC, decryptR}  = require("../src/Encoder");


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
        expect( A( text1 )).toBe( `Gsrh rh hvxivg. Nvhhztv zylfg "_" hbnylo!` );
    })

    test("russian alphabet", () => {
        expect( A( text2 )).toBe( `Это секрет` );
    })

    test("different characters", () => {
        expect( A( text3 )).toBe( `123456789` );
    })

   
})

describe("Rot-13", () => {

    test("correct encoding", () => {
        expect( R1( text1 )).toBe( `Guvf vf frperg. Zrffntr nobhg "_" flzoby!` );
    })

    test("russian alphabet", () => {
        expect( R1( text2 )).toBe( `Это секрет` );
    })

    test("different characters", () => {
        expect( R1( text3 )).toBe( `123456789` );
    })

    test("correct decoding", () => {
        expect( R0(R1( text1 ))).toBe( `This is secret. Message about "_" symbol!` );
    })
   
})
