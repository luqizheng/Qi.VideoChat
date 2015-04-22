/**
 * Created by leo-home on 2015/4/17.
 */


import MysqlDB=require('./mysql');
import MongoDB=require('./mongodb')
import DB    =require('./db');

export function createDb(config:DB.dbConfig) {
    switch (config.dbtype) {
        case 'mysql':
            return new MysqlDB.mysqlDb(config)
            break;
        case 'mongodb':

        default :
            throw new Error(config.dbtype + 'is invalide db type.')
            break;

    }
}