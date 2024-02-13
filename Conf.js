'use_strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const toml = require('toml');
const cl = require('./cl').cl;

class Conf {
    constructor (argv) {
        const aL = argv.length;
        this.cmdLineDeploymentId;
        if (aL == 3) {
            this.cmdLineDeploymentId = argv[2];
        }
    }

    read () {
        let conf;
        const confPath = path.join(os.homedir(), ".magoo-config");
        cl("reading config from " +  confPath);
        try {
            conf = toml.parse(fs.readFileSync(confPath));
        }
        catch (e) {
            cl("Parsing error on line " +
               e.line + ", column " + e.column + ": " + e.message);
            throw e;
        }
        if (this.cmdLineDeploymentId) {
            this.deploymentId = this.cmdLineDeploymentId;
            cl("using command line specified deployment: " + this.deploymentId);
        }
        else {
            this.deploymentId = conf['deployments']['default'];
            cl("using default deployment: " + this.deploymentId);
        }
        const depIds = conf['deployments']['ids'];
        //cl("depIds: " + depIds);
        //cl("deploymentId: |" + this.deploymentId + "|");
        if (depIds.indexOf(this.deploymentId) == -1) {
            cl("Can't find deployment id " + this.deploymentId + " in " + confPath + ", aborting.");
        }
        this.deployment = conf[this.deploymentId];
        this.appServiceId = this.deployment['app_service'];
        cl("app service id: " + this.appServiceId);
        this.appService = conf[this.appServiceId];
        //cl("app service: " + JSON.stringify(this.appService, null, 2));
        if ( ! this.appService) {
            cl("Can not find deployment " + this.deploymentId + ", aborting.");
            return null;
        }
        [ this.appServiceHost, this.appServicePort ] = Conf.url2HP(this.appService['url']);
        this.appServiceMap = conf[this.appService['map']];
        return this.appService;
    }

    static url2HP (urlStr) {
        const url = new URL(urlStr)
        const host = url.hostname;
        const port = url.port;
        return [host, port];
    }

    getAppServiceHost () {
        return this.appServiceHost;
    }

    getAppServicePort () {
        return this.appServicePort;
    }

    getAppServiceMap () {
        return this.appServiceMap;
    }
}

exports.Conf = Conf;

// Conf.js ends here
