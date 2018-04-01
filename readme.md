### Before excute

- I want to remove timeline code.
  - 手動
    - 把要轉換的文字檔 全部放到一個資料夾，並取名爲 'sub'。
  - 自動
    - 執行 `node moveFilesTo.js`，就會把所有檔名後面結尾是 '.en.srt' 的檔案，移動到 'sub' 資料夾。（如果沒有 /sub 資料夾，會自動建立一個）


- I want to translate files. (I don't need to remove timline code, just translating.)
  - 手動
    - 把要翻譯的文字檔 全部放到一個資料夾，並取名爲 'EN'


### Excute
1. 執行 `node setDirname.js` ， 出現 process.stdin 互動。
輸入 sub 資料夾的所在路徑

2. 執行 `node refineEN.js` ， 去除時間碼。
完成後，全部檔案會儲存在 /EN 資料夾中。（如果沒有 /EN 資料夾，會自動建立一個）


3. 執行 `node allFileToZh_TW.js`， 英翻中。
完成後，全部檔案會儲存在 /TW 資料夾中。（如果沒有 /TW 資料夾，會自動建立一個）
如果沒有去除時間軸的必要，請省略 step2.

## ParentDir / childrenDirs 架構的批次轉換 workflow
請按照順序執行
0. `node setDirname.js <THE ParentDir path>`
1. `node copyFilesToSub.js`
2. `node refineFilesToEN.js`
3. `node transFilesToTW.js`