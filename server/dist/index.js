"use strict";

const Express = require('express');
const Path = require('path');

const regex = new RegExp('category');

/**
 * @description - Starts the server and gets everything moving. First attempts to connect to the database, if that
 * fails then it won't start the main server which allows clients to get the index.html page.
 */
function startServer() {

  var app = Express();
  var serv = require('http').Server(app);

  app.get('/category', function (req, res) {
    res.sendFile(Path.resolve(__dirname, '../../', 'client/dist/category/index.html'));
  });

  app.get('/listing', function (req, res) {
    res.sendFile(Path.resolve(__dirname, '../../', 'client/dist/listing/index.html'));
  });

  app.get('/', function (req, res) {

    res.sendFile(Path.resolve(__dirname, '../../', 'client/dist/home/index.html'));
    //Used for testing the SQL server.
    //    res.sendFile(Path.resolve(__dirname,'../../', 'utils/util_tester.html'));
  });

  app.use('/client', Express.static(Path.resolve(__dirname, '../../', 'client')));

  serv.listen(process.env.PORT || 2000);
}

module.exports = {
  'startServer': startServer
};