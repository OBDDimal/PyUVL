import {basicSetup, EditorView} from "@codemirror/basic-setup";
import {EditorState} from "@codemirror/state";
import {LanguageSupport} from "@codemirror/language";
import {autocompletion} from "@codemirror/autocomplete";
import {uvlCompletion} from "./completions";
//import { LanguageSupport } from "@codemirror/language";
//import {uvl} from "./language";

let state = EditorState.create({
    doc: "// Write your UVL structure",
    //    extensions: [
//        basicSetup,
//        new LanguageSupport(uvl),
//        //autocompletion({ override: [uvlCompletion] })
//    ],
});

const myView = new EditorView({
    state: state,
    parent: document.querySelector("#editor"),
})

//save
function saveToFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

//load file
function loadFile(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        // update content
        console.log(content);
        myView.dispatch({
            changes: { from: 0, to: myView.state.doc.length, insert: content }
        });
    };
    reader.readAsText(file);
}

// Event-Listener for save
document.querySelector("#save-button").addEventListener("click", () => {
    const content = myView.state.doc.toString();
    const filename = "uvl_model.txt";
    //ToDO: remove after debugging
    console.log(content);
    saveToFile(content, filename);
});
//Listener for open
document.querySelector("#file-input").addEventListener("change", loadFile);
