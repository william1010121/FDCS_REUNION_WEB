function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}
function LoginTimeCnt() {
	var cookie = getCookie("time_cnt");
	if( cookie == "" ) {
        setCookie("time_cnt",1, 30);	
        cookie = 1;
    }
	else {
        setCookie("time_cnt",Number(cookie)+1,30); 
        cookie = Number(cookie)+1;
    }
    document.getElementById("login time").innerText = `這是你第${Number(cookie)+1}次來到這個網站`;
}

LoginTimeCnt();