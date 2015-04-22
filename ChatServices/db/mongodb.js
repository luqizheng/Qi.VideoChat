var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DB = require('./db');
var mongo = require('mongodb');
var mongodb = (function (_super) {
    __extends(mongodb, _super);
    function mongodb(config) {
        _super.call(this, config);
        // 'mongodb://localhost:27017/msg';
        this.url = 'mongodb://' + config.server + ':' + config.port + '/' + config.database;
    }
    mongodb.prototype.Insert = function (msg) {
        var dbClient = mongo.MongoClient;
        var collectionName = 'chat_record';
        dbClient.connect(this.url, function (err, db) {
            if (!err) {
                console.dir(err);
            }
            var collection = db.collection(collectionName);
            if (!collection) {
                console.log("collection is empty, so create a new one for " + collectionName);
                db.createCollection(collectionName);
            }
            collection.insert(msg);
            dbClient.close();
        });
    };
    mongodb.prototype.List = function (msg, index, size) {
        return [];
    };
    return mongodb;
})(DB.abstractDb);
exports.mongodb = mongodb;
//# sourceMappingURL=mongodb.js.map