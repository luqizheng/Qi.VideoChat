/**
 * Created by leo-home on 2015/4/16.
 */
var mysql = require('mysql');
var moment = require('moment');
var dbConfig = (function () {
    function dbConfig() {
        this.port = 3306;
    }
    return dbConfig;
})();
exports.dbConfig = dbConfig;
var abstractDb = (function () {
    function abstractDb(config) {
        this.Config = config;
    }
    abstractDb.prototype.Insert = function (Msg) {
    };
    abstractDb.prototype.InsertFromTemplate = function (msg) {
    };
    abstractDb.prototype.List = function (msg, index, size, callback) {
    };
    abstractDb.prototype.Init = function () {
    };
    return abstractDb;
})();
exports.abstractDb = abstractDb;
//# sourceMappingURL=db.js.map