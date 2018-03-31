### Before excute

- put all files into a document named 'sub'. 把要轉換的文字檔 全部放到一個資料夾，並取名爲 'sub'


### Excute
1. a subtitle file: Remove timeline字母檔的轉換，拿掉時間軸
```
更改 refineEN.js 檔案
<line 4>
// edit the rootDir path （absolute path 絕對路徑 ）
let rootDir = ''

// excute
node refineEN.js

完成後，全部檔案會儲存在 /EN 資料夾中。
```

2. translate by google.
```
更改 allFileToZh_TW.js 檔案
<line 5>
// edit the rootDir path （absolute path 絕對路徑 ）
let rootDir = '' 

// excute
node allFileToZh_TW.js

完成後，全部檔案會儲存在 /TW 資料夾中。
```

如果沒有去除時間軸的必要，請省略 step1.