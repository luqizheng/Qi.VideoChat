/**
 * Created by leo-home on 2015/4/6.
 */

/// <reference path='types/hashmap/hashmap.d.ts' />
import Users = require('./user');
import Map=require('hashmap');

var userPool = new Map();
var scoketPool = new Map();

export function add(user:Users.User) {

    userPool.set(user.loginId, user);
    scoketPool.set(user.socket.id, user.loginId);
    console.log('userLoginId:' + user.socket.id + ',socketId:' + user.loginId);
    //console.log('usertype :', user.type)

    user.socket.on('change-status', function (status:Users.UserStatus) {
        console.log('change-status');
        user.status = status;
        user.socket.broadcast.emit('status-changed', user.toEntity());
    });

    user.socket.on('list', function (queryType:Users.QueryUser) {
        //console.log('find and list my friends with:' + queryType.type + ',count:' + scoketPool.count());
        var result = [user.toEntity()];

        if (!queryType) {
            queryType = new Users.QueryUser();
        }

        userPool.forEach(function (item:Users.User, key) {
            //console.log('key:'+JSON.stringify(key));
            //console.log('item.type == queryType.type. item.type:' + item.type + ',queryType.type:' + queryType.type);

            if ((!queryType.type || item.type == queryType.type) && key != user.loginId) {
                console.log(item.name)
                result.push(item.toEntity());
            }
        })
        console.log('my list:' + result.length);
        user.socket.emit('list', result);
    })

    //console.log('tell all status-changed')
    //user.socket.emit('status-changed', user.toEntity());
    user.socket.broadcast.emit('status-changed', user.toEntity());

}

export function remove(socket:SocketIO.Socket) {
try {
    console.log('remove socket:' + socket.id)
    var loginId = scoketPool.get(socket.id);
    console.log('remove loginid form UserPool ' + loginId);

    var user = userPool.get(loginId);
    if (user) {
        user.status = Users.UserStatus.offline;
        socket.broadcast.emit('status-changed', user.toEntity());
    }

    delete scoketPool.remove(socket.id);
    delete userPool.remove(loginId);
}
    catch(e){
        console.dir(e);
    }


}

export function get(loginId:string) {
    var user = userPool.get(loginId);
    return user;

}