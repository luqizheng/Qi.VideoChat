/**
 * Created by leo-home on 2015/4/8.
 */
var sql = require('mysql');
var moment=require('moment')
/*var config = {
    user: 'sa',
    password: 'sa',
    server: 'localhost:1433', // You can use 'localhost\\instance' to connect to named instance
    database: 'Financial_Data',
    port: 1433,
    options: {
        instanceName: 'SQLEXPRESS'
    }
    /*options: {
     encrypt: true // Use this if you're on Windows Azure
     }*/
//}*/
var config = {
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'vichat'
};
var insertSql="Insert into chat_record (loginidTo,loginIdFrom,createTime,jsonContent) values(?,?,?,?)";
/*
CREATE  TABLE `vichat`.`chat_record` (
`id` INT(20) NOT NULL AUTO_INCREMENT ,
`createTime` DATETIME NULL DEFAULT now() ,
`loginidTo` VARCHAR(45) NULL ,
`loginidFrom` VARCHAR(45) NULL ,
`jsonContent` VARCHAR(5000) NULL ,
    PRIMARY KEY (`id`) )
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

*/
exports.InsertMsg = function (msg) {

    var connection = new sql.createConnection(config);
    connection.connect();
    console.log('form time '+moment().format("YYYY-MM-DD HH:mm"));

    var param=[
        msg.to,
        msg.from,
        moment().format("YYYY-MM-DD HH:mm"),
        JSON.stringify(msg.content)
    ]
    connection.query(insertSql,param,function(err0,res0){
        console.dir(err0);
        console.dir(res0);
    });

}



