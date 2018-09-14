// some changes

function decoder(encodedMessage){
    let key = 5;
    let decodedMessage = "";
    let alphaDict = {"a":1, "b":2, "c":3, "d":4, "e":5, "f":6, "g":7, "h":8, "i":9, "j":10, "k":11, "l":12, "m":13, 
                    "n":14, "o":15, "p":16, "q":17, "r":18, "s":19, "t":20, "u":21, "v":22, "w":23, "x":24, "y":25, "z":28};

    let i=0;

    // console.log(encodedMessage.length);
    while(i!==encodedMessage.length){
        let counter = 0;
        while(counter<3){

            if(i===encodedMessage.length){
                break;
            }

            let alphaPos, val, decodedChar, temp;
            let asciiVal = encodedMessage[i].charCodeAt();

            if((asciiVal<91 && asciiVal>64) || (asciiVal>96 && asciiVal<123)){ //A-Z, a-z
                if(asciiVal>64 && asciiVal<91){
                    temp = 64;
                } else{
                    temp = 96;
                }
                alphaPos = alphaDict[encodedMessage[i].toLowerCase()]
                if(alphaPos - key <= 0){
                    val = alphaPos - key + 26 + temp;
                    decodedChar= String.fromCharCode(val);
                } else {
                    decodedChar = String.fromCharCode(asciiVal-key);
                }
                decodedMessage += decodedChar;
                // console.log(encodedMessage[i], key, decodedChar);
                counter++;
                i++;
            } else {   //special characters
                decodedMessage += encodedMessage[i];
                i++;
                counter++;
                continue;
            }
        }
        key += 2; 

        if(key>26){
            key = key%26;
        }
    }
   return decodedMessage;
}

// let encodedMessage = "Htsnyhcdjwlevbah! Pfl zxo afsb dwusb srnsyz!"
let fs = require("fs");
const readLine = require("readline-sync");
let fileName = readLine.question("Enter the file name to be decoded:");
let encodedMessage = fs.readFileSync(fileName, "utf-8")
fs.writeFileSync("solution.txt", decoder(encodedMessage));

