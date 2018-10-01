"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../lib/globals");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const table_1 = require("table");
const chalk_1 = require("chalk");
async function mainAction() {
    const templateNames = await fs_extra_1.readdir(globals_1.globalConfigDirectory);
    if (templateNames.length) {
        console.log(`  ${chalk_1.default.cyan('{{')} ${chalk_1.default.cyanBright('PROTOFILES')} ${chalk_1.default.cyan('}}')}\n`);
        console.log(`  The following templates are available.`);
        console.log(`  Run '${chalk_1.default.yellowBright('proto <id>')}' to apply one of them.\n`);
        const data = [
            ['ID', 'Description'].map(it => chalk_1.default.whiteBright(it)),
            ['--', '-----------'].map(it => chalk_1.default.gray(it)),
            ...templateNames.map(template => {
                const config = require(path_1.resolve(globals_1.globalConfigDirectory, template, 'protofile.js'));
                const { description } = config;
                return [template, description];
            })
        ];
        const options = {
            border: table_1.getBorderCharacters('void'),
            drawHorizontalLine: (index) => false,
            columns: {
                0: { width: 20 - 3, paddingLeft: 2 },
                1: { width: 80 - 20 - 5, wrapWord: true }
            }
        };
        console.log(table_1.table(data, options));
    }
    else {
        console.log('No templates available.');
    }
}
exports.mainAction = mainAction;
