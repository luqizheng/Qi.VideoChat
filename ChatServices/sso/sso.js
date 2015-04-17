/**
 * Created by leo-home on 2015/4/14.
 */
/// <reference path='../types/node/node.d.ts' />
var http = require('http');
var sso = (function () {
    function sso() {
        this.method = 'post';
        this.headers = {
            'content-type': 'application/json',
            'content-length': 0
        };
    }
    sso.prototype.valid = function (publicKey, callback) {
        var postData = JSON.stringify({ PublicKey: publicKey });
        this.headers['content-length'] = postData.length;
        var options = {
            hostname: this.hostname,
            port: this.port,
            method: this.method,
            headers: this.headers
        };
        var req = http.request(options, function (res) {
            //console.log('STATUS: ' + res.statusCode);
            //console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                //console.log('BODY: ' + chunk);
                callback(JSON.parse(chunk));
            });
        });
        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });
        // write data to request body
        //console.log('sending public key ' + publicKey)
        req.write(postData);
        req.end();
    };
    return sso;
})();
exports.sso = sso;
//# sourceMappingURL=sso.js.map