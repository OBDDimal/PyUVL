import { HighlightStyle, tags } from "@codemirror/highlight";

export const uvlHighlightStyle = HighlightStyle.define([
    { tag: tags.keyword, color: '#007acc' },
    { tag: tags.string, color: '#a31515' },
    { tag: tags.variableName, color: '#267f99' },
    { tag: tags.operator, color: '#d4d4d4' },
    { tag: tags.brace, color: '#569cd6' }
]);
