import { LitElement, html } from 'lit';
import { EditorView, basicSetup } from 'codemirror';

import {defaultKeymap, indentWithTab} from "@codemirror/commands"
import { EditorState } from '@codemirror/state';
import {UVLLanguageSupport, autocompleteExtension, customLinter} from './language.mjs';
import {lintGutter} from "@codemirror/lint";
import {keymap} from "@codemirror/view"
//tab size
import { indentUnit } from '@codemirror/language';

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
        Boolean "Feature-0" cardinality [1..5]
                alternative
                        Integer "Feature-1" {Price 72}
                                alternative
                                        Boolean "Feature-2" {Price 240}
                                                or
                                                        Boolean "Feature-3" {Price 886}
                                                                alternative
                                                                        String "Feature-5"
                                                                                alternative
                                                                                        Boolean "Feature-8" {Price 179}
                                                                                        Real "Feature-9" {Price 130}
                                                                                        Integer "Feature-21"
                                                                                        Boolean "Feature-22"
                                                                                        Boolean "Feature-44"
                                                                                        Boolean "Feature-50" {Price 928}
                                                                                        Boolean "Feature-67"
                                                                                        Boolean "Feature-122"
                                                                                        Boolean "Feature-327"
                                                                                        Boolean "Feature-426" {Price 913}
                                                                        Integer "Feature-7" {Fun 94}
                                                                                optional
                                                                                        Boolean "Feature-15" cardinality [1..5] {Price 272}
                                                                                        Boolean "Feature-26" {Price 669}
                                                                                        Boolean "Feature-54" cardinality [1..5]
                                                                                        Integer "Feature-60" {Price 310, Fun -66}
                                                                                        Integer "Feature-69"
                                                                                        Boolean "Feature-292" {Price 420}
                                                                        Integer "Feature-11"
                                                                                alternative
                                                                                        Boolean "Feature-37"
                                                                                        Integer "Feature-75"
                                                                                        Boolean "Feature-80"
                                                                                        Integer "Feature-81" {Price 690}
                                                                                        String "Feature-216"
                                                                                        Integer "Feature-234"
                                                                                        Boolean "Feature-255"
                                                                                        Boolean "Feature-453" {Fun -50}
                                                                        Boolean "Feature-25"
                                                                                mandatory
                                                                                        Boolean "Feature-63"
                                                                                        Boolean "Feature-87"
                                                                                        Boolean "Feature-538" {Price 307}
                                                                        Real "Feature-52" {Price 424}
                                                                                or
                                                                                        Boolean "Feature-137"
                                                                                        Boolean "Feature-140" {Price 723}
                                                                                        Boolean "Feature-197" {Price 769, Fun -65}
                                                                        Integer "Feature-62"
                                                                                alternative
                                                                                        Boolean "Feature-121" {Price 934, Fun -26}
                                                                                        Integer "Feature-193"
                                                                                        String "Feature-210" {Price 450}
                                                                                        String "Feature-365" {Price 209}
                                                                        Integer "Feature-352"
                                                        Boolean "Feature-74" {Price 243}
                                                                alternative
                                                                        Boolean "Feature-161" {Price 290}
                                                                                [2..2]
                                                                                        Boolean "Feature-225"
                                                                                        Real "Feature-241"
                                                                        String "Feature-250" {Price 804, Fun 39}
                                                        Boolean "Feature-387" {Price 706}
                                                                optional
                                                                        Boolean "Feature-540"
                                        Boolean "Feature-4" {Price 53}
                                                mandatory
                                                        Boolean "Feature-18" {Price 21}
                                                                [1..1]
                                                                        Boolean "Feature-39" {Price 994}
                                                                                alternative
                                                                                        Boolean "Feature-53" {Price 51}
                                                                                        Boolean "Feature-58"
                                                                                        Boolean "Feature-71"
                                                                                        Boolean "Feature-94"
                                                                        Boolean "Feature-157" {Price 453}
                                                                                alternative
                                                                                        Boolean "Feature-174" {Fun 49}
                                                                                        String "Feature-266"
                                                                                        Boolean "Feature-412"
                                                                                        Boolean "Feature-462"
                                                                        Integer "Feature-226"
                                                                                alternative
                                                                                        Boolean "Feature-525" {Fun -4}
                                                                        Boolean "Feature-371" cardinality [1..5]
                                                                                mandatory
                                                                                        Boolean "Feature-416" {Price 33}
                                                                        Boolean "Feature-390" {Price 787}
                                                        Boolean "Feature-19" {Price 976}
                                                                mandatory
                                                                        Integer "Feature-40" {Price 843}
                                                                                mandatory
                                                                                        String "Feature-152" {Price 802}
                                                                                        Boolean "Feature-441"
                                                                        Boolean "Feature-45"
                                                                                mandatory
                                                                                        Boolean "Feature-128"
                                                                                        Integer "Feature-151" cardinality [1..5]
                                                                                        Integer "Feature-172" {Price 357}
                                                                                        Boolean "Feature-257"
                                                                                        Integer "Feature-409" {Price 182}
                                                                        Boolean "Feature-123" {Price 402}
                                                                                optional
                                                                                        Boolean "Feature-263"
                                                                        Boolean "Feature-232" {Price 586}
                                                                        Boolean "Feature-469"
                                                                        Boolean "Feature-507"
                                                        String "Feature-61" {Price 56}
                                                                alternative
                                                                        Boolean "Feature-65" {Price 184}
                                                                                [4..5]
                                                                                        Boolean "Feature-76" cardinality [1..5]
                                                                                        Integer "Feature-79"
                                                                                        Boolean "Feature-143" {Price 504}
                                                                                        Integer "Feature-233"
                                                                                        Boolean "Feature-245" cardinality [1..5] {Price 576}
                                                                                        Boolean "Feature-323"
                                                                                        Boolean "Feature-505" {Price 891, Fun -49}
                                                                        Boolean "Feature-72" cardinality [1..5] {Price 916}
                                                                                alternative
                                                                                        Boolean "Feature-77" {Price 27}
                                                                                        Boolean "Feature-85"
                                                                                        String "Feature-136"
                                                                                        String "Feature-146"
                                                                        Boolean "Feature-73"
                                                                                alternative
                                                                                        Boolean "Feature-166" {Fun -35}
                                                                                        Integer "Feature-242" cardinality [1..5]
                                                                                        Integer "Feature-459" {Price 558}
                                                                        String "Feature-105" {Price 450}
                                                                                [0..1]
                                                                                        Boolean "Feature-109"
                                                                                        Boolean "Feature-260" {Price 11}
                                                                                        Boolean "Feature-448"
                                                                                        Boolean "Feature-463" {Price 196, Fun 83}
                                                                        Real "Feature-169" {Price 491}
                                                                        Boolean "Feature-252" cardinality [1..5]
                                                                        Boolean "Feature-424" cardinality [1..5] {Price 668}
                                                                        Boolean "Feature-444" {Price 714}
                                                        Integer "Feature-86" {Fun -16}
                                                                alternative
                                                                        Boolean "Feature-101"
                                                                                [1..3]
                                                                                        Integer "Feature-102" {Fun -85}
                                                                                        Boolean "Feature-138" {Price 158}
                                                                                        Boolean "Feature-270" cardinality [1..5] {Price 788}
                                                                                        Boolean "Feature-381"
                                                                        Boolean "Feature-111" {Price 451, Fun 4}
                                                                                [1..1]
                                                                                        Integer "Feature-214" {Price 385}
                                                        Boolean "Feature-243" {Price 584}
                                                                or
                                                                        Boolean "Feature-284" {Price 690}
                                                                        Boolean "Feature-503" {Price 712}
                                                                                or
                                                                                        Boolean "Feature-537" cardinality [1..5] {Price 294}
                                                        Integer "Feature-291"
                                                                optional
                                                                        Boolean "Feature-364"
                                                                        Boolean "Feature-393" {Price 283}
                                                        String "Feature-334" cardinality [1..5]
                                                                [0..2]
                                                                        Boolean "Feature-359"
                                                                        Boolean "Feature-431" {Price 543}
                                                                                [0..2]
                                                                                        Boolean "Feature-452" cardinality [1..5] {Price 251}
                                                                                        Real "Feature-478" {Price 517, Fun -46}
                                        Boolean "Feature-6" {Price 980}
                                                [4..4]
                                                        Boolean "Feature-10" cardinality [1..5]
                                                                optional
                                                                        Integer "Feature-12" cardinality [1..5]
                                                                                [4..6]
                                                                                        Integer "Feature-14" {Price 178}
                                                                                        Boolean "Feature-17" cardinality [1..5]
                                                                                        Boolean "Feature-34" {Price 950}
                                                                                        Integer "Feature-47" {Price 225}
                                                                                        Boolean "Feature-131"
                                                                                        Boolean "Feature-408"
                                                                                        Integer "Feature-523" cardinality [1..5] {Price 244}
                                                                        Boolean "Feature-16" {Price 205}
                                                                                alternative
                                                                                        Integer "Feature-24" {Price 288}
                                                                                        Boolean "Feature-33" {Price 536}
                                                                                        Real "Feature-36" {Fun 89}
                                                                                        Boolean "Feature-57"
                                                                                        Boolean "Feature-237" {Price 120}
                                                                                        Boolean "Feature-460" cardinality [1..5]
                                                                                        Boolean "Feature-467"
                                                                        Boolean "Feature-115"
                                                                                alternative
                                                                                        Boolean "Feature-202"
                                                                                        Boolean "Feature-490"
                                                                        Boolean "Feature-213" {Price 15}
                                                                                alternative
                                                                                        Boolean "Feature-479"
                                                                        Boolean "Feature-254"
                                                                                or
                                                                                        Boolean "Feature-321"
                                                                                        Boolean "Feature-386" {Price 233, Fun -91}
                                                                        Real "Feature-472" {Fun 22}
                                                        Integer "Feature-97"
                                                                optional
                                                                        Boolean "Feature-180"
                                                                                [0..2]
                                                                                        Boolean "Feature-189"
                                                                                        Integer "Feature-337"
                                                                        Boolean "Feature-280"
                                                                                mandatory
                                                                                        Boolean "Feature-310" cardinality [1..5]
                                                                                        Integer "Feature-325" cardinality [1..5] {Fun 45}
                                                                                        Integer "Feature-351" {Price 984}
                                                                                        Boolean "Feature-447" cardinality [1..5] {Fun -99}
                                                        Boolean "Feature-171"
                                                                mandatory
                                                                        Boolean "Feature-177" {Price 958}
                                                                                [1..1]
                                                                                        Integer "Feature-516" {Price 387}
                                                                                        Boolean "Feature-518" {Fun -68}
                                                                        Boolean "Feature-244"
                                                        Boolean "Feature-215"
                                                                mandatory
                                                                        Integer "Feature-240" cardinality [1..5] {Price 782}
                                                        Boolean "Feature-357" {Price 60}
                                        Boolean "Feature-42"
                                                alternative
                                                        Boolean "Feature-83" {Price 737, Fun 55}
                                                                mandatory
                                                                        Boolean "Feature-100" {Price 256}
                                                                                alternative
                                                                                        Boolean "Feature-127"
                                                                                        Boolean "Feature-133"
                                                                        Boolean "Feature-104" {Price 752, Fun 35}
                                                                                [1..2]
                                                                                        Boolean "Feature-158" cardinality [1..5]
                                                                                        Boolean "Feature-229"
                                                                        Boolean "Feature-192" {Price 598}
                                                                                alternative
                                                                                        Integer "Feature-332"
                                                                                        Boolean "Feature-470"
                                                                        Boolean "Feature-239"
                                                                                alternative
                                                                                        Real "Feature-455" {Fun -26}
                                                        Boolean "Feature-99"
                                                                mandatory
                                                                        Boolean "Feature-194" cardinality [1..5]
                                                                        Boolean "Feature-492" {Price 854}
                                                        Boolean "Feature-183" {Price 727}
                                                                mandatory
                                                                        Boolean "Feature-360"
                                                                                or
                                                                                        Boolean "Feature-437" {Price 302, Fun -88}
                                                                                        Boolean "Feature-502"
                                                                        Boolean "Feature-414"
                                                        Integer "Feature-385" {Price 971}
                                                        Boolean "Feature-403"
                                        Boolean "Feature-78"
                                                mandatory
                                                        Integer "Feature-219" cardinality [1..5] {Price 83, Fun 26}
                                                                mandatory
                                                                        Real "Feature-451" {Price 359}
                                                        Integer "Feature-235"
                                        Real "Feature-88" cardinality [1..5]
                                                mandatory
                                                        Boolean "Feature-107"
                                                                or
                                                                        Integer "Feature-347"
                                                                                [2..2]
                                                                                        Boolean "Feature-379" cardinality [1..5]
                                                                                        Boolean "Feature-435"
                                                                        Boolean "Feature-486" cardinality [1..5] {Price 247}
                                                                                or
                                                                                        Boolean "Feature-534" {Price 202}
                                        Boolean "Feature-118"
                                                [2..3]
                                                        Boolean "Feature-203"
                                                                [0..1]
                                                                        Boolean "Feature-289" {Price 247}
                                                                                [0..1]
                                                                                        Integer "Feature-322"
                                                                                        String "Feature-529" cardinality [1..5] {Price 511}
                                                                        Boolean "Feature-423"
                                                        Boolean "Feature-391"
                                                        Boolean "Feature-434" {Price 726}
                                                        Boolean "Feature-527"
                                        String "Feature-195"
                                                alternative
                                                        Boolean "Feature-207" cardinality [1..5] {Price 496, Fun 49}
                                                                or
                                                                        Boolean "Feature-230"
                                                                                [1..1]
                                                                                        Boolean "Feature-499"
                                                                        Boolean "Feature-370" cardinality [1..5]
                                                                                mandatory
                                                                                        Boolean "Feature-517"
                                                                        Integer "Feature-410" cardinality [1..5]
                                                                                [1..1]
                                                                                        Boolean "Feature-415"
                                                                        Real "Feature-445"
                                                        Boolean "Feature-294" {Price 103}
                                                        Integer "Feature-348" cardinality [1..5] {Price 826, Fun 85}
                                        Boolean "Feature-461" {Fun -76}
                                                or
                                                        Boolean "Feature-496" {Price 359, Fun 6}
                        Boolean "Feature-13"
                                alternative
                                        String "Feature-23" cardinality [1..5] {Price 156}
                                                [0..6]
                                                        Boolean "Feature-38" cardinality [1..5]
                                                                or
                                                                        Integer "Feature-56" {Price 811}
                                                                                optional
                                                                                        Boolean "Feature-68" cardinality [1..5] {Price 444, Fun 91}
                                                                                        Integer "Feature-238" {Price 37}
                                                                                        Boolean "Feature-384" {Price 391, Fun -39}
                                                                        Boolean "Feature-64" {Price 644}
                                                                                optional
                                                                                        Boolean "Feature-221"
                                                                                        Boolean "Feature-281" {Price 511, Fun 35}
                                                                                        Boolean "Feature-476" cardinality [1..5]
                                                                        Boolean "Feature-98" {Price 886}
                                                                                optional
                                                                                        Boolean "Feature-112" cardinality [1..5] {Price 775}
                                                                                        String "Feature-119" cardinality [1..5] {Fun -10}
                                                                                        Integer "Feature-135" cardinality [1..5] {Price 554}
                                                                                        String "Feature-163" {Price 141}
                                                                        Boolean "Feature-473" cardinality [1..5] {Price 260}
                                                                        Boolean "Feature-498" cardinality [1..5]
                                                                                mandatory
                                                                                        Boolean "Feature-533"
                                                        Boolean "Feature-49" {Price 998}
                                                                alternative
                                                                        Real "Feature-170" {Price 207}
                                                        Boolean "Feature-132"
                                                                alternative
                                                                        Boolean "Feature-149" {Price 841}
                                                        Real "Feature-282" {Fun 11}
                                                                [3..3]
                                                                        Boolean "Feature-468" cardinality [1..5] {Price 783}
                                                                        Boolean "Feature-526"
                                                                        Boolean "Feature-532" {Price 971}
                                                        Boolean "Feature-346" {Fun 53}
                                                        Boolean "Feature-358"
                                                                or
                                                                        Integer "Feature-362"
                                                                                [0..1]
                                                                                        String "Feature-506" {Price 760}
                                                        Boolean "Feature-429"
                                                                or
                                                                        Boolean "Feature-514" {Price 383}
                                        Boolean "Feature-27"
                                                alternative
                                                        Boolean "Feature-82" {Price 65}
                                                                alternative
                                                                        Boolean "Feature-159" {Price 318}
                                                        Boolean "Feature-488" cardinality [1..5] {Price 120}
                                                                or
                                                                        Boolean "Feature-512" {Price 388}
                                        Boolean "Feature-46" {Price 938}
                                                or
                                                        Boolean "Feature-162"
                                                                or
                                                                        Integer "Feature-515" cardinality [1..5] {Price 13}
                                                        Boolean "Feature-285"
                                                                mandatory
                                                                        Boolean "Feature-508"
                                        Integer "Feature-48" {Price 426}
                                                mandatory
                                                        Boolean "Feature-145" {Price 483}
                                                                or
                                                                        Boolean "Feature-264"
                                                                                or
                                                                                        Boolean "Feature-331"
                                                        Boolean "Feature-168" cardinality [1..5] {Price 157, Fun -47}
                                                                [0..1]
                                                                        Integer "Feature-466"
                                                        Boolean "Feature-175" {Price 961}
                                                                or
                                                                        Integer "Feature-267" cardinality [1..5] {Price 703}
                                                                                optional
                                                                                        String "Feature-275" {Price 684}
                                                                                        Boolean "Feature-306"
                                                                                        Boolean "Feature-399"
                                                        Boolean "Feature-187" {Price 800, Fun -27}
                                                                or
                                                                        Boolean "Feature-190"
                                                                                mandatory
                                                                                        Boolean "Feature-315" {Price 144}
                                                                                        Boolean "Feature-421"
                                                                                        Boolean "Feature-456" {Price 350}
                                                                                        Boolean "Feature-474"
                                                                        Boolean "Feature-222"
                                                                                optional
                                                                                        String "Feature-427"
                                                                        Boolean "Feature-288" {Price 67}
                                                                                [1..1]
                                                                                        Boolean "Feature-308" {Fun -29}
                                                                                        Boolean "Feature-398" {Price 534}
                                                                        Boolean "Feature-303" cardinality [1..5] {Price 690, Fun -83}
                                                                        Boolean "Feature-440"
                                                        Integer "Feature-251"
                                                        Boolean "Feature-489" {Fun -65}
                                                        Boolean "Feature-541" {Price 331}
                                        Integer "Feature-513" {Price 807}
                                        Boolean "Feature-524" {Price 262}
                        Boolean "Feature-20" {Price 474}
                                [2..2]
                                        Boolean "Feature-31" {Price 115}
                                                alternative
                                                        Boolean "Feature-116"
                                                                optional
                                                                        Boolean "Feature-125" cardinality [1..5]
                                                                                alternative
                                                                                        Boolean "Feature-165"
                                                                                        Boolean "Feature-188"
                                                                                        Boolean "Feature-290" {Price 492}
                                                                                        Boolean "Feature-361"
                                                                                        String "Feature-377" {Price 993}
                                                                                        Real "Feature-450"
                                                                        Boolean "Feature-249" {Price 591}
                                                                                alternative
                                                                                        Real "Feature-262"
                                                                                        Boolean "Feature-307" {Price 371, Fun -99}
                                                                                        Boolean "Feature-407" {Price 914}
                                                                                        Boolean "Feature-519"
                                                        Boolean "Feature-147" {Price 157}
                                                                alternative
                                                                        Boolean "Feature-405"
                                                                                alternative
                                                                                        Boolean "Feature-417"
                                                                                        Boolean "Feature-539" {Price 272}
                                        Boolean "Feature-117"
                                                [0..3]
                                                        Boolean "Feature-366" {Price 441}
                                                        Integer "Feature-367"
                                                                alternative
                                                                        Boolean "Feature-509" cardinality [1..5] {Price 366}
                                                        Boolean "Feature-401" {Price 290, Fun 89}
                                                                optional
                                                                        Boolean "Feature-428" cardinality [1..5] {Price 143}
                                                                                alternative
                                                                                        Integer "Feature-548" cardinality [1..5] {Price 805}
                                        Boolean "Feature-130" {Price 467, Fun 5}
                                                or
                                                        Boolean "Feature-182" {Price 37, Fun -60}
                                                                optional
                                                                        Integer "Feature-344" cardinality [1..5] {Price 712, Fun -22}
                                                                                or
                                                                                        Boolean "Feature-549" cardinality [1..5] {Fun 89}
                                                                        Real "Feature-443" cardinality [1..5]
                                                                                or
                                                                                        Boolean "Feature-446" {Price 832}
                                                                        Integer "Feature-501" {Price 648}
                                                        Boolean "Feature-184" {Price 882}
                                                                [0..2]
                                                                        Integer "Feature-200" cardinality [1..5]
                                                                                mandatory
                                                                                        Real "Feature-218"
                                                                                        Boolean "Feature-343" {Price 697}
                                                                        Boolean "Feature-224"
                                                                        Boolean "Feature-356"
                                                        Boolean "Feature-259"
                                                                [1..1]
                                                                        Boolean "Feature-311" {Price 976}
                                                                                optional
                                                                                        Boolean "Feature-442" cardinality [1..5] {Price 326}
                                                                        Boolean "Feature-319" {Price 284}
                                                                                or
                                                                                        Boolean "Feature-329"
                                                                        Boolean "Feature-402"
                                                                                optional
                                                                                        Boolean "Feature-420" {Fun 2}
                                                        Boolean "Feature-354"
                                                                mandatory
                                                                        Real "Feature-395"
                                        Integer "Feature-504"
                        Boolean "Feature-28" {Price 77}
                                [0..3]
                                        Boolean "Feature-29" cardinality [1..5] {Price 856}
                                                mandatory
                                                        Integer "Feature-32" {Price 237, Fun -94}
                                                                [1..2]
                                                                        Boolean "Feature-70" {Price 484}
                                                                                or
                                                                                        Boolean "Feature-89"
                                                                                        Integer "Feature-217"
                                                                                        Boolean "Feature-246"
                                                                        Integer "Feature-211" {Price 755}
                                                        String "Feature-176" cardinality [1..5]
                                                                optional
                                                                        Boolean "Feature-191"
                                                                                or
                                                                                        Boolean "Feature-372" cardinality [1..5] {Price 63}
                                                                                        Boolean "Feature-392"
                                                                                        Boolean "Feature-522"
                                                                                        Boolean "Feature-547"
                                                        Boolean "Feature-273" cardinality [1..5] {Price 526}
                                                                mandatory
                                                                        Boolean "Feature-378"
                                                                                mandatory
                                                                                        Boolean "Feature-436" {Price 333}
                                                                        Boolean "Feature-482" {Price 944}
                                                        Boolean "Feature-480" cardinality [1..5] {Price 55}
                                        Integer "Feature-35" {Price 928}
                                                alternative
                                                        Boolean "Feature-51"
                                                                mandatory
                                                                        Boolean "Feature-55" {Price 658}
                                                                                [1..1]
                                                                                        Boolean "Feature-279" {Fun -83}
                                                                                        Integer "Feature-286" cardinality [1..5]
                                                                        Integer "Feature-103" {Price 980}
                                                                                or
                                                                                        Real "Feature-247" {Price 184}
                                                                                        Boolean "Feature-338"
                                                                                        Boolean "Feature-484" {Price 982}
                                                                        Boolean "Feature-283" cardinality [1..5]
                                                                                [0..1]
                                                                                        Boolean "Feature-298" {Price 368}
                                                        Boolean "Feature-59" {Fun -35}
                                                                alternative
                                                                        Boolean "Feature-199" cardinality [1..5]
                                                                                optional
                                                                                        Boolean "Feature-316" {Price 60}
                                                                                        Boolean "Feature-345" cardinality [1..5] {Price 705}
                                                                                        Integer "Feature-349" cardinality [1..5] {Price 362}
                                                                                        Boolean "Feature-388" cardinality [1..5]
                                                                        Boolean "Feature-419" {Price 467}
                                                                                alternative
                                                                                        Boolean "Feature-465"
                                                        Boolean "Feature-93"
                                                                mandatory
                                                                        Boolean "Feature-148" {Price 14, Fun -54}
                                                                                optional
                                                                                        Integer "Feature-179" {Price 110, Fun -69}
                                                                                        String "Feature-201"
                                                                                        Boolean "Feature-317" {Price 54}
                                                                                        Integer "Feature-339"
                                                                        Boolean "Feature-363" {Fun -46}
                                                                                or
                                                                                        Boolean "Feature-394" {Price 67}
                                                                                        Boolean "Feature-404" {Price 845}
                                                                                        Boolean "Feature-425" {Price 590}
                                                        String "Feature-95" {Price 463}
                                                                alternative
                                                                        String "Feature-96" cardinality [1..5] {Fun -83}
                                                                                alternative
                                                                                        Boolean "Feature-196" {Fun 60}
                                                                                        Boolean "Feature-278" cardinality [1..5] {Price 796}
                                                                                        Boolean "Feature-430" {Price 446}
                                                                                        Integer "Feature-511"
                                                                        Boolean "Feature-141" {Price 256}
                                                                                alternative
                                                                                        Boolean "Feature-272" cardinality [1..5] {Price 938}
                                                                        Real "Feature-156" {Price 994}
                                                                                alternative
                                                                                        Boolean "Feature-212" {Price 832}
                                                                        Boolean "Feature-293" {Price 288, Fun -22}
                                                                                [1..1]
                                                                                        Boolean "Feature-383" {Price 903}
                                                        Integer "Feature-248" cardinality [1..5] {Fun 77}
                                                                [2..3]
                                                                        Boolean "Feature-287"
                                                                        Boolean "Feature-454"
                                                                                [1..1]
                                                                                        Integer "Feature-535" cardinality [1..5] {Price 516}
                                                                        Boolean "Feature-543" {Price 45}
                                                        Integer "Feature-396" {Price 904}
                                        Boolean "Feature-84" {Price 43, Fun 68}
                                                [1..2]
                                                        Boolean "Feature-91" {Price 718}
                                                        Boolean "Feature-114" {Price 695}
                                                                optional
                                                                        Integer "Feature-497"
                                                        Boolean "Feature-167"
                                                                mandatory
                                                                        Boolean "Feature-312" {Price 843, Fun -11}
                                                        Boolean "Feature-173" cardinality [1..5] {Price 620}
                                                                alternative
                                                                        Boolean "Feature-333"
                                                                        Real "Feature-422"
                                                        Integer "Feature-297"
                                                                alternative
                                                                        String "Feature-335" {Price 457}
                                                        Boolean "Feature-528"
                                        Integer "Feature-110" {Price 562}
                                                alternative
                                                        Boolean "Feature-155" {Price 899}
                                                                alternative
                                                                        Boolean "Feature-209" {Fun -60}
                                                                                [0..2]
                                                                                        Boolean "Feature-271" {Price 408}
                                                                                        Boolean "Feature-458" {Price 164}
                                                        Boolean "Feature-206"
                                                                mandatory
                                                                        Real "Feature-236"
                                                                                alternative
                                                                                        Boolean "Feature-295" {Price 129}
                                                        Boolean "Feature-457" {Price 941}
                                                        Boolean "Feature-475"
                                        Boolean "Feature-120"
                                                [1..1]
                                                        Boolean "Feature-154" {Price 162}
                                                                optional
                                                                        Boolean "Feature-318" {Price 878}
                                                                                [1..1]
                                                                                        Boolean "Feature-340"
                                                                                        Boolean "Feature-439"
                                                                        Boolean "Feature-376" {Price 331}
                                                                        Boolean "Feature-531" {Price 607}
                                                                        Boolean "Feature-542" cardinality [1..5]
                                                        Boolean "Feature-400" {Price 843}
                                                        String "Feature-545"
                        Boolean "Feature-30"
                                or
                                        Real "Feature-43"
                                                optional
                                                        Boolean "Feature-66" {Price 31, Fun -99}
                                                                or
                                                                        Boolean "Feature-126" {Price 256}
                                                                                [0..2]
                                                                                        Boolean "Feature-164" {Price 488}
                                                                                        Boolean "Feature-485" {Price 610, Fun 69}
                                                                                        Integer "Feature-530" {Price 488, Fun -67}
                                                        String "Feature-336"
                                                                mandatory
                                                                        Boolean "Feature-433"
                                                        Integer "Feature-411" cardinality [1..5]
                                                        Integer "Feature-432"
                                        Integer "Feature-90" {Price 995}
                                                mandatory
                                                        Boolean "Feature-92"
                                                                alternative
                                                                        Boolean "Feature-276"
                                                                                mandatory
                                                                                        Boolean "Feature-449"
                                                                        Boolean "Feature-313"
                                                                                mandatory
                                                                                        Boolean "Feature-350" {Price 229, Fun 74}
                                                                        Boolean "Feature-324" {Price 623}
                                                                                or
                                                                                        Integer "Feature-389" {Price 795}
                                                                                        Boolean "Feature-510" {Price 993}
                                                        Integer "Feature-328" {Price 24, Fun 23}
                                        Integer "Feature-142"
                                                optional
                                                        Boolean "Feature-186" {Fun 2}
                                                        Boolean "Feature-314" cardinality [1..5] {Price 296}
                                                        Boolean "Feature-413" {Price 607}
                                        Boolean "Feature-160" {Price 561}
                                                [2..2]
                                                        Boolean "Feature-228"
                                                                alternative
                                                                        Boolean "Feature-269" cardinality [1..5] {Price 856}
                                                                                alternative
                                                                                        Boolean "Feature-382" {Price 718}
                                                                        Integer "Feature-406" cardinality [1..5] {Price 743}
                                                                        Boolean "Feature-491" {Price 970}
                                                                                mandatory
                                                                                        Boolean "Feature-494"
                                                                                        String "Feature-520"
                                                        Boolean "Feature-258" {Price 205}
                                                                or
                                                                        Integer "Feature-342" {Price 623}
                                                        Boolean "Feature-277" {Price 902}
                                                                [1..4]
                                                                        Boolean "Feature-302" {Price 554}
                                                                        Boolean "Feature-355" cardinality [1..5]
                                                                        Boolean "Feature-438"
                                                                                optional
                                                                                        Boolean "Feature-546" {Price 43}
                                                                        Boolean "Feature-471" {Price 299}
                                        Boolean "Feature-341" {Price 128, Fun 19}
                        Integer "Feature-41" {Price 229}
                                mandatory
                                        Boolean "Feature-106"
                                                mandatory
                                                        Boolean "Feature-113" {Price 952}
                                                                [2..3]
                                                                        Integer "Feature-320"
                                                                                [2..2]
                                                                                        Boolean "Feature-374" {Price 261}
                                                                                        Boolean "Feature-397"
                                                                        Boolean "Feature-368" {Price 44}
                                                                                mandatory
                                                                                        Integer "Feature-500"
                                                                        Boolean "Feature-373" {Fun 93}
                                                        Boolean "Feature-144"
                                                                or
                                                                        Real "Feature-204" cardinality [1..5]
                                                                                alternative
                                                                                        Boolean "Feature-296" {Fun -23}
                                                                                        Integer "Feature-369"
                                                                        Boolean "Feature-208" cardinality [1..5] {Price 583}
                                                                                mandatory
                                                                                        Boolean "Feature-220"
                                                                        Boolean "Feature-301"
                                                                                alternative
                                                                                        Boolean "Feature-521"
                                                        Boolean "Feature-150" cardinality [1..5] {Fun -97}
                                                                mandatory
                                                                        Boolean "Feature-181" {Price 358}
                                                                                or
                                                                                        Boolean "Feature-205"
                                                                                        Boolean "Feature-261"
                                                                                        Integer "Feature-309" cardinality [1..5] {Price 566}
                                                                        Integer "Feature-198"
                                                                                or
                                                                                        Boolean "Feature-268" {Price 817}
                                                                                        Boolean "Feature-326" {Fun -94}
                                                                                        String "Feature-418" {Fun -14}
                                                                        Boolean "Feature-299" {Price 365}
                                                                                [1..2]
                                                                                        Integer "Feature-375" {Price 638}
                                                                                        Boolean "Feature-536"
                                        Integer "Feature-108"
                                                [1..1]
                                                        Boolean "Feature-134" {Price 123}
                                                                alternative
                                                                        Boolean "Feature-153"
                                                                        Integer "Feature-495" cardinality [1..5]
                                        Integer "Feature-124"
                                                or
                                                        Boolean "Feature-129"
                                                                or
                                                                        Boolean "Feature-139" cardinality [1..5] {Price 602}
                                                                        String "Feature-227" cardinality [1..5] {Price 957}
                                                                        Boolean "Feature-231"
                                                                                alternative
                                                                                        Boolean "Feature-353"
                                                                        Boolean "Feature-304" cardinality [1..5]
                                                        Boolean "Feature-178" {Price 350, Fun 40}
                                                                [2..2]
                                                                        Boolean "Feature-380"
                                                                                optional
                                                                                        Boolean "Feature-483" {Price 650}
                                                                        Boolean "Feature-477"
                                                                                mandatory
                                                                                        Boolean "Feature-544"
                                                                        Integer "Feature-481" {Price 58}
                                                        Boolean "Feature-185" {Fun -18}
                                                        Boolean "Feature-223" cardinality [1..5] {Price 658}
                                                                or
                                                                        Boolean "Feature-300" cardinality [1..5] {Price 923, Fun 92}
                                                                        Integer "Feature-464" {Price 754}
                                                        Boolean "Feature-265"
                                                        Boolean "Feature-305" {Price 245}
                                                                alternative
                                                                        Integer "Feature-487" cardinality [1..5] {Price 404}
                                                                        Boolean "Feature-493" {Price 263}
                                        Boolean "Feature-253" {Fun 84}
                                                or
                                                        Real "Feature-256" {Price 145}
                                                                alternative
                                                                        Boolean "Feature-274" cardinality [1..5]
                                                        Integer "Feature-330" {Price 685}

