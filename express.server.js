#!/usr/bin/env node

/**
 * Licensed under MIT License
 * Copyright (c) 2017 Bernhard Grünewaldt
 */
const app = require('./express.app');
const debug = require('debug')('kartoffelstampf:server');
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocketCommandService = require('./server/services/WebSocketCommandService.js');

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


const port = 9999;
app.set('port', port);
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
new WebSocketCommandService(wss);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);