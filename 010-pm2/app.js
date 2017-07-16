const express = require('express');

app = express();

app.get('/', (req, res) => {
    res.send('Hello from index.');
});

app.listen(3000, () => {
    console.log('Express app starts, linstening port on 3000.')
});