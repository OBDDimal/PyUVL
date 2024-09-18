import { parser } from '../src/parser.mjs';
import * as fs from 'fs';
import * as path from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to recursively find all files in a directory and its subdirectories
function getAllTestFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            // Recursively call for directories
            results = results.concat(getAllTestFiles(filePath));
        } else if (path.extname(file) === '.uvl') { // Only files with .uvl extension
            results.push(filePath);
        }
    });

    return results;
}

function checkForErrorsInTree(parseTree) {
    const cursor = parseTree.cursor();
    const errors = [];

    do {
        // '⚠' is a special Lezer node type used for parse errors
        if (cursor.type.name === '⚠') {
            errors.push({
                from: cursor.from,
                to: cursor.to,
                message: 'Syntax error detected in parse tree'
            });
        }
    } while (cursor.next());

    return errors;
}

describe('Parser Tests', () => {
    // Directory where test files and subdirectories are located
    const testDir = path.join(__dirname, 'res_uvl'); // Adjust path to your test folder
    const testFiles = getAllTestFiles(testDir);

    // Test each file
    testFiles.forEach(file => {
        it(`should parse the file ${file} without errors`, () => {
            const inputContent = fs.readFileSync(file, 'utf8');

            let parseTree;
            try {
                parseTree = parser.parse(inputContent); // Parse the file
            } catch (error) {
                assert.fail(`Parsing failed for ${file} with error: ${error.message}`);
            }

            // Check if the parse tree is not null or undefined
            assert(parseTree, `Parse tree should be generated for file ${file} without errors`);
            assert(parseTree.topNode, `Parse tree should have a topNode for file ${file}`);

            // Check for errors in the parse tree
            const errors = checkForErrorsInTree(parseTree);
            if (errors.length > 0) {
                assert.fail(`Parsing failed for ${file} due to syntax errors: ${JSON.stringify(errors)}`);
            }
        });
    });
});



