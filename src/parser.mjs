// This file was generated by lezer-generator. You probably shouldn't edit it.
import {LRParser} from "@lezer/lr"
import {indentation, trackIndent} from "./tokens.js"
export const parser = LRParser.deserialize({
  version: 14,
  states: ")`O]QROOPbOPOOOgQRO'#CyOoQROOPtOQO)C>jOOQP'#Cv'#CvO!SQRO,59eOgQRO'#DTQOQROOPOOO'#Cj'#CjPtOQO/'4UPOOO/'4U/'4UO!XQRO'#C{OOQP1G/P1G/PO!aQRO,59oPOOO-E6h-E6hPOOO49)p49)pOOQP'#C_'#C_OgQRO'#C`O!fQRO'#CkOOQP'#Ck'#CkO!qQRO,59gO#PQRO'#DVOOQP'#Cn'#CnO#_QRO1G/ZO#gQRO,58zOOQP,59V,59VOOQP,58{,58{OOQP-E6i-E6iOOQP1G/R1G/ROOQP'#Ce'#CeOOQP'#Cd'#CdO#lQRO'#CdOOQP'#Ch'#ChO#PQRO'#CgO#wQRO'#CcO$SQRO'#CoOOQP'#Cc'#CcO$eQRO,59qOOQP-E6l-E6lO$yQRO'#DOOOQP'#Cl'#ClO%XQRO1G.fOOQP,59O,59OO#PQRO,59RO%jQRO,59ROOQP'#Cf'#CfO#PQRO,58}OOQP,59Z,59ZOOQP-E6m-E6mOOQP1G/]1G/]OOQP'#Cb'#CbOgQRO'#CmO%xQRO,59jOOQP-E6j-E6jO%jQRO1G.mOOQP'#Ci'#CiOOQP1G.m1G.mOOQP1G.i1G.iO!SQRO,59XOOQP-E6k-E6kOOQP1G/U1G/UOOQP7+$X7+$XOOQP1G.s1G.s",
  stateData: "&f~OiOSPOSgPQ~OnQO~OgSO~OkTOlTO~OxVO~OPXOiXOkTOlTO~Oe[O~OnaOpaO~OefO~OkTOlTOqkO~OfmOlmOnaOpaO~OnaOpaOznO!OqO~OefOdwi~OexO~OnaOpaO!OqO~O{!OO|!OO}!OO~OkTOlTO{!OO|!OO}!OO~Of!SOl!SOnaOpaOznO!OqO~Os!TOt!TOu!TOv!TO~OexOfSilSinSipSi~O{!OO|!OO}!OO!P!YO~Of!_Ol!_Os!TOt!TOu!TOv!TO~Ostuvxnv~",
  goto: "%gzPPP{!Z!_!c!g!t!}#U#[#c#m#s#y$P$V$]$cPPPPPP$iPP%RP%UPP%[PPPP%`P%cSc[eYofrv|!PR{pTd[eTb[eT!Ux!VStfvQ}rQ!X|R![!PWsfrv|R![!PZpfrv|!PX!Pst}!XZufrv|!PYrfrv|!PR|pQ!Z}R!`!XQYSR_YQe[RleQziR!WzQ!VxR!^!VQh^RwhQvfR!RvQUQQZSQ^VQ`YQibQjcQ!QtR!]!URROQ]UR!a!]TyizRWRTg^h",
  nodeNames: "⚠ Comment Tree Feature AbstractFeature AbstractItem State Constraints ConstraintsItem Neg ConstraintSign Brackets OpenBracket CloseBracket",
  maxTerm: 47,
  context: trackIndent,
  skippedNodes: [0,1,14],
  repeatNodeCount: 6,
  tokenData: ";_~RhXY!mYZ!xpq!mqr!}rs#Sst$pvw%hxy%myz%r!Q![%w!_!`&Y!c!}%w#R#S%w#T#U&e#U#V%w#V#W+u#W#a%w#a#b1V#b#c%w#c#d5d#d#o%w#o#p9v#p#q;T~~;Y~!rQi~XY!mpq!m~!}Ok~~#SOz~~#VVOr#Srs#ls#O#S#O#P#q#P;'S#S;'S;=`$j<%lO#S~#qOp~~#tRO;'S#S;'S;=`#};=`O#S~$QWOr#Srs#ls#O#S#O#P#q#P;'S#S;'S;=`$j;=`<%l#S<%lO#S~$mP;=`<%l#S~$sSOY%PZ;'S%P;'S;=`%b<%lO%P~%USP~OY%PZ;'S%P;'S;=`%b<%lO%P~%eP;=`<%l%P~%mO}~~%rO!O~~%wO!P~~%|Sn~!Q![%w!c!}%w#R#S%w#T#o%w~&]P!`!a&`~&eO|~~&jUn~!Q![%w!c!}%w#R#S%w#T#`%w#`#a&|#a#o%w~'RUn~!Q![%w!c!}%w#R#S%w#T#h%w#h#i'e#i#o%w~'jUn~!Q![%w!c!}%w#R#S%w#T#X%w#X#Y'|#Y#o%w~(RUn~!Q![%w!c!}%w#R#S%w#T#f%w#f#g(e#g#o%w~(jUn~!Q![%w!c!}%w#R#S%w#T#b%w#b#c(|#c#o%w~)RTn~!Q![%w!c!}%w#R#S%w#T#U)b#U#o%w~)gUn~!Q![%w!c!}%w#R#S%w#T#h%w#h#i)y#i#o%w~*OUn~!Q![%w!c!}%w#R#S%w#T#]%w#]#^*b#^#o%w~*gUn~!Q![%w!c!}%w#R#S%w#T#j%w#j#k*y#k#o%w~+OUn~!Q![%w!c!}%w#R#S%w#T#X%w#X#Y+b#Y#o%w~+iSu~n~!Q![%w!c!}%w#R#S%w#T#o%w~+zUn~!Q![%w!c!}%w#R#S%w#T#c%w#c#d,^#d#o%w~,cUn~!Q![%w!c!}%w#R#S%w#T#b%w#b#c,u#c#o%w~,zUn~!Q![%w!c!}%w#R#S%w#T#g%w#g#h-^#h#o%w~-cUn~!Q![%w!c!}%w#R#S%w#T#h%w#h#i-u#i#o%w~-zUn~!Q![%w!c!}%w#R#S%w#T#f%w#f#g.^#g#o%w~.cTn~!Q![%w!c!}%w#R#S%w#T#U.r#U#o%w~.wUn~!Q![%w!c!}%w#R#S%w#T#]%w#]#^/Z#^#o%w~/`Un~!Q![%w!c!}%w#R#S%w#T#b%w#b#c/r#c#o%w~/wUn~!Q![%w!c!}%w#R#S%w#T#h%w#h#i0Z#i#o%w~0`Un~!Q![%w!c!}%w#R#S%w#T#g%w#g#h0r#h#o%w~0ySx~n~!Q![%w!c!}%w#R#S%w#T#o%w~1[Tn~!Q![%w!c!}%w#R#S%w#T#U1k#U#o%w~1pUn~!Q![%w!c!}%w#R#S%w#T#b%w#b#c2S#c#o%w~2XUn~!Q![%w!c!}%w#R#S%w#T#W%w#W#X2k#X#o%w~2pTn~!Q![%w!c!}%w#R#S%w#T#U3P#U#o%w~3UUn~!Q![%w!c!}%w#R#S%w#T#h%w#h#i3h#i#o%w~3mUn~!Q![%w!c!}%w#R#S%w#T#c%w#c#d4P#d#o%w~4UUn~!Q![%w!c!}%w#R#S%w#T#f%w#f#g4h#g#o%w~4mUn~!Q![%w!c!}%w#R#S%w#T#m%w#m#n5P#n#o%w~5WSs~n~!Q![%w!c!}%w#R#S%w#T#o%w~5iWn~!Q![%w!c!}%w#R#S%w#T#d%w#d#e6R#e#f%w#f#g9c#g#o%w~6WUn~!Q![%w!c!}%w#R#S%w#T#h%w#h#i6j#i#o%w~6oUn~!Q![%w!c!}%w#R#S%w#T#]%w#]#^7R#^#o%w~7WUn~!Q![%w!c!}%w#R#S%w#T#c%w#c#d7j#d#o%w~7oUn~!Q![%w!c!}%w#R#S%w#T#b%w#b#c8R#c#o%w~8WTn~!Q![%w!c!}%w#R#S%w#T#U8g#U#o%w~8lUn~!Q![%w!c!}%w#R#S%w#T#`%w#`#a9O#a#o%w~9VSt~n~!Q![%w!c!}%w#R#S%w#T#o%w~9jSv~n~!Q![%w!c!}%w#R#S%w#T#o%w~9yP#T#U9|~:PP#U#V:S~:VP#g#h:Y~:]P#h#i:`~:cP#f#g:f~:iP#T#U:l~:oP#V#W:r~:uP#h#i:x~:{P#q#r;O~;TOq~~;YO{~~;_Ol~",
  tokenizers: [indentation, 0],
  topRules: {"Tree":[0,2]},
  tokenPrec: 244
})