constraints
        "Feature-51" => "Feature-269" <=> "Feature-150" & "Feature-30" & "Feature-65" => "Feature-484"
        "Feature-307".Price == "Feature-487".Price - "Feature-307".Price
        "Feature-547" <=> "Feature-259" & "Feature-371" <=> "Feature-141" <=> "Feature-421"
        "Feature-201" == '700585532'
        len("Feature-61") == 678
        "Feature-252" => "Feature-202" & "Feature-319" <=> "Feature-307" | "Feature-101" | "Feature-398" => "Feature-117" <=> "Feature-457" <=> "Feature-229" => "Feature-268"
        "Feature-293" => "Feature-161" & "Feature-488" & "Feature-253" => "Feature-296" | "Feature-26" => "Feature-457" <=> !"Feature-184"
        "Feature-433" & "Feature-549" | "Feature-34" => "Feature-141" | "Feature-491"
        avg(Price) > 2784
        "Feature-130" => "Feature-89" => "Feature-265" & "Feature-94" <=> "Feature-126" | "Feature-187" & "Feature-319" <=> "Feature-483" | "Feature-63" => "Feature-255" | "Feature-84" <=> "Feature-71" | !"Feature-154"
        "Feature-272" <=> "Feature-94" | "Feature-434" | "Feature-505"
        "Feature-29" | "Feature-435" => "Feature-203" => "Feature-265" | "Feature-98" & "Feature-154" & "Feature-505" => "Feature-401" <=> "Feature-420" => "Feature-329" & "Feature-58" <=> "Feature-341" & "Feature-298" => "Feature-225"
        "Feature-61" == '-824622898'
        "Feature-227".Price > "Feature-160".Price / "Feature-530".Price * "Feature-3".Price / "Feature-36".Fun * "Feature-300".Price + "Feature-344".Fun + "Feature-250".Price + "Feature-307".Price / "Feature-227".Price
        len("Feature-119") == 787
        "Feature-354" | "Feature-398" <=> !"Feature-470"
        "Feature-223".Price + "Feature-249".Price + "Feature-84".Fun != "Feature-464".Price
        "Feature-293" => "Feature-447" <=> "Feature-173" | "Feature-215" | "Feature-149" | "Feature-153" => "Feature-42" | "Feature-408" <=> "Feature-292" <=> "Feature-148" => "Feature-186" | !"Feature-307"
        "Feature-64" | "Feature-15" <=> "Feature-431" & "Feature-381" => "Feature-28" & "Feature-490" <=> "Feature-160"
        "Feature-399" => "Feature-144" & "Feature-430" | "Feature-196" | "Feature-173" => "Feature-109" & "Feature-202" & "Feature-33" => "Feature-519" => "Feature-383" => "Feature-98"
        len("Feature-334") == 346
        "Feature-184" <=> "Feature-468" | "Feature-272" <=> "Feature-270" | "Feature-469" <=> "Feature-405" & "Feature-318" & "Feature-131" => "Feature-436" & "Feature-425" <=> "Feature-138" | "Feature-454" <=> !"Feature-371"
        "Feature-73" <=> "Feature-162"
        "Feature-479" => "Feature-428" & !"Feature-379"
        "Feature-36".Fun > "Feature-103".Price + "Feature-155".Price / "Feature-169".Price
        "Feature-327" <=> "Feature-294" & "Feature-25" | "Feature-130" & "Feature-483" & "Feature-268" <=> "Feature-502" <=> "Feature-245" | "Feature-387" & "Feature-29" => "Feature-8" & "Feature-435" => "Feature-298" | !"Feature-231"
        "Feature-185" => "Feature-502" <=> "Feature-258" & "Feature-289" & "Feature-436" <=> "Feature-457" <=> "Feature-196" <=> "Feature-138" <=> "Feature-463" & "Feature-122" & "Feature-51"
        "Feature-192" | "Feature-357" | "Feature-420" | "Feature-419" | "Feature-109"
        "Feature-294".Price < "Feature-308".Fun - "Feature-424".Price - "Feature-346".Fun - "Feature-90".Price
        avg(Fun) > 250
        "Feature-119".Fun * "Feature-145".Price / "Feature-208".Price * "Feature-457".Price > "Feature-183".Price * "Feature-135".Price * "Feature-160".Price
        "Feature-158" <=> "Feature-531" & "Feature-221" <=> "Feature-399" | !"Feature-350"
        "Feature-121".Price * "Feature-534".Price == "Feature-386".Price - "Feature-240".Price / "Feature-212".Price
        "Feature-505".Price + "Feature-514".Price / "Feature-455".Fun * "Feature-26".Price > "Feature-147".Price + "Feature-484".Price
        "Feature-391" => "Feature-357" | "Feature-199" => "Feature-382" & "Feature-488" <=> "Feature-528" | "Feature-469" => "Feature-73" | "Feature-303" => "Feature-153" <=> "Feature-53" => "Feature-353" & !"Feature-122"
        "Feature-26".Price / "Feature-318".Price < "Feature-84".Price
        "Feature-199" => "Feature-87" | "Feature-143" | "Feature-183" | "Feature-51" & !"Feature-192"
        "Feature-520" == '-1357906698'
        "Feature-321" => "Feature-187" => "Feature-479" => "Feature-357" & "Feature-549" & "Feature-393" => "Feature-546" & "Feature-313" <=> !"Feature-300"
        "Feature-186" & "Feature-138" => !"Feature-212"
        "Feature-139" => "Feature-25" => "Feature-147" | "Feature-491" & "Feature-112" <=> "Feature-268" <=> "Feature-402" => "Feature-34" <=> "Feature-187" & "Feature-27" & "Feature-160" <=> "Feature-400" => !"Feature-249"
        "Feature-307" => "Feature-391" <=> "Feature-457" & "Feature-315" => "Feature-13" <=> "Feature-252" & "Feature-438" & !"Feature-268"
        "Feature-147" => "Feature-424" & "Feature-157" | "Feature-306" | "Feature-117" | "Feature-355" => !"Feature-431"
        "Feature-208" <=> "Feature-137" => "Feature-437" | "Feature-101" => "Feature-379" <=> "Feature-306" => "Feature-381"
        "Feature-202" => "Feature-19" & "Feature-164" => "Feature-413" <=> "Feature-91" | "Feature-27" & "Feature-363" | "Feature-296" <=> "Feature-526" | "Feature-264" | "Feature-50" <=> "Feature-484"
        "Feature-222" <=> "Feature-185" & "Feature-469" <=> "Feature-526" & "Feature-485" & "Feature-243" <=> "Feature-428" => "Feature-33" & "Feature-400" & "Feature-540" <=> "Feature-435" <=> "Feature-221" & "Feature-419"
        "Feature-161" | "Feature-67" => "Feature-194" & "Feature-514" | "Feature-258" & "Feature-272" <=> "Feature-274" | "Feature-423" => !"Feature-428"
        "Feature-199" => "Feature-127" | "Feature-331" => "Feature-433" <=> "Feature-149" & "Feature-253" <=> "Feature-189" | "Feature-213" & "Feature-99" & "Feature-252" => !"Feature-314"
        "Feature-484" | "Feature-16" => "Feature-259" | !"Feature-419"
        "Feature-89" <=> "Feature-398" & "Feature-15" => "Feature-333" => !"Feature-290"
        "Feature-173" | "Feature-528" <=> "Feature-374" & "Feature-477" <=> "Feature-42" & "Feature-462" & "Feature-331" => "Feature-333" => "Feature-546" <=> "Feature-131" => "Feature-149" & "Feature-465" <=> "Feature-441"
        "Feature-5" == '771810665'
        "Feature-386".Price > "Feature-145".Price - "Feature-538".Price - "Feature-284".Price - "Feature-485".Fun + "Feature-446".Price + "Feature-81".Price / "Feature-249".Price * "Feature-281".Price / "Feature-401".Fun * "Feature-111".Fun / "Feature-207".Fun
        "Feature-239" => "Feature-537" => "Feature-429" | "Feature-353" | "Feature-265" & "Feature-499" & "Feature-458" => "Feature-116" | "Feature-509" <=> !"Feature-346"
        len("Feature-163") == 523
        "Feature-298".Price / "Feature-149".Price > "Feature-130".Fun / "Feature-509".Price * "Feature-81".Price
        "Feature-441" <=> "Feature-199" | "Feature-447" & "Feature-357" => "Feature-323" | "Feature-424" <=> "Feature-89" & "Feature-72" & !"Feature-4"
        "Feature-436" | "Feature-361" <=> "Feature-430" & "Feature-283" => "Feature-496" => "Feature-431" | "Feature-417" | "Feature-454" & "Feature-148" & "Feature-470" => "Feature-50" => "Feature-296" | "Feature-412"
        "Feature-488" <=> "Feature-117" & "Feature-65" | "Feature-252" => "Feature-42" & "Feature-187" & "Feature-382" => "Feature-428" => "Feature-115" <=> !"Feature-484"
        len("Feature-176") == 984
        "Feature-420" <=> "Feature-64" <=> "Feature-31" | "Feature-483"
        "Feature-224" | "Feature-38" => "Feature-164" & "Feature-149" => "Feature-405" & "Feature-287" <=> "Feature-140" & "Feature-514" => "Feature-59" <=> "Feature-264" | !"Feature-27"
        "Feature-212".Price - "Feature-102".Fun + "Feature-249".Price - "Feature-401".Fun + "Feature-447".Fun * "Feature-373".Fun * "Feature-436".Price - "Feature-315".Price / "Feature-152".Price + "Feature-530".Price / "Feature-135".Price * "Feature-341".Fun != "Feature-311".Price * "Feature-173".Price
        "Feature-463" | "Feature-317" => "Feature-183" | "Feature-311" => "Feature-430" & "Feature-304" & "Feature-58" | "Feature-413" => "Feature-270" & "Feature-260" <=> "Feature-303" | "Feature-27"
        "Feature-491" => "Feature-225" => "Feature-184" | "Feature-212" | "Feature-498" => "Feature-307" | "Feature-295" | "Feature-239" => "Feature-533" => "Feature-185" & "Feature-315" | "Feature-51" <=> "Feature-16" & "Feature-437"
        "Feature-173" | "Feature-70" <=> "Feature-45" => "Feature-190" | "Feature-364" & "Feature-298" => "Feature-111"
        "Feature-22" <=> "Feature-541" & "Feature-414" => "Feature-468" => "Feature-258" => "Feature-202" & "Feature-499" | "Feature-28" => "Feature-114" => "Feature-223" <=> "Feature-37"
        "Feature-129" => "Feature-128" | "Feature-447" | "Feature-444" <=> "Feature-175" | "Feature-118" => "Feature-70" => "Feature-100" <=> !"Feature-546"
        "Feature-307" | "Feature-376" | "Feature-483" & "Feature-494" => "Feature-93" => "Feature-295" => "Feature-148" & "Feature-232" & "Feature-253" & "Feature-100" => "Feature-300" <=> "Feature-421"
        "Feature-199" <=> "Feature-63" & "Feature-0" | "Feature-130" | "Feature-531" => "Feature-374" <=> "Feature-139" | "Feature-540"
        "Feature-460" => "Feature-353" <=> "Feature-173" => "Feature-467"
        "Feature-184" | "Feature-317" => "Feature-366" <=> "Feature-89" | "Feature-434" => "Feature-522" | "Feature-327" & "Feature-118" & "Feature-4" & "Feature-490" <=> "Feature-485" & "Feature-147" & "Feature-126" | "Feature-314"
        "Feature-45" <=> "Feature-525" <=> "Feature-185" | "Feature-355" | "Feature-428" => "Feature-435"
        "Feature-85" <=> "Feature-194" & "Feature-202" => "Feature-167"
        "Feature-85" => "Feature-401" <=> "Feature-37" & "Feature-303" <=> "Feature-460" => "Feature-73" | "Feature-358"

`,
      extensions: [
          basicSetup,
          autocompleteExtension,
          UVLLanguageSupport,
          customLinter,
          lintGutter(),
          keymap.of([defaultKeymap,indentWithTab]),
          indentUnit.of("    ")
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
