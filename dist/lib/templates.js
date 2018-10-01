"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const Mustache = require("mustache");
const path_1 = require("path");
// @ts-ignore
Mustache.escape = (it) => it;
async function renderInternalTemplate(filename, view) {
    const templatePath = path_1.resolve(path_1.dirname(__dirname), 'templates', `${filename}.mustache`);
    const fileContent = await fs_extra_1.readFile(templatePath, 'utf-8');
    return Mustache.render(fileContent, view);
}
exports.renderInternalTemplate = renderInternalTemplate;
async function renderProtofileTemplate(filename, view) {
    const fileContent = await fs_extra_1.readFile(filename, 'utf-8');
    return Mustache.render(fileContent, view);
}
exports.renderProtofileTemplate = renderProtofileTemplate;
