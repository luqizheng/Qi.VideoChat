/**
 * Created by leo-home on 2015/4/16.
 */
var Msg = (function () {
    function Msg() {
    }
    return Msg;
})();
exports.Msg = Msg;
function toContent(strTemplate, variabled, user) {
    var reg = /\[{1}[^[].+?\]{1}/g;
    var s = strTemplate.replace(reg, function (word) {
        word = word.replace('[', '').replace(']');
        if (user[word]) {
            return user[word];
        }
        if (variabled[word]) {
            return variabled[word];
        }
        return word;
    });
    console.log("toContent:" + s);
    return s;
}
var MsgTemplate = (function () {
    function MsgTemplate() {
    }
    return MsgTemplate;
})();
exports.MsgTemplate = MsgTemplate;
//# sourceMappingURL=notifyType.js.map