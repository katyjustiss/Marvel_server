'use strict';

var _ = require('lodash');

var pg = require('pg');
var db = db || 'marvel';
var url = process.env.DATABASE_URL || `postgres://localhost:5432/${db}`;

function query (sql, paramsOrCb, cb) {
  pg.connect(url, function (err, db, done) {
    if (err) throw err;

    if (typeof paramsOrCb === 'function') {
      db.query(sql, function (err, res) {
        paramsOrCb(err, res.rows);
      });
    } else {
      db.query(sql, paramsOrCb, function (err, res) {
        cb(err, res.rows);
      });
    }

    done();

  });
};



function Card() {};

Card.findAll = function (cb) {
  query('SELECT * FROM characters INNER JOIN images ON (characters.characterid = images.characterid) INNER JOIN attack ON (characters.characterid = attack.characterid) INNER JOIN defense ON (characters.characterid = defense.characterid);', function (err, cards) {
    if (err) throw err;
    var prototypedOrders = cards.map(function (card) {
      return setPrototype(card);
    });

    cb(err, prototypedOrders);
  });
};

// Card.findById = function (id, cb) {
//   query('SELECT * FROM characters INNER JOIN images ON (characters.characterid = images.characterid) INNER JOIN attack ON (characters.characterid = attack.characterid) INNER JOIN defense ON (characters.characterid = defense.characterid) WHERE id = characters.characterid;')
// };


module.exports = Card;

function setPrototype(pojo) {
  return _.create(Card.prototype, pojo);
}








