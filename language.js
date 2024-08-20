import { parser} from "./parser";
import {LanguageSupport, LRLanguage} from "@codemirror/language";
import { uvlHighlight } from "./highlight.js";
import {uvlCompletion} from "./completions";

// language out of parser
const uvlLanguage = LRLanguage.define({
    parser: parser.configure({
        props: [
            ...uvlHighlight
        ]
    })
});

export const uvlLanguages = [
    uvlLanguage
];

export function uvl() {
    return new LanguageSupport(uvlLanguage, [uvlCompletion])
}