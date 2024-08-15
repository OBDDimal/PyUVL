import { HighlightStyle, tags } from "@codemirror/highlight";

export const myHighlightStyle = HighlightStyle.define([
    { tag: tags.keyword, color: "#d73a49" },
    { tag: tags.variableName, color: "#0070f3" },
    { tag: tags.number, color: "#6f42c1" },
]);
