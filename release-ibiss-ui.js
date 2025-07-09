/** Simple build pipeline to do all the magic instead of polluting the entire package.json */
const { version } = require('./package.json');

const fs = require('fs');

function release() {
    const ibissReleaseDir = `releases/ibiss-ui-v${version}`;
    if (!fs.existsSync(ibissReleaseDir)) {
        fs.mkdirSync(ibissReleaseDir);
    } else {
        let rerelease = process.argv.slice(2);
        if (rerelease.length === 0) {
            console.log('Already built!');
            return;
        }
    }

    fs.copyFileSync(`dist/ibiss-ui-v${version}/ibiss-ui.min.css`, `releases/ibiss-ui-v${version}/ibiss-ui.min.css`)
}

release();