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
    var s = strTemplate.replace(/\[{1}[^[].+?\]{1}/g, function (word) {
        var content = word.replace('[', '').replace(']');
        if (user[content]) {
            return user[content];
        }
        if (variabled[content]) {
            return variabled[content];
        }
        return content;
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