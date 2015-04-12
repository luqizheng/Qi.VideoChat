
var globalOpts = {}; //保存option数据，因为object无法使用$.data保存数据.因此他是一个全局的静态的保存期，key值是id。因此要求object 中的flash要带有id
function getFlashMovie(movieName) {
    var isIE = navigator.appName.indexOf("Microsoft") != -1;
    var r= (isIE) ? window[movieName] : document[movieName];
    return r;
}
(function ($) {

    var defOpts = {
        onReceive: false,//获取文字信息
        server:"rtmp://114.215.155.217/myapp" //"rtmfp://p2p.rtmfp.net/",//"rtmfp://stratus.rtmfp.net/",
        //developKey: '18c74dfadbf34dd0b09701ee-48375d55fe46' //发布key
        /*_identity: false,//onlineion's id of rtmfp server,自动产生*/
        /*_streamName:"", //nameOfStream private key*/
    };

    $.fn.videoIo = function (optsOrCmd) {
        var args = Array.prototype.slice.call(arguments);
        return entryMain.call($(this), optsOrCmd || {}, args);
    };
   
    function entryMain(optsOrCmd, args) {
        var result = false;
        this.each(function () {

            var $this = $(this), op,
                isInit = typeof optsOrCmd == "object"; //如果是string，那么就是执行cmd命令

            if (isInit) {
                op = init($this, optsOrCmd);
                globalOpts[op._ctrlId] = op;
                if (op.local) {
                    globalOpts[op.local] = op;
                }
            }
            if (!isInit) {
                args[0] = globalOpts[$this.attr('id')];
                if (!result) {
                    result = [];
                }
                
                result.push(cmd[optsOrCmd].apply(getFlashMovie(args[0]._ctrlId), args));
            }
        });

        if (result)
            return result.length==1?result[0]:result;
        return this;

    }

    function init($self, inputOptions) {
        var options = $.extend({}, defOpts, inputOptions);
        options._ctrlId = $self.attr('id');
        if(options.server[options.server.length-1]=='/')
        {
            options.server=options.server.substr(0,options.server.length-1);
        }
        if (!options._ctrlId) {
            alert('flash-videoIO should be set id');
        }
        return options;
    }
    //下面的opt体现api中是
    // $("#viedio").videoIo('publish',nameOfStream,func); opt 请忽略的，不需要在参数中输入。
    var cmd = {
        publish: function (opt, nameOfStream, func) {
            var id = this.getProperty('nearID');
            var streamName = this.getProperty('publish');
            
            if (!streamName) {
                //发布视频
                var rtmfServer = opt.server ;
                if(opt.developKey) {
                    rtmfServer+= '/'+opt.developKey;
                }
               rtmfServer += "?publish=" + nameOfStream;
                //opt._streamName = nameOfStream;
                if (func) {
                    opt["_onPub"] = func; //不同的Stram要注意不能被覆盖掉因此用nameStream区分。避免冲突。
                }
                try {
                    this.setProperty('src', rtmfServer);
                }catch(e){
                    //loggerConsole.dir(e);
                }
            } else {
                func.call(this, id, streamName);
            }
        //this.setProperty('live', true);
        },
        play:function(opt, remoteId, remoteStreamName) {
            var rtmfServer = opt.server;
            if(opt.developKey) {
                rtmfServer+= '/'+opt.developKey;
            }
            rtmfServer += "?play=" + remoteStreamName;
            if (remoteId) {
                rtmfServer+="&farID=" + remoteId;
            }
            this.setProperty('src', rtmfServer);
        },
        disconnect: function (opt, func) {
            var id = this.getProperty('nearID');
            var streamName = this.getProperty('publish');
            this.setProperty('src', null);
            func && func(id,streamName);
        },
        sound: function (opt, enable) {
            this.setProperty('sound', enable);
        },
        camera: function (opt, enable) {
            this.setProperty('live', enable);
        },
        send:function(opt,txt) {
            this.callProperty('sendData',txt);
        },
        microphone:function(opt, enable) {
            this.setProperty('microphone', enable);
        },
        set:function(opt, key, val) {
            this.setProperty(key, val);
        },
        options: function (opt, obj, val) {
            if (obj === undefined)
                return opt;
            if (typeof obj == "object")
                $.extend(opt, obj);
            else if (typeof obj == "string") {
                if (obj == 'publish' || obj == 'nearID' || obj == 'farID') {
                    return this.getProperty(obj);
                }
                if (val !== undefined)
                    opt[obj] = val;
                return opt[obj];
            }
        }
    };


}(jQuery));

//called by  window.onPropertyChange
var _videioEv = {
    src: function (id, opt) {
        var self = this;
        $(['_onPub', '_onRec']).each(function () {
            var method = opt[this],methodName=this;
            if (method) {
                delete opt[methodName];
                setTimeout(function() {
                    method.call(self, self.getProperty('nearID'), self.getProperty('publish'));
                }, 1);
            }
        });
    },
    nearID:function(id,opt){
        _videioEv.src.call(this,id,opt);
    },
    publish:function(id,opt){
        _videioEv.src.call(this,id,opt);
    }
};

 function onPropertyChange(event) { //falsh-videoio call it
    //options.onConnect(e.newValue);
    /*if (["nearID", "farID", 'publish', 'play', 'src'].indexOf(event.property)!=-1) {
        try {
            loggerConsole.log('property:' + event.property + ',objectID:' + event.objectID + ';newValue:' + event.newValue);
        }
        catch(e){}
    }*/
    var opt = globalOpts[event.objectID],
        target = getFlashMovie(event.objectID), method = _videioEv[event.property];
    if (method) {
        method.call(target, event.newValue, opt);
    }
};