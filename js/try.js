var DATA;
var MUSIC;
// var FatherFileNmae = "FDCS_REUNION_WEB/";
var FatherFileNmae = "";
var MAIN;

class GLOBAL_DATA{
    constructor(){
        this.BGCOLOR = [
            "red", "green", "yellow", "black", "whilte"
        ];
        this.BgcolorCnt = 0;
    }

    ChangeBgColor(element) {
        let sz = this.BGCOLOR.length;
        this.BgcolorCnt = (this.BgcolorCnt+1)%sz;
        console.log(sz);
        element.Setstyle('element-color', this.BGCOLOR[this.BgcolorCnt]);
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


    AddElement(tag='p') {
        this.ElementCnt++;
        this.ele.innerHTML += `<${tag} id="${this.ElementCnt}th element of ${this.name}"></${tag}>`
        this.PrevEle =  `${this.ElementCnt}th element of ${this.name}`;
        return `${this.ElementCnt}th element of ${this.name}`;
    }

    EndString(st='故事結束') {
        const ele = document.getElementById(this.PrevEle);
        if( ele == null ) return false;
        // console.log(ele.innerText);
        if( ele.innerText == st ) {
            return true;
        }
        else {
            return false;
        }
    }

    CleanElement() {
        this.ele.innerHTML = "";
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
                document.getElementById(id).innerHTML += "故事結束";
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

    let Body = new Element(document.getElementById("BODY"), "body", `../${FatherFileNmae}style/StartPage.json`);
    Body.ReadStyle();


    let story = new Liter(`../${FatherFileNmae}data/story/start.json`);


    


    document.addEventListener('keydown', function(event){
        // console.log(event.key);
        if( event.key == 'p') {
            MUSIC.Change()
        }
        if(event.key == "Enter") {
            MAIN.ScroolToEnd();
            // console.log(MAIN.EndString());
            if( MAIN.EndString() ) {
                story.ReadWord();
            }
            story.NextandAddInto(MAIN.AddElement());
        }
    });

}
