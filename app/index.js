'use strict'

var express = require('express');
var routes = require('./routes');
var path = require('path');

var app = module.exports = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

app.locals.title = 'MarvelWar';

app.use('/api', routes);

// ERRORS//
app
  .use(function (req, res, next) {
    res.status(404).send('404. This page does not exist');
  })
  .use(function (err, req, res, next) {
    console.log('error', err.stack);
    res.status(500).send('An error has occurred');
  });

startNodeListener();

function startNodeListener() {
  var port = process.env.PORT || 5000;
  var server = app.listen(port, function () {
    var port = server.address().port;
    var mode = app.get('env');

    console.log(`Server listening on port ${port} in ${mode} mode...`);
  });
};
