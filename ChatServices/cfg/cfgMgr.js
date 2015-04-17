/**
 * Created by leo-home on 2015/4/16.
 */
/// <reference path='../types/node/node.d.ts' />
/// <reference path='../Db/db.ts' />
var fs = require('fs');
var dbProvider = require('../db/dbProvider');
var SSO = require('../sso/sso');
var extend = require('extend');
var ssoCfg = null;
var ssoCfgReadTime = null;
var dbCfg = null;
var dbCfgReadTime = null;
function getSsoCfg(callback) {
    var cfgFile = './config.json';
    if (ssoCfgReadTime == null || ssoCfg == null) {
        readfile();
        return;
    }
    fs.stat(cfgFile, function (err, state) {
        if (err) {
            console.dir(err);
            return;
        }
        if (state.mtime > dbCfgReadTime) {
            readfile();
        }
    });
    function readfile() {
        var result = JSON.parse(fs.readFileSync(cfgFile, 'utf-8'));
        result = extend(new SSO.sso(), result);
        ssoCfgReadTime = Date();
        callback(result);
    }
}
exports.getSsoCfg = getSsoCfg;
function getDbCfg(callback) {
    var cfgFile = "./db.json";
    if (dbCfg == null) {
        readFile();
        return;
    }
    fs.stat(cfgFile, function (err, state) {
        if (err) {
            console.dir(err);
            return;
        }
        if (state.mtime > dbCfgReadTime) {
            readFile();
        }
    });
    function readFile() {
        var config = JSON.parse(fs.readFileSync(cfgFile, 'utf-8'));
        dbCfgReadTime = Date();
        var result = dbProvider.createDb(config);
        callback(result);
    }
}
exports.getDbCfg = getDbCfg;
//# sourceMappingURL=cfgMgr.js.map