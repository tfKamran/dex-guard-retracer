const assert = require('assert');
const Retracer = require('../retracer');

describe('Retracer', function() {
    describe('retrace', function() {
        it('should return string', function() {
            assert.equal(typeof "", typeof Retracer.retrace(""));
        });
    });
});
