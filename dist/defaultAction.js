"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const applyTemplate_1 = require("./applyTemplate");
const globals_1 = require("./globals");
async function fallbackAction(protofileName, options) {
    console.log(options);
    prepareProtofilesDirectory();
    const protofileDirectory = path_1.resolve(globals_1.globalConfigDirectory, protofileName);
    console.log(protofileDirectory);
    if (await fs_extra_1.pathExists(protofileDirectory)) {
        applyTemplate_1.applyTemplate(protofileDirectory);
    }
    else {
        console.log(`Template "${protofileName}" does not exist`);
    }
}
exports.fallbackAction = fallbackAction;
async function prepareProtofilesDirectory() {
    const dirExists = await fs_extra_1.pathExists(globals_1.globalConfigDirectory);
    if (!dirExists) {
        await fs_extra_1.ensureDir(globals_1.globalConfigDirectory);
    }
}
