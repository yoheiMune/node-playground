console.log('sub3 module is evaluated only once');
module.exports = function (a, b) {
    return a * b;
};