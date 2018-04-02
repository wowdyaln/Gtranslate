// rootDir > 子資料夾 > ***.en.srt  |全部srt檔案移動到| rootDir > 子資料夾 > sub > ***.en.srt
// rootDir > ***.en.srt 不會動作
const fs = require("fs")
const rootDir = require('./lib/path.js')
const getDirectories = require('./lib/findAllDir.js')

let oldDir = rootDir+'/'
let newDir = rootDir+'/sub/'

let dirs = getDirectories(rootDir)
// console.log(dirs)

dirs.forEach( dir => {
  let files = fs.readdirSync(dir)
  
  console.log(dir)
  let names = []
  files.forEach( file => {
    if (file.match(/en\.vtt$/)){
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
      copyFile(dir + '/' + name, dir + '/vtt/', name, () => {
        console.log(`move to ${dir}/vtt/`)
      })
    })
  }

})
//======
function copyFile(source, targetDir, file) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir)
  }

  fs.createReadStream(source)
    .pipe(fs.createWriteStream(targetDir + file));

  console.log(`copy to ${targetDir}`)
}