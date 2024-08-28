/*
This file contains all the logic and will contain the autocompletion, highlighting and language for editor.mjs
 */
//parser
import {parser} from "./parser.mjs";
import { styleTags, tags as t } from '@lezer/highlight';
// parser integration
import {LanguageSupport, HighlightStyle, syntaxTree} from '@codemirror/language';
import { LRLanguage, syntaxHighlighting } from '@codemirror/language';
import {autocompletion} from "@codemirror/autocomplete";

//autocompletion for FeatureNames
function customAutocomplete(context) {
    let word = context.matchBefore(/\w*/);
    const blacklist = new Set(["mandatory", "or", "optional", "alternative", "{abstract}"]);
    if (word.from === word.to && !context.explicit)
        return null;
    let text = context.state.doc.toString();
    let tokens = new Set(text.match(/\b\w+\b/g));
    // create List
    let options = [...tokens]
        .filter(token => !blacklist.has(token))
        .map(token => ({
        label: token,
        type: "keyword"
    }));

    return {
        from: word.from,
        options
    };
}
//autocompletion for keywords with a line break
//Todo tabs are missing
function standardAutocomplete(context) {
    const keywords = ["features", "{abstract}", "mandatory", "optional", "alternative", "or", "constraints"];
    let word = context.matchBefore(/\w*/);
    if (word.from === word.to && !context.explicit)
        return null;

    let options = keywords.map(keyword => ({
        label: keyword,
        type: "keyword",
        apply: keyword + '\n'
    }));

    return {
        from: word.from,
        options,
        validFor: /^\w*$/
    };
}
//constraints autocompletion
function constraintAutocomplete(context) {
    let word = context.matchBefore(/\w*/);
    if (word.from === word.to && !context.explicit) return null;
    let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
    if (nodeBefore.name === "ConstraintItem") {
        // then suggest | and =>
        return {
            from: context.pos,
            options: [
                { label: " |", type: "operator" },
                { label: " =>", type: "operator" }
            ],
            validFor: /^[|=>]*$/ // Nur für `|` und `=>` gültig
        };
    }
//no suggestion
    return null;
}


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

//advanced autocompletion
export const autocompleteExtension = autocompletion({
    override: [customAutocomplete, standardAutocomplete, constraintAutocomplete]
});