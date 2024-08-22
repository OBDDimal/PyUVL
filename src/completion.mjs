import {autocompletion, completeFromList} from "@codemirror/autocomplete";


const keywords = [
    { label: "mandatory", type: "keyword", info: "a mandatory feature"},
    { label: "optional", type: "keyword" },
    { label: "alternative", type: "keyword" },
    { label: "or", type: "keyword" },
    { label: "{abstract}", type: "keyword" },
    { label: "featureModel", type: "keyword" },
    { label: "constraints", type: "keyword" },
];

//autocompletion
export const completion = autocompletion({
    override: [completeFromList(keywords)],
});