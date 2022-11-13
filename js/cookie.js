function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function LoginTimeCnt() {
    var cookie = getCookie("time_cnt");
    var cookieval = Number(cookie);
    if (cookie == "") {
        setCookie("time_cnt", 1, 30);
        cookieval = 1;
    }
    else {
        setCookie("time_cnt", Number(cookie) + 1, 30);
        cookieval = Number(cookieval) + 1;
    }
    document.getElementById("login time").innerText = "\u9019\u662F\u4F60\u7B2C".concat(Number(cookieval) + 1, "\u6B21\u4F86\u5230\u9019\u500B\u7DB2\u7AD9");
}
LoginTimeCnt();
