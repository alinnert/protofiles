"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const globals_1 = require("./globals");
async function fallbackAction(templateName) {
    prepareProtofilesDirectory();
    const protofileDirectory = path_1.resolve(globals_1.protofilesDirectory, templateName);
    console.log(protofileDirectory);
    if (await fs_extra_1.pathExists(protofileDirectory)) {
        console.log(`Template "${templateName}" exists`);
    }
    else {
        console.log(`Template "${templateName}" does not exist`);
    }
}
exports.fallbackAction = fallbackAction;
async function prepareProtofilesDirectory() {
    const dirExists = await globals_1.protofilesDirectoryExists();
    if (!dirExists) {
        await fs_extra_1.ensureDir(globals_1.protofilesDirectory);
    }
}
