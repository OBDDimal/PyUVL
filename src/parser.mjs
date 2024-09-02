// This file was generated by lezer-generator. You probably shouldn't edit it.
import {LRParser} from "@lezer/lr"
import {indentation, trackIndent} from "./tokens.js"
export const parser = LRParser.deserialize({
  version: 14,
  states: ")`O]QROOPbOPOOOgQRO'#CzOoQROOPtOQO)C>kOOQP'#Cw'#CwO!SQRO,59fOgQRO'#DUQOQROOPOOO'#Ck'#CkPtOQO/'4VPOOO/'4V/'4VO!XQRO'#C_OOQP1G/Q1G/QO!aQRO,59pPOOO-E6i-E6iPOOO49)q49)qOOQP'#C|'#C|OgQRO'#C`O!fQRO'#ClOOQP'#Cl'#ClO!qQRO,58yO#PQRO'#CcOOQP'#Co'#CoO#_QRO1G/[O#gQRO,58zOOQP,59W,59WOOQP,58{,58{OOQP-E6j-E6jOOQP1G.e1G.eOOQP'#Cf'#CfOOQP'#Ce'#CeO#lQRO'#CeOOQP'#Ci'#CiO#PQRO'#ChO#wQRO'#CdO$SQRO'#CpOOQP'#Cd'#CdO$eQRO,58}OOQP-E6m-E6mO$yQRO'#CbOOQP'#Cm'#CmO%XQRO1G.fOOQP,59P,59PO#PQRO,59SO%jQRO,59SOOQP'#Cg'#CgO#PQRO,59OOOQP,59[,59[OOQP-E6n-E6nOOQP1G.i1G.iOOQP'#DP'#DPOgQRO'#CnO%xQRO,58|OOQP-E6k-E6kO%jQRO1G.nOOQP'#Cj'#CjOOQP1G.n1G.nOOQP1G.j1G.jO!SQRO,59YOOQP-E6l-E6lOOQP1G.h1G.hOOQP7+$Y7+$YOOQP1G.t1G.t",
  stateData: "&f~OjOSPOShPQ~OoQO~OhSO~OlTOmTO~OyVO~OPXOjXOlTOmTO~Of[O~OoaOqaO~OffO~OlTOmTOrkO~OgmOmmOoaOqaO~OoaOqaOznO!OqO~OffOexi~OfxO~OoaOqaO!OqO~O{!OO|!OO}!OO~OlTOmTO{!OO|!OO}!OO~Og!SOm!SOoaOqaOznO!OqO~Ot!TOu!TOv!TOw!TO~OfxOgSimSioSiqSi~O{!OO|!OO}!OO!P!YO~Og!_Om!_Ot!TOu!TOv!TOw!TO~Otuvwyow~",
  goto: "%fyPPPz!Q!U!Y!^!b!o!x#P#V#^#h#n#t#z$Q$W$^PPPPPP$dPP$|P%PPP%_PPPP%cQ]UR!a!]Td[eTb[eTyizTg^hStfvQ}rQ!X|R![!PWsfrv|R![!PZpfrv|!PX!Pst}!XZufrv|!PYrfrv|!PR|pQ!Z}R!`!XQYSR_YQe[RleQziR!WzQ!VxR!^!VQh^RwhQvfR!RvQUQQZSQ^VQ`YQibQjcQ!QtR!]!URROSc[eYofrv|!PR{pT!Ux!VRWR",
  nodeNames: "⚠ Comment Tree FeatureBlock AbstractFeature AbstractItem StateBlock ConstraintsBlock Constraints ConstraintsItem Neg ConstraintSign Brackets OpenBracket CloseBracket",
  maxTerm: 47,
  context: trackIndent,
  skippedNodes: [0,1,15],
  repeatNodeCount: 6,
  tokenData: ";_~RhXY!mYZ!xpq!mqr!}rs#Sst$pvw%hxy%myz%r!Q![%w!_!`&Y!c!}%w#R#S%w#T#U&e#U#V%w#V#W+u#W#a%w#a#b1V#b#c%w#c#d5d#d#o%w#o#p9v#p#q;T~~;Y~!rQj~XY!mpq!m~!}Ol~~#SOz~~#VVOr#Srs#ls#O#S#O#P#q#P;'S#S;'S;=`$j<%lO#S~#qOq~~#tRO;'S#S;'S;=`#};=`O#S~$QWOr#Srs#ls#O#S#O#P#q#P;'S#S;'S;=`$j;=`<%l#S<%lO#S~$mP;=`<%l#S~$sSOY%PZ;'S%P;'S;=`%b<%lO%P~%USP~OY%PZ;'S%P;'S;=`%b<%lO%P~%eP;=`<%l%P~%mO}~~%rO!O~~%wO!P~~%|So~!Q![%w!c!}%w#R#S%w#T#o%w~&]P!`!a&`~&eO|~~&jUo~!Q![%w!c!}%w#R#S%w#T#`%w#`#a&|#a#o%w~'RUo~!Q![%w!c!}%w#R#S%w#T#h%w#h#i'e#i#o%w~'jUo~!Q![%w!c!}%w#R#S%w#T#X%w#X#Y'|#Y#o%w~(RUo~!Q![%w!c!}%w#R#S%w#T#f%w#f#g(e#g#o%w~(jUo~!Q![%w!c!}%w#R#S%w#T#b%w#b#c(|#c#o%w~)RTo~!Q![%w!c!}%w#R#S%w#T#U)b#U#o%w~)gUo~!Q![%w!c!}%w#R#S%w#T#h%w#h#i)y#i#o%w~*OUo~!Q![%w!c!}%w#R#S%w#T#]%w#]#^*b#^#o%w~*gUo~!Q![%w!c!}%w#R#S%w#T#j%w#j#k*y#k#o%w~+OUo~!Q![%w!c!}%w#R#S%w#T#X%w#X#Y+b#Y#o%w~+iSv~o~!Q![%w!c!}%w#R#S%w#T#o%w~+zUo~!Q![%w!c!}%w#R#S%w#T#c%w#c#d,^#d#o%w~,cUo~!Q![%w!c!}%w#R#S%w#T#b%w#b#c,u#c#o%w~,zUo~!Q![%w!c!}%w#R#S%w#T#g%w#g#h-^#h#o%w~-cUo~!Q![%w!c!}%w#R#S%w#T#h%w#h#i-u#i#o%w~-zUo~!Q![%w!c!}%w#R#S%w#T#f%w#f#g.^#g#o%w~.cTo~!Q![%w!c!}%w#R#S%w#T#U.r#U#o%w~.wUo~!Q![%w!c!}%w#R#S%w#T#]%w#]#^/Z#^#o%w~/`Uo~!Q![%w!c!}%w#R#S%w#T#b%w#b#c/r#c#o%w~/wUo~!Q![%w!c!}%w#R#S%w#T#h%w#h#i0Z#i#o%w~0`Uo~!Q![%w!c!}%w#R#S%w#T#g%w#g#h0r#h#o%w~0ySy~o~!Q![%w!c!}%w#R#S%w#T#o%w~1[To~!Q![%w!c!}%w#R#S%w#T#U1k#U#o%w~1pUo~!Q![%w!c!}%w#R#S%w#T#b%w#b#c2S#c#o%w~2XUo~!Q![%w!c!}%w#R#S%w#T#W%w#W#X2k#X#o%w~2pTo~!Q![%w!c!}%w#R#S%w#T#U3P#U#o%w~3UUo~!Q![%w!c!}%w#R#S%w#T#h%w#h#i3h#i#o%w~3mUo~!Q![%w!c!}%w#R#S%w#T#c%w#c#d4P#d#o%w~4UUo~!Q![%w!c!}%w#R#S%w#T#f%w#f#g4h#g#o%w~4mUo~!Q![%w!c!}%w#R#S%w#T#m%w#m#n5P#n#o%w~5WSt~o~!Q![%w!c!}%w#R#S%w#T#o%w~5iWo~!Q![%w!c!}%w#R#S%w#T#d%w#d#e6R#e#f%w#f#g9c#g#o%w~6WUo~!Q![%w!c!}%w#R#S%w#T#h%w#h#i6j#i#o%w~6oUo~!Q![%w!c!}%w#R#S%w#T#]%w#]#^7R#^#o%w~7WUo~!Q![%w!c!}%w#R#S%w#T#c%w#c#d7j#d#o%w~7oUo~!Q![%w!c!}%w#R#S%w#T#b%w#b#c8R#c#o%w~8WTo~!Q![%w!c!}%w#R#S%w#T#U8g#U#o%w~8lUo~!Q![%w!c!}%w#R#S%w#T#`%w#`#a9O#a#o%w~9VSu~o~!Q![%w!c!}%w#R#S%w#T#o%w~9jSw~o~!Q![%w!c!}%w#R#S%w#T#o%w~9yP#T#U9|~:PP#U#V:S~:VP#g#h:Y~:]P#h#i:`~:cP#f#g:f~:iP#T#U:l~:oP#V#W:r~:uP#h#i:x~:{P#q#r;O~;TOr~~;YO{~~;_Om~",
  tokenizers: [indentation, 0],
  topRules: {"Tree":[0,2]},
  tokenPrec: 244
})

