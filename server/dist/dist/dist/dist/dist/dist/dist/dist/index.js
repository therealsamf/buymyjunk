"use strict";

const Express = require('express');
const Path = require('path');

/**
 * @description - Starts the server and gets everything moving. First attempts to connect to the database, if that
 * fails then it won't start the main server which allows clients to get the index.html page.
 */
function startServer() {

  var app = Express();
  var serv = require('http').Server(app);

  app.get('/', function (req, res) {
    res.sendFile(Path.resolve(__dirname, '../../', 'client/dist/home/index.html'));
  });

  // app.use('/client', Express.static(Path.resolve(__dirname, '../../', 'client')));

  serv.listen(process.env.PORT || 2000);
}

module.exports = {
  'startServer': startServer
};