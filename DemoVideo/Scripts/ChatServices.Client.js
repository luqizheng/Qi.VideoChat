/**
 * Created by leo-home on 2015/4/6.
 */
/*
 default options={ 
 ssoToken:'',
 loginId:'',
 onOtherStatusChanged:function(data),
 onMsg:function(data),
 }*/
function UserStatus(url, options) {

    this.options = options;
    this.socket;
    this.url = url;
    this.name = "匿名";
    return this;

}

UserStatus.prototype.connect = function (callBack) {

    /*var isIE=!!window.ActiveXObject;
    var isIE6=isIE&&!window.XMLHttpRequest;
    var isIE8=isIE&&!!document.documentMode;
    var isIE7=isIE&&!isIE6&&!isIE8;
    if(isIE6||isIE7||isIE8)
        this.socket = io.connect(this.url,{transports:['jsonp-polling']});
    else*/
    //io.set('transports', );
    this.socket = io.connect(this.url);//,{transports:['websocket','flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']});
    var self = this;
    this.socket.on('valid', function () {
        self.validate(self.options.loginId, self.options.ssoToken, self.options.type, self.options.name);
    });


    //当有其他用户改变状态的时候，需要重新加载用户表
    if (self.options.onOtherStatusChanged) {
        this.socket.on('status-changed', self.options.onOtherStatusChanged);
    }

    if (self.options.onMsg) {
        this.socket.on('msg', function (data) {
            self.options.onMsg(data);
        });
    }

    this.socket.on('valid-result', function (result) {
        callBack.call(self, result);
    });
}
UserStatus.prototype.validate = function (loginId, ssoToken, type,name) {
    //loggerConsole.log('send valid loginid' + loginId + 'ssoToken:' + ssoToken + ',type:' + type);
    var senddata = {
        name: name,
        loginId: loginId,
        ssoToken: ssoToken,
        type: type
    };
    
    this.socket.emit('valid', senddata);
}

UserStatus.prototype.changeStatus = function (status) //online,offline,busy
{
    //if (status != 'online' || status != 'offline' || status != 'busy') {
    //    return false;
    //}
    this.socket.emit('change-status', status);
    return true;
}

UserStatus.prototype.list = function(queryOrCallBack, callBack) {

    var isFunc = typeof(queryOrCallBack) == 'function';
    if (isFunc) {
        this.socket.on('list', queryOrCallBack);
        this.socket.emit('list');
    } else {
        this.socket.on('list', callBack);
        this.socket.emit('list',queryOrCallBack);
    }
    
};


UserStatus.prototype.send = function(loginId, text) {
    var loginid = this.options.loginId;
    this.socket.emit('msg', {
        to: loginId,
        from: loginid,
        content: text
    });
};

