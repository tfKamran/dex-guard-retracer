#! /usr/bin/env node

const fs = require('fs');
const Retracer = require('./retracer');

const rawMappings = fs.readFileSync(process.argv[2], 'utf-8');
const logs = fs.readFileSync(process.argv[3], 'utf-8');

const mappings = Retracer.generateMap(rawMappings);

console.log(Retracer.retrace(logs, mappings));
