var socketServer = require('./socket_server');
var httpServer = require('./http_server');

socketServer.startSocketServer();

httpServer.startHttpServer();
