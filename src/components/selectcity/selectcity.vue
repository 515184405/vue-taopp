<template>
<div class="left">
    <img class="left logo" src="./img/logo.png" alt="">
    <div class="left movie-localtion overflow-text" @click='showSelect()'>
      {{localtion}}
    </div>
     <transition name='move'>
     <div class="selectCity" v-show='isSelect'>
	<!--显示点击的是哪一个字母-->
<div ref='showKey' id="showKey" class="showLetter"><span ref='showLetter' id="showLetter">A</span></div>
<!--城市索引查询-->
<div class="letter">
    <ul>
      <li><a @click='selectKey($event)' href="#A">A</a></li>
      <li><a @click='selectKey($event)' href="#B">B</a></li>
      <li><a @click='selectKey($event)' href="#C">C</a></li>
      <li><a @click='selectKey($event)' href="#D">D</a></li>
      <li><a @click='selectKey($event)' href="#E">E</a></li>
      <li><a @click='selectKey($event)' href="#F">F</a></li>
      <li><a @click='selectKey($event)' href="#G">G</a></li>
      <li><a @click='selectKey($event)' href="#H">H</a></li>
      <li><a @click='selectKey($event)' href="#J">J</a></li>
      <li><a @click='selectKey($event)' href="#K">K</a></li>
      <li><a @click='selectKey($event)' href="#L">L</a></li>
      <li><a @click='selectKey($event)' href="#M">M</a></li>
      <li><a @click='selectKey($event)' href="#N">N</a></li>
      <li><a @click='selectKey($event)' href="#P">P</a></li>
      <li><a @click='selectKey($event)' href="#Q">Q</a></li>
      <li><a @click='selectKey($event)' href="#R">R</a></li>
      <li><a @click='selectKey($event)' href="#S">S</a></li>
      <li><a @click='selectKey($event)' href="#T">T</a></li>
      <li><a @click='selectKey($event)' href="#W">W</a></li>
      <li><a @click='selectKey($event)' href="#X">X</a></li>
      <li><a @click='selectKey($event)' href="#Y">Y</a></li>
      <li><a @click='selectKey($event)' href="#Z">Z</a></li>
    </ul>
  </div>
