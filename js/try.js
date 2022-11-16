var DATA;
var MUSIC;
// var FatherFileNmae = "FDCS_REUNION_WEB/";
var FatherFileNmae = "";
var MAIN;
var Cookie;


class cookie {
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    getCookie(cname) {
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
    LoginTimeCnt() {
        var cookie = this.getCookie("time_cnt");
        var cookieval = Number(cookie);
        if (cookie == "") {
            this.setCookie("time_cnt", 1, 30);
            cookieval = 1;
        }
        else {
            this.setCookie("time_cnt", Number(cookie) + 1, 30);
            cookieval = Number(cookieval) + 1;
        }
        document.getElementById("login time").innerText = "\u9019\u662F\u4F60\u7B2C".concat(Number(cookieval) + 1, "\u6B21\u4F86\u5230\u9019\u500B\u7DB2\u7AD9");
    }
}

class GLOBAL_DATA{
    constructor(){
        this.BGCOLOR = [
            "red", "green", "yellow", "black", "whilte"
        ];
        this.BgcolorCnt = 0;
        this.EndString = "謎題開始";
    }

    ChangeBgColor(element) {
        let sz = this.BGCOLOR.length;
        this.BgcolorCnt = (this.BgcolorCnt+1)%sz;
        console.log(sz);
        element.Setstyle('element-color', this.BGCOLOR[this.BgcolorCnt]);
    }

    Encropy(value) {
        return value;
    }
}

class music {
    constructor() {
        this.music_list = [
            `../${FatherFileNmae}data/music/wake.mp3`
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
    StartPlay(idx, time=0) {
        if( this.idx == -1 ) this.DirectTo(0);
        this.music.play();
        this.NowStatus = "Play";
        this.music.currentTime = time;
    }
    Pause() {
        this.music.pause();
        this.NowStatus = "Pause";
    }
    Change() {
        if( this.NowStatus == "Play") this.Pause();
        else this.StartPlay();
    }
    JumpTo(time) {
        this.music.currentTime = time;
    }
}

class Element {
    constructor (element, name, position=""){
        this.ele = element;
        this.name = name;
        this.StylePositoin = position;
        this.ElementCnt = 0;
        this.PrevEle = "none";
        
        this.Password = "none";
        this.PasswordId = "none";
        this.Status = "Go";
        this.ReadPassword();
    }

    SetAttr(tag, value) {
        this.ele.setAttribute(tag, value);
    }

    Setstyle(key, value) {
        this.style[ key ] = value;
        this.SetStyles(this.style);
    }
    SetStyles(styledic) {
        Object.assign(this.ele.style, styledic);
    }

    ReadStyle() {
        this.style = fetch(this.StylePositoin) 
            .then((response)=>response.json())
            .then((json)=>this.SetStyles(json[this.name]));
    }


    HaveScrollBar() {
        return ( this.ele.scrollHeight > this.ele.clientHeight );
    }

    ScroolToEnd() {
        this.ele.scrollTop = this.ele.scrollHeight;
    }


    AddElement(tag='p', InHtml='', class_='', RegardAsPreEle = true) {
        if( this.Status == 'stop' ) {
            console.log("Now pause");
            return "false";
        }
        this.ElementCnt++;
        this.ele.innerHTML += `<${tag} id="${this.ElementCnt}th element of ${this.name}" class="${class_}">${InHtml}</${tag}>`
        if( RegardAsPreEle)
            this.PrevEle =  `${this.ElementCnt}th element of ${this.name}`;
        return `${this.ElementCnt}th element of ${this.name}`;
    }


    EndString() {
        const ele = document.getElementById(this.PrevEle);
        if( ele == null ) return false;
        // console.log(ele.innerText);
        if( ele.innerText == DATA.EndString ) {
            return true;
        }
        else {
            return false;
        }
    }

    NewStory() {
        this.CleanElement();
        this.Status = "Go";
    }

    CleanElement() {
        this.ele.innerHTML = "";
    }
    AddPassword(PwdId) {
        this.PasswordId = PwdId;
        this.Status = 'stop';
    }
    GetPassword() {
        if( this.PasswordId == 'none') {
            console.log("No password Get");
            return "No password Get";
        }
        let InputPsd = document.getElementById(this.PasswordId).children[0];        
        console.log("Your Guest password is", InputPsd.value);

        return InputPsd.value;
    }
    CheckPassword() {
        return this.Password == this.GetPassword();
    }

    ReadPassword() {
        this.Password = "123";
    }
}


class Liter {
    constructor(FilePos, IthArt=0) {
        this.FilePos = FilePos;
        this.NowIdx = 0;
        this.IthArt = IthArt;
        this.OriginName = "article";

        this.ReadWord();
    }
    ReadWord() {
        this.story = 
        fetch(this.FilePos)
            .then((res)=>res.json())
            .then((json)=>{
                // console.log(this.OriginName+this.IthArt)
                this.IthArt++;
                return json[this.OriginName+this.IthArt]
            });
        this.NowIdx = 0;
    }
    NextandAddInto(id) {
        this.story.then((val) => {
            // console.log(val);
            if( this.NowIdx == val.length ) {
                document.getElementById(id).innerHTML += DATA.EndString;
                return;
            }
            console.log(val[ this.NowIdx])
            document.getElementById(id).innerHTML += val[ this.NowIdx ];
            this.NowIdx++;
        }
        );
    }

}


function init() {


    MUSIC = new music();    
    DATA = new GLOBAL_DATA();
    MAIN = new Element(document.getElementById('main_process'), 'main_process', "");
    Cookie = new cookie();

    let Body = new Element(document.getElementById("BODY"), "body", `../${FatherFileNmae}style/StartPage.json`);
    Body.ReadStyle();
    Cookie.LoginTimeCnt();


    let story = new Liter(`../${FatherFileNmae}data/story/start.json`);


    


    document.addEventListener('keydown', function(event){
        //console.log(event.key);
        if( event.key == 'p') {
            MUSIC.Change()
        }
        if(event.key == "Enter") {
            MAIN.ScroolToEnd();
            // console.log(MAIN.EndString());
            if( MAIN.EndString() ) {
                console.log(MAIN.Status);
                if( MAIN.Status == "Go")  {
                    MAIN.AddPassword(MAIN.AddElement('div', '<input/>', 'center', false));
                    MAIN.status = "stop";
                }
            }
            else {
                story.NextandAddInto(MAIN.AddElement());
            }
        }
        if( event.key == '/' ) {
            let ans = MAIN.CheckPassword();
            if( ans ) {
                story.ReadWord();
                MAIN.NewStory();
                alert("密碼正確");
            }
            else {
                alert("密碼不正確");
            }
        }
    });
}
