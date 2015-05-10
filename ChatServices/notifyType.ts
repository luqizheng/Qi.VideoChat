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

    var s = strTemplate.replace(/\[{1}[^[].+?\]{1}/g, function (word:any) {
        var content = word.replace('[', '').replace(']')
        if (user[content]) {
            return user[content]
        }
        if (variabled[content]) {
            return variabled[content];
        }
        return content;
    })
    console.log("toContent:" + s);
    return s;
}


export class MsgTemplate{
    to:Array<string>;
    template:string;
}