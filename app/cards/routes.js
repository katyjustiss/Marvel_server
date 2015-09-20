'use strict';
var express = require('express');
var router = express.Router();

var ctrl = require('./controller');

router.get('/cards', ctrl.index);

// router.get('/game', function (req, res) {
// })

module.exports = router;
