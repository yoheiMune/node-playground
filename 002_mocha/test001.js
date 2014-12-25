/*
    Mocha Test Sample
    http://mochajs.org/
*/
var assert = require('assert');

// Sample
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 if the item is not found', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});

