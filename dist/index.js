#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = require("cac");
const applyTemplateAction_1 = require("./actions/applyTemplateAction");
const mainAction_1 = require("./actions/mainAction");
const cli = cac_1.default({ bin: 'proto' });
cli.command('*', { desc: 'The default command' }, (input, flags) => {
    if (input[0]) {
        applyTemplateAction_1.applyTemplateAction(input[0], flags);
    }
    else {
        mainAction_1.mainAction();
    }
});
cli.parse();
