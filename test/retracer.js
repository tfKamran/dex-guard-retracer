const assert = require('assert');
const Retracer = require('../retracer');

const mappingFile1 = "com.example.test.AnotherClass -> o.w:\n"
    + "    java.lang.String TAG -> `\n"
    + "    android.content.Context mContext -> ,\n"
    + "    android.net.Uri mContentUri -> .\n"
    + "    52429:52430:void checkSelfPermission(android.content.Context,java.lang.String):125:126 -> ˋ\n"
    + "    321:325:void com.example.test.AnotherClass.doSomething():404:409 -> ˋ\n"
    + "com.example.test.TestClass -> o.wM:\n"
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

        it('should interpret member methods when raw mappings are provided', function() {
            assert.equal("void checkSelfPermission(android.content.Context,java.lang.String):125:126",
                Retracer.generateMap(mappingFile1)["o.w"].members['52429:52430:ˋ'].name);
        });
    });

    describe('retrace', function() {
        it('should return string', function() {
            assert.equal(typeof "", typeof Retracer.retrace("", {}));
        });

        it('should return the actual class name from mappings', function() {
            assert.equal("com.example.test.AnotherClass.run()", Retracer.retrace("o.w.run()", Retracer.generateMap(mappingFile1)));
        });

        it('should return the actual class name from mappings when there are similar symbols', function() {
            assert.equal("com.example.test.TestClass.run()", Retracer.retrace("o.wM.run()", Retracer.generateMap(mappingFile1)));
        });

        it('should return the actual method name from mappings', function() {
            assert.equal("com.example.test.AnotherClass.[void checkSelfPermission(android.content.Context,java.lang.String):125:126]()",
                Retracer.retrace("o.w.ˋ(:52429)", Retracer.generateMap(mappingFile1)));
        });

        it('should return the actual method name from mappings when line number is within range', function() {
            assert.equal("com.example.test.AnotherClass.[void com.example.test.AnotherClass.doSomething():404:409]()",
                Retracer.retrace("o.w.ˋ(:322)", Retracer.generateMap(mappingFile1)));
        });
    });
});
