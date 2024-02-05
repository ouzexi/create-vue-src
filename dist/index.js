#!/usr/bin/env node --experimental-specifier-resolution=node
import { __awaiter } from "tslib";
import inquirer from 'inquirer';
import ora from 'ora';
import fs from 'fs-extra';
import { downloadTemplate } from './download';
import { modifyPackageJson } from './modify';
const log = ora('modify');
function main() {
    const projectName = process.argv[2];
    if (!projectName) {
        log.warn("The project name cannot be empty!");
        process.exit(1);
    }
    else {
        init(projectName);
    }
}
function init(projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        const Vue2TemplateGitUrl = 'https://github.com/ouzexi/vue2-source-study';
        const Vue3TemplateGitUrl = 'https://github.com/ouzexi/vue3-source-study';
        const InitPrompts = [
            {
                name: "description",
                message: 'please input description',
                default: ''
            },
            {
                name: 'author',
                message: 'please input author',
                default: ''
            }
        ];
        const TemplateOptions = {
            type: 'list',
            name: 'templateVer',
            message: 'Select a template',
            choices: [
                {
                    name: 'Vue2',
                    value: 'Vue2'
                },
                {
                    name: 'Vue3',
                    value: 'Vue3'
                }
            ]
        };
        if (fs.existsSync(projectName)) {
            log.warn(`Has the same project named ${projectName}, please create another project!☕`);
            return;
        }
        log.info(`Start init create-vue-src project: ${projectName}`);
        const initOptions = yield inquirer.prompt(InitPrompts);
        const templateOptions = yield inquirer.prompt(TemplateOptions);
        const templateGitUrl = templateOptions.templateVer === 'Vue2' ? Vue2TemplateGitUrl : Vue3TemplateGitUrl;
        try {
            const downloadPath = `./${projectName}`;
            yield downloadTemplate(templateGitUrl, downloadPath);
            modifyPackageJson(downloadPath, Object.assign({ name: projectName }, initOptions));
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();
//# sourceMappingURL=index.js.map