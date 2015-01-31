/**
    Mocha tests for studying Q framework.
*/
var assert = require('assert');
var Q      = require('q');


describe('Q framework test', function () {

    describe('create promise object', function () {
        describe('Q.fcall', function () {
            it('nomalCase01', function (done) {
                var promise = Q.fcall(function () {
                    return 10;
                });
                promise.then(function (value) {
                    assert.equal(value, 10, 'then argument is 10');
                    done();
                });
            });
            it('errorCase01', function (done) {
                var promise = Q.fcall(function () {
                    throw new Error('my error');
                });
                promise.fail(function (reason) {
                    assert.equal(reason.message, 'my error', 'the error message is my own.');
                    done();
                }).done();
            });
        });
    });

    describe('promise chain', function () {

        var getPromise = function (value) {
            return Q.fcall(function () {
                return value || 10;
            });
        };
        var getPromiseWithError = function (message) {
            return Q.fcall(function () {
                throw new Error(message || 'my own error');
            });
        };

        it('then treats success result', function (done) {
            getPromise().then(function (value) {
                assert.equal(value, 10, 'returning value is 10');
                done();
            });
        });
        it('then treats error', function (done) {
            getPromiseWithError().then(null, function (err) {
                assert.equal(err.message, 'my own error', 'get my own error message.');
                done();
            });
        });


        // Propagation　から
        // https://github.com/kriskowal/q
        

    });



});