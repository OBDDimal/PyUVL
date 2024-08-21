import { LitElement, html, css } from 'lit';
import {basicSetup, EditorView} from "@codemirror/basic-setup";
import {EditorState} from "@codemirror/state";
import {LanguageSupport} from "@codemirror/language";
import {autocompletion} from "@codemirror/autocomplete";
import {uvlCompletion} from "./completions";
import {minimalSetup} from "codemirror";
//import { LanguageSupport } from "@codemirror/language";
//import {uvl} from "./language";
//import {uvl} from "./highlighting";

class UVLEditor extends LitElement {
    static styles = css`
        :host {
            display: block;
            height: 100%;
        }

        #editor-container {
            display: flex;
            flex-direction: column;
            height: 500px;
            border: 1px solid #ddd;
        }

        #controls {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem;
            background: #f5f5f5;
            border-bottom: 1px solid #ddd;
        }

        #editor {
            flex-grow: 1;
            height: 100%;
            overflow: hidden;
        }

        .cm-editor {
            height: 100%;
            width: 100%;
        }
    `;

    firstUpdated(_changedProperties) {
        this.renderRoot.querySelector("#file-input").value = "";
        const state = EditorState.create({
            doc: "// Write your UVL structure",
            // Uncomment and configure the extensions as needed
            // extensions: [
            //     minimalSetup,
            //     new LanguageSupport(uvl),
            //     // autocompletion({ override: [uvlCompletion] })
            // ],
        });

        this.myView = new EditorView({
            state: state,
            parent: this.renderRoot.querySelector("#editor"),
        });

        this.renderRoot.querySelector("#save-button").addEventListener("click", () => {
            const content = this.myView.state.doc.toString();
            const filename = "uvl_model.txt";
            console.log(content); // ToDO: remove after debugging
            this.saveToFile(content, filename);
        });

        this.renderRoot.querySelector("#file-input").addEventListener("change", (event) => this.loadFile(event));
    }

    saveToFile(content, filename) {
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

    loadFile(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            console.log(content); // ToDO: process the content
            this.myView.dispatch({
                changes: { from: 0, to: this.myView.state.doc.length, insert: content }
            });
        };
        reader.readAsText(file);
    }

    render() {
        return html`
            <div id="editor-container">
                <div id="controls">
                    <input type="file" id="file-input" />
                    <button id="save-button">Save</button>
                </div>
                <div id="editor"></div>
            </div>
        `;
    }
}

customElements.define('uvl-editor', UVLEditor);
