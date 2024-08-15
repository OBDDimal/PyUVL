import { myParser } from './parser';
import { LRLanguage, LanguageSupport } from '@codemirror/language';
import { HighlightStyle, tags } from '@codemirror/highlight';
import { styleTags } from '@lezer/highlight';

const uvlHighlightStyle = HighlightStyle.define([
    { tag: tags.keyword, color: '#007acc' },
    { tag: tags.string, color: '#a31515' },
    { tag: tags.variableName, color: '#267f99' },
    { tag: tags.operator, color: '#d4d4d4' },
    { tag: tags.brace, color: '#569cd6' }
]);

const uvlLanguage = LRLanguage.define({
    parser: myParser.configure({
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

export const uvlSupport = new LanguageSupport(uvlLanguage, [uvlHighlightStyle]);
