import path from 'path';
import fs from 'fs-extra';
import handlebars from 'handlebars';
import ora from 'ora';
const log = ora('modify');
export const modifyPackageJson = (downloadPath, options) => {
    const packagePath = path.join(downloadPath, "package.json");
    log.start("start modifying package.json");
    if (fs.existsSync(packagePath)) {
        const content = fs.readFileSync(packagePath).toString();
        const template = handlebars.compile(content);
        const params = {
            name: options.name,
            description: options.description,
            author: options.author
        };
        const result = template(params);
        fs.writeFileSync(packagePath, result);
        log.stop();
        log.succeed("This project has been successfully created!");
        log.info(`Install dependencies:

        cd ${downloadPath} && npm install
        `);
        log.info(`Run project:

        npm run dev
        `);
    }
    else {
        log.stop();
        log.fail('modify package.json fail');
        throw new Error('no package.json');
    }
};
//# sourceMappingURL=modify.js.map