/** Simple build pipeline to do all the magic instead of polluting the entire package.json */
const { version } = require('./package.json');

const fs = require('fs');
const { execSync } = require('child_process');

function build() {
    fs.rm('./dist', { recursive: true }, () => {
        console.log('cleaning done');

        const ibissUIStylesheet = [
            `node ./node_modules/less/bin/lessc stylesheet/ibiss-ui.less dist/ibiss-ui-v${version}/ibiss-ui.css`,
            `npx postcss dist/ibiss-ui-v${version}/ibiss-ui.css > dist/ibiss-ui-v${version}/ibiss-ui.min.css`,
        ];

        const buildCommands = [...ibissUIStylesheet];

        for (const command of buildCommands) {
            execSync(command, (error) => {
                if (error) {
                    console.error(`Error executing command: ${error}`);
                    return;
                }
            });
        }
    });
}

build();