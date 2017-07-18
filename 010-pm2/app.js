const express = require('express');

app = express();

app.get('/', (req, res) => {
    res.send('Hello from index.');
});

app.listen(3000, () => {
    console.log('Express app starts, linstening port on 3000.')
});

// 環境変数のテスト（PM2の設定ファイルより指定）
console.log('NODE_NEV:', process.env.NODE_ENV);
console.log('SECRET_KEY:', process.env.SECRET_KEY);