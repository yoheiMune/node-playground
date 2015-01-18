/**
    サーバーからファイルをダウンロードする
*/
var fs = require('fs');
var request = require('request');

// ダウンロードURL
// httpsでもOK
var fileUrl = 'http://www.yoheim.net/image/sea001.jpg';

// ファイルをダウンロードする
request
    .get(fileUrl)
    .on('response', function (res) {
        console.log('statusCode: ', res.statusCode);
        console.log('content-length: ', res.headers['content-length']);
    })
    .pipe(fs.createWriteStream('./saved.jpg'));