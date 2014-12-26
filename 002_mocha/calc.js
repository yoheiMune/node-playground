/*
    テスト対象
*/
module.exports = {
    add: function (x, y) {
        return x + y;
    },
    minus: function (x, y) {
        return x - y;
    },
    multiple: function (x, y) {
        return x * y;
    },
    divide: function (x, y) {
        return x / y;
    },
    addAsync: function (x, y, cb) {
        setTimeout(function () {
            if (typeof x !== 'number' || typeof y !== 'number') {
                return cb(new Error('x and y must be number'));
            }
            var result = x + y;
            cb(null, result);
        }, 1);
    },
};


