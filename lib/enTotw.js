const fs = require("fs")
const translate = require('google-translate-api');
const rootDir = require('./path.js')

//===========//===========//===========//===========
function splitter(data) {
  let cutIndex = pointCut(data)
  return sliceTwo(data, cutIndex)
}
//
function pointCut(string) {
  if (string[4999] === ".") {
    return 4999
  }
  return string.lastIndexOf(".", 4999)
}
//
function sliceTwo(string, index) {
  let part = string.slice(0, index + 1)
  let nextPart = string.slice(index + 1)
  let wholePart = [part, nextPart]
  return wholePart
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
//
function enTotw(pathFrom, toDir, fileName){
  let pathTo = toDir + fileName
  
  if (!fs.existsSync(toDir)) {
    fs.mkdirSync(toDir)
  }
  let data = fs.readFileSync(pathFrom, 'utf8')
  oneFileToZh_TW(data, pathTo)
}

//
module.exports = {
  enTotw: enTotw
}