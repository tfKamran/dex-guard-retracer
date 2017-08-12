# dex-guard-retracer

[![npm version](https://badge.fury.io/js/dex-guard-retracer.svg)](https://badge.fury.io/js/dex-guard-retracer)
[![npm downloads](https://img.shields.io/npm/dt/dex-guard-retracer.svg)](https://www.npmjs.com/package/dex-guard-retracer)

[![NPM](https://nodei.co/npm/dex-guard-retracer.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dex-guard-retracer/)

A tool to retrace encrypted crash logs, especially for DexGuarded Android applications. The retrace tool that comes within DexGuard package fails to decrypt crash logs found from differently presented logs, like on Fabric Crashlytics. You can decrypt such logs too using this tool!

## How to install?

You need to have Node.js installed on your system before you can use this package. Get it here: [Node.js](https://nodejs.org/)

Once you have Node.js and NPM setup, the installation is as simple as running a command.

### Linux/Mac

    sudo npm install -g dex-guard-retracer

### Windows

Within a command prompt window with administrative privileges:

    npm install -g dex-guard-retracer

## How to use?

    dex-guard-retracer ./test-mapping.txt ./test-log.txt

It will print out the decrypted logs on the console.
