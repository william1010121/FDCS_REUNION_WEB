# 2022/11/19 程式設計班第十一屆迎新活動

## 目的
為了程式設計班111學年度迎新建立解謎遊戲的網站

## 程式語言
1. javascript
2. css
3. html

# 各個檔案的做用

## index.html
主要的網頁，可以把他是作為起點大廳，遊戲從此開始

## index.css
網頁的格式選擇，如果是靜態的樣式就會放在這裡面
動態的則是會另外做操作

# 資料夾 
## data
主要存放如**音樂**、**圖片**等資料

### 內含

- `music`
- `pikachu_background.png`
- `story`

## js
`js`存放的地區，會在此處把**特效**、**音頻**、**解謎程式**都做完

### 內含

- `cookie.js`
- `try.js`

## style
主要是存下各個場景的`style`
會用`json`檔來存

### 內含

- `StartPage.json`


# json檔案中的函式作用

## cookie.js
`cookie`的存取
學習網站: https://www.runoob.com/js/js-cookies.html

### setCookie(cname, cvalue, exdays)
- `cname`: `cookie`名稱
- `cvalue`: `cookie`值
- `exdays`: `cookie`存放時間
設置`cookie`

### getCookie(cname)
- `cname`: `cookie`名稱
獲取`cookie`

### LoginTimeCnt()
存入訪問網站的次數


## try.js
### (class) GLOBAL_DATA
主要是為了避免混淆`var`的作用域而開的，裡面會存入一些需要全域的資料

#### constructor

- `BGCOLOR`: 背景顏色(測試用)
- `BGCOLORCNT`: 紀錄背景顏色(測試用)
- `EndString`: 判斷一個段落結尾的文字


#### (function) ChangeBgColor(element)
- `element`: 想要變換背景顏色的元素



### (class) music
用來撥放音樂的

#### constructor
- `music_list`: 存入音樂的位置，方便讀取
- `size`: 目前音樂的大小
- `idx`: 目前撥到第幾首音樂
- `NowStatus`: 目前音樂的狀態(**Pause**, **Play**)


####  GetIdx(idx)
獲取第`idx`個音樂的位置
####  DirectTo(idx)
定位到第`idx`個音樂
####  StartPlay(idx, time)
開始撥放第`idx`個音樂
####  Pause()
停止撥放第`idx`個音樂
####  Chage()
改變目前撥放狀態
####  JumpTo(time)
跳轉到第`time`秒時的音樂

### (class) Element
主要是用來存放元素的位置，一樣式為了避免變數混淆

#### constructor(element, name)
- `element`: 元素
- `name`: 為這個元素取的名字，主要是在`json`比較好用
- `StylePositoin`: 存放`Style`所在的位置
- `ElementCnt`: 目前他總共有幾個子元素
- `PrevEle`: 上一個加入元素的`Id`
- `Status`:  目前的狀態

#### SetAttr(tag, value)
幫元素設值，需要注意的是會直接覆蓋掉原先標籤擁有的值
- `tag`: 元素的標籤，ex: `style`, `id`, `class`
- `value`: 標籤所要設的值


#### ReadStyle(position)
- 讀取元素`style/element.json`的位置

#### Setstyles(styledic)
幫元素把`styledic`裡面的`style`設好
- `styledic`: 會用`ReadStyle`讀取

#### Setstyle(key, value)
只更改單個`style`的值
- `key`: ex: `background-color, display`
- `value`: ex: `gray, flex`
#### HavScroolBar(): bool
確認其有沒有滑動條

#### ScroolToEnd()
把滑動條滾到底部

#### AddElement(tag, InHtml, class, RegardasPreEle)
增加一個`html`元素
- `tag`此`html`元素的標籤
- `InHtml`: 此`html`元素裡面的值
- `class`: 設置`class`
- `RegardasPreELe`: 是否要被認定為前一個元素

#### EndString()
判斷目前是否已警結束了

#### NewStory()
換到下一個故事

#### CleanElement()
將之前的操作清空，包括加入的元素

#### CheckPassWord()
確認密碼是否正確

#### ReadPassword()
讀取`Password`


### Liter
主要用來存放文章的地方

#### construct(FilePos, FileName, IthArt)
- `FilePos`: 文章的位置
- `FileName`: 文章的檔案名
- `OriginName`: 文章的標題
- `IthArt`: 文章的名稱為 `OriginName+IthArt`
- `NowIdx`: 目前文章到第幾行

#### ReadWord()
讀取文章

#### NextandAddInto(id)
在`id`裡面將當前的句子放入，然後蝶帶下一篇文章



