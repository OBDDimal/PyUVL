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
//current Test
export const myLanguage = LRLanguage.define({
    parser: parser,
    languageData: {
        commentTokens: {line: "//"}
    }
});

const myCompletions = [
    {label: "mandatory", type: "keyword"},
    {label: "optional", type: "keyword"},
    {label: "alternative", type: "keyword"},
    {label: "or", type: "keyword"},
    {label: "{abstract}", type: "keyword"}
];

import {completeFromList} from "@codemirror/autocomplete"
//current Test
export const exampleCompletion = myLanguage.data.of({
    autocomplete: completeFromList([
        myCompletions
    ])
})


//export function myLanguageSupport() {
//    return new LanguageSupport(myLanguage, [
//        autocomplete({
//            override: [
//                context => {
//                    let word = context.matchBefore(/\w*/);
//                    if (word) return {from: word.from, options: myCompletions};
//                    return null;
//                }
//            ]
//        })
//    ]);
//}

import {CompletionContext} from "@codemirror/autocomplete"

function myCompletionsTest(context) {
    let word = context.matchBefore(/\w*/)
    if (word.from === word.to && !context.explicit)
        return null
    return {
        from: word.from,
        options: [
            {label: "mandatory", type: "keyword"},
            {label: "optional", type: "keyword", info: "is optional and a test"},
            {label: "test", type: "text"}
        ]
    }
}


export const uvlLanguages = [
    uvlLanguage
];

export function uvl() {
    return new LanguageSupport(uvlLanguage, [uvlCompletion])
}

export function completion(context) {
    myCompletionsTest(context);
}

//current Test
export function example() {
    return new LanguageSupport(myLanguage, [exampleCompletion])
}