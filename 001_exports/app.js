// 1. 関数として取得
var sub1 = require('./sub1');
var sub1 = require('./sub1.js');
var result = sub1(1, 2);
console.log('result: ', result);

// 2. オブジェクトとして取得
var sub2 = require('./sub2');
var result = sub2.minus(1, 2);
console.log('result: ', result);

// 3. 何度呼び出しても1回だけ評価される
var sub3 = require('./sub3');
var sub3 = require('./sub3');

// 4. ディレクトリで読み込む（index.jsの用意）
var model = require('./model');
console.log('model: ', model);
console.log(model.model1('male'));
console.log(model.model1('female'));