<!--城市列表-->
<div class="container">
  <div class="city">
    <div class="city-list"><span class="city-letter" id="A">A</span>
      <p @click='selectEvent($event)' data-id="210300">鞍山市</p>
      <p @click='selectEvent($event)' data-id="152900">阿拉善盟</p>
      <p @click='selectEvent($event)' data-id="340800">安庆市</p>
      <p @click='selectEvent($event)' data-id="410500">安阳市</p>
      <p @click='selectEvent($event)' data-id="542500">阿里地区</p>
      <p @click='selectEvent($event)' data-id="610900">安康市</p>
      <p @click='selectEvent($event)' data-id="520400">安顺市</p>
      <p @click='selectEvent($event)' data-id="513200">阿坝藏族羌族自治州</p>
      <p @click='selectEvent($event)' data-id="659002">阿拉尔市</p>
      <p @click='selectEvent($event)' data-id="652900">阿克苏地区</p>
      <p @click='selectEvent($event)' data-id="820100">澳门特别行政区</p>
      <p @click='selectEvent($event)' data-id="654300">阿勒泰地区</p>
    </div>
    <div class="city-list"><span class="city-letter" id="B">B</span>
      <p @click='selectEvent($event)' data-id="220800">白城市</p>
      <p @click='selectEvent($event)' data-id="150200">包头市</p>
      <p @click='selectEvent($event)' data-id="150800">巴彦淖尔市</p>
      <p @click='selectEvent($event)' data-id="130600">保定市</p>
      <p @click='selectEvent($event)' data-id="210500">本溪市</p>
      <p @click='selectEvent($event)' data-id="220600">白山市</p>
      <p @click='selectEvent($event)' data-id="341600">亳州市</p>
      <p @click='selectEvent($event)' data-id="340300">蚌埠市</p>
      <p @click='selectEvent($event)' data-id="371600">滨州市</p>
      <p @click='selectEvent($event)' data-id="620400">白银市</p>
      <p @click='selectEvent($event)' data-id="610300">宝鸡市</p>
      <p @click='selectEvent($event)' data-id="530500">保山市</p>
      <p @click='selectEvent($event)' data-id="469030">白沙黎族自治县</p>
      <p @click='selectEvent($event)' data-id="451000">百色市</p>
      <p @click='selectEvent($event)' data-id="522401">毕节市</p>
      <p @click='selectEvent($event)' data-id="450500">北海市</p>
      <p @click='selectEvent($event)' data-id="511900">巴中市</p>
      <p @click='selectEvent($event)' data-id="469035">保亭黎族苗族自治县</p>
      <p @click='selectEvent($event)' data-id="652800">巴音郭楞蒙古自治州</p>
      <p @click='selectEvent($event)' data-id="652700">博尔塔拉蒙古自治州</p>
      <p @click='selectEvent($event)' data-id="110100">北京市</p>
    </div>
    <div class="city-list"><span class="city-letter" id="C">C</span>
      <p @click='selectEvent($event)' data-id="140400">长治市</p>
      <p @click='selectEvent($event)' data-id="130900">沧州市</p>
      <p @click='selectEvent($event)' data-id="320400">常州市</p>
      <p @click='selectEvent($event)' data-id="330282">慈溪市</p>
      <p @click='selectEvent($event)' data-id="320581">常熟市</p>
      <p @click='selectEvent($event)' data-id="130800">承德市</p>
      <p @click='selectEvent($event)' data-id="150400">赤峰市</p>
      <p @click='selectEvent($event)' data-id="220100">长春市</p>
      <p @click='selectEvent($event)' data-id="431000">郴州市</p>
      <p @click='selectEvent($event)' data-id="430100">长沙市</p>
      <p @click='selectEvent($event)' data-id="341100">滁州市</p>
      <p @click='selectEvent($event)' data-id="430700">常德市</p>
      <p @click='selectEvent($event)' data-id="341400">巢湖市</p>
      <p @click='selectEvent($event)' data-id="341700">池州市</p>
      <p @click='selectEvent($event)' data-id="469027">澄迈县</p>
      <p @click='selectEvent($event)' data-id="451400">崇左市</p>
      <p @click='selectEvent($event)' data-id="469031">昌江黎族自治县</p>
      <p @click='selectEvent($event)' data-id="532300">楚雄彝族自治州</p>
      <p @click='selectEvent($event)' data-id="445100">潮州市</p>
      <p @click='selectEvent($event)' data-id="500100">重庆市</p>
      <p @click='selectEvent($event)' data-id="510100">成都市</p>
      <p @click='selectEvent($event)' data-id="542100">昌都地区</p>
      <p @click='selectEvent($event)' data-id="652300">昌吉回族自治州</p>
    </div>
    <div class="city-list"><span class="city-letter" id="D">D</span>
      <p @click='selectEvent($event)' data-id="232700">大兴安岭地区</p>
      <p @click='selectEvent($event)' data-id="140200">大同市</p>
      <p @click='selectEvent($event)' data-id="230600">大庆市</p>
      <p @click='selectEvent($event)' data-id="321181">丹阳市</p>
      <p @click='selectEvent($event)' data-id="210200">大连市</p>
      <p @click='selectEvent($event)' data-id="210600">丹东市</p>
      <p @click='selectEvent($event)' data-id="370500">东营市</p>
      <p @click='selectEvent($event)' data-id="371400">德州市</p>
      <p @click='selectEvent($event)' data-id="511700">达州市</p>
      <p @click='selectEvent($event)' data-id="532900">大理白族自治州</p>
      <p @click='selectEvent($event)' data-id="469003">儋州市</p>
      <p @click='selectEvent($event)' data-id="469025">定安县</p>
      <p @click='selectEvent($event)' data-id="533400">迪庆藏族自治州</p>
      <p @click='selectEvent($event)' data-id="510600">德阳市</p>
      <p @click='selectEvent($event)' data-id="469007">东方市</p>
      <p @click='selectEvent($event)' data-id="533100">德宏傣族景颇族自治州</p>
      <p @click='selectEvent($event)' data-id="441900">东莞市</p>
      <p @click='selectEvent($event)' data-id="621100">定西市</p>
    </div>
    <div class="city-list"><span class="city-letter" id="E">E</span>
      <p @click='selectEvent($event)' data-id="150600">鄂尔多斯市</p>
      <p @click='selectEvent($event)' data-id="420700">鄂州市</p>
      <p @click='selectEvent($event)' data-id="422800">恩施土家族苗族自治州</p>
    </div>
    <div class="city-list"><span class="city-letter" id="F">F</span>
      <p @click='selectEvent($event)' data-id="210900">阜新市</p>
      <p @click='selectEvent($event)' data-id="210400">抚顺市</p>
      <p @click='selectEvent($event)' data-id="350181">福清市</p>
      <p @click='selectEvent($event)' data-id="341200">阜阳市</p>
      <p @click='selectEvent($event)' data-id="370983">肥城市</p>
      <p @click='selectEvent($event)' data-id="361000">抚州市</p>
      <p @click='selectEvent($event)' data-id="350100">福州市</p>
      <p @click='selectEvent($event)' data-id="440600">佛山市</p>
      <p @click='selectEvent($event)' data-id="450600">防城港市</p>
    </div>
    <div class="city-list"><span class="city-letter" id="G">G</span>
      <p @click='selectEvent($event)' data-id="440100">广州市</p>
      <p @click='selectEvent($event)' data-id="360700">赣州市</p>
      <p @click='selectEvent($event)' data-id="510800">广元市</p>
      <p @click='selectEvent($event)' data-id="511600">广安市</p>
      <p @click='selectEvent($event)' data-id="450300">桂林市</p>
      <p @click='selectEvent($event)' data-id="450800">贵港市</p>
      <p @click='selectEvent($event)' data-id="520100">贵阳市</p>
      <p @click='selectEvent($event)' data-id="513300">甘孜藏族自治州</p>
      <p @click='selectEvent($event)' data-id="623000">甘南藏族自治州</p>
      <p @click='selectEvent($event)' data-id="640400">固原市</p>
      <p @click='selectEvent($event)' data-id="632600">果洛藏族自治州</p>
    </div>
    <div class="city-list"><span class="city-letter" id="H">H</span>
      <p @click='selectEvent($event)' data-id="231100">黑河市</p>
      <p @click='selectEvent($event)' data-id="211400">葫芦岛市</p>
      <p @click='selectEvent($event)' data-id="330481">海宁市</p>
      <p @click='selectEvent($event)' data-id="320800">淮安市</p>
      <p @click='selectEvent($event)' data-id="131100">衡水市</p>
      <p @click='selectEvent($event)' data-id="150100">呼和浩特市</p>
      <p @click='selectEvent($event)' data-id="330500">湖州市</p>
      <p @click='selectEvent($event)' data-id="230400">鹤岗市</p>
      <p @click='selectEvent($event)' data-id="150700">呼伦贝尔市</p>
      <p @click='selectEvent($event)' data-id="230100">哈尔滨市</p>
      <p @click='selectEvent($event)' data-id="130400">邯郸市</p>
      <p @click='selectEvent($event)' data-id="330100">杭州市</p>
      <p @click='selectEvent($event)' data-id="410600">鹤壁市</p>
      <p @click='selectEvent($event)' data-id="371700">菏泽市</p>
      <p @click='selectEvent($event)' data-id="420200">黄石市</p>
      <p @click='selectEvent($event)' data-id="431200">怀化市</p>
      <p @click='selectEvent($event)' data-id="340600">淮北市</p>
      <p @click='selectEvent($event)' data-id="421100">黄冈市</p>
      <p @click='selectEvent($event)' data-id="430400">衡阳市</p>
      <p @click='selectEvent($event)' data-id="340100">合肥市</p>
      <p @click='selectEvent($event)' data-id="340400">淮南市</p>
      <p @click='selectEvent($event)' data-id="341000">黄山市</p>
      <p @click='selectEvent($event)' data-id="451200">河池市</p>
      <p @click='selectEvent($event)' data-id="460100">海口市</p>
      <p @click='selectEvent($event)' data-id="441600">河源市</p>
      <p @click='selectEvent($event)' data-id="532500">红河哈尼族彝族自治州</p>
      <p @click='selectEvent($event)' data-id="441300">惠州市</p>
      <p @click='selectEvent($event)' data-id="610700">汉中市</p>
      <p @click='selectEvent($event)' data-id="451100">贺州市</p>
      <p @click='selectEvent($event)' data-id="632800">海西蒙古族藏族自治州</p>
      <p @click='selectEvent($event)' data-id="632100">海东市</p>
      <p @click='selectEvent($event)' data-id="632300">黄南藏族自治州</p>
      <p @click='selectEvent($event)' data-id="652200">哈密地区</p>
      <p @click='selectEvent($event)' data-id="632200">海北藏族自治州</p>
      <p @click='selectEvent($event)' data-id="653200">和田地区</p>
      <p @click='selectEvent($event)' data-id="632500">海南藏族自治州</p>
    </div>
    <div class="city-list"><span class="city-letter" id="J">J</span>
      <p @click='selectEvent($event)' data-id="210700">锦州市</p>
      <p @click='selectEvent($event)' data-id="330700">金华市</p>
      <p @click='selectEvent($event)' data-id="140700">晋中市</p>
      <p @click='selectEvent($event)' data-id="320281">江阴市</p>
      <p @click='selectEvent($event)' data-id="220200">吉林市</p>
      <p @click='selectEvent($event)' data-id="230800">佳木斯市</p>
      <p @click='selectEvent($event)' data-id="230300">鸡西市</p>
      <p @click='selectEvent($event)' data-id="330400">嘉兴市</p>
      <p @click='selectEvent($event)' data-id="140500">晋城市</p>
      <p @click='selectEvent($event)' data-id="350582">晋江市</p>
      <p @click='selectEvent($event)' data-id="370282">即墨市</p>
      <p @click='selectEvent($event)' data-id="360800">吉安市</p>
      <p @click='selectEvent($event)' data-id="370100">济南市</p>
      <p @click='selectEvent($event)' data-id="420800">荆门市</p>
      <p @click='selectEvent($event)' data-id="410800">焦作市</p>
      <p @click='selectEvent($event)' data-id="370800">济宁市</p>
      <p @click='selectEvent($event)' data-id="410881">济源市</p>
      <p @click='selectEvent($event)' data-id="421000">荆州市</p>
      <p @click='selectEvent($event)' data-id="360400">九江市</p>
      <p @click='selectEvent($event)' data-id="360200">景德镇市</p>
      <p @click='selectEvent($event)' data-id="445200">揭阳市</p>
      <p @click='selectEvent($event)' data-id="620300">金昌市</p>
      <p @click='selectEvent($event)' data-id="440700">江门市</p>
      <p @click='selectEvent($event)' data-id="620200">嘉峪关市</p>
      <p @click='selectEvent($event)' data-id="620900">酒泉市</p>
    </div>
    <div class="city-list"><span class="city-letter" id="K">K</span>
      <p @click='selectEvent($event)' data-id="320583">昆山市</p>
      <p @click='selectEvent($event)' data-id="410200">开封市</p>
      <p @click='selectEvent($event)' data-id="530100">昆明市</p>
      <p @click='selectEvent($event)' data-id="650200">克拉玛依市</p>
      <p @click='selectEvent($event)' data-id="653000">克孜勒苏柯尔克孜自治州</p>
      <p @click='selectEvent($event)' data-id="653100">喀什地区</p>
    </div>
    <div class="city-list"><span class="city-letter" id="L">L</span>
      <p @click='selectEvent($event)' data-id="141000">临汾市</p>
      <p @click='selectEvent($event)' data-id="131000">廊坊市</p>
      <p @click='selectEvent($event)' data-id="211000">辽阳市</p>
      <p @click='selectEvent($event)' data-id="220400">辽源市</p>
      <p @click='selectEvent($event)' data-id="141100">吕梁市</p>
      <p @click='selectEvent($event)' data-id="320700">连云港市</p>
      <p @click='selectEvent($event)' data-id="371200">莱芜市</p>
      <p @click='selectEvent($event)' data-id="411100">漯河市</p>
      <p @click='selectEvent($event)' data-id="331100">丽水市</p>
      <p @click='selectEvent($event)' data-id="341500">六安市</p>
      <p @click='selectEvent($event)' data-id="431300">娄底市</p>
      <p @click='selectEvent($event)' data-id="350800">龙岩市</p>
      <p @click='selectEvent($event)' data-id="370681">龙口市</p>
      <p @click='selectEvent($event)' data-id="371300">临沂市</p>
      <p @click='selectEvent($event)' data-id="410300">洛阳市</p>
      <p @click='selectEvent($event)' data-id="371500">聊城市</p>
      <p @click='selectEvent($event)' data-id="530700">丽江市</p>
      <p @click='selectEvent($event)' data-id="451300">来宾市</p>
      <p @click='selectEvent($event)' data-id="510500">泸州市</p>
      <p @click='selectEvent($event)' data-id="530900">临沧市</p>
      <p @click='selectEvent($event)' data-id="469033">乐东黎族自治县</p>
      <p @click='selectEvent($event)' data-id="511100">乐山市</p>
      <p @click='selectEvent($event)' data-id="620100">兰州市</p>
      <p @click='selectEvent($event)' data-id="450200">柳州市</p>
      <p @click='selectEvent($event)' data-id="513400">凉山彝族自治州</p>
      <p @click='selectEvent($event)' data-id="469034">陵水黎族自治县</p>
      <p @click='selectEvent($event)' data-id="542600">林芝地区</p>
      <p @click='selectEvent($event)' data-id="469028">临高县</p>
      <p @click='selectEvent($event)' data-id="540100">拉萨市</p>
      <p @click='selectEvent($event)' data-id="520200">六盘水市</p>
      <p @click='selectEvent($event)' data-id="621200">陇南市</p>
      <p @click='selectEvent($event)' data-id="622900">临夏回族自治州</p>
    </div>
    <div class="city-list"><span class="city-letter" id="M">M</span>
      <p @click='selectEvent($event)' data-id="231000">牡丹江市</p>
      <p @click='selectEvent($event)' data-id="340500">马鞍山市</p>
      <p @click='selectEvent($event)' data-id="510700">绵阳市</p>
      <p @click='selectEvent($event)' data-id="511400">眉山市</p>
      <p @click='selectEvent($event)' data-id="440900">茂名市</p>
      <p @click='selectEvent($event)' data-id="441400">梅州市</p>
    </div>
    <div class="city-list"><span class="city-letter" id="N">N</span>
      <p @click='selectEvent($event)' data-id="320100">南京市</p>
      <p @click='selectEvent($event)' data-id="330200">宁波市</p>
      <p @click='selectEvent($event)' data-id="320600">南通市</p>
      <p @click='selectEvent($event)' data-id="360100">南昌市</p>
      <p @click='selectEvent($event)' data-id="411300">南阳市</p>
      <p @click='selectEvent($event)' data-id="350700">南平市</p>
      <p @click='selectEvent($event)' data-id="350900">宁德市</p>
      <p @click='selectEvent($event)' data-id="350583">南安市</p>
      <p @click='selectEvent($event)' data-id="542400">那曲地区</p>
      <p @click='selectEvent($event)' data-id="450100">南宁市</p>
      <p @click='selectEvent($event)' data-id="511300">南充市</p>
      <p @click='selectEvent($event)' data-id="511000">内江市</p>
      <p @click='selectEvent($event)' data-id="533300">怒江傈僳族自治州</p>
    </div>
    <div class="city-list"><span class="city-letter" id="P">P</span>
      <p @click='selectEvent($event)' data-id="211100">盘锦市</p>
      <p @click='selectEvent($event)' data-id="360300">萍乡市</p>
      <p @click='selectEvent($event)' data-id="410400">平顶山市</p>
      <p @click='selectEvent($event)' data-id="410900">濮阳市</p>
      <p @click='selectEvent($event)' data-id="350300">莆田市</p>
      <p @click='selectEvent($event)' data-id="510400">攀枝花市</p>
      <p @click='selectEvent($event)' data-id="530800">普洱市</p>
      <p @click='selectEvent($event)' data-id="620800">平凉市</p>
    </div>
    <div class="city-list"><span class="city-letter" id="Q">Q</span>
      <p @click='selectEvent($event)' data-id="130300">秦皇岛市</p>
      <p @click='selectEvent($event)' data-id="230200">齐齐哈尔市</p>
      <p @click='selectEvent($event)' data-id="230900">七台河市</p>
      <p @click='selectEvent($event)' data-id="350500">泉州市</p>
      <p @click='selectEvent($event)' data-id="429005">潜江市</p>
      <p @click='selectEvent($event)' data-id="370200">青岛市</p>
      <p @click='selectEvent($event)' data-id="330800">衢州市</p>
      <p @click='selectEvent($event)' data-id="441800">清远市</p>
      <p @click='selectEvent($event)' data-id="522700">黔南布依族苗族自治州</p>
      <p @click='selectEvent($event)' data-id="450700">钦州市</p>
      <p @click='selectEvent($event)' data-id="530300">曲靖市</p>
      <p @click='selectEvent($event)' data-id="522300">黔西南布依族苗族自治州</p>
      <p @click='selectEvent($event)' data-id="621000">庆阳市</p>
      <p @click='selectEvent($event)' data-id="522600">黔东南苗族侗族自治州</p>
      <p @click='selectEvent($event)' data-id="469002">琼海市</p>
      <p @click='selectEvent($event)' data-id="469036">琼中黎族苗族自治县</p>
    </div>
    <div class="city-list"><span class="city-letter" id="R">R</span>
      <p @click='selectEvent($event)' data-id="320682">如皋市</p>
      <p @click='selectEvent($event)' data-id="371082">荣成市</p>
      <p @click='selectEvent($event)' data-id="371100">日照市</p>
      <p @click='selectEvent($event)' data-id="542301">日喀则市</p>
    </div>
    <div class="city-list"><span class="city-letter" id="S">S</span>
      <p @click='selectEvent($event)' data-id="220300">四平市</p>
      <p @click='selectEvent($event)' data-id="231200">绥化市</p>
      <p @click='selectEvent($event)' data-id="220700">松原市</p>
      <p @click='selectEvent($event)' data-id="320500">苏州市</p>
      <p @click='selectEvent($event)' data-id="310100">上海市</p>
      <p @click='selectEvent($event)' data-id="321300">宿迁市</p>
      <p @click='selectEvent($event)' data-id="330600">绍兴市</p>
      <p @click='selectEvent($event)' data-id="140600">朔州市</p>
      <p @click='selectEvent($event)' data-id="230500">双鸭山市</p>
      <p @click='selectEvent($event)' data-id="210100">沈阳市</p>
      <p @click='selectEvent($event)' data-id="330682">上虞市</p>
      <p @click='selectEvent($event)' data-id="130100">石家庄市</p>
      <p @click='selectEvent($event)' data-id="440500">汕头市</p>
      <p @click='selectEvent($event)' data-id="350400">三明市</p>
      <p @click='selectEvent($event)' data-id="429021">神农架林区</p>
      <p @click='selectEvent($event)' data-id="361100">上饶市</p>
      <p @click='selectEvent($event)' data-id="411400">商丘市</p>
      <p @click='selectEvent($event)' data-id="421300">随州市</p>
      <p @click='selectEvent($event)' data-id="341300">宿州市</p>
      <p @click='selectEvent($event)' data-id="411200">三门峡市</p>
      <p @click='selectEvent($event)' data-id="420300">十堰市</p>
      <p @click='selectEvent($event)' data-id="440300">深圳市</p>
      <p @click='selectEvent($event)' data-id="430500">邵阳市</p>
      <p @click='selectEvent($event)' data-id="440200">韶关市</p>
      <p @click='selectEvent($event)' data-id="441500">汕尾市</p>
      <p @click='selectEvent($event)' data-id="510900">遂宁市</p>
      <p @click='selectEvent($event)' data-id="611000">商洛市</p>
      <p @click='selectEvent($event)' data-id="542200">山南地区</p>
      <p @click='selectEvent($event)' data-id="460200">三亚市</p>
      <p @click='selectEvent($event)' data-id="640200">石嘴山市</p>
      <p @click='selectEvent($event)' data-id="659001">石河子市</p>
    </div>
    <div class="city-list"><span class="city-letter" id="T">T</span>
      <p @click='selectEvent($event)' data-id="140100">太原市</p>
      <p @click='selectEvent($event)' data-id="211200">铁岭市</p>
      <p @click='selectEvent($event)' data-id="220500">通化市</p>
      <p @click='selectEvent($event)' data-id="130200">唐山市</p>
      <p @click='selectEvent($event)' data-id="320585">太仓市</p>
      <p @click='selectEvent($event)' data-id="120100">天津市</p>
      <p @click='selectEvent($event)' data-id="321200">泰州市</p>
      <p @click='selectEvent($event)' data-id="150500">通辽市</p>
      <p @click='selectEvent($event)' data-id="331000">台州市</p>
      <p @click='selectEvent($event)' data-id="370900">泰安市</p>
      <p @click='selectEvent($event)' data-id="429006">天门市</p>
      <p @click='selectEvent($event)' data-id="340700">铜陵市</p>
      <p @click='selectEvent($event)' data-id="522201">铜仁市</p>
      <p @click='selectEvent($event)' data-id="469026">屯昌县</p>
      <p @click='selectEvent($event)' data-id="610200">铜川市</p>
      <p @click='selectEvent($event)' data-id="620500">天水市</p>
      <p @click='selectEvent($event)' data-id="654200">塔城地区</p>
      <p @click='selectEvent($event)' data-id="659003">图木舒克市</p>
      <p @click='selectEvent($event)' data-id="652100">吐鲁番地区</p>
      <p @click='selectEvent($event)' data-id="710100">台湾</p>
    </div>
    <div class="city-list"><span class="city-letter" id="W">W</span>
      <p @click='selectEvent($event)' data-id="330300">温州市</p>
      <p @click='selectEvent($event)' data-id="320200">无锡市</p>
      <p @click='selectEvent($event)' data-id="150900">乌兰察布市</p>
      <p @click='selectEvent($event)' data-id="150300">乌海市</p>
      <p @click='selectEvent($event)' data-id="340200">芜湖市</p>
      <p @click='selectEvent($event)' data-id="420100">武汉市</p>
      <p @click='selectEvent($event)' data-id="370700">潍坊市</p>
      <p @click='selectEvent($event)' data-id="371000">威海市</p>
      <p @click='selectEvent($event)' data-id="469006">万宁市</p>
      <p @click='selectEvent($event)' data-id="610500">渭南市</p>
      <p @click='selectEvent($event)' data-id="469005">文昌市</p>
      <p @click='selectEvent($event)' data-id="469001">五指山市</p>
      <p @click='selectEvent($event)' data-id="620600">武威市</p>
      <p @click='selectEvent($event)' data-id="450400">梧州市</p>
      <p @click='selectEvent($event)' data-id="532600">文山壮族苗族自治州</p>
      <p @click='selectEvent($event)' data-id="659004">五家渠市</p>
      <p @click='selectEvent($event)' data-id="640300">吴忠市</p>
      <p @click='selectEvent($event)' data-id="650100">乌鲁木齐市</p>
    </div>
    <div class="city-list"><span class="city-letter" id="X">X</span>
      <p @click='selectEvent($event)' data-id="140900">忻州市</p>
      <p @click='selectEvent($event)' data-id="152500">锡林郭勒盟</p>
      <p @click='selectEvent($event)' data-id="130500">邢台市</p>
      <p @click='selectEvent($event)' data-id="152200">兴安盟</p>
      <p @click='selectEvent($event)' data-id="320300">徐州市</p>
      <p @click='selectEvent($event)' data-id="410700">新乡市</p>
      <p @click='selectEvent($event)' data-id="420600">襄阳市</p>
      <p @click='selectEvent($event)' data-id="360500">新余市</p>
      <p @click='selectEvent($event)' data-id="411500">信阳市</p>
      <p @click='selectEvent($event)' data-id="429004">仙桃市</p>
      <p @click='selectEvent($event)' data-id="411000">许昌市</p>
      <p @click='selectEvent($event)' data-id="430300">湘潭市</p>
      <p @click='selectEvent($event)' data-id="350200">厦门市</p>
      <p @click='selectEvent($event)' data-id="341800">宣城市</p>
      <p @click='selectEvent($event)' data-id="420900">孝感市</p>
      <p @click='selectEvent($event)' data-id="421200">咸宁市</p>
      <p @click='selectEvent($event)' data-id="433100">湘西土家族苗族自治州</p>
      <p @click='selectEvent($event)' data-id="610100">西安市</p>
      <p @click='selectEvent($event)' data-id="610400">咸阳市</p>
      <p @click='selectEvent($event)' data-id="532800">西双版纳傣族自治州</p>
      <p @click='selectEvent($event)' data-id="630100">西宁市</p>
      <p @click='selectEvent($event)' data-id="810100">香港特别行政区</p>
    </div>
    <div class="city-list"><span class="city-letter" id="Y">Y</span>
      <p @click='selectEvent($event)' data-id="320282">宜兴市</p>
      <p @click='selectEvent($event)' data-id="222400">延边朝鲜族自治州</p>
      <p @click='selectEvent($event)' data-id="321000">扬州市</p>
      <p @click='selectEvent($event)' data-id="140800">运城市</p>
      <p @click='selectEvent($event)' data-id="320900">盐城市</p>
      <p @click='selectEvent($event)' data-id="140300">阳泉市</p>
      <p @click='selectEvent($event)' data-id="330281">余姚市</p>
      <p @click='selectEvent($event)' data-id="230700">伊春市</p>
      <p @click='selectEvent($event)' data-id="210800">营口市</p>
      <p @click='selectEvent($event)' data-id="370600">烟台市</p>
      <p @click='selectEvent($event)' data-id="420500">宜昌市</p>
      <p @click='selectEvent($event)' data-id="430600">岳阳市</p>
      <p @click='selectEvent($event)' data-id="360900">宜春市</p>
      <p @click='selectEvent($event)' data-id="430900">益阳市</p>
      <p @click='selectEvent($event)' data-id="330782">义乌市</p>
      <p @click='selectEvent($event)' data-id="360600">鹰潭市</p>
      <p @click='selectEvent($event)' data-id="431100">永州市</p>
      <p @click='selectEvent($event)' data-id="450900">玉林市</p>
      <p @click='selectEvent($event)' data-id="511800">雅安市</p>
      <p @click='selectEvent($event)' data-id="530400">玉溪市</p>
      <p @click='selectEvent($event)' data-id="441700">阳江市</p>
      <p @click='selectEvent($event)' data-id="610800">榆林市</p>
      <p @click='selectEvent($event)' data-id="511500">宜宾市</p>
      <p @click='selectEvent($event)' data-id="445300">云浮市</p>
      <p @click='selectEvent($event)' data-id="610600">延安市</p>
      <p @click='selectEvent($event)' data-id="654000">伊犁哈萨克自治州</p>
      <p @click='selectEvent($event)' data-id="640100">银川市</p>
      <p @click='selectEvent($event)' data-id="632700">玉树藏族自治州</p>
    </div>
    <div class="city-list"><span class="city-letter" id="Z">Z</span>
      <p @click='selectEvent($event)' data-id="130700">张家口市</p>
      <p @click='selectEvent($event)' data-id="330681">诸暨市</p>
      <p @click='selectEvent($event)' data-id="321100">镇江市</p>
      <p @click='selectEvent($event)' data-id="320582">张家港市</p>
      <p @click='selectEvent($event)' data-id="211300">朝阳市</p>
      <p @click='selectEvent($event)' data-id="430800">张家界市</p>
      <p @click='selectEvent($event)' data-id="410100">郑州市</p>
      <p @click='selectEvent($event)' data-id="370400">枣庄市</p>
      <p @click='selectEvent($event)' data-id="330900">舟山市</p>
      <p @click='selectEvent($event)' data-id="440183">增城市</p>
      <p @click='selectEvent($event)' data-id="440400">珠海市</p>
      <p @click='selectEvent($event)' data-id="411600">周口市</p>
      <p @click='selectEvent($event)' data-id="370300">淄博市</p>
      <p @click='selectEvent($event)' data-id="430200">株洲市</p>
      <p @click='selectEvent($event)' data-id="350600">漳州市</p>
      <p @click='selectEvent($event)' data-id="411700">驻马店市</p>
      <p @click='selectEvent($event)' data-id="440800">湛江市</p>
      <p @click='selectEvent($event)' data-id="520300">遵义市</p>
      <p @click='selectEvent($event)' data-id="510300">自贡市</p>
      <p @click='selectEvent($event)' data-id="530600">昭通市</p>
      <p @click='selectEvent($event)' data-id="441200">肇庆市</p>
      <p @click='selectEvent($event)' data-id="442000">中山市</p>
      <p @click='selectEvent($event)' data-id="620700">张掖市</p>
      <p @click='selectEvent($event)' data-id="512000">资阳市</p>
      <p @click='selectEvent($event)' data-id="640500">中卫市</p>
    </div>
  </div>
