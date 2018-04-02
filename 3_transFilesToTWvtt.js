/*
      rootDir/parent/EN/name_Script.txt
refine ==>      
      rootDir/parent/TW/name_Script.cht.txt
*/
const fs = require("fs")
const rootDir = require('./lib/path.js')
const trans = require('./lib/enTotw.js').enTotw
const getDirectories = require('./lib/findAllDir.js')

//
function getAllFilePath(dirPath) {
  var paths = fs.readdirSync(dirPath)
    .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)) // 忽略隱藏檔
  return paths
}

let parents = getDirectories(rootDir)
console.log(parents)

//  rootDir/parent/child/name.txt
// console.log(parents)

// get subs
parents.forEach(parent => {
  let childs = getDirectories(parent)
  childs.forEach(child => {
    if (child.match(/ENvtt$/)) {
      let names = getAllFilePath(child) // txt files under 'sub' field

      names.forEach(name => {
        let twName = `${name}_cht.txt`
        trans(child + '/' + name, parent + '/TWvtt/', twName)
      })
    }
  })
})
