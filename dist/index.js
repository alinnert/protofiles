#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = require("cac");
const applyTemplateAction_1 = require("./actions/applyTemplateAction");
const mainAction_1 = require("./actions/mainAction");
const cli = cac_1.default({ bin: 'proto', defaultOpts: { help: false, version: false } });
cli.command('*', { desc: 'The template command' }, (input, flags) => {
    const [command, ...args] = input;
    if (command) {
        applyTemplateAction_1.applyTemplateAction(input[0], flags);
    }
    else {
        mainAction_1.mainAction();
    }
});
cli.parse();
