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
import { linter } from "@codemirror/lint";

//autocompletion for FeatureNames
//ToDO remove in next patch
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
function standardAutocomplete(context) {
    const keywords = ["features", "{abstract}", "mandatory", "optional", "alternative", "or", "constraints"];
    let word = context.matchBefore(/\w*/);
    if (word.from === word.to && !context.explicit)
        return null;

    let options = keywords.map(keyword => ({
        label: keyword,
        type: "keyword",
        apply: keyword + '\n' + ' '.repeat(word.from - context.state.doc.lineAt(word.from).from + 4)
    }));

    return {
        from: word.from,
        options,
        validFor: /^\w*$/
    };
}
//constraints autocompletion
//ToDO outdated: remove or change in next patch
function constraintAutocomplete2(context) {
    let word = context.matchBefore(/\w*/);
    if (word.from === word.to && !context.explicit) return null;
    let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
    if (nodeBefore.name === "ConstraintItem") {
        // then suggest | and =>
        return {
            from: context.pos,
            options: [
                { label: " |", type: "operator" },
                { label: " =>", type: "operator" },
                { label: " &", type: "operator" }
            ],
            validFor: /^[|=>&]*$/ // valid for
        };
    }
//no suggestion
    return null;
}
function constraintAutocomplete(context) {
    let word = context.matchBefore(/\w*/);
    if (word.from === word.to && !context.explicit) return null;

    let features = [];
    syntaxTree(context.state).cursor().iterate(node => {
        if (node.name === "Feature") {
            let featureText = context.state.doc.sliceString(node.from, node.to);
            features.push(featureText);
        }
    });
    let uniqueFeatures = [...new Set(features)];
    if (uniqueFeatures.length > 0) {
        return {
            from: word.from,
            options: uniqueFeatures.map(f => ({ label: f, type: "keyword" })),
            validFor: /^[\w]*$/
        };
    }
    let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
    if (nodeBefore.name === "ConstraintItem") {
        //then suggest | and =>
        //ToDo fix
        return {
            from: context.pos,
            options: [
                { label: " |", type: "operator" },
                { label: " =>", type: "operator" },
                { label: " &", type: "operator" },
                { label: "sum()", type: "function" },
                { label: "len()", type: "function" },
                { label: "avg()", type: "function" }
            ],
            validFor: /^[|=>&sumlenavg()]*$/ // valid for
        };
    }
    return null;
}




//using unused predefined token to create a color template for the language
const customHighlightStyle = HighlightStyle.define([
    { tag: t.keyword, color: "#008080", fontWeight: "bold" },
    { tag: t.typeName, color: "#0022ff"},
    { tag: t.tagName, color: "#0022ff", fontWeight: "bold"},
    { tag: t.operator, color: "#404080"},
    { tag: t.bracket, color: "#ae2eae", fontWeight: "bold"},
    // up old down new
/*
//Current theme
    { tag: t.labelName, color: "#60B0FF"},
    { tag: t.labelName, color: "#B0FFF0"},
    { tag: t.labelName, color: "#60B0FF"},
    { tag: t.labelName, color: "#8080A0"},
    { tag: t.labelName, color: "#7090B0"},
    { tag: t.labelName, color: "#999999"}, //undefined
    { tag: t.labelName, color: "#404080"}, //comment
    { tag: t.labelName, color: "#60B0FF"},
    { tag: t.labelName, color: "#A0A0FF"}, //operator
    { tag: t.labelName, color: "#008080"},
    { tag: t.labelName, color: "#A0A0FF"},
    { tag: t.labelName, color: "#80A0FF"},
    { tag: t.labelName, color: "#70E080"},
    { tag: t.labelName, color: "#50A0A0"},
    { tag: t.labelName, color: "#009090"},
    { tag: t.labelName, color: "#B0FFF0"},
    { tag: t.labelName, color: "#D0D0FF"},
 */
]);

//connecting Token form parser to the color template. Folding and all the other logic is designed to be here
let parserWithMetadata = parser.configure({
    props: [
        styleTags({
            //keyword colour
            AbstractItem: t.keyword,
            Feature: t.keyword,
            ConstraintsItem: t.keyword,
            ExtendedFeature: t.keyword,
            Value: t.keyword,
            Number: t.keyword,
            FeatureModel: t.keyword,
            //tagName colour
            State: t.tagName,
            Neg: t.keyword,
            AttributeItem: t.tagName,
            Operator: t.tagName,
            ConstraintSign: t.tagName,
            Cardinality: t.tagName,
            AbstractFeature: t.tagName,
            //labelName colour not defined
            Brackets: t.bracket,
            Operation: t.bracket,
            Type: t.bracket,
            //typeName colour
            ConstraintItem: t.typeName,
            //other
            LineComment: t.lineComment,
        }),
    ]
})

//error highlighting as a extension to the language support
export const customLinter = linter(view => {
    let diagnostics = [];
    const list = [
        "indent",
        "dedent",
        "blankLineStart",
        "Comment",
        "Tree",
        "FeatureBlock",
        "Feature",
        "ExtendedFeature",
        "Type",
        "Cardinality",
        "Number",
        "Min",
        "Max",
        "AttributeItem",
        "AttributeSelection",
        "Key",
        "Value",
        "StateFeature",
        "StateBlock",
        "State",
        "ConstraintsBlock",
        "Constraints",
        "Operation",
        "Attribute",
        "Operator",
        "ConstraintSign",
        "ConstraintsItem",
        "Neg",
        "Brackets"
    ]

    syntaxTree(view.state).cursor().iterate(node => {
        //blacklist
        if (!list.includes(node.name) || node.node === "RegExp") {
            diagnostics.push({
                from: node.from,
                to: node.to,
                severity: "error",
                message: "Regular expressions are FORBIDDEN",
                actions: [{
                    name: "Remove",
                    apply(view, from, to) { view.dispatch({ changes: { from, to } }) }
                }]
            });
        }
        // cardinality [Min..Max]
        if (node.name === "Cardinality") {
            const text = view.state.doc.sliceString(node.from, node.to);
            const match = text.match(/\[\s*(\d+)\s*\.\.\s*(\d+)\s*\]/);

            if (match) {
                let min = parseInt(match[1], 10);
                let max = parseInt(match[2], 10);

                if (min >= max) {
                    // Max Min error
                    diagnostics.push({
                        from: node.from,
                        to: node.to,
                        severity: "error",
                        message: `Invalid cardinality: Min (${min}) must be less than Max (${max})`,
                    });
                }
            }
        }
    });

    return diagnostics;
});

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
    override: [ standardAutocomplete, constraintAutocomplete]
});