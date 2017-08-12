#! /usr/bin/env node

const fs = require('fs');
const Retracer = require('./retracer');

if (process.argv.length != 4) {
    console.log(
        "You need to pass in two arguments:\n"
        + "\n"
        + "1. Mapping file\n"
        + "2. Log file\n"
        + "\n"
        + "Example:\n"
        + "\n"
        + "\tdex-guard-retracer ./test-mapping.txt ./test-log.txt\n"
        );

    return;
}

const rawMappings = fs.readFileSync(process.argv[2], 'utf-8');
const logs = fs.readFileSync(process.argv[3], 'utf-8');

const mappings = Retracer.generateMap(rawMappings);

console.log(Retracer.retrace(logs, mappings));
