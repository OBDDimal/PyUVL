/*
commented code is related to the parser and needs some fixing.
This file contains all the logic and will contain the autocompletion, highlighting and language.
 */

//parser
import {parser} from "./parser.mjs";
import { styleTags, tags as t } from '@lezer/highlight';
// parser integration
import { LanguageSupport, HighlightStyle } from '@codemirror/language';
import { LRLanguage, syntaxHighlighting } from '@codemirror/language';
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


const customHighlightStyle = HighlightStyle.define([
    { tag: t.keyword, color: "#ff007f", fontWeight: "bold" },
    { tag: t.typeName, color: "#0022ff"},
    { tag: t.labelName, color: "#431717"},
]);

let parserWithMetadata = parser.configure({
    props: [
        styleTags({
            " AbstractItem State ConstraintSign": t.keyword,
            ConstraintItem: t.typeName,
            Feature: t.typeName,
            FeatureModel: t.keyword,
            AbstractFeature: t.labelName,
            Abstract: t.labelName,
            Identifier: t.variableName,
            LineComment: t.lineComment,
            "{ }": t.brace
        }),
    ]
})
//integration
const myLanguage = LRLanguage.define({
    parser: parserWithMetadata
});

//custom highlighting
export const UVLLanguageSupport = new LanguageSupport(myLanguage, [
    syntaxHighlighting(customHighlightStyle)
]);

//autocompletion
export const completion = autocompletion({
    override: [completeFromList(keywords)],
});