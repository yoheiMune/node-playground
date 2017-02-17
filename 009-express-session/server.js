var express = require('express');
var session = require('express-session');

app = express();

app.use(session({
    secret            : 'my-special-secret', // required
    resave            : false,               // should be set
    saveUninitialized : true,                // should be set
    rolling           : true,
    name              : 'my-special-site-cookie',
    cookie            : {
        maxAge : 1000 * 60 * 60 * 24 * 30, // 30日（単位はミリ秒）
    }
}));

app.get('/', (req, res) => {

    let user = req.session.user || { prevAccess : null, pv : 1 };
    let prevAccess = user.prevAccess;
    let pv = user.pv;

    user.pv += 1;
    user.prevAccess = new Date();
    req.session.user = user;

    res.send(`Hello from express4! pv=${pv}, prevAccess=${prevAccess}`);
});

app.listen(3000, () => {
    console.log('App listening on port 3000.');
});