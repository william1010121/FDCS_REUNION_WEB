var DATA;
var MUSIC;
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

class music {
    constructor() {
        this.music_list = [
            "../FDCS_REUNION_WEB/data/wake.mp3"
        ];
        this.size = this.music_list.length;
        this.idx = -1;
        this.NowStatus = "Pause";
    }
    GetIdx(idx){
        return  this.music_list[idx];
    }
    DirectTo(idx) {
        this.idx = idx;
        this .music = new Audio(this.GetIdx(idx));
    }
    StartPlay(idx) {
        if( this.idx == -1 ) this.DirectTo(0);
        this.music.play();
        this.NowStatus = "Play";
    }
    Pause() {
        this.music.pause();
        this.NowStatus = "Pause";
    }
    Change() {
        if( this.NowStatus == "Play") this.Pause();
        else this.StartPlay();
    }
    
}

class background{

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
function init() {
    LoginTimeCnt();


    MUSIC = new music();    

    document.addEventListener('keydown', function(event){
        console.log(event.key);
        if( event.key == 'p') {
            MUSIC.Change()
        }
    });
    
}
