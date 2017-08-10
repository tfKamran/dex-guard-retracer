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

    function retrace(log, mapping) {
        return log;
    }

    module.exports = {
        retrace,
        generateMap
    }
})();
