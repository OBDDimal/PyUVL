//parser
import {parser} from "./parser.mjs";
import { styleTags, tags as t } from '@lezer/highlight';
// parser integration
import { LanguageSupport } from '@codemirror/language';
import { LRLanguage } from '@codemirror/language';

// UVL parser
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

//support for UVL highlighting
export const support = new LanguageSupport(myLanguage);