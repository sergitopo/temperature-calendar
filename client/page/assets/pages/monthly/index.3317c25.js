(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{208:function(e,t,o){var content=o(212);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(56).default)("2e69bd5c",content,!0,{sourceMap:!1})},211:function(e,t,o){"use strict";var n=o(208);o.n(n).a},212:function(e,t,o){(t=o(55)(!1)).push([e.i,'.md-layout-item{height:40px;margin-top:8px;margin-bottom:8px;transition:.3s 500}.md-layout-item:after{width:100%;height:100%;display:block;background:md-get-palette-color(purple,200);content:" "}.centered-text{text-align:center}.normal{background-color:#f7f7f7}.anomaly--1{background-color:#fddbc7}.anomaly--2{background-color:#ef8a62}.anomaly--3{background-color:#b2182b}.anomaly--4{background-color:#d1e5f0}.anomaly--5{background-color:#67a9cf}.anomaly--6{background-color:#2166ac}body{min-height:unset}',""]),e.exports=t},219:function(e,t,o){"use strict";o.r(t);o(110),o(201),o(34),o(80),o(35),o(29),o(17),o(36),o(33);var n=o(6),r={data:function(){return{months:["Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Setembre","Octubre","Novembre","Desembre"],currentYear:2020,year:2020,calculated:!1,colorPalette:["#2166ac","#67a9cf","#d1e5f0","#e0dede","#fddbc7","#ef8a62","#b2182b"],colorMapRange:[-2,-1.25,-.5,.5,1.25,2]}},layout:"menu",created:function(){this.months=this.months.map((function(e){return{name:e}})),this.requestMonthData()},methods:{calculateMonthsAnomalies:function(){var e=this,t=[0,1,5,6];this.yearMonthAvgTemperature.aggregations[2].buckets.forEach((function(o,i){var n=e.months[i];n.anomaly=o[1].value-e.monthlyAbsoluteAvg.aggregations[2].buckets[i][1].value,n.color=e.getColorAnomaly(n.anomaly);var r=e.colorPalette.findIndex((function(e){return e===n.color}));n.textColor=t.includes(r)?"white":"black";var c=n.anomaly&&n.anomaly>0?"+":"";n.text=n.anomaly?"".concat(n.name,"  ").concat(c).concat(Math.round(100*n.anomaly)/100):n.name})),this.calculated=!0},getColorAnomaly:function(e){return e<this.colorMapRange[0]?this.colorPalette[0]:e>=this.colorMapRange[0]&&e<this.colorMapRange[1]?this.colorPalette[1]:e>=this.colorMapRange[1]&&e<this.colorMapRange[2]?this.colorPalette[2]:e>=this.colorMapRange[2]&&e<this.colorMapRange[3]?this.colorPalette[3]:e>=this.colorMapRange[3]&&e<this.colorMapRange[4]?this.colorPalette[4]:e>=this.colorMapRange[4]&&e<=this.colorMapRange[5]?this.colorPalette[5]:this.colorPalette[6]},requestMonthData:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var o,n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=e.year===e.currentYear?"":"-".concat(e.year),t.next=3,fetch("".concat("https://sergitopo.github.io/temperature-calendar/client/page/","monthly-temperatures").concat(o,".json"),{method:"GET",mode:"cors",cache:"force-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 3:return n=t.sent,t.next=6,n.json();case 6:return e.yearMonthAvgTemperature=t.sent,t.next=9,fetch("https://sergitopo.github.io/temperature-calendar/client/page/monthly-avg.json",{method:"GET",mode:"cors",cache:"force-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 9:return r=t.sent,t.next=12,r.json();case 12:e.monthlyAbsoluteAvg=t.sent,e.calculatedDates=e.calculateMonthsAnomalies();case 14:case"end":return t.stop()}}),t)})))()}}},c=(o(211),o(7)),component=Object(c.a)(r,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return e.calculated?o("div",{staticClass:"md-layout md-gutter md-alignment-center",staticStyle:{margin:"2em","margin-bottom":"3rem"}},e._l(e.months,(function(t){return o("div",{staticClass:"md-layout-item md-large-size-100 centered-text",staticStyle:{"padding-top":"0.5em"},style:{background:t.color,color:t.textColor}},[e._v(e._s(t.text||t.name))])})),0):e._e()}),[],!1,null,null,null);t.default=component.exports}}]);