/**
 * Created by leo-home on 2015/4/16.
 */
var mysql = require('mysql');
var moment = require('moment')

/// <reference path='../types/node/node.d.ts' />
/// <reference path='../NotifyType.ts' />
import notifyTypes=require('../NotifyType');

export class dbConfig {
    server:string;
    port:number = 3306;
    user:string;
    pwd:string;
    database:string;
    dbtype:string;
}

export class abstractDb {

    constructor(config:dbConfig) {
        this.Config = config;
    }

    public Insert(Msg:notifyTypes.Msg) {
    }

    public InsertFromTemplate(msg:notifyTypes.MsgTemplate){

    }

    public List(msg:notifyTypes.Msg, index:Number, size:Number, callback:(data:Array<notifyTypes.Msg>)=>any) {

    }

    public Init() { // when app start.

    }

    public Config:dbConfig;
}





