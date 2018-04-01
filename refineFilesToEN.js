/*
      rootDir/parent/sub/name.txt
refine ==>      
      rootDir/parent/EN/name_Script.txt
*/


const fs = require("fs")
const rootDir = require('./path.js')
const refine = require('./refineSub.js')
const getDirectories = require('./findAllDir.js')

// console.log(refine.refineSub)


//  rootDir/parent/child/name.txt
let parents = getDirectories(rootDir)
// console.log(parents)

// get subs
parents.forEach( parent => {
  let childs = getDirectories(parent)
  childs.forEach(child => {
    if (child.match(/sub$/)) {
      let names = refine.getAllFilePath(child) // txt files under 'sub' field

      names.forEach( name => {
        refine.refineSub(child+'/'+name, parent+'/EN/', name)
      })
    }
  })
})