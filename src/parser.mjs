// This file was generated by lezer-generator. You probably shouldn't edit it.
import {LRParser} from "@lezer/lr"
import {indentation, trackIndent} from "./tokens.js"
export const parser = LRParser.deserialize({
  version: 14,
  states: "1WO]QROOPbOPOOOOQP'#C_'#C_OgQRO'#DYQoQROOPtOQO)C>yOOQP'#DV'#DVO!SQRO,59tOgQRO'#DpQOQROOPOOO'#Cy'#CyPtOQO/'4ePOOO/'4e/'4eO!XQTO'#C`OOQP1G/`1G/`O!mQRO,5:[POOO-E6w-E6wPOOO49*P49*PO!rQTO'#CbOOQP'#Cc'#CcO#dQTO'#CaO#xQTO'#CaO$QQTO'#CaOgQRO'#CzOOQP'#Cz'#CzO$fQTO,58zO$pQTO'#CoOOQP'#C}'#C}O%XQRO1G/vOOQP'#Cb'#CbO%aQRO'#CeO%fQTO'#ChOOQP,58{,58{O%nQRO,58{O%yQRO,58{OOQP'#Cd'#CdO&XQTO,58{O#xQTO,58{O&mQTO,59fOOQP-E6x-E6xOOQP1G.f1G.fO'[QRO'#DrO'aQRO'#DvO'fQRO'#DxOOQP'#Cq'#CqOOQP'#Cv'#CvOOQP'#Cu'#CuO'kQTO'#CuO$pQTO'#CxO'vQRO'#CpO([QRO'#CpO)QQRO'#DOOOQP'#Cp'#CpO)[QTO,59ZOOQP-E6{-E6{O)fQRO,59POOQP'#Cj'#CjO)kQRO'#CiO)|QRO'#DhO*UQRO,59SOOQP1G.g1G.gO*ZQRO1G.gO*fQRO1G.gO*tQTO1G.gO+YQRO'#CmOOQP1G.r1G.rO%fQTO,5:^O%fQTO,5:bO%fQTO,5:dOOQP,59a,59aOOQP,59[,59[O+hQRO,59dOOQP'#Cr'#CrO+oQRO,59[OOQP'#Ct'#CtO$pQTO,59[O+tQTO,59[OOQP,59j,59jOOQP-E6|-E6|OOQP1G.u1G.uOOQP'#Cf'#CfO,PQRO1G.kOOQP'#Ck'#CkO,UQTO'#CkOOQP,59T,59TO%fQTO'#C{O,ZQRO,5:SOOQP1G.n1G.nOOQP7+$R7+$RO,cQRO7+$RO,nQRO7+$ROOQP'#Cn'#CnOgQRO'#C|O,|QRO,59XO-bQRO1G/xO-gQRO1G/|O-lQRO1G0OOOQP1G/O1G/OOOQP'#Cs'#CsOOQP1G.v1G.vO-qQRO1G.vO._QTO'#CuO.gQRO1G.vO.rQRO7+$VO.wQRO,59VOOQP,59g,59gOOQP-E6y-E6yOOQP<<Gm<<GmO.|QRO<<GmO!SQRO,59hOOQP-E6z-E6zOOQP1G.s1G.sOOQP7+%d7+%dOOQP7+%h7+%hOOQP7+%j7+%jO+tQTO7+$bOOQP'#Cw'#CwOOQP'#Cg'#CgO/XQRO<<GqOOQP1G.q1G.qOOQPAN=XAN=XOOQP1G/S1G/SOOQP<<G|<<G|OOQPAN=]AN=]",
  stateData: "/o~OxOSPOSvPQ~O}QO~OvTO~OzUO{UO~O!eWO~OPYOxYOzUO{UO~Ot]O~O!ObO!PbO!QcO!RcO!ScO!TcO~OtjO~OzWX{WX!OUX!PUX!QUX!RUX!SUX!TUX!UWX!ZWX~O!OmO!PmO!UnO!ZoOzTX{TX~O!OsO!PsO~O!OsO!PsO!QcO!RcO!ScO!TcO~OuxO{xO~P!XO!O!OO!P!OO!gyO!h!QO!kzO!m{O!y}O~OtjOs!di~O!V!XO~O!O!YO!P!YO~O!ZoOzTa{Ta~O!UnO!ZoOzTa{Ta~O!OmO!PmO!UnO!ZoOzTa{Ta~Ot!bOuna{na!Ona!Pna!Qna!Rna!Sna!Tna~O!h!dO~O!h!eO~O!h!fO~O!O!gO!P!gO!h!QO~O!n!jO!o!jO!p!jO!q!jO!r!jO!s!jO~O!t!lO!u!lO!v!lO!w!lO!x!lO~P'vO!t!lO!u!lO!v!lO!w!lO!x!lO~OzUO{UO~P(oOu!qO{!qO~P$pO!W!rO~O!P!tO!W!tO!]!uO!^]X!_]X~O!^!wO!_![X~O!_!yO~O!ZoOzTi{Ti~O!UnO!ZoOzTi{Ti~O!OmO!PmO!UnO!ZoOzTi{Ti~O!`!}O!a!}O!b!}O!c!}O~O!i#TO~P(oO!W#UO~O!O!OO!P!OO!y}O~O!X#ZO~O!O#[O~O!^!wO!_![a~O!ZoOzTq{Tq~O!UnO!ZoOzTq{Tq~Ou#cO{#cO!`!}O!a!}O!b!}O!c!}O~O!i#dO~O!i#eO~O!i#fO~Ozdi{di!tdi!udi!vdi!wdi!xdi!idi~P'vO!O!gO!P!gO~O!r#hO!s#hO!w#hO~O!W#iO~O!]#kO~O!ZoOzTy{Ty~O!Y#oO~O!`!a!b!c!e!U!g!k!Q!S!R!T!m!W!O!k~",
  goto: "(^!mPPP!n!q!w!{#Y#a#l#z#}$Q$f$l$y$|%Q%T%X%]%g%m%t%w%|&[&f&i&r&x'O'U'['bPPPPPP'hPP'}PPPPPPPPPPPPP(QPPPPPPP(TP(WPPP(WP(WRROQ^VR#m#aTg]iSf]iQrdQ!`tR!|!aSe]iRufSd]iStefR!auQqdS!_rtS!{!`!aR#`!|R!s!XR#j#ZQpdU!^qrtU!z!_!`!aS#_!{!|R#l#`Q![oR#]!wS!Zo!wQ#Q!dQ#R!eR#S!fR!v!ZTh]iR!cvT#O!b#PTk_lS!Tj!VQ!i!QR#V!mX!Rj!Q!V!mQ!k!RT!n!S#WR#V!kV!m!S!T!iU!Sj!Q!VQ#W!mQ#Y!nR#n#gW!Pj!Q!V!mT#X!n#gR#g#YW!Uj!Q!V!mR!h!PQZTR`ZQi]RwiQ!x![R#^!xQ#P!bR#b#PQl_R!WlQ!VjR!p!VQVRQ[TQ_WQaZQvgQ!o!TR#a#ORSOR!]oRXSX|j!Q!V!m",
  nodeNames: "⚠ Comment Tree Root FeatureBlock ExtendedFeature ReqExp Type Feature Cardinality Min Max AttributeItem AttributeSelection Key Value StateFeature StateBlock State ConstraintsBlock Constraints Operation Operator Number ConstraintSign ConstraintsItem Neg Signs Brackets",
  maxTerm: 87,
  context: trackIndent,
  skippedNodes: [0,1,29],
  repeatNodeCount: 6,
  tokenData: "!(_~R!QXY$XYZ$dpq$Xqr$irs$nst&[vw'Swx'Xxy'^yz'cz{'h{|'m|}'r}!O'w!O!P'|!P!Q(X!Q![(^!^!_)S!_!`)g!`!a)z!c!d(q!d!e*P!e!k(q!k!l-a!l!t(q!t!u0t!u!v2m!v!}(q!}#O5i#P#Q5n#R#S(q#T#U5s#U#V(q#V#W<V#W#Y(q#Y#ZFi#Z#`(q#`#aJb#a#bKu#b#c(q#c#d!!S#d#g(q#g#h!&f#h#o(q#o#p!'y#p#q!(O#q#r!(T~~!(Y~$^Qx~XY$Xpq$X~$iOz~~$nO!y~~$qVOr$nrs%Ws#O$n#O#P%]#P;'S$n;'S;=`&U<%lO$n~%]O!P~~%`RO;'S$n;'S;=`%i;=`O$n~%lWOr$nrs%Ws#O$n#O#P%]#P;'S$n;'S;=`&U;=`<%l$n<%lO$n~&XP;=`<%l$n~&_SOY&kZ;'S&k;'S;=`&|<%lO&k~&pSP~OY&kZ;'S&k;'S;=`&|<%lO&k~'PP;=`<%l&k~'XO!v~~'^O!]~~'cO!h~~'hO!i~~'mO!p~~'rO!n~~'wO!^~~'|O!o~~(PP!O!P(S~(XO!X~~(^O!q~~(eS!W~!OQ!Q![(^!c!}(q#R#S(q#T#o(qQ(vS!OQ!Q![(q!c!}(q#R#S(q#T#o(q~)XP!s~!_!`)[~)_P!`!a)b~)gO!x~~)jQ!_!`)p!`!a)u~)uO!w~~)zO!u~~*PO!r~~*UU!OQ!Q![(q!c!}(q#R#S(q#T#c(q#c#d*h#d#o(q~*mU!OQ!Q![(q!c!}(q#R#S(q#T#c(q#c#d+P#d#o(q~+UU!OQ!Q![(q!c!}(q#R#S(q#T#`(q#`#a+h#a#o(q~+mU!OQ!Q![(q!c!}(q#R#S(q#T#X(q#X#Y,P#Y#o(q~,UT!OQ!Q![(q!c!}(q#R#S(q#T#U,e#U#o(q~,jU!OQ!Q![(q!c!}(q#R#S(q#T#b(q#b#c,|#c#o(q~-TS!T~!OQ!Q![(q!c!}(q#R#S(q#T#o(q~-fU!OQ!Q![(q!c!}(q#R#S(q#T#b(q#b#c-x#c#o(q~-}U!OQ!Q![(q!c!}(q#R#S(q#T#h(q#h#i.a#i#o(q~.fU!OQ!Q![(q!c!}(q#R#S(q#T#X(q#X#Y.x#Y#o(q~.}U!OQ!Q![(q!c!}(q#R#S(q#T#Z(q#Z#[/a#[#o(q~/fU!OQ!Q![(q!c!}(q#R#S(q#T#X(q#X#Y/x#Y#o(q~/}U!OQ!Q![(q!c!}(q#R#S(q#T#f(q#f#g0a#g#o(q~0hS!Q~!OQ!Q![(q!c!}(q#R#S(q#T#o(q~0yU!OQ!Q![(q!c!}(q#R#S(q#T#X(q#X#Y1]#Y#o(q~1bT!OQ!Q![(q!c!}(q#R#S(q#T#U1q#U#o(q~1vU!OQ!Q![(q!c!}(q#R#S(q#T#`(q#`#a2Y#a#o(q~2aS!S~!OQ!Q![(q!c!}(q#R#S(q#T#o(q~2rU!OQ!Q![(q!c!}(q#R#S(q#T#h(q#h#i3U#i#o(q~3ZU!OQ!Q![(q!c!}(q#R#S(q#T#f(q#f#g3m#g#o(q~3rU!OQ!Q![(q!c!}(q#R#S(q#T#](q#]#^4U#^#o(q~4ZU!OQ!Q![(q!c!}(q#R#S(q#T#b(q#b#c4m#c#o(q~4rU!OQ!Q![(q!c!}(q#R#S(q#T#Z(q#Z#[5U#[#o(q~5]S!R~!OQ!Q![(q!c!}(q#R#S(q#T#o(q~5nO!V~~5sO!Y~~5xW!OQ!Q![(q!c!}(q#R#S(q#T#`(q#`#a6b#a#j(q#j#k;Z#k#o(q~6gU!OQ!Q![(q!c!}(q#R#S(q#T#h(q#h#i6y#i#o(q~7OU!OQ!Q![(q!c!}(q#R#S(q#T#X(q#X#Y7b#Y#o(q~7gU!OQ!Q![(q!c!}(q#R#S(q#T#f(q#f#g7y#g#o(q~8OU!OQ!Q![(q!c!}(q#R#S(q#T#b(q#b#c8b#c#o(q~8gT!OQ!Q![(q!c!}(q#R#S(q#T#U8v#U#o(q~8{U!OQ!Q![(q!c!}(q#R#S(q#T#h(q#h#i9_#i#o(q~9dU!OQ!Q![(q!c!}(q#R#S(q#T#](q#]#^9v#^#o(q~9{U!OQ!Q![(q!c!}(q#R#S(q#T#j(q#j#k:_#k#o(q~:dU!OQ!Q![(q!c!}(q#R#S(q#T#X(q#X#Y:v#Y#o(q~:}S!b~!OQ!Q![(q!c!}(q#R#S(q#T#o(q~;`U!OQ!Q![(q!c!}(q#R#S(q#T#Z(q#Z#[;r#[#o(q~;yS!k~!OQ!Q![(q!c!}(q#R#S(q#T#o(q~<[V!OQ!Q![(q!c!}(q#R#S(q#T#U<q#U#c(q#c#dAp#d#o(q~<vU!OQ!Q![(q!c!}(q#R#S(q#T#f(q#f#g=Y#g#o(q~=_U!OQ!Q![(q!c!}(q#R#S(q#T#W(q#W#X=q#X#o(q~=vU!OQ!Q![(q!c!}(q#R#S(q#T#](q#]#^>Y#^#o(q~>_U!OQ!Q![(q!c!}(q#R#S(q#T#b(q#b#c>q#c#o(q~>vT!OQ!Q![(q!c!}(q#R#S(q#T#U?V#U#o(q~?[U!OQ!Q![(q!c!}(q#R#S(q#T#`(q#`#a?n#a#o(q~?sU!OQ!Q![(q!c!}(q#R#S(q#T#](q#]#^@V#^#o(q~@[U!OQ!Q![(q!c!}(q#R#S(q#T#h(q#h#i@n#i#o(q~@sU!OQ!Q![(q!c!}(q#R#S(q#T#m(q#m#nAV#n#o(q~A[T!OQpqAk!Q![(q!c!}(q#R#S(q#T#o(q~ApO!U~~AuU!OQ!Q![(q!c!}(q#R#S(q#T#b(q#b#cBX#c#o(q~B^U!OQ!Q![(q!c!}(q#R#S(q#T#g(q#g#hBp#h#o(q~BuU!OQ!Q![(q!c!}(q#R#S(q#T#h(q#h#iCX#i#o(q~C^U!OQ!Q![(q!c!}(q#R#S(q#T#f(q#f#gCp#g#o(q~CuT!OQ!Q![(q!c!}(q#R#S(q#T#UDU#U#o(q~DZU!OQ!Q![(q!c!}(q#R#S(q#T#](q#]#^Dm#^#o(q~DrU!OQ!Q![(q!c!}(q#R#S(q#T#b(q#b#cEU#c#o(q~EZU!OQ!Q![(q!c!}(q#R#S(q#T#h(q#h#iEm#i#o(q~ErU!OQ!Q![(q!c!}(q#R#S(q#T#g(q#g#hFU#h#o(q~F]S!e~!OQ!Q![(q!c!}(q#R#S(q#T#o(qRFnU!OQ!Q![(q!c!}(q#R#S(q#T#X(q#X#YGQ#Y#o(qRGVT!OQ!Q![(q!c!}(q#R#S(q#T#UGf#U#o(qRGkU!OQ!Q![(q!c!}(q#R#S(q#T#h(q#h#iG}#i#o(qRHSU!OQ!Q![(q!c!}(q#R#S(q#T#i(q#i#jHf#j#o(qRHkU!OQ!Q![(q!c!}(q#R#S(q#T#f(q#f#gH}#g#o(qRISU!OQ!Q![(q!c!}(q#R#S(q#T#X(q#X#YIf#Y#o(qRIkU!OQ!Q![(q!c!}(q#R#S(q#T#g(q#g#hI}#h#o(qRJUS}P!OQ!Q![(q!c!}(q#R#S(q#T#o(q~JgU!OQ!Q![(q!c!}(q#R#S(q#T#X(q#X#YJy#Y#o(q~KOU!OQ!Q![(q!c!}(q#R#S(q#T#b(q#b#cKb#c#o(q~KiS!m~!OQ!Q![(q!c!}(q#R#S(q#T#o(q~KzT!OQ!Q![(q!c!}(q#R#S(q#T#ULZ#U#o(q~L`U!OQ!Q![(q!c!}(q#R#S(q#T#b(q#b#cLr#c#o(q~LwU!OQ!Q![(q!c!}(q#R#S(q#T#W(q#W#XMZ#X#o(q~M`T!OQ!Q![(q!c!}(q#R#S(q#T#UMo#U#o(q~MtU!OQ!Q![(q!c!}(q#R#S(q#T#h(q#h#iNW#i#o(q~N]U!OQ!Q![(q!c!}(q#R#S(q#T#c(q#c#dNo#d#o(q~NtU!OQ!Q![(q!c!}(q#R#S(q#T#f(q#f#g! W#g#o(q~! ]U!OQ!Q![(q!c!}(q#R#S(q#T#m(q#m#n! o#n#o(q~! vS!`~!OQ!Q![(q!c!}(q#R#S(q#T#o(q~!!XW!OQ!Q![(q!c!}(q#R#S(q#T#d(q#d#e!!q#e#f(q#f#g!&R#g#o(q~!!vU!OQ!Q![(q!c!}(q#R#S(q#T#h(q#h#i!#Y#i#o(q~!#_U!OQ!Q![(q!c!}(q#R#S(q#T#](q#]#^!#q#^#o(q~!#vU!OQ!Q![(q!c!}(q#R#S(q#T#c(q#c#d!$Y#d#o(q~!$_U!OQ!Q![(q!c!}(q#R#S(q#T#b(q#b#c!$q#c#o(q~!$vT!OQ!Q![(q!c!}(q#R#S(q#T#U!%V#U#o(q~!%[U!OQ!Q![(q!c!}(q#R#S(q#T#`(q#`#a!%n#a#o(q~!%uS!a~!OQ!Q![(q!c!}(q#R#S(q#T#o(q~!&YS!c~!OQ!Q![(q!c!}(q#R#S(q#T#o(q~!&kU!OQ!Q![(q!c!}(q#R#S(q#T#i(q#i#j!&}#j#o(q~!'SU!OQ!Q![(q!c!}(q#R#S(q#T#a(q#a#b!'f#b#o(q~!'mS!g~!OQ!Q![(q!c!}(q#R#S(q#T#o(q~!(OO!Z~~!(TO!t~~!(YO!_~~!(_O{~",
  tokenizers: [indentation, 0, 1],
  topRules: {"Tree":[0,2]},
  tokenPrec: 658
})
