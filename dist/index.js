#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const path_1 = require("path");
const defaultAction_1 = require("./defaultAction");
const packageJson_1 = require("./utils/packageJson");
const packageJson = packageJson_1.getPackageData(path_1.resolve(path_1.dirname(__dirname), 'package.json'));
commander.version(packageJson.version, '-v, --version');
commander
    .command('* [inputs]')
    .action(defaultAction_1.fallbackAction);
commander.parse(process.argv);
