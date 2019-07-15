
const request = require('request');
const express = require('express');

const app = express();

let text_dict = '';
let arr_dict = [];
var result_obj = {};

const isPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
}

const remove_linebreaks = str => { 
    return str.replace( /[\r\n]+/gm, " "); 
}

const options = {
    url: `http://www.gutenberg.org/cache/epub/10/pg10.txt`,
    method: 'GET',
    headers: {
        'Accept': 'text/plain',
        'Accept-Charset': 'utf-8'
    }
};

app.get('/get_dictionary', (req, res) => {
    console.log("length ot dictionary:", arr_dict.length);
    if (Object.keys(result_obj).length === 0 && result_obj.constructor === Object) { // check if object already exists
        for (let i = 0; i < arr_dict.length; i++) {
            let word = arr_dict[i];
            if(!result_obj[word]) {
                const numberOfOccurences = text_dict.match(new RegExp(word, "g")).length;
                const isWordOccurencesPrime = isPrime(numberOfOccurences);
                result_obj[word] = {
                    appearsNum: numberOfOccurences,
                    isPrimeNum: isWordOccurencesPrime
                };
            }
        }
        res.json(result_obj);
    } else {
        res.json(result_obj);
    }  
});

const port = 3000;
app.listen(process.env.PORT || port, () => {
    console.log(`Running server on port ${port}`)
});

request(options, (err, res, body) => {
    if (err) {
        res.status(500);
    } else {
        console.log("got unprocessed bible!");
        text_dict = remove_linebreaks(body).replace(/[^a-zA-Z ]/g, "").toLowerCase();
        console.log("got text dictionary");
        arr_dict = text_dict.split(" ");
        console.log("got array dictionary");
        arr_dict = arr_dict.filter(word => {
            return !!word; // word exists - boolean
        });
        console.log("got filtered array dictionary");
    }
}); 

// while((dict && dict.length === 0) || (!dict)) {

// }
