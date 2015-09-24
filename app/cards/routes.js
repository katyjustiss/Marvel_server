'use strict';
var express = require('express');
var router = express.Router();

var ctrl = require('./controller');

router.get('/cards', ctrl.index);

module.exports = router;
