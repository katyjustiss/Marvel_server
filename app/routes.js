'use strict';

var express = require('express');
var router = express.Router();

var cards = require('./cards/routes');

router.use('/', cards);

module.exports = router;
