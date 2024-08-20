import { autocompletion, completeFromList } from "@codemirror/autocomplete";

const keywords = [
    { label: "mandatory", type: "keyword" },
    { label: "optional", type: "keyword" },
    { label: "alternative", type: "keyword" },
    { label: "or", type: "keyword" },
    { label: "abstract", type: "type" },
];

export const uvlCompletion = autocompletion({
    override: [completeFromList(keywords)]
});
