// rootDir > 子資料夾 > ***.en.srt  |全部srt檔案移動到| rootDir > 子資料夾 > sub > ***.en.srt
// rootDir > ***.en.srt 不會動作
const fs = require("fs")
const rootDir = require('./path.js')

const getDirectories = require('./findAllDir.js')

let oldDir = rootDir+'/'
let newDir = rootDir+'/sub/'

let dirs = getDirectories(rootDir)
// console.log(dirs)

let subs = []

dirs.forEach( dir => {
  let files = fs.readdirSync(dir)
  // console.log(files)
  files.forEach( name=> { 
    if (name === "sub"){
      subs.push(`${dir}/`+name)
    }
  })
})
console.log(subs)
