import { LitElement, html, css } from 'lit';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import {UVLLanguageSupport, autocompleteExtension, lintExtension} from './language.mjs';

class CodeMirrorEditor extends LitElement {
  static styles = css`
    .editor-container {
      border: 1px solid #ddd;
      padding: 10px;
    }
  `;

  constructor() {
    super();
    this.editor = null;
  }

  firstUpdated() {
    this.initializeEditor();
  }

  initializeEditor() {
    const startState = EditorState.create({
      doc: `features
    Elevator {abstract}
        mandatory
            Behavior {abstract}
                mandatory
                    Modes {abstract}
                        alternative
                            Sabbath
                            FIFO
                            ShortestPath
                optional
                    Service
                    Priorities {abstract}
                        or
                            RushHour
                            FloorPriority
                            PersonPriority
        optional
            VoiceOutput
            CallButtons {abstract}
                alternative
                    DirectedCall
                    UndirectedCall
            Security {abstract}
                mandatory
                    Permission {abstract}
                        or
                            FloorPermission
                            PermissionControl
            Safety {abstract}
                optional
                    Overloaded

constraints
    CallButtons | Sabbath
    DirectedCall => ShortestPath
    UndirectedCall => FIFO | ShortestPath`,
      extensions: [
          basicSetup,
          autocompleteExtension,
          UVLLanguageSupport,
          lintExtension
      ],
    });

    this.editor = new EditorView({
      state: startState,
      parent: this.shadowRoot.querySelector('.editor-container')
    });
  }

  saveContent() {
    const content = this.editor.state.doc.toString();
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'code.txt';
    link.click();
  }

  loadContent(event) {
    this.shadowRoot.getElementById('fileInput').click();
  }

  handleFileInputChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.editor.dispatch({
        changes: { from: 0, to: this.editor.state.doc.length, insert: e.target.result }
      });
    };
    reader.readAsText(file);
  }

  render() {
    return html`
      <button @click="${this.saveContent}">Save</button>
      <button @click="${this.loadContent}">Load</button>
      <input type="file" id="fileInput" @change="${this.handleFileInputChange}" style="display: none;" />
      <div class="editor-container"></div>
    `;
  }
}
customElements.define('code-mirror-editor', CodeMirrorEditor);
