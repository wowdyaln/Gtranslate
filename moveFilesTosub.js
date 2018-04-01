// rootDir > 子資料夾 > ***.en.srt  |全部srt檔案移動到| rootDir > 子資料夾 > sub > ***.en.srt
// rootDir > ***.en.srt 不會動作
const fs = require("fs")
const rootDir = require('./path.js')
const move = require('./moveFile.js') //move(oldPath, newDir,newFileName, callback)

const getDirectories = require('./findAllDir.js')

let oldDir = rootDir+'/'
let newDir = rootDir+'/sub/'

let dirs = getDirectories(rootDir)
// console.log(dirs)

dirs.forEach( dir => {
  let files = fs.readdirSync(dir)
  
  console.log(dir)
  let names = []
  files.forEach( file => {
    if (file.match(/en\.srt$/)){
      names.push(file)
    }
  })
  // console.log(names)
  if (names !== []){
    // let opath = oldDir + 
    names.forEach(name => {
      // console.log(dir+ '/' + name)
      // console.log(dir+ '/')
      // console.log(name)
      move(dir + '/' + name, dir + '/sub/', name, () => {
        console.log(`move to ${dir}/sub/`)
      })
    })
  }

})
