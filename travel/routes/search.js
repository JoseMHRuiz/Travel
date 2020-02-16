const express = require("express");
const router = express.Router();
const User = require("../models/User");
const City = require("../models/City");
const Day = require("../models/Day");
const Travel = require("../models/Travel");

router.post('/cities', (req, res, next) => {
    const {days, budget, mode} = req.body;

    console.log(mode);

    let partyMode;
    const value = 3;
    mode.forEach(mode => {
        if(mode === party) {
            partyMode =  `{$gte: ${value}}`;

        } else {
            partyMode = `{$lt: ${value}}`;
        }
        if(mode === relax) {
            partyMode =  `{$gte: ${value}}`;

        } else {
            partyMode = `{$lt: ${value}}`;
        }
        if(mode === party) {
            partyMode =  `{$gte: ${value}}`;

        } else {
            partyMode = `{$lt: ${value}}`;
        }
    });



    // Travel.find( {$and: [ {days: {$size: days}}, {budget: budget} ]})
    // .then((data) => res.json(data))
    // .catch(err => console.log(err));

    Travel.find({$and: [ {days: {$size: days}}, {budget: budget}, {mode: { $elemMatch: {party: `${searchMode}`, cultural: `${searchMode}`, relax: `${searchMode}` } } } ] } )
    .then((data) => res.json(data))
    .catch(err => console.log(err));
});

module.exports = router;