(function() {
    function generateMap(rawMappings) {
        const mappings = {};
        const lines = rawMappings.split("\n");

        for (var index = 0; index < lines.length - 1; index++) {
            const line = lines[index];
            const split = line.split(" -> ");

            if (!line.startsWith("    ")) {
                mappings[split[1].substring(0, split[1].length - 1)] = { "class": split[0] };
            }
        };

        return mappings;
    }

    function retrace(logs, mappings) {
        const symbols = Object.keys(mappings);

        symbols.forEach(symbol => {
            logs = logs.split(symbol).join(mappings[symbol].class);
        });

        return logs;
    }

    module.exports = {
        retrace,
        generateMap
    }
})();