</div>
</div>  
</transition>
</div>
</template>
<script>
	export default{
    data(){
      return{
        localtion:'',
        isSelect : false,
      }
    },
		methods : {
			selectEvent(event){
				this.localtion = event.target.innerHTML;
        sessionStorage.setItem("cityName",this.localtion);
				this.isSelect = false;
			},
      showSelect(){
          this.isSelect = true;
      },
			selectKey(event){
				var s = event.target.innerHTML;
				this.$refs.showLetter.innerHTML = s;
				this.$refs.showKey.style.display = 'block';
				var _self = this;
				setTimeout(function(){
					_self.$refs.showKey.style.display = 'none';
				},500)
			}
		},
    mounted(){
      var selCity = sessionStorage.getItem("cityName");
      if(!!selCity){
        this.localtion = selCity;
        return;
      }
      this.localtion = remote_ip_info['city'];
    }
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition.styl';

.logo
  padding:2px;
  height:1.3rem;
  width:1.3rem;
  border-radius:4px;
  background:#90B4FC;
  margin:0.3rem 15px;
.movie-localtion{
    max-width:70px;
    font-size:0.8rem;
    display:inline-block;
    line-height:2rem;
    padding-right:1.1rem;
    background:url('./img/down.png') no-repeat right center;
    background-size:0.7rem auto;
    color:$color;
}

body,div,dl,dt,dd,ul,li,form,input,button,h1,h2,h3,h4,h5,h6,p{margin: 0 auto;padding:0;font-family:"微软雅黑";color:#00C7C7}
ul,li,dl,dt,dd{display:block;list-style:none;}
a{text-decoration:none;outline:none;}
.fl{float:left;}
.fr{float:right;}
.none{display:none;}
.loan_jm1{width:94%;margin:0 auto;}
.loan_jm_spa1{width:39%;height:40px;line-height:40px;font-size:1em;color:#666;display:block;float:left;}
.loan_jm_l1{margin-top:10px;margin-bottom:15px;height:40px;}
.wbk_srn{width:57%;height:40px;border:1px solid #ccc;background:#FFF;float:left;padding-left:3%;line-height:40px;color:#ADADAD;
font-size:1.1em; background-size:45%;background-position:center;background:#fff;}
.wbk_srn b{width:30px;height:40px;border:1px solid #ccc;background:#FFF;float:left;padding-left:3%;line-height:40px;color:#ADADAD;
font-size:1.1em;}
.selectCity
	background:#fff;
	position:fixed;
	height:100%;
	width:100%;
	overflow:auto;
	left:0;
	top:0;
	box-sizing:border-box;
	z-index:11;
/*显示点击是哪个字母*/
.showLetter{
    position: fixed;
    color:#00C7C7;
    display:none;
    width: 50px;
    height:50px;
    top:50%;
    left: 50%;
    margin-left:-25px;
    border-radius: 50%;
    border: #00C7C7 1px solid;
    text-align: center;
}
.showLetter span{
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
}
/*城市弹层*/
.container{width:100%;}
.letter{width:40px;;position:fixed;top:5%;right:0px;text-align:center;}
.letter ul{list-style-type:none;}
.letter ul li a{text-decoration:none;color:#00C7C7;font-size: 18px;padding:2px 8px;}
.letter ul li{padding-bottom:5px;}
.city{width:90%;overflow:hidden;}
.city-list{width:100%;}
.city-list .city-letter{font-size:20px;display:inline-block;padding-top:15px;padding-bottom:5px;border-bottom:1px solid #e8ecf1;width:100%;}
.city-list p{color:#afafaf;width:95%;height:50px;line-height:50px;border-bottom:1px solid #e8ecf1;cursor:pointer;}
.UISelect{margin-top:5px}
</style>