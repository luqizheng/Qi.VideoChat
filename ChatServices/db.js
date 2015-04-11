/**
 * Created by leo-home on 2015/4/8.
 */
var sql = require('mssql');

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
    user: 'sa',
    password: 'sa',
    server: 'localhost:1433',
    driver: 'tedious',
    database: 'Financial_Data',
    port:'1433',
    instanceName:'SQLEXPRESS',
    options: {
        instanceName: 'SQLEXPRESS'
    }
};

exports.InsertMsg = function (msg) {

    var connection = new sql.Connection(config, function (err) {

        // ... error checks

        // Query
        console.dir(err);
        var request = new sql.Request(connection); // or: var request = connection.request();

        request.input('@loginidTo', msg.to);
        request.input('@loginIdFrom', msg.from);
        request.input('@createTime', Date());
        request.input('@loginidTo', JSON.stringify(msg.content));

        request.execute("Insert into chat_msgRecord (loginidTo,loginIdFrom,createTime,jsonContent) values(@loginidTo,@loginIdFrom,@createTime,@jsonContent)",
            function (err, recordset) {
                // ... error checks
                console.log('kdjfkajdfklajsdlkf')
                console.dir(err);
            });


    });

    connection.connect()


}



