/**
 * Created by leo-home on 2015/4/5.
 */
/// <reference path='types/socket.io/socket.io.d.ts' />
(function (UserStatus) {
    UserStatus[UserStatus["offline"] = 0] = "offline";
    UserStatus[UserStatus["online"] = 1] = "online";
    UserStatus[UserStatus["busy"] = 2] = "busy";
})(exports.UserStatus || (exports.UserStatus = {}));
var UserStatus = exports.UserStatus;
var User = (function () {
    function User(socket) {
        this.status = UserStatus.online;
        this.socket = socket;
    }
    User.prototype.toEntity = function () {
        var r = new DTOUser();
        r.status = this.status;
        r.name = this.name;
        r.loginId = this.loginId;
        r.type = this.type;
        return r;
    };
    return User;
})();
exports.User = User;
var DTOUser = (function () {
    function DTOUser() {
    }
    return DTOUser;
})();
exports.DTOUser = DTOUser;
var QueryUser = (function () {
    function QueryUser() {
    }
    return QueryUser;
})();
exports.QueryUser = QueryUser;
function valid(loginId, ssoToken, callback) {
    //Not complete
    callback(true);
}
exports.valid = valid;
//# sourceMappingURL=user.js.map