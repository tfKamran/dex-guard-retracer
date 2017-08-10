const assert = require('assert');
const Retracer = require('../retracer');

const mappingFile1 = "com.example.test.TestClass -> o.wM:\n"
    + "    java.lang.String TAG -> ॱ\n"
    + "    android.content.Context mContext -> ˏ\n"
    + "    android.net.Uri mContentUri -> ˎ\n";

describe('Retracer', function() {
    describe('generateMap', function() {
        it('should return an object', function() {
            assert.equal(typeof {}, typeof Retracer.generateMap(""));
        });

        it('should interpret class name when raw mappings are provided', function() {
            assert.equal("com.example.test.TestClass", Retracer.generateMap(mappingFile1)["o.wM"].class);
        });
    });

    describe('retrace', function() {
        it('should return string', function() {
            assert.equal(typeof "", typeof Retracer.retrace("", {}));
        });

        it('should return the actual class name from mappings', function() {
            assert.equal("com.example.test.TestClass", Retracer.retrace("o.wM", Retracer.generateMap(mappingFile1)));
        });
    });
});
