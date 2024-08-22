import {EditorView, basicSetup} from "codemirror"
import {markdown} from "@codemirror/lang-markdown"
import {EditorState} from "@codemirror/state";
import {completion} from "./completion.mjs";


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
  extensions: [basicSetup, markdown(), completion],
})

let editor = new EditorView({
  state: startState,
  parent: document.body
})
