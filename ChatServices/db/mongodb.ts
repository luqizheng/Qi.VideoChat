/**
 * Created by leo-home on 2015/4/18.
 */
///<reference path='../types/mongodb/mongodb.d.ts'/>
import notifyTypes=require('../NotifyType');
import DB=require('./db')
var mongo = require('mongodb');


export class mongodb extends DB.abstractDb {

    constructor(config:DB.dbConfig) {
        super(config);
        // 'mongodb://localhost:27017/msg';
        this.url='mongodb://'+config.server+':'+config.port+'/'+config.database;
    }

    url:string;

    Insert(msg:notifyTypes.Msg) {

        var dbClient = mongo.MongoClient;
        var collectionName='chat_record';
        dbClient.connect(this.url, function (err, db) {
            if(!err){
                console.dir(err);
            }
            var collection = db.collection(collectionName);
            if (!collection) {
                console.log("collection is empty, so create a new one for " + collectionName);
                db.createCollection(collectionName);
            }
            collection.insert(msg)
            dbClient.close()
        });
    }

    List(msg:notifyTypes.Msg, index:Number, size:Number):Array<notifyTypes.Msg> {
        return [];
    }
}