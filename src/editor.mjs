import {EditorView, basicSetup} from "codemirror"
import {EditorState} from "@codemirror/state";
import {UVLLanguageSupport, autocompleteExtension} from "./language.mjs";


let startState = EditorState.create({
  doc: "features\n" +
      "    Elevator {abstract}\n" +
      "        mandatory\n" +
      "            Behavior {abstract}\n" +
      "                mandatory\n" +
      "                    Modes {abstract}\n" +
      "                        alternative\n" +
      "                            Sabbath\n" +
      "                            FIFO\n" +
      "                            ShortestPath\n" +
      "                optional\n" +
      "                    Service\n" +
      "                    Priorities {abstract}\n" +
      "                        or\n" +
      "                            RushHour\n" +
      "                            FloorPriority\n" +
      "                            PersonPriority\n" +
      "        optional\n" +
      "            VoiceOutput\n" +
      "            CallButtons {abstract}\n" +
      "                alternative\n" +
      "                    DirectedCall\n" +
      "                    UndirectedCall\n" +
      "            Security {abstract}\n" +
      "                mandatory\n" +
      "                    Permission {abstract}\n" +
      "                        or\n" +
      "                            FloorPermission\n" +
      "                            PermissionControl\n" +
      "            Safety {abstract}\n" +
      "                optional\n" +
      "                    Overloaded\n" +
      "\n" +
      "constraints\n" +
      "    CallButtons | Sabbath\n" +
      "    DirectedCall => ShortestPath\n" +
      "    UndirectedCall => FIFO | ShortestPath",
  extensions: [basicSetup, autocompleteExtension, UVLLanguageSupport],
})

let editor = new EditorView({
  state: startState,
  parent: document.body
})

document.getElementById('saveButton').addEventListener('click', () => {
  const content = editor.state.doc.toString();
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "code.txt";
  link.click();
});

document.getElementById('loadButton').addEventListener('click', () => {
  document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: e.target.result }
    });
  };
  reader.readAsText(file);
});
