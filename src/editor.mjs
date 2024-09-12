import { LitElement, html } from 'lit';
import { EditorView, basicSetup } from 'codemirror';
import {defaultKeymap} from "@codemirror/commands"
import { EditorState } from '@codemirror/state';
import {UVLLanguageSupport, autocompleteExtension, customLinter} from './language.mjs';
import {lintGutter} from "@codemirror/lint";
import {keymap} from "@codemirror/view"

class CodeMirrorEditor extends LitElement {

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
                            "Sabbath" cardinality [1..4] {Power 190, Test 199, hallo 'hey'}
                            FIFO {Power 5}
                            ShortestPath
                optional
                    Service
                    Priorities {abstract}
                        or
                            String RushHour
                            Integer FloorPriority
                            Real PersonPriority
                            Sabbath
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
                            Integer FloorPermission
                            PermissionControl
            Safety {abstract}
                optional
                    Overloaded

constraints
    CallButtons | !Sabbath
    DirectedCall => ShortestPath
    UndirectedCall => !(FIFO | ShortestPath)
    sum(Power) > 120 => Large
    sum(Power) + 120 => Power
    len(Power) + 100 => Large
`,
      extensions: [
          basicSetup,
          autocompleteExtension,
          UVLLanguageSupport,
          customLinter,
          lintGutter(),
          keymap.of(defaultKeymap)
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
