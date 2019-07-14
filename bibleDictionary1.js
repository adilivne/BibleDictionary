
const request = require('request');
const fs = require("fs");
const express = require('express');

const app = express();




const options = {
    url: `http://www.gutenberg.org/cache/epub/10/pg10.txt`,
    method: 'GET',
    headers: {
        'Accept': 'text/plain',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'bible-dictionary'
    }
};

request(options, function (err, res, body) {
    // var regex = /[-_'()"]/gi;
    var regex = /[|-|_|.|'|(|)|"|:|0-9]/gi;

    var cleanTxt = body.replace(regex, "");

    fs.writeFile("./cleanText.txt", cleanTxt, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}); 
    // var foundWord = cleanTxt.search("its");
    // var foundWord = cleanTxt.match(/\sits\s/gi);
    // if(!foundWord) {
    //     console.log("word isn't found");
    // } else {

    //     var prime = isPrime(foundWord.length);
    //     console.log("is prime: " + prime);
    // }


app.get('/search/:words1/:words2?/:words3?/:words4?/:words5?/:words6?/:words7?/:words8?/:words9?/:words10?/:words11?/:words12?', function (req, res) {
    var orderedParams = [];

    var obj = req.params;
    var result = Object.keys(obj).map(function(key) {
        if(obj[key] === undefined){
            delete obj[key];
        }
        return obj[key];
      });
      
isMatch(result, function (err, finalArr) {
    if (err) {
        return next(err);
    };

        res.send(finalArr);

});
});


const isMatch = (wordsToCheck, cb) => {
    var foundWordsArr = [];

fs.readFile('cleanText.txt', "utf8", function(err, data) {
    if (err) {
        throw err;
    }
    for (let i = 0; i < wordsToCheck.length; i++) {
        var word = '';
         word = wordsToCheck[i];

        // var re = new RegExp(' '+word+' ','gi');
        var re = new RegExp(" " + word + " ", "gi");
        // .match(/\sits\s/gi)
        var foundWord = data.match(re);
    if(!foundWord) {
        let newWordObj = { found: "word: "+re+"isn't found"}
        foundWordsArr.push(newWordObj);
    } else {

        var prime = isPrime(foundWord.length);
        // console.log("is prime: " + prime);

        // let found = foundWord[0];
        let newWordObj = { found: foundWord[0] , appearsNum: foundWord.length, isPrimeNum: prime}
        foundWordsArr.push(newWordObj);
        // console.log(foundWordsArr[0]);
        // res.send(foundWordsArr);
    }
    }
    cb(null, foundWordsArr);
});
}



// // This line opens the file as a readable stream
// var readStream = fs.createReadStream('cleanText.txt');

// // This will wait until we know the readable stream is actually valid before piping
// readStream.on('open', function () {
//   // This just pipes the read stream to the response object (which goes to the client)
//   readStream.pipe(res);
// console.log('now what');
// });

// // This catches any errors that happen while creating the readable stream (usually invalid names)
// readStream.on('error', function(err) {
// //   res.end(err);
// console.log('err');
// });


const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
}

const port = 3000;
app.listen(process.env.PORT || port, () => {
    console.log(`Running server on port ${port}`)
});


// app.get(':first/:second/:third', function (req) {
//     var orderedParams = [];
//     for (var i = 0; i < req.route.keys; i++) {
//         orderedParams.push(req.params[req.route.keys[i].name]);
//     }
//     output.apply(this, orderedParams);
// });

// function output() {
//     for(var i = 0; i < arguments.length; i++) {
//         console.log(arguments[i]);
//     }
// }