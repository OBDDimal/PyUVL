/*
commented code is related to the parser and needs some fixing.
This file contains all the logic and will contain the autocompletion, highlighting and language.
 */

//parser
//import {parser} from "./parser.mjs";
//import { styleTags, tags as t } from '@lezer/highlight';
// parser integration
//import { LanguageSupport } from '@codemirror/language';
//import { LRLanguage } from '@codemirror/language';
import {autocompletion, completeFromList} from "@codemirror/autocomplete";


const keywords = [
    { label: "mandatory", type: "keyword", info: "a mandatory feature"},
    { label: "optional", type: "keyword" },
    { label: "alternative", type: "keyword" },
    { label: "or", type: "keyword" },
    { label: "{abstract}", type: "keyword" },
    { label: "featureModel", type: "keyword" },
    { label: "constraints", type: "keyword" },
];

// parser creates problems with bundle. Check version
/*
let parserWithMetadata = parser.configure({
    props: [
        styleTags({
            Identifier: t.variableName,
            Boolean: t.bool,
            String: t.string,
            LineComment: t.lineComment,
            "{ }": t.brace
        }),
    ]
})


//integration
const myLanguage = LRLanguage.define({
    parser: parserWithMetadata
});
*/

//support for UVL highlighting
//export const support = new LanguageSupport(myLanguage);

//autocompletion
export const completion = autocompletion({
    override: [completeFromList(keywords)],
});