"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
function getPackageData(filepath) {
    var packageJsonString = fs_1.readFileSync(filepath, 'utf-8');
    return (function () {
        try {
            return JSON.parse(packageJsonString);
        }
        catch (_a) {
            return {};
        }
    })();
}
exports.getPackageData = getPackageData;
