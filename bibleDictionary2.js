
const request = require('request');
const fs = require("fs");
const express = require('express');

const app = express();

const isPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
}

const options = {
    url: `http://www.gutenberg.org/cache/epub/10/pg10.txt`,
    method: 'GET',
    headers: {
        'Accept': 'text/plain',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'bible-dictionary'
    }
};

app.get('/test', (req, res) => {
    res.send("success");
});

// request(options, function (err, res, body) {

//     // var regex = /[|-|_|.|'|(|)|"|:|*|\r|\n|,|[|]|#|;|0-9]/gi;

//     // var cleanTxt = body.replace(regex, "");
//     var cleanTxt = body.replace(/:-'0-9/g, "");
//       cleanTxt = cleanTxt.replace(/[^a-z]+/gi, ' ');

//     fs.writeFile("./justText.txt", cleanTxt, function(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("The file was saved!");
//     }); 
// }); 


// // app.get('/get_dictionary', function (req, res) {
//     var foundWordsArr = [];
//     var text = fs.readFileSync("./justText.txt", "utf-8");
//     var arrayOfwords = text.split(" ");
//     // console.log(arrayOfwords);

//     for (let i = 0; i < arrayOfwords.length; i++) {
//         var word = '';
//         word = arrayOfwords[i];

//         if (word === '') {
//             continue;
//         }
//         if (foundWordsArr.length > 0) {
//             for (let j = 0; j < foundWordsArr.length; j++) {
//                 if (word.toLowerCase() === foundWordsArr[j]) {
//                     continue;
//                 }
//             }
//         }
//         // var foundWord = text.match(word);
//         var foundWord = text.match(new RegExp(word, "gi"))
//         if (!foundWord) {
//             console.error("word isn't found");
//         } else {

//             var prime = isPrime(foundWord.length);
//             var theWord = foundWord[0].toLowerCase();
//             let newWordObj = { [theWord]: { appearsNum: foundWord.length, isPrimeNum: prime } }
//             foundWordsArr.push(newWordObj);
//             theWord = '';
//         }
//     }
//     fs.writeFileSync('./final.json', JSON.stringify(foundWordsArr));
//     // res.send(foundWordsArr);
//     // res.json(final);
//     let rawdata = fs.readFileSync('final.json');
//     let student = JSON.parse(rawdata);
//     res.send(student);
// // });


const port = 3000;
app.listen(process.env.PORT || port, () => {
    console.log(`Running server on port ${port}`)
});
