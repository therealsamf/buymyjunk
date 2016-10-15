const indexModule = require(__dirname + '/server/dist/index.js');

var startServer = indexModule.startServer;

startServer();