import { autocompletion, completeFromList } from "@codemirror/autocomplete";

const keywords = [
    { label: "mandatory", type: "keyword" },
    { label: "optional", type: "keyword" },
    { label: "alternative", type: "keyword" },
    { label: "or", type: "keyword" },
    { label: "abstract", type: "type" },
];

function myCompletions(context) {
    let before = context.matchBefore(/\w+/)
    if (!context.explicit && !before) return null
    return {
        from: before ? before.from : context.pos,
        options: keywords,
        validFor: /^\w*$/
    }
}

export const uvlCompletion = autocompletion({
    override: [completeFromList(keywords)]
});

export function completionUVL(context) {
    myCompletions(context);
}
