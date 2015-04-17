/**
 * Created by leo-home on 2015/4/17.
 */
var MysqlDB = require('./mysql');
function createDb(config) {
    switch (config.dbtype) {
        case 'mysql':
            return new MysqlDB.mysqlDb(config);
            break;
        default:
            throw new Error(config.dbtype + 'is invalide db type.');
            break;
    }
}
exports.createDb = createDb;
//# sourceMappingURL=dbProvider.js.map