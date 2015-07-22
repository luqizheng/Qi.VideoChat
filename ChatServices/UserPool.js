/**
 * Created by leo-home on 2015/4/6.
 */
/// <reference path='types/hashmap/hashmap.d.ts' />
var Users = require('./user');
var Map = require('hashmap');
var userPool = new Map();
//var scoketPool = new Map();
function add(user) {
    if (userPool.has(user.loginId)) {
        var preUser = userPool.get(user.loginId);
        user.socket.disconnect();
    }
    userPool.set(user.socket.id, user);
    //scoketPool.set(user.socket.id, user.loginId);
    console.log('socket id:' + user.socket.id + ',loginid:' + user.loginId);
    //console.log('usertype :', user.type)
    user.socket.on('change-status', function (status) {
        console.log('change-status');
        user.status = status;
        user.socket.broadcast.emit('status-changed', user.toEntity());
    });
    user.socket.on('list', function (queryType) {
        //console.log('find and list my friends with:' + queryType.type + ',count:' + scoketPool.count());
        var result = [user.toEntity()];
        if (!queryType) {
            queryType = new Users.QueryUser();
        }
        userPool.forEach(function (item, key) {
            //console.log('key:'+JSON.stringify(key));
            console.log('item.type == queryType.type. item.type:' + item.type + ',queryType.type:' + queryType.type);
            if ((!queryType.type || item.type == queryType.type) && item.loginId.toLocaleLowerCase() != user.loginId.toLocaleLowerCase()) {
                console.log(item.name);
                result.push(item.toEntity());
            }
        });
        console.log('my list:' + result.length);
        user.socket.emit('list', result);
    });
    //console.log('tell all status-changed')
    //user.socket.emit('status-changed', user.toEntity());
    user.socket.broadcast.emit('status-changed', user.toEntity());
}
exports.add = add;
function remove(socket) {
    try {
        console.log('remove socket:' + socket.id);
        //var loginId = scoketPool.get(socket.id);
        //console.log('remove loginid form UserPool ' + loginId);
        var user = userPool.get(socket.id);
        if (user) {
            user.status = 0 /* offline */;
            socket.broadcast.emit('status-changed', user.toEntity());
        }
        else {
            console.log("Not find the socket.Id with user");
        }
        //delete scoketPool.remove(socket.id);
        userPool.remove(socket.id);
    }
    catch (e) {
        console.dir(e);
    }
}
exports.remove = remove;
function get(idOfUser) {
    var socketId = idOfUser.split('_')[0];
    var user = userPool.get(socketId);
    return user;
}
exports.get = get;
//# sourceMappingURL=UserPool.js.map