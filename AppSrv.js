'use_strict';

const { execFile } = require('child_process');
const fs = require('fs');
const net = require('net');
const process = require('process');
const Conf = require('./Conf').Conf;
const cl = require('./cl').cl;

class AppSrv {
    start () {
        this.conf = new Conf(process.argv);
        this.confAppService = this.conf.read();
        if ( ! this.confAppService) {
            cl("AppSrv Startup failed.");
            return;
        }
        this.writePidFile();
        net.createServer((sock) => {
            let allData = '';
            sock.on('data', (data) => {
                allData = allData + data;
            });
            sock.on('close', () => {
                this.spawnApp(allData);
            });
        }).listen(this.conf.getAppServicePort(), this.conf.getAppServiceHost());
        cl('AppSrv Listening on ' + this.conf.getAppServiceHost() + ':' + this.conf.getAppServicePort());
    }

    writePidFile () {
        fs.writeFile('AppSrv.pid', process.pid.toString(), function (err) {
            if (err) throw err;
        });
    }

    spawnApp (allData) {
        //cl("spawnApp allData: " + allData);
        const sIdx = allData.indexOf(' ');
        if (allData.slice(0, 1) != '@') {
            cl("ERROR untyped client request!");
            return;
        }
        // Must have at sign then at least one char for "label", i.e. @q tcp://mything.com:8888
        if (sIdx <= 1) {
            cl("ERROR!!  incomprehensible request from client:");
            cl(allData);
            return;
        }
        const cmd = this.parseApp(allData.slice(0, sIdx));
        if (typeof(cmd) == 'undefined') {
            cl('ERROR: unable to match any key in application map defined in .magoo-config, request is: ' + allData);
            return;
        }
        const rest = this.parseArgs(cmd, allData.slice(sIdx) + 1);
        const opts = { stdio: 'ignore' };
        const eProc = execFile(cmd, rest, opts);
        eProc.on('error', function (err) {
            cl(err);
        });
        eProc.stdout.on('data', (data) => {
            cl(data);
        });
        eProc.stderr.on('data', (data) => {
            cl(data);
        });
    }

    parseApp (app) {
        //cl("Map: " + JSON.stringify(this.conf.getAppServiceMap(), null, 2));
        //assert app.slice(0, 1) == '@';
        return this.conf.getAppServiceMap()[app.slice(1)];
    }

    parseArgs (cmd, rest) {
        return [ rest ];
    }
}

const aS = new AppSrv();
aS.start();


// Ends here.
