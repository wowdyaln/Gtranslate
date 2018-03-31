### Before excute

- remove timeline
  - put all files into a document named 'sub'. 把要轉換的文字檔 全部放到一個資料夾，並取名爲 'sub'
- remove timeline
  - put all files into a document named 'EN'. 把要翻譯的文字檔 全部放到一個資料夾，並取名爲 'EN'


### Excute
1. 執行 `node setDirname.js` ， 出現 process.stdin 互動。
輸入 sub 資料夾的所在路徑

2. 執行 `node refineEN.js`

完成後，全部檔案會儲存在 /EN 資料夾中。


3. 執行 `node allFileToZh_TW.js`

完成後，全部檔案會儲存在 /TW 資料夾中。
如果沒有去除時間軸的必要，請省略 step2.