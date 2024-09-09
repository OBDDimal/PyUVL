import {nodeResolve} from "@rollup/plugin-node-resolve"
export default {
    input: "src/editor.mjs",
    output: {
        file: "dist/js/editor.bundle.js",
        format: "iife"
    },
    plugins: [nodeResolve()]
}