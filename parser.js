import { LRParser } from "@lezer/lr"
import { uvlHighlightStyle } from "./highlight.js"

export const parser = LRParser.deserialize({
    version: 14,
    states: "!vOVQPOOOOQO'#C^'#C^O[QPOOOdQPO'#C^OoQPO'#CaOOQO'#Cg'#CgOtQPO'#C`QOQPOOO|QQO,58{OOQO-E6e-E6eOOQO'#Cb'#CbO!RQPO1G.gO!WQPO7+$ROOQO<<Gm<<Gm",
    stateData: "!m~O^OS~ORPO~ORRO[SP~ORTX[TX_QX~O_WO~ORRO[SX~O`YO~Oa[O~OV]OW]OX]OY]O~OVWXYRX~",
    goto: "t[PP]PdgkPPPPnQQOTSQURVQTTQURZWQUQRXU",
    nodeNames: "⚠ FeatureModel FeatureName String FeatureList Feature FeatureType Mandatory Optional Alternative Or",
    maxTerm: 17,
    propSources: [uvlHighlightStyle],
    skippedNodes: [0],
    repeatNodeCount: 1,
    tokenData: "/]~R]XYzYZz]^zpqz!c!}!P#T#U![#U#a!P#a#b(r#b#c!P#c#d+w#d#o!P#o#p/R#q#r/W~!PO^~P!UQRP!c!}!P#T#o!P~!aURP!c!}!P#T#U!P#U#V!s#V#`!P#`#a%X#a#o!PR!xSRP!c!}!P#T#g!P#g#h#U#h#o!PR#ZSRP!c!}!P#T#h!P#h#i#g#i#o!PR#lSRP!c!}!P#T#f!P#f#g#x#g#o!PR#}RRP!c!}!P#T#U$W#U#o!PR$]SRP!c!}!P#T#V!P#V#W$i#W#o!PR$nSRP!c!}!P#T#h!P#h#i$z#i#o!PR%RQ`QRP!c!}!P#T#o!P~%^SRP!c!}!P#T#h!P#h#i%j#i#o!P~%oSRP!c!}!P#T#X!P#X#Y%{#Y#o!P~&QSRP!c!}!P#T#f!P#f#g&^#g#o!P~&cSRP!c!}!P#T#b!P#b#c&o#c#o!P~&tRRP!c!}!P#T#U&}#U#o!P~'SSRP!c!}!P#T#h!P#h#i'`#i#o!P~'eSRP!c!}!P#T#]!P#]#^'q#^#o!P~'vSRP!c!}!P#T#j!P#j#k(S#k#o!P~(XSRP!c!}!P#T#X!P#X#Y(e#Y#o!P~(lQX~RP!c!}!P#T#o!P~(wRRP!c!}!P#T#U)Q#U#o!P~)VSRP!c!}!P#T#b!P#b#c)c#c#o!P~)hSRP!c!}!P#T#W!P#W#X)t#X#o!P~)yRRP!c!}!P#T#U*S#U#o!P~*XSRP!c!}!P#T#h!P#h#i*e#i#o!P~*jSRP!c!}!P#T#c!P#c#d*v#d#o!P~*{SRP!c!}!P#T#f!P#f#g+X#g#o!P~+^SRP!c!}!P#T#m!P#m#n+j#n#o!P~+qQV~RP!c!}!P#T#o!P~+|URP!c!}!P#T#d!P#d#e,`#e#f!P#f#g.t#g#o!P~,eSRP!c!}!P#T#h!P#h#i,q#i#o!P~,vSRP!c!}!P#T#]!P#]#^-S#^#o!P~-XSRP!c!}!P#T#c!P#c#d-e#d#o!P~-jSRP!c!}!P#T#b!P#b#c-v#c#o!P~-{RRP!c!}!P#T#U.U#U#o!P~.ZSRP!c!}!P#T#`!P#`#a.g#a#o!P~.nQW~RP!c!}!P#T#o!P~.{QY~RP!c!}!P#T#o!P~/WO_~~/]Oa~",
    tokenizers: [0, 1],
    topRules: {"FeatureModel":[0,1]},
    tokenPrec: 68
})
