"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const os_1 = require("os");
exports.globalConfigDirectory = path_1.resolve(os_1.homedir(), '.protofiles');
exports.configFilename = 'protofile.js';
