//Still under development

import { LitElement, html, css } from 'lit';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { uvlSupport } from './language.js';

class CodeEditor extends LitElement {
    static styles = css`
    .editor-container {
      border: 1px solid #ddd;
      height: 400px;
    }
  `;

    constructor() {
        super();
        this.editor = null;
    }

    firstUpdated(_changedProperties ) {
        this.editor = new EditorView({
            doc: 'console.log("Edit your UVL Code here!");',
            extensions: [basicSetup, uvlSupport, javascript()],
            parent: this.renderRoot.querySelector('.editor-container')
            //parent: document.body
        });

        const openButton = document.getElementById('openButton');
        const saveButton = document.getElementById('saveButton');
        const fileInput = document.getElementById('fileInput');

        openButton.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', this.handleFileOpen.bind(this));
        saveButton.addEventListener('click', this.handleFileSave.bind(this));
    }

    handleFileOpen(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.editor.dispatch({
                    changes: { from: 0, to: this.editor.state.doc.length, insert: e.target.result }
                });
            };
            reader.readAsText(file);
        }
    }

    handleFileSave() {
        //does not work yet. Probably a playground problem.
        const blob = new Blob([this.editor.state.doc.toString()], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'code.txt';
        a.click();
        URL.revokeObjectURL(url);
    }

    render() {
        return html`
      <div class="editor-container"></div>
    `;
    }
}

customElements.define('code-editor', CodeEditor);