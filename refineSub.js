const fs = require("fs")

module.exports = {
  refineSub:
            function refineSub(fromPath, toDir, fileName) {
              var data = fs.readFileSync(fromPath, 'utf8')
                .replace(/^\d+.*/gm, "") //去除時間碼
                .replace(/^\s*$/gm, "") //去除空白行
                .replace(/\r?\n|\r/g, " ") //變成一行
                .replace(/\./gm, '.\n\n') //以句點爲準，隔開每個句子
                .replace(/^\s/gm, "")
              // 檢查 toDir 有沒有存在
              if (!fs.existsSync(toDir)) {
                fs.mkdirSync(toDir)
              }
              fs.writeFileSync(toDir + `${fileName}_Script.txt`, data, 'utf8')
              console.log(toDir + `${fileName}_Script.txt  has refined.`)
            }
            ,
  getAllFilePath:
            function getAllFilePath(dirPath) {
              var paths = fs.readdirSync(dirPath)
                .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)) // 忽略隱藏檔
              return paths
            }
}