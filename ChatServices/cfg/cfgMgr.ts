/**
 * Created by leo-home on 2015/4/16.
 */

/// <reference path='../types/node/node.d.ts' />

/// <reference path='../Db/db.ts' />


import fs=require('fs');
import DB=require("../db/db");
import mysqlDB=require('../db/db')
import dbProvider=require('../db/dbProvider')
import SSO=require('../sso/sso');
var extend = require('extend');

var ssoCfg:SSO.sso = null;
var ssoCfgReadTime = null;
var dbCfg:DB.dbConfig = null;
var dbCfgReadTime = null;

export function getSsoCfg(callback:(sso:SSO.sso)=>any) {
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
            readfile()
        }
    });


    function readfile() {
        var result = JSON.parse(fs.readFileSync(cfgFile, 'utf-8'))
        result = extend(new SSO.sso(), result);
        ssoCfgReadTime = Date();
        callback(result);
    }
}

export function getDbCfg(callback:(db:DB.abstractDb)=>any) {
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
            readFile()
        }
    })

    function readFile() {
        var config = JSON.parse(fs.readFileSync(cfgFile, 'utf-8'))
        dbCfgReadTime = Date();
        var result = dbProvider.createDb(config)
        callback(result);
    }
}



