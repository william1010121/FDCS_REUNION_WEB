var Body;
var DATA;
var MUSIC;
var FatherFileNmae = "FDCS_REUNION_WEB/";
// var FatherFileNmae = "";
var MAIN;
var Cookie;
var Decide;
var story;

String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};
// https://www.letianbiji.com/web-front-end/js-string-format.html


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
        this.QuestoinPos = `../${FatherFileNmae}data/question/`;  
        this.QuestoinName = "question.json";  

        this.WebCnt = 0;

        this.ReadQuestion();
    }

    ChangeBgColor(element) {
        let sz = this.BGCOLOR.length;
        this.BgcolorCnt = (this.BgcolorCnt+1)%sz;
        console.log(sz);
        element.Setstyle('element-color', this.BGCOLOR[this.BgcolorCnt]);
    }

    ReadQuestion() {
        this.Question = 
            fetch(this.QuestoinPos+this.QuestoinName)
                .then((res)=>res.json())
                .then(
                    (d)=>{
                        return d;
                    }
                );
    }
    OpenQuestion(articleName) {
        this.Question.then(
            (data)=>{
                for( const url of data[articleName]['question']['url']) {
                    console.log(url);
                    // window.open(url, `web ${this.WebCnt++}`);
                }
                MAIN.AddElement('p', data[articleName]['question']['content']);
            }
        );
    }

    CheckPassword(articleName, guestPassword)  {
        this.Question.then(
            (data)=>{
                if( data[articleName] == undefined ) {
                    story.ReadWord();
                    MAIN.NewStory(story.OriginName, story.IthArt);
                }
                if( guestPassword == data[articleName]['answer']) {
                    alert("密碼正確");
                    story.ReadWord();
                    MAIN.NewStory(story.OriginName, story.IthArt);
                }
                else {
                    alert("密碼不正確");
                }

            }
        )
    }


    Crypto(data) {
        return data;
    }
}

