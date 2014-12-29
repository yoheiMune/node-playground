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


// 003: Hooks
describe('hook', function () {

    before(function () {
        console.log('hook before');
    });
    beforeEach(function () {
        console.log('hook beforeEach');
    });
    after(function () {
        console.log('hook after');
    });
    afterEach(function () {
        console.log('hook afterEach');
    });

    it('hook-test-01', function () {
        assert(true, 'hook-test-01 was done.');
    });

    it('hook-test-02', function () {
        assert(true, 'hook-test-02 was done.');
    });
});


// 004: Slow Test
describe('slow', function () {
    it('20+ms  needed', function (done) {
        setTimeout(function () {
            done();
        }, 20);
    });
    it('50+ms  needed', function (done) {
        setTimeout(function () {
            done();
        }, 50);
    });
    it('100+ms needed', function (done) {
        setTimeout(function () {
            done();
        }, 150);
    });
});


// 005: String Diff
describe('diff', function () {
    it('string diff', function () {
        // assert.equal('John said Hello', 'John says Hello', 'test string diff');
    });
});


// 006: mocha --reporter list test001.js










































