"use strict"

var Card = require('./Cards');

module.exports.index = function (req, res){
  Card.findAll (function (err, cards){
    if (err) throw err;
    res.format ({
      json: function () {
        res.json({cards : cards});
      }
    });
  });

};

