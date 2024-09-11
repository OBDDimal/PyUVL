import {parser} from "../src/parser.mjs";
import {fileTests} from "@lezer/generator/test";

import * as fs from "fs";
import * as path from "path";
import {fileURLToPath} from "url";

const caseDir = path.dirname(fileURLToPath(import.meta.url));
function getTestFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            results = results.concat(getTestFiles(filePath));
        } else if (/\.uvl$/.test(file)) {
            results.push(filePath);
        }
    });

    return results;
}

const testFiles = getTestFiles(caseDir);
testFiles.forEach(file => {
    const name = path.relative(caseDir, file).replace(/\.txt$/, '');
    describe(name, () => {
        const content = fs.readFileSync(file, "utf8");
        const tests = fileTests(content, file);

        tests.forEach(({name, run}) => {
            it(name, () => run(parser));
        });
    });
});
