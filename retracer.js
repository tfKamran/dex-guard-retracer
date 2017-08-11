(function() {
    function generateMap(rawMappings) {
        const mappings = {};
        const lines = rawMappings.split("\n");

        var lastMappedClassSymbol = '';
        for (var index = 0; index < lines.length - 1; index++) {
            const line = lines[index];
            const split = line.split(" -> ");

            if (!line.startsWith("    ")) {
                lastMappedClassSymbol = split[1].substring(0, split[1].length - 1);
                mappings[lastMappedClassSymbol] = { "class": split[0] };
            } else {
                const lastMappedClass = mappings[lastMappedClassSymbol];
                if (!lastMappedClass.members) lastMappedClass.members = {};

                if (line.indexOf(":") != -1) {
                    lastMappedClass.members[split[1]] = {
                        "name": split[0].substring(split[0].nthIndexOf(':', 2) + 1)
                    };
                }
            }
        };

        return mappings;
    }

    function retrace(logs, mappings) {
        const symbols = Object.keys(mappings);

        symbols.forEach(symbol => {
            logs = logs.split(symbol + ".").join(mappings[symbol].class + ".");
            logs = logs.split(symbol + "$").join(mappings[symbol].class + "$");
        });

        return logs;
    }

    String.prototype.nthIndexOf = function(string, n) {
        var index = -1;

        while (n-- > 0 && -1 != (index = this.indexOf(string, index + 1)));

        return index;
    };

    module.exports = {
        retrace,
        generateMap
    }
})();
