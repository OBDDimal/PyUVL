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
import {ConstraintsSection, OpenBracket, Root, Signs} from "./parser.terms.mjs";

//autocompletion for keywords with a line break
function standardAutocomplete(context) {
    const keywords = ["mandatory", "optional", "alternative", "or", "constraints"];
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
                //ToDO check | => &
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
    { tag: t.className, color: "#830505", fontWeight: "bold"}
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
            ImportName: t.keyword,
            //tagName colour
            State: t.tagName,
            Neg: t.keyword,
            AttributeItem: t.tagName,
            Operator: t.tagName,
            ConstraintSign: t.tagName,
            Cardinality: t.tagName,
            Key: t.tagName,
            Max: t.tagName,
            Min: t.tagName,
            Specifier: t.tagName,
            AbstractFeature: t.tagName,
            //labelName colour not defined
            Brackets: t.bracket,
            Operation: t.bracket,
            Type: t.bracket,
            //typeName colour
            ConstraintItem: t.typeName,
            //className
            ConstraintsSection: t.className,
            Root: t.className,
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
        "FeaturesSection",
        "ConstraintsSection",
        "blankLineStart",
        "Comment",
        "Tree",
        "IncludeBlock",
        "ImportBlock",
        "Feature",
        "ImportFeature",
        "ImportName",
        "Specifier",
        "Root",
        "FeatureBlock",
        "ExtendedFeature",
        "Type",
        "Cardinality",
        "Min",
        "Max",
        "AttributeItem",
        "AttributeSelection",
        "Key",
        "Value",
        "StateFeature",
        "StateBlock",
        "State",
        "Counter",
        "ConstraintsBlock",
        "Constraints",
        "Operation",
        "Signs",
        "Number",
        "OpenBracket",
        "NumericOperator",
        "CloseBracket",
        "ConstraintSign",
        "ConstraintsItem",
        "BooleanNeg",
        "BracketItem",
        "SymbolicOperator",
        "Brackets"
    ]

    //constraints preparation. Collecting keys and mapping to features
    let featureKeysMap = new Map();

    syntaxTree(view.state).cursor().iterate(node => {
        if (node.name === "ExtendedFeature") {
            let featureNode = node.node.getChild("Feature");
            let attributeItemNode = node.node.getChild("AttributeItem");

            if (featureNode) {
                let featureText = view.state.doc.sliceString(featureNode.from, featureNode.to).trim();

                // Check if the feature is already in the map
                if (featureKeysMap.has(featureText)) {
                    diagnostics.push({
                        from: featureNode.from,
                        to: featureNode.to,
                        severity: "error",
                        message: `The feature "${featureText}" is defined more than once.`
                    });
                } else {
                    if (attributeItemNode) {
                        let keys = [];
                        let keySet = new Set(); // To check for duplicate keys

                        attributeItemNode.getChildren("AttributeSelection").forEach(selectionNode => {
                            selectionNode.getChildren("Key").forEach(keyNode => {
                                let keyText = view.state.doc.sliceString(keyNode.from, keyNode.to).trim();

                                // Check if the key already exists in the keySet
                                if (keySet.has(keyText)) {
                                    diagnostics.push({
                                        from: keyNode.from,
                                        to: keyNode.to,
                                        severity: "error",
                                        message: `The key "${keyText}" is duplicated in the feature "${featureText}".`
                                    });
                                } else {
                                    keySet.add(keyText); // Add key to the set
                                    keys.push(keyText);  // Also add key to the keys list
                                }
                            });
                        });

                        featureKeysMap.set(featureText, keys);
                    } else {
                        featureKeysMap.set(featureText, "");
                    }
                }
            }
        }
    });
    syntaxTree(view.state).cursor().iterate(node => {
        if (node.name === "ConstraintsSection") {
            let blockText = view.state.doc.sliceString(node.from, node.to).trim();
            let firstWord = blockText.split(/\s+/)[0];
            if (firstWord !== "constraints") {
                diagnostics.push({
                    from: node.from,
                    to: node.to,
                    severity: "error",
                    message: 'The ConstraintsBlock must start with "constraints".'
                });
            }
        } else if (node.name === "FeaturesSection") {
            let blockText = view.state.doc.sliceString(node.from, node.to).trim();
            let firstWord = blockText.split(/\s+/)[0];
            if (firstWord !== "features") {
                diagnostics.push({
                    from: node.from,
                    to: node.to,
                    severity: "error",
                    message: 'The FeaturesSection must start with "features".'
                });
            }
        }
    });
    syntaxTree(view.state).cursor().iterate(node => {
        //cardinality [Min..Max]
        if (node.name === "Cardinality" || node.name === "Counter") {
            const text = view.state.doc.sliceString(node.from, node.to);
            const match = text.match(/\[\s*(\d+)\s*\.\.\s*(\d+)\s*\]/);

            if (match) {
                let min = parseInt(match[1], 10);
                let max = parseInt(match[2], 10);

                if (min > max) {
                    // Max Min error
                    diagnostics.push({
                        from: node.from,
                        to: node.to,
                        severity: "error",
                        message: `Invalid syntax: Min (${min}) must be less than Max (${max})`,
                    });
                }
            } else {
                diagnostics.push({
                    from: node.from,
                    to: node.to,
                    severity: "error",
                    message: `The pattern is number1 .. number2.`,
                });
            }
        } else if (node.name === "ExtendedFeature") {
            let featureNode = node.node.getChild("Feature");
            let attributeNode = node.node.getChild("AttributeItem");
            if (featureNode) {
                let featureText = view.state.doc.sliceString(featureNode.from, featureNode.to);
                let keywords = ["features", "constraints"];
                //"constraints" is still buggy
                if (keywords.includes(featureText)) {
                    diagnostics.push({
                        from: featureNode.from,
                        to: featureNode.to,
                        severity: "error",
                        message: `The text "${featureText}" is not allowed in the Feature node`,
                        actions: [{
                            name: "Remove 'features'",
                            apply(view, from, to) { view.dispatch({changes: {from, to, insert: ''}}); }
                        }]
                    });
                }
            }
            if (attributeNode) {
                attributeNode.getChildren("AttributeSelection").forEach(selectionNode => {
                    let valueNode = selectionNode.getChild("Value");
                    if (valueNode) {
                        let valueText = view.state.doc.sliceString(valueNode.from, valueNode.to);
                        if (!/^-?\d+$/.test(valueText) && !/^["].*["]$/.test(valueText) && !/^'[a-zA-Z_]\w*'$/.test(valueText)) {
                            diagnostics.push({
                                from: valueNode.from,
                                to: valueNode.to,
                                severity: "error",
                                message: "Value must be a number, a string in double quotes, or an identifier in single quotes."
                            });
                        }
                    }
                });
            }
        }
        //brackets not matching
        else if (node.name === "Constraints") {
            let constraintText = view.state.doc.sliceString(node.from, node.to);

            let openBrackets = (constraintText.match(/\(/g) || []).length;
            let closeBrackets = (constraintText.match(/\)/g) || []).length;

            if (openBrackets > 1 || closeBrackets > 1) {
                diagnostics.push({
                    from: node.from,
                    to: node.to,
                    severity: "error",
                    message: "A constraint can only have one pair of parentheses."
                });
            }
            node.node.getChildren("Operation").forEach(operationNode => {
                let keyNode = operationNode.getChild("Key");
                if (keyNode) {
                    let keyText = view.state.doc.sliceString(keyNode.from, keyNode.to).trim();

                    //Only for keys
                    let allKeys = [];
                    featureKeysMap.forEach(keysArray => {
                        allKeys = allKeys.concat(keysArray); // Alle Keys aus der Map sammeln
                    });
                    if (!allKeys.includes(keyText)) {
                        diagnostics.push({
                            from: keyNode.from,
                            to: keyNode.to,
                            severity: "error",
                            message: `"${keyText}" is not a valid key.`
                        });
                    }
                }
            });
            node.node.getChildren("ConstraintsItem").forEach(constraintItemNode => {
                let constraintItemText = view.state.doc.sliceString(constraintItemNode.from, constraintItemNode.to).trim();

                // Remove '!' from Feature
                let isNegated = constraintItemText.startsWith("!");
                if (isNegated) {
                    constraintItemText = constraintItemText.slice(1).trim();
                }
                let isId = /^'-?\d+'$/.test(constraintItemText);

                let [feature, key] = constraintItemText.split(".");
                // Check if it's a valid feature
                if (featureKeysMap.has(feature)) {
                    // If a key is provided, check if it's a valid key for this feature
                    if (key) {
                        let validKeys = featureKeysMap.get(feature);
                        if (!validKeys.includes(key)) {
                            diagnostics.push({
                                from: constraintItemNode.from,
                                to: constraintItemNode.to,
                                severity: "error",
                                message: `"${key}" is not a valid key for the feature "${feature}".`
                            });
                        }
                    }
                } else if (!isId && !featureKeysMap.has(constraintItemText)) {
                        diagnostics.push({
                            from: constraintItemNode.from,
                            to: constraintItemNode.to,
                            severity: "error",
                            message: `"${constraintItemText}" is neither a valid ID nor a declared feature.`
                        });
                    let words = constraintItemText.trim().split(/\s+/);
                        words.forEach(word => {
                            if (featureKeysMap.has(word)) {
                                diagnostics.push({
                                    from: constraintItemNode.from,
                                    to: constraintItemNode.to,
                                    severity: "error",
                                    message: `"${word}" has to be seperated by an operator.`
                                });
                            }
                        });
                }
            });
        }
        //blacklist and unrecognized
        if (!list.includes(node.name)) {
            diagnostics.push({
                from: node.from,
                to: node.to,
                severity: "error",
                message: "Features have to be connected with \" or ' ",
            });
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