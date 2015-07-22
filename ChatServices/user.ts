/**
 * Created by leo-home on 2015/4/5.
 */


/// <reference path='types/socket.io/socket.io.d.ts' />

export enum UserStatus{
    offline,
    online,
    busy,
}

export class User {
    constructor(socket:SocketIO.Socket) {
        this.status = UserStatus.online;
        this.socket = socket;
    }

    name:string;
    ssoToke:string;
    socket:SocketIO.Socket
    loginId:string;
    status:UserStatus;
    type:string;

    toEntity():DTOUser{
        var r= new DTOUser()
        r.status=this.status;
        r.name=this.name;
        r.loginId=this.loginId;
        r.type=this.type;
        r.id=this.socket.id+"_"+this.loginId;
        return r;

    }
}

export class DTOUser
{
    name:string;
    loginId:string;
    status:UserStatus;
    type:string;
    id:string;
}


export class QueryUser {
    type:string;
    loginId:string;
}

export function valid(loginId:string, ssoToken:string, callback:Function) {
    //Not complete
    callback(true);
}


