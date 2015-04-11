(function ($) {

    var defOpts = {
        server: "rtmfp://stratus.rtmfp.net/",
        developKey: '18c74dfadbf34dd0b09701ee-48375d55fe46', //发布key
        user: "User", //名字最好是唯一的，否则不能区分,
        onOnline: false, //当连接到rtmfp服务器的时候,第一个参数是Id，第二个参数是user，
        onConnect: false, //第一个参数是Id，第二参数是user
        local: false, //本地的screen,请使用ID。
        identity: false,//onlineion's id of rtmfp server
    },
       globalOpts = {}; //保存option数据，因为object无法使用$.data保存数据       




    $.fn.videoIo = function (optsOrCmd) {
        var args = Array.prototype.slice.call(arguments);

        return entryMain.call(this, optsOrCmd, args);
    };

    function entryMain(optsOrCmd, args) {

        return this.each(function () {

            var $this = $(this),
                isInit = typeof optsOrCmd == "object"; //如果是string，那么就是执行cmd命令

            if (isInit) {
                var op = init($this, optsOrCmd);
                globalOpts[op._ctrlId] = op;
                if (op.local) {
                    globalOpts[op.local] = op;
                }
            }
            if (!isInit) {
                var id = $this.attr('id');
                args[0] = globalOpts[id];
                cmd[optsOrCmd].apply($this, args);
            }
        });

    }

    function init(self, inputOptions) {
        var options = $.extend({}, defOpts, inputOptions);
        options._ctrlId = self.attr('id');
        if (!options._ctrlId) {
            alert('flash-videoIO should be set id');
        }
        return options;
    }
    function fe(id) {
        return $("#" + id)[0];
    }
    var cmd = {
        online: function (opt, enable, func) {
            //在线
            var vedio = opt.local ? fe(opt.local) : $(this)[0];
            if (!enable) {
                vedio.setProperty('src', null);
                return;
            }
            if (func) {
                opt._onOnline = func;
            }
            var rtmfServer = opt.server + opt.developKey + "/?publish=" + opt.user;
            vedio.setProperty('src', rtmfServer);

            //this.setProperty('live', true);
        },
        connect: function (opt, idOfRemote, func) {
            //连接远程的connect
            if (func) {
                opt._onConnect = func;
            }
            var rtmfServer = opt.server + opt.developKey + "/?play=" + opt.user + "&farID=" + idOfRemote;
            $(this)[0].setProperty('src', rtmfServer);
        },
        sound: function (opt, enable) {
            if (opt.local) {
                fe(opt.local).setProperty('sound', enable);
            }
        },
        video: function (opt, enable) {
            if (opt.local) {
                fe(opt.local).setProperty('live', enable);
            }
        },

        options: function (opt, obj, val) {
            if (typeof obj == "object")
                $.extend(opt, obj);
            else if (typeof obj == "string") {
                opt[obj] = val;
            }
        }
    };

    window.onPropertyChange = function (event) { //falsh-videoio call it
        //options.onConnect(e.newValue);
        console.log('property:' + event.property + ',objectID:' + event.objectID + ';newValue:' + event.newValue);
        if (event.property == 'nearID') {
            var opt = globalOpts[event.objectID];
            switch (event.objectID) {
                case opt._ctrlId:
                    eventHandler['remote'][event.property](event.newValue, opt);
                    break;
                case opt.local:
                    eventHandler['local'][event.property](event.newValue, opt);
                    break;
            }
        }
    };
    //called by  window.onPropertyChange
    var eventHandler = {
        remote: {
            nearID: function (id, opt) {
                opt.localIdentity = id;
                $([opt._onConnect, opt.onConnect]).each(function () {
                    if ($.isFunction(this)) {
                        this.call(fe(opt.local), id, opt.user);
                    }
                });
                if (opt._onConnect) {
                    delete opt._onConnect;
                }
            }
        },
        local: {
            nearID: function (id, opt) {
                opt.identity = id;
                $([opt._onOnline, opt.onOnline]).each(function () {
                    if ($.isFunction(this)) {
                        this.call(fe(opt.local), id, opt.user);
                    }
                });
                if (opt._onOnline) {
                    delete opt._onOnline;
                }
            }
        }

    };

}(jQuery));