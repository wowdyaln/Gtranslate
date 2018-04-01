const fs = require("fs")
const rootDir = require('./path.js')
const move = require('./moveFile.js') //move(oldPath, newDir,newFileName, callback)

let oldDir = rootDir+'/'
let newDir = rootDir+'/sub/'



let a = fs.readdirSync(oldDir)
let oldFiles = []

a.forEach( file => {
  if (file.match(/en\.srt$/)){
    oldFiles.push(file)
  }
})
console.log(oldFiles)

oldFiles.forEach( file => {
  move(oldDir+file, newDir, file, ()=>{
    console.log(`move to ${newDir}`)
  })
})