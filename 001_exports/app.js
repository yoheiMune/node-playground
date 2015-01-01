var add = require('./sub1');
var result = add(1, 2);
console.log(result); // =&gt; 3

var calc = require('./sub2');
var result1 = calc.add(1, 2);
console.log(result1); // =&gt; 3
var result2 = calc.minus(1, 2);
console.log(result2); // =&gt; -1

var myModule = require('./module');
console.log(myModule.calc.add(1, 2));
myModule.print.sayHello();




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
