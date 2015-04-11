/**
 * Created by leo-home on 2015/4/5.
 */
/// <reference path='types/socket.io/socket.io.d.ts' />
/// <reference path='types/express/express.d.ts' />
/// <reference path='types/node/node.d.ts' />
/// <reference path='types/express/express-middleware.d.ts' />
var Users = require('./user');
var Express = require('express');
var Http = require('http');
var IO = require('socket.io');
var UserPool = require('./UserPool');
var DB = require('./db');
var app = Http.createServer(Express());
var io = IO(app);
//DB.InsertMsg({to:'lk',from:'kjk'})
io.on('connect', function (socket) {
    console.log('connect');
    socket.on('valid', function (user) {
        var result = Users.valid(user.loginId, user.ssoToken, function (result) {
            socket.emit('valid-result', { success: result });
            if (result) {
                var newUser = new Users.User(socket);
                newUser.name = user.name;
                newUser.type = user.type;
                newUser.loginId = user.loginId;
                newUser.ssoToke = user.ssoToken;
                UserPool.add(newUser);
            }
        });
    });
    socket.on('disconnect', function () {
        console.log('disconnect');
        UserPool.remove(this);
    });
    socket.on('msg', function (data) {
        console.log('some msg from client:' + JSON.stringify(data));
        var fromUser = UserPool.get(data.from);
        if (fromUser) {
            data.fromName = fromUser.name;
        }
        var toUser = UserPool.get(data.to);
        if (toUser) {
            console.log('send it to client:' + JSON.stringify(data));
            DB.InsertMsg(data);
            toUser.socket.emit('msg', data);
        }
    });
    socket.emit('valid');
});
app.listen(3000, function () {
    console.log('port 3000');
});
//# sourceMappingURL=index.js.map