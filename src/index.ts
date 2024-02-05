#!/usr/bin/env node --experimental-specifier-resolution=node
import type { QuestionCollection } from 'inquirer';
import inquirer from 'inquirer';
import ora from 'ora';
import fs from 'fs-extra';
import { downloadTemplate } from './download';
import { modifyPackageJson } from './modify';
const log = ora('modify');

function main() {
    const projectName: string = process.argv[2];
    if(!projectName) {
        log.warn("The project name cannot be empty!");
        process.exit(1);
    } else {
        init(projectName);
    }
}

async function init(projectName: string) {
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

    if(fs.existsSync(projectName)) {
        log.warn(`Has the same project named ${projectName}, please create another project!☕`);
        return;
    }
    log.info(`Start init create-vue-src project: ${projectName}`);
    const initOptions = await inquirer.prompt(InitPrompts);
    const templateOptions = await inquirer.prompt(TemplateOptions);
    const templateGitUrl = templateOptions.templateVer === 'Vue2' ? Vue2TemplateGitUrl : Vue3TemplateGitUrl;
    try {
        const downloadPath = `./${projectName}`;
        await downloadTemplate(templateGitUrl, downloadPath);
        modifyPackageJson(downloadPath, { name: projectName, ...initOptions })
    } catch(error) {
        console.error(error);
    }
}

main();