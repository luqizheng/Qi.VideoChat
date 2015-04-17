/**
 * Created by leo-home on 2015/4/16.
 */
/* my mysql*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mysql = require('mysql');
var moment = require('moment');
var poolModule = require('generic-pool');
var DB = require('./db');
var mysqlDb = (function (_super) {
    __extends(mysqlDb, _super);
    function mysqlDb(config) {
        _super.call(this, config);
        var self = this;
        this.pool = poolModule.Pool({
            name: 'mysql',
            create: function (callback) {
                var config = {
                    host: self.Config.server,
                    user: self.Config.user,
                    password: self.Config.pwd,
                    database: self.Config.database
                };
                var connection = new mysql.createConnection(config);
                //connection.connect();
                callback(null, connection);
            },
            destroy: function (client) {
                console.log('Pool destory a connection of mysql.');
                client.end();
            },
            max: 10,
            // optional. if you set this, make sure to drain() (see step 3)
            min: 2,
            // specifies how long a resource can stay idle in pool before being removed
            idleTimeoutMillis: 3000000,
            // if true, logs via console.log - can also be a function
            log: false
        });
    }
    mysqlDb.prototype.Insert = function (msg) {
        this.pool.acquire(function (err, connection) {
            if (err) {
                console.log('Faile to get connection from pool.');
                return;
            }
            if (connection.state == "disconnected") {
                console.log("get closed connection from pool, so open it again.");
                connection.connect();
            }
            console.log('form time ' + moment().format("YYYY-MM-DD HH:mm"));
            var param = [
                msg.to,
                msg.from,
                moment().format("YYYY-MM-DD HH:mm"),
                JSON.stringify(msg.content)
            ];
            var insertSql = "Insert into chat_record (loginidTo,loginIdFrom,createTime,jsonContent) values(?,?,?,?)";
            connection.query(insertSql, param, function (err0, res0) {
                console.dir(err0);
                console.dir(res0);
            });
        });
    };
    mysqlDb.prototype.List = function (msg, index, size) {
        return [];
    };
    mysqlDb.prototype.Init = function () {
        /*use  orn;

         CREATE  TABLE IF NOT EXISTS `chat_record` (
         `id` INT(20) NOT NULL AUTO_INCREMENT ,
         `createTime` DATETIME NULL DEFAULT now() ,
         `loginidTo` VARCHAR(45) NULL ,
         `loginidFrom` VARCHAR(45) NULL ,
         `jsonContent` VARCHAR(5000) NULL ,
         PRIMARY KEY (`id`) )
         DEFAULT CHARACTER SET = utf8
         COLLATE = utf8_unicode_ci;*/
        this.pool.acquire(function (err, conn) {
            var sql = " CREATE  TABLE IF NOT EXISTS `chat_record` (";
            sql += "`id` INT(20) NOT NULL AUTO_INCREMENT ,";
            sql += "`createTime` DATETIME NULL DEFAULT now() ,";
            sql += "`loginidTo` VARCHAR(45) NULL ,";
            sql += "`loginidFrom` VARCHAR(45) NULL ,";
            sql += "`jsonContent` VARCHAR(5000) NULL ,";
            sql += "PRIMARY KEY (`id`) ) ";
            sql += "DEFAULT CHARACTER SET = utf8 ";
            sql += "COLLATE = utf8_unicode_ci";
            conn.query(sql, function (err, data) {
                if (err) {
                    console.log("fail to init mysql db.");
                    console.dir(err);
                }
                console.log("init mysql db");
            });
        });
    };
    return mysqlDb;
})(DB.abstractDb);
exports.mysqlDb = mysqlDb;
//# sourceMappingURL=mysql.js.map