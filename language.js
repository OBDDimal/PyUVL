import { parser } from './parser.js';
import { LRLanguage, LanguageSupport } from '@codemirror/language';
import { tags } from '@codemirror/highlight';
import { styleTags } from '@lezer/highlight';
import { uvlHighlightStyle } from './highlight.js'
import {completeFromList} from "@codemirror/autocomplete";

const uvlLanguage = LRLanguage.define({
    parser: parser.configure({
        props: [
            styleTags({
                Mandatory: tags.keyword,
                Optional: tags.keyword,
                Alternative: tags.keyword,
                Or: tags.keyword,
                String: tags.string,
                FeatureName: tags.variableName,
                "{" : tags.brace,
                "}" : tags.brace,
                "|" : tags.operator,
                "=>" : tags.operator,
                "&" : tags.operator
            })
        ]
    }),
    languageData: {
        commentTokens: { line: "//" }
    }
});

//autocomplete
export const uvlCompletion = uvlLanguage.data.of({
    autocomplete: completeFromList([
        { label: "mandatory", type: "keyword" },
        { label: "optional", type: "keyword" },
        { label: "alternative", type: "keyword" },
        { label: "or", type: "keyword" },
        { label: "abstract", type: "keyword" }
    ])
})

export const uvlSupport = new LanguageSupport(uvlLanguage, [uvlHighlightStyle, uvlCompletion]);
