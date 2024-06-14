var express = require('express');
var router = express.Router();

var symbols = ["S", "H", "D", "C"];
var numerals = [ "A", "2", "3", "4", "5", "6", "7", "8", "9","X", "J", "Q", "K"]

router.post('/startNewGame', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    let response = {};
    let cards = {};
    try
    {
        let numPlayers = req.body.numPlayers
        if(numPlayers >= 0){

            // generate cards, while at the same time assigning them to an equal number of players
            let playerCount = Array.from({length: numPlayers}, (e, i)=> i)
            let round = 0;

            symbols.map(function(symbols){
                for(let i = 0; i < numerals.length; i++){
                    cards[symbols + "-" +  numerals[i]] = playerCount[round];
                    round++;
                    if(round >= playerCount.length){
                        // go back to the first player
                        round = 0;
                    }
                }
            });
            
            // players now have an equal number of cards, randomize all cards/2 times
            let keys = Object.keys(cards);
            for(let i = 0; i < keys.length; i +=2){
                let toSwap = keys.length * Math.random() << 0;
                let toSwap2 = keys.length * Math.random() << 0;
                let temp = cards[keys[toSwap]];
                cards[keys[toSwap]] =  cards[keys[toSwap2]];
                cards[keys[toSwap2]] =  temp;
            }
        }
        else {
            throw "Invalid Number of Players"
        }
    }
    catch (exception)
    {
        response["status"] = "error";
        response["message"] = "Irregularity occurred"; //or the usual exception msg
        console.log("Irregularity occurred");
        console.log(exception);
        res.send(response);
        return false;
    }

    response["cards"] = cards;
    response["status"] = "success";
    response["message"] = "OK";
    res.send(response);
});

module.exports = router;
