import { HighlightStyle, tags as t } from "@codemirror/highlight";

export const uvlHighlighting = HighlightStyle.define([
    { tag: t.keyword, color: "#708" },       //  for mandatory, ...
    { tag: t.string, color: "#a11" },        // for featureName and strings
    { tag: t.operator, color: "#333" },      // for |, =>, &
]);

export const uvlHighlight = [
    uvlHighlighting
];
