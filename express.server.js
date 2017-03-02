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
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


const url = require('url');

wss.on('connection', function connection(ws) {
    const location = url.parse(ws.upgradeReq.url, true);
    // You might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        console.log(location);
    });

    const spawn = require('child_process').spawn;
    const dummyCmd = spawn('bash', [ path.join(__dirname, 'dummy-cmd.sh') ]);
    dummyCmd.stdout.on('data', function (data) {
        ws.send(JSON.stringify({
            type: 'stdout',
            payload: {
                text: data.toString()
            }
        }));
    });
    dummyCmd.stderr.on('data', function (data) {
        ws.send(JSON.stringify({
            type: 'stderr',
            payload: {
                text: data.toString()
            }
        }));
    });
    dummyCmd.on('exit', function (code) {
        ws.send(JSON.stringify({
            type: 'processStatus',
            payload: {
                exitCode: code.toString(),
                text: 'child process exited with code ' + code.toString()
            }
        }));
    });
});
