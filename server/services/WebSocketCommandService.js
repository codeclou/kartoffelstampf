/**
 * Licensed under MIT License
 * Copyright (c) 2017 Bernhard Grünewaldt
 */
const url = require('url');
const spawn = require('child_process').spawn;

class WebSocketCommandService {

    constructor(wss) {
        this.wss = wss;
        this.init();
    }

    init() {
        const self = this;
        self.wss.on('connection', function connection(ws) {
            const location = url.parse(ws.upgradeReq.url, true);
            // You might use location.query.access_token to authenticate or share sessions
            // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

            ws.on('message', function incoming(message) {
                console.log('received command instruction', message);
                //console.log(location);
                const commandInstruction = JSON.parse(message);
                self.dispatchCommandWithWebsocketResponse(ws, commandInstruction);
            });

        });

    }

    /**
     *
     * commandInstruction Expected Format:
     * {
     *   command: 'optipng',
     *   commandArguments: [
     *     '-o5',
     *     '/u/dsfsdfdsf'
     *   ]
     * }
     *
     * @param ws {Object} the Websocket-Object
     * @param commandInstruction {Object} containing cmd and arguments to execute
     */
    dispatchCommandWithWebsocketResponse(ws, commandInstruction) {
        //const cmd = spawn('bash', [ path.join(__dirname, 'dummy-cmd.sh') ]);
        const cmd = spawn(commandInstruction.command, commandInstruction.commandArguments);
        cmd.stdout.on('data', function (data) {
            ws.send(JSON.stringify({
                type: 'stdout',
                payload: {
                    text: data.toString()
                }
            }));
        });
        cmd.stderr.on('data', function (data) {
            ws.send(JSON.stringify({
                type: 'stderr',
                payload: {
                    text: data.toString()
                }
            }));
        });
        cmd.on('exit', function (code) {
            ws.send(JSON.stringify({
                type: 'processStatus',
                payload: {
                    exitCode: code.toString(),
                    text: 'child process exited with code ' + code.toString()
                }
            }));
        });
    }
}
module.exports = WebSocketCommandService;