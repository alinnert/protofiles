"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const inquirer_1 = require("inquirer");
const path_1 = require("path");
const globals_1 = require("./globals");
const templates_1 = require("./templates");
async function applyTemplate(protofileDirectory) {
    const config = await getProtofileConfig(protofileDirectory);
    if (!config) {
        console.log(`The config file "${globals_1.configFilename}" is missing from directory ${protofileDirectory}`);
        return;
    }
    console.log(await templates_1.renderInternalTemplate('confirm-apply-message', config));
    if (typeof config.inputs === 'object') {
        const mergeDefaults = (input) => ({ ...questionDefaults, ...input });
        const questionDefaults = { type: 'input' };
        const questions = config.inputs.map(mergeDefaults);
        const answers = await inquirer_1.prompt(questions);
        const fileDescriptors = config.files(answers);
        const renderResult = fileDescriptors.map(async (fileDescriptor) => ({
            ...fileDescriptor,
            output: await templates_1.renderProtofileTemplate(path_1.resolve(protofileDirectory, `${fileDescriptor.template}.mustache`), typeof answers === 'object' && answers !== null ? answers : {})
        }));
        const outputs = await Promise.all(renderResult);
        await Promise.all([
            ...outputs.map(async ({ output, outputPath }) => {
                await fs_extra_1.ensureFile(outputPath);
                return fs_extra_1.writeFile(outputPath, output);
            })
        ]);
    }
}
exports.applyTemplate = applyTemplate;
async function getProtofileConfig(protofileDirectory) {
    const configFilePath = path_1.resolve(protofileDirectory, globals_1.configFilename);
    return await fs_extra_1.pathExists(configFilePath) ? require(configFilePath) : null;
}
