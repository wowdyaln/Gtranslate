const fs = require("fs")

process.stdout.write("\n\n\n\n")
process.stdout.write(`Enter the rootDir path （ e.g.  /User/dirA/dirB/dirC  ）`)
process.stdout.write("   >>   ")

process.stdin.on("data", function (data) {

  rootDir = 
`
const dirname = '${data.toString().trim()}'; 
module.exports = dirname;
`
  
  fs.writeFileSync('./lib/path.js', rootDir + "\n\n\n", 'utf8')

  console.log("OK, done !!")
  process.exit()
})
