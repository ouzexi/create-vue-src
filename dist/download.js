import path from 'path';
import gitclone from 'git-clone';
import fs from 'fs-extra';
import ora from 'ora';
export const downloadTemplate = (templateGitUrl, downloadPath) => {
    const loading = ora('Downloading template');
    return new Promise((resolve, reject) => {
        loading.start('Start download template');
        gitclone(templateGitUrl, downloadPath, {
            checkout: 'main',
            shallow: true
        }, (error) => {
            if (error) {
                loading.stop();
                loading.fail('Download fail');
                reject(error);
            }
            else {
                fs.removeSync(path.join(downloadPath, '.git'));
                loading.stop();
                loading.succeed('Download success');
                resolve('Download success');
            }
        });
    });
};
//# sourceMappingURL=download.js.map