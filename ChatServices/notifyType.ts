/**
 * Created by leo-home on 2015/4/16.
 */

/// <reference path='types/socket.io/socket.io.d.ts' />
/// <reference path='types/express/express.d.ts' />
/// <reference path='types/node/node.d.ts' />
/// <reference path='types/express/express-middleware.d.ts' />

export class Msg{
    to:string;
    from:string;
    content:any; //defined by any one;
    createTime:Date;
}