class ChoseButton{
    constructor() {
        this.SpecialDataName = {
            "start.json" : {
                "article": {
                    6: {
                        "A": {
                            "content": "張幼儀",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "outlineA",
                                "IthArt":1 
                            }
                        },
                        "B": {
                            "content": "哥倫布",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "outlineB",
                                "IthArt": 1
                            }
                        }
                    },
                    
                    8: {
                        "A": {
                            "content": "去尋找消失的哥倫布",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "A",
                                "IthArt":1 
                            }
                        },
                        "B": {
                            "content": "跟心儀女子林徽音敘舊",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "B",
                                "IthArt":1 
                            }
                        },
                    }
                },
                "A" : {
                    6: {
                        "A": {
                            "content": "女強人的張幼儀",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "finalAA",
                                "IthArt":1 
                            }
                        },
                        "B": {
                            "content": "國民初戀林徽因",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "finalAB",
                                "IthArt":1 
                            }
                        },
                        "C": {
                            "content": "嬌豔動人陸小曼",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "finalAC",
                                "IthArt":1 
                            }
                        },
                        "D": {
                            "content": "共患難的哥倫布",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "finalAD",
                                "IthArt":1 
                            }
                        },
                        "E": {
                            "content": "小孩子才做選擇 我都要!!",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "finalAE",
                                "IthArt":1 
                            }
                        }
                    }
                },
                "outlineA": {
                    1:{
                        "A": {
                            "content": "時光倒流",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "article",
                                "IthArt":7 
                            }
                        }
                    }
                },
                "finalAA" : {
                    1:{
                        "A": {
                            "content": "時光倒流",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "A",
                                "IthArt":6 
                            }
                        }
                    }
                },
                "finalAB" : {
                    1:{
                        "A": {
                            "content": "時光倒流",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "A",
                                "IthArt":6 
                            }
                        }
                    }

                },
                "finalAC" : {
                    1:{
                        "A": {
                            "content": "時光倒流",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "A",
                                "IthArt":6 
                            }
                        }
                    }

                },
                "finalAD" : {
                    1:{
                        "A": {
                            "content": "時光倒流",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "A",
                                "IthArt":6 
                            }
                        }
                    }

                },
                "finalAE" : {
                    1:{
                        "A": {
                            "content": "時光倒流",
                            "jumpTo": {
                                "FileName" : "start.json",
                                "ArtName" : "A",
                                "IthArt":6 
                            }
                        }
                    }

                }
            }
        };
        this.IdList = Array();
        this.IdListFunc = Object();
    }

    InitNewArticle(FileName, ArtName, ArtIdx) {
        try{
            this.data = this.SpecialDataName[FileName][ArtName][ArtIdx];
        }
        catch(err) {
            console.log("Choose_button_InitNewArtcle: This article doesn't exit");
            this.data = false;
        }
        this.FileName = FileName;
        this.ArtName = ArtName;
        this.ArtIdx = ArtIdx;
    }


    GetData() {
        return this.data;
    }
    GetIdFormatString(key) {
        this.IdOrg = "{0}/{1}-{2} of {3}";
        return `${this.FileName}/${this.ArtName}-${this.ArtIdx} of ${key}`;
    }

    MakeButtonHtml() {
        this.IdList = Array();
        let ButtonHtml = "";

        // <button id="A" class="choose_button">A.A</button>
        for( const [key, value] of Object.entries(this.data)) {
            // console.log(key, value);
            let id = this.GetIdFormatString(key);
            this.IdList.push(id);
            ButtonHtml += 
            `
            <button id="${id}" class="choose_button" data="${key}">${value['content']}</button>
            `
        }
        console.log(ButtonHtml);
        return ButtonHtml;
    }
    EventActivate(htmlEle, key, obj) {
        console.log(`Choose_Button_EventActivate: You click ${key} button`);
        story.DirectTo(
            obj["FileName"],
            obj["ArtName"],
            obj["IthArt"]
        );
        story.ReadWord();
        MAIN.NewStory(story.OriginName, story.IthArt);
    }

    AddButtonEventListenter() {
        this.IdListFunc = Object();
        for( const id of this.IdList ) {
            // console.log(id);
            let htmlEle = document.getElementById(id);
            let key = htmlEle.getAttribute('data');
            let obj = this.data[key];
            // console.log(id, key);
            // console.log(obj);
            const Fnc = this.EventActivate.bind(false, htmlEle, key, obj['jumpTo']);
            htmlEle.addEventListener(
                'click', 
                Fnc,
                {'once': true}
            )
            this.IdListFunc[id] = Fnc;
            // https://developer.mozilla.org/zh-TW/docs/Web/API/Element/getAttribute
        }
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
        this.StylePosition = position;
        this.ElementCnt = 0;
        this.PrevEle = "none";
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
    InitStyle(Id) {
        this.style.then(
            (res) => {
                Object.assign(this.ele.style, res[Id]);
            }
        );
    }
    SetStyles(dict) {
        Object.assign(this.ele.style, dict);

    }

    ReadStyle() {
        this.style = fetch(this.StylePosition) 
            .then((response)=>response.json())
    }

    UpdateStyle(ArtName, ArtIdx) {
        this.style.then(
            (data)=>{
                ArtIdx++;
                let nm = ArtName+ArtIdx;
                if(nm in data) {
                    for( const [key, value] of Object.entries(data[nm])) {
                        console.log(key, value);
                        this.Setstyle(key, value);
                    }
                }
            }
        );
    }

    HaveScrollBar() {
        return ( this.ele.scrollHeight > this.ele.clientHeight );
    }

    ScroolToEnd() {
        this.ele.scrollTop = this.ele.scrollHeight;
    }


    AddElement(tag='p', InHtml='', class_='', RegardAsPreEle = true) {
        if( this.Status == 'stop' ) {
            console.log("Element_AddElement: Now pause");
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


    NewStory(ArtName, ArtIdx) {
        this.CleanElement();
        this.Status = "Go";
        Body.UpdateStyle(ArtName, ArtIdx);
    }

    CleanElement() {
        this.ele.innerHTML = "";
    }
    AddPassword(PwdId) {
        this.PasswordId = PwdId;
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
        console.log(this.Password, this.GetPassword())
        return this.Password == this.GetPassword();
    }

    ReadPassword() {
        this.Password = "123";
    }
}


class Liter {
    constructor(FilePos, FileName, OriginName = "article",IthArt=0) {
        this.FilePos = FilePos;
        this.NowIdx = 0;
        this.IthArt = IthArt;
        this.OriginName = OriginName; //ArtName
        this.FileName = FileName;

        this.SpecialArticleTrans = {};


        this.ReadWord();
    }
    ReadWord() {
        this.SpecialArticle();
        // console.log(this.FileName, this.OriginName, this.IthArt);
        this.story = 
        fetch(this.FilePos+this.FileName)
            .then((res)=>res.json())
            .then((json)=>{
                // console.log(this.OriginName+this.IthArt)
                this.IthArt++;
                // console.log(json[this.OriginName+this.IthArt])
                // console.log(this.OriginName,this.IthArt)
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
            // console.log(val[ this.NowIdx])
            document.getElementById(id).innerHTML += val[ this.NowIdx ];
            this.NowIdx++;
        }
        );
    }
    SpecialArticle() {
        let data;
        console.log(this.FileName, this.OriginName, this.IthArt);
        try {
            data = this.SpecialArticleTrans[this.FileName][this.OriginName][this.IthArt];
        }
        catch {
            console.log("Liter_SpecialArticle: data doesn't exit");
            return;
        }
        if( data ) {
            console.log(data["jumpTo"]);
            this.DirectTo(
                data["jumpTo"]["FileName"],
                data["jumpTo"]["ArtName"],
                data["jumpTo"]["IthArt"]
            );
        }
    }

    DirectTo(FileName, ArtName, IthArt) {
        this.FileName = FileName;
        this.OriginName = ArtName; //ArtName
        this.IthArt = IthArt-1;
    }

}


function init() {

    MUSIC = new music();    
    DATA = new GLOBAL_DATA();
    MAIN = new Element(document.getElementById('main_process'), 'main_process', "");
    Cookie = new cookie();
    Decide = new ChoseButton();

    Body = new Element(document.getElementById("BODY"), "body", `../${FatherFileNmae}style/MAINstyle.json`);
    Body.ReadStyle();
    Body.InitStyle("MainInit");

    Cookie.LoginTimeCnt();


    story = new Liter(`../${FatherFileNmae}data/story/`, "start.json");
    Body.UpdateStyle(story.OriginName, story.IthArt);
    

    //debug
    // story.DirectTo("start.json", "A", 6);
    //

    document.addEventListener('keydown', function(event){
        console.log("MAIN Status:", MAIN.Status);
        MAIN.ScroolToEnd();
        if(event.key == "Enter" && MAIN.Status == "Go") {
            // console.log(MAIN.EndString());
            if( MAIN.EndString() ) {
                console.log(MAIN.Status);

                if( MAIN.Status == "Go")  {
                    Decide.InitNewArticle(story.FileName, story.OriginName, story.IthArt);
                    console.log(story.FileName, story.OriginName, story.IthArt);
                    if( Decide.GetData() ) {
                        console.log("Start Making Decission");
                        MAIN.AddElement('div', Decide.MakeButtonHtml(),"button_spacearound", false);
                        Decide.AddButtonEventListenter();
                        MAIN.Status = "stop";
                    }
                    else {
                        DATA.OpenQuestion(
                            story.OriginName+story.IthArt
                        );
                        setTimeout(()=>{
                            MAIN.AddPassword(MAIN.AddElement('div', '<input/>', 'center', false));
                            MAIN.Status = "Choose";
                        }, 20);
                    }

                }

            }
            else {
                story.NextandAddInto(MAIN.AddElement());
            }
        }

        if( event.key == '/' && MAIN.Status == "Choose" ) {
            DATA.CheckPassword(
                story.OriginName+story.IthArt,
                MAIN.GetPassword()
            );
            // if( ans ) {
            //     story.ReadWord();
            //     MAIN.NewStory();
            //     alert("密碼正確");
            // }
            // else {
            //     alert("密碼不正確");
            // }
        }
        setTimeout(()=>MAIN.ScroolToEnd(), 20);
    });
}
