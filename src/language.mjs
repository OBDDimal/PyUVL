/*
This file contains all the logic and will contain the autocompletion, highlighting and language for editor.mjs
 */

//parser
import {parser} from "./parser.mjs";
import { styleTags, tags as t } from '@lezer/highlight';
// parser integration
import { LanguageSupport, HighlightStyle } from '@codemirror/language';
import { LRLanguage, syntaxHighlighting } from '@codemirror/language';
import {autocompletion, completeFromList} from "@codemirror/autocomplete";

//bib for autocompletion. That's the easiest way to complete
const keywords = [
    { label: "mandatory", type: "keyword", info: "a mandatory feature"},
    { label: "optional", type: "keyword" },
    { label: "alternative", type: "keyword" },
    { label: "or", type: "keyword" },
    { label: "{abstract}", type: "keyword" },
    { label: "featureModel", type: "keyword" },
    { label: "constraints", type: "keyword" },
];

//using unused predefined token to create a color template for the language
const customHighlightStyle = HighlightStyle.define([
    { tag: t.keyword, color: "#ff007f", fontWeight: "bold" },
    { tag: t.typeName, color: "#0022ff"},
    { tag: t.labelName, color: "#431717"},
]);

//connecting Token form parser to the color template. Folding and all the other logic is designed to be here
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
//creating a language with the extended parser
//integration. Could be fused with the export
const myLanguage = LRLanguage.define({
    parser: parserWithMetadata
});

//custom highlighting
//final support containing the parser and highlighting. Could be merged with autocompletion
export const UVLLanguageSupport = new LanguageSupport(myLanguage, [
    syntaxHighlighting(customHighlightStyle)
]);

//autocompletion
export const completion = autocompletion({
    override: [completeFromList(keywords)],
});