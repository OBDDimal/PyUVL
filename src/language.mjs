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
//error state //dev
import {EditorState, RangeSetBuilder} from "@codemirror/state";
//new install
//ToDO check dependency
import {Decoration} from "@codemirror/view";
import { StateField } from "@codemirror/state";
import {EditorView} from "codemirror";
import { linter } from "@codemirror/lint";

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
            " AbstractItem State": t.keyword,
            ConstraintItem: t.typeName,
            Feature: t.typeName,
            FeatureModel: t.keyword,
            AbstractFeature: t.tagName,
            Brackets: t.labelName,
            Neg: t.keyword,
            ConstraintSign: t.operator,
            OpenBracket: t.bracket,
            CloseBracket: t.bracket,

            Identifier: t.variableName,
            LineComment: t.lineComment,
            "{ }": t.brace
        }),
    ]
})

//error highlighting as a extension to the language support
//ToDO under development
//https://discuss.codemirror.net/t/showing-syntax-errors/3111/5
//how about scrolling down
function errorDetection(extension) {
    return EditorState.transactionFilter.of((tr) => {
        if (tr.docChanged) {
            const builder = new RangeSetBuilder();
            const doc = tr.state.doc;
            doc.iter((from, to, text) => {
                //ToDO css not defined yet
                builder.add(from, to, Decoration.mark({ class: "cm-error" }));
            });
            return tr.state.update({
                effects: extension.of(builder.finish())
            });
        }
        return tr;
    });
}
//new try
function lintExample(view) {
    const diagnostics = [];
    //iterate
    syntaxTree(view.state).iterate({
        enter: (type, from, to) => {
            if (type.name === "⚠") {
                //add error to list
                diagnostics.push({
                    from: from,
                    to: to,
                    severity: "error",
                    message: "That's a syntax error."
                });
            }
        },
    });

    return diagnostics;
}
export const lintExtension = linter(lintExample);

//three times the charm
const regexpLinter = linter(view => {
    let diagnostics = [];
    syntaxTree(view.state).cursor().iterate(node => {
        if (node.name === "RegExp") diagnostics.push({
            from: node.from,
            to: node.to,
            severity: "warning",
            message: "Regular expressions are FORBIDDEN",
            actions: [{
                name: "Remove",
                apply(view, from, to) { view.dispatch({changes: {from, to}}) }
            }]
        })
    })
    return diagnostics
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