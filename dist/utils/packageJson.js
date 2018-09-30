"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function getPackageData(filepath) {
    const packageJsonString = fs_1.readFileSync(filepath, 'utf-8');
    return (() => {
        try {
            return JSON.parse(packageJsonString);
        }
        catch (_a) {
            return {};
        }
    })();
}
exports.getPackageData = getPackageData;
