/*
使用前 資料結構：
rootDir
    |
   sub --------------------------------EN
    |                                   |
    |                                   |
aa.en.srt ; bb.en.srt ... ...         aa._Script.txt ; bb_Script.txt ... ...
*/
const fs = require("fs")
const translate = require('google-translate-api');
const rootDir = require('./path.js')

let fromDir = '/EN/'
let toDir = '/TW/'
let fromDirPath = rootDir + fromDir
let toDirPath = rootDir + toDir



// subtitle files' Dir
function getAllFilePath(dirPath) {
  var paths = fs.readdirSync(dirPath)
    .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)) // 忽略隱藏檔
  return paths
}

// 
async function oneFileToZh_TW(data, pathTo) {
  if (data.length > 5000) {
    let a = splitter(data)[0]
    let b = splitter(data)[1]
    await translate(a, { from: 'en', to: 'zh-TW' })
    .then(res => {
      let twData = res.text
      fs.appendFileSync(pathTo, twData + "\n\n\n", 'utf8')
      console.log("a Done !")
    }).catch(err => {
      console.log(err)
    })
    
    if (b < 5000) {
      await translate(b, { from: 'en', to: 'zh-TW' })
      .then(res => {
        let twData = res.text
        fs.appendFileSync(pathTo, twData + "\n\n\n", 'utf8')
        console.log("b Done !")  // 這邊似乎永遠不會被執行？？
        }).catch(err => {
          console.log(err)
      })
      return
    } else {
      return oneFileToZh_TW(b, pathTo)
    }
  } else {
    translate(data, { from: 'en', to: 'zh-TW' })
      .then(res => {
        let twData = res.text
        fs.appendFileSync(pathTo, twData + "\n\n\n", 'utf8')
        console.log("under 5000 Done !")
      }).catch(err => {
        console.log(err)
      })
  }
}

//===========//===========//===========//===========
function splitter(data) {
  let cutIndex = pointCut(data)
  return sliceTwo(data, cutIndex)
}


function pointCut(string) {
  if (string[4999] === ".") {
    return 4999
  }
  return string.lastIndexOf(".", 4999)
}

function sliceTwo(string, index) {
  let part = string.slice(0, index + 1)
  let nextPart = string.slice(index + 1)
  let wholePart = [part, nextPart]
  return wholePart
}
//===========//===========//===========//===========

// delayedForEach //===========//===========//===========
Array.prototype.delayedForEach = function (callback, timeout, thisArg) {
  var i = 0,
    l = this.length,
    self = this,
    caller = function () {
      callback.call(thisArg || self, self[i], i, self);
      (++i < l) && setTimeout(caller, timeout);
    };
  caller();
};
//===========//===========//===========//===========//===========



//=========== excute //===========//=========== excute //===========//===========
let refinedPaths = getAllFilePath(fromDirPath)
var paths = getAllFilePath(fromDirPath)


refinedPaths.delayedForEach((en) => {
  let book = fs.readFileSync(fromDirPath + en, 'utf8')
  
  if (!fs.existsSync(toDirPath)) {
    fs.mkdirSync(toDirPath)
  }
  
  fs.writeFileSync(toDirPath + `${en}.cht.txt`, "", 'utf8')
  oneFileToZh_TW(book, toDirPath + `${en}.cht.txt`)
}, 300) // request 到 google translate 的間隔時間，可調整
