/*
    Mocha Test Sample
    http://mochajs.org/
*/
var assert = require('assert');

// test target
var calc = require('./calc');


// 001: Sync Test
describe('calc', function () {
    describe('#add()', function () {
        it('Number + Number', function () {
            assert.equal(calc.add(1, 1), 2);
        });
        it('Number + String', function () {
            assert.equal(calc.add(1, 'a'), '1a');
        });
    });
});


// 002: Async Test
describe('calc', function () {
    describe('#addAsync()', function () {
        it('Number + Number', function (done) {
            calc.addAsync(1, 1, function (err, result) {
                assert.equal(err, null);
                assert.equal(result, 2);
                done();
            });
        });
        it ('Number + String becomes error', function (done) {
            calc.addAsync(1, 'a', function (err, result) {
                assert.equal(err.message, 'x and y must be number');
                assert.equal(result, undefined);
                done();
            });
        });
    });
});





