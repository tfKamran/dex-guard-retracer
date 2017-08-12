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
                    lastMappedClass.members[split[0].substring(4, split[0].nthIndexOf(':', 1))
                    + ":" + split[0].substring(split[0].nthIndexOf(':', 1) + 1, split[0].nthIndexOf(':', 2)) 
                    + ":" + split[1]] = {
                        "name": split[0].substring(split[0].nthIndexOf(':', 2) + 1)
                    };
                }
            }
        };

        return mappings;
    }

    function retrace(logs, mappings) {
        const symbols = Object.keys(mappings);

        var lines = logs.split("\n");

        symbols.forEach(function(symbol) {
            lines = lines.map(function(line, lineIndex) {
                if (line.indexOf(symbol + ".") != -1 || line.indexOf(symbol + "$") != -1 || line.indexOf(symbol + " ") != -1) {
                    line = line.split(symbol).join(mappings[symbol].class);

                    const members = Object.keys(mappings[symbol].members);
                    const lineNumber = line.indexOf(":") != -1 ? +line.split(":")[1].replace(")", "") : -1;

                    members.forEach(function(member) {
                        if (lineNumber >= +member.split(":")[0] && lineNumber <= +member.split(":")[1]) {
                            line = line.split("." + member.split(":")[2])
                                    .join("." + "[" + mappings[symbol].members[member].name + "]")
                                    .replace(":" + lineNumber, "");
                        }
                    });
                }

                return line;
            });
        });

        return lines.join("\n");
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
