/**
 * Created by leo-home on 2015/4/16.
 */

/// <reference path='types/socket.io/socket.io.d.ts' />
/// <reference path='types/express/express.d.ts' />
/// <reference path='types/node/node.d.ts' />
/// <reference path='types/express/express-middleware.d.ts' />
import User=require('user');
export class Msg{
    to:string;
    from:string;
    content:any; //defined by any one;
    createTime:Date;
}

function toContent(strTemplate:string, variabled:Array<any>, user:User.DTOUser) {
    var reg = /\[{1}[^[].+?\]{1}/g
    var s = strTemplate.replace(reg, function (word) {
        word = word.replace('[', '').replace(']')
        if (user[word]) {
            return user[word]
        }
        if (variabled[word]) {
            return variabled[word];
        }
        return word;
    })
    console.log("toContent:" + s);
    return s;
}


export class MsgTemplate{
    to:Array<string>;
    template:string;
}