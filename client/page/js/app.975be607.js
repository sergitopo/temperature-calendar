(function(e){function t(t){for(var r,l,i=t[0],s=t[1],c=t[2],u=0,p=[];u<i.length;u++)l=i[u],Object.prototype.hasOwnProperty.call(o,l)&&o[l]&&p.push(o[l][0]),o[l]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);d&&d(t);while(p.length)p.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,i=1;i<a.length;i++){var s=a[i];0!==o[s]&&(r=!1)}r&&(n.splice(t--,1),e=l(l.s=a[0]))}return e}var r={},o={app:0},n=[];function l(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.m=e,l.c=r,l.d=function(e,t,a){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(a,r,function(t){return e[t]}.bind(null,r));return a},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var d=s;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var r=a("85ec"),o=a.n(r);o.a},"22d7":function(e,t,a){"use strict";var r=a("be87"),o=a.n(r);o.a},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[e.finishProcess?a("calendar",{ref:"calendar",attrs:{"from-date":new Date("01-01-2020"),"to-date":new Date,attributes:e.dates,"is-expanded":"",columns:e.$screens({lg:4,md:2},1),rows:e.$screens({lg:3,md:6},12)},on:{dayclick:e.getDayTemperatures}}):e._e(),e.showDateInfo?a("modal",{on:{close:function(t){e.showDateInfo=!1}}},[e._t("header",[a("h3",{attrs:{slot:"header"},slot:"header"},[e._v(e._s(e.daySelected.day))])]),e._t("body",[a("div",{attrs:{slot:"body"},slot:"body"},[a("div",{staticStyle:{"padding-bottom":"1em"}},[e._v(e._s("Temperatura mitja del dia: "+e.daySelected.dayTemperature))]),a("div",[e._v(e._s("Temperatura mitja habitual de: "+Math.round(100*e.daySelected.normalDayTemperature)/100))])])])],2):e._e()],1)},n=[],l=(a("7db0"),a("d3b7"),a("96cf"),a("1da1")),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{name:"modal"}},[a("div",{staticClass:"modal-mask"},[a("div",{staticClass:"modal-wrapper"},[a("div",{staticClass:"modal-container"},[a("div",{staticClass:"modal-header"},[e._t("header",[e._v(" default header ")])],2),a("div",{staticClass:"modal-body"},[e._t("body",[e._v(" default body ")])],2),a("div",{staticClass:"modal-footer"},[e._t("footer",[a("button",{staticClass:"modal-default-button",on:{click:function(t){return e.$emit("close")}}},[e._v(" OK ")])])],2)])])])])},s=[],c={name:"modal"},d=c,u=(a("22d7"),a("2877")),p=Object(u["a"])(d,i,s,!1,null,null,null),h=p.exports,m={name:"App",components:{modal:h},data:function(){return{daySelected:null,dailyTemperature:null,showDateInfo:!1,finishProcess:!1,dates:[{key:"blue",popover:{label:"Temperatura mitja >1.5º per baix del normal"},highlight:{contentClass:"anomaly-cold--1",fillMode:"light"},dates:[]},{key:"indigo",popover:{label:"Temperatura mitja >3.5º per baix del normal"},highlight:{contentClass:"anomaly-cold--2",fillMode:"light"},dates:[]},{key:"purple",popover:{label:"Temperatura mitja >5º per baix del normal"},highlight:{contentClass:"anomaly-cold--3",fillMode:"light"},dates:[]},{key:"red",popover:{label:"Temperatura mitja >5º per dalt del normal"},highlight:{contentClass:"anomaly-hot--3",fillMode:"light"},dates:[]},{key:"orange",popover:{label:"Temperatura mitja >3.5º per dalt del normal"},highlight:{contentClass:"anomaly-hot--2",fillMode:"light"},dates:[]},{key:"yellow",popover:{label:"Temperatura mitja >1.5º per dalt del normal"},highlight:{contentClass:"anomaly-hot--1",fillMode:"light"},dates:[]},{key:"normal",popover:{label:"Temperatura mitja normal per a la data"},highlight:{contentClass:"normal",fillMode:"light"},dates:[]}],colorPalette:["purple","indigo","blue","normal","yellow","orange","red"],colorMapRange:[-5,-3.5,-1.5,1.5,3.5,5]}},created:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a="https://ec2-3-250-218-11.eu-west-1.compute.amazonaws.com/elastic/daily_temperature/_search",t.next=3,fetch(a,{method:"POST",mode:"cors",cache:"force-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin",body:JSON.stringify({aggs:{2:{histogram:{field:"week_number",interval:1,min_doc_count:1},aggs:{1:{avg:{field:"t_avg"}}}}}})});case 3:return r=t.sent,t.next=6,r.json();case 6:return e.weekOfYearAvg=t.sent,t.next=9,fetch(a,{method:"POST",mode:"cors",cache:"force-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin",body:JSON.stringify({size:500,sort:[{date:{order:"asc",unmapped_type:"boolean"}}],query:{bool:{must:[{range:{date:{format:"strict_date_optional_time",gte:"2019-12-31T23:00:00.000Z",lte:"now"}}}]}}})});case 9:return o=t.sent,t.next=12,o.json();case 12:e.dailyTemperature=t.sent,e.calculateCurrentYearAnomalies();case 14:case"end":return t.stop()}}),t)})))()},updated:function(){var e=this.$refs.calendar;e&&e.focusDate(new Date)},methods:{calculateCurrentYearAnomalies:function(){var e=this,t=new Date("01-01-2020"),a=t,r=new Date,o=0,n=function(){var t=new Date(a),r=e.calculateDayAnomaly(a,o);o++;var n=e.getDayColorFromAnomaly(r),l=e.dates.find((function(e){return e.key===n}));l&&l.dates.push(t),a.setDate(a.getDate()+1)};while(a<r)n();this.finishProcess=!0},getDayColorFromAnomaly:function(e){return e<this.colorMapRange[0]?this.colorPalette[0]:e>=this.colorMapRange[0]&&e<this.colorMapRange[1]?this.colorPalette[1]:e>=this.colorMapRange[1]&&e<this.colorMapRange[2]?this.colorPalette[2]:e>=this.colorMapRange[2]&&e<this.colorMapRange[3]?this.colorPalette[3]:e>=this.colorMapRange[3]&&e<this.colorMapRange[4]?this.colorPalette[4]:e>=this.colorMapRange[4]&&e<=this.colorMapRange[5]?this.colorPalette[5]:this.colorPalette[6]},calculateDayAnomaly:function(e,t){try{var a=this.getWeekNumber(e),r=this.weekOfYearAvg.aggregations["2"].buckets.find((function(e){return e.key===a}))["1"].value,o=this.dailyTemperature.hits.hits[t]._source.t_avg-r;return o}catch(n){return null}},getDayTemperatures:function(e){var t=864e5,a=this.getWeekNumber(e.date),r=Math.round(Math.abs((e.date-new Date("01-01-2020"))/t)),o=this.weekOfYearAvg.aggregations["2"].buckets.find((function(e){return e.key===a}))["1"].value,n=this.dailyTemperature.hits.hits[r]._source.t_avg;console.log(n),console.log(o),this.daySelected={day:e.ariaLabel,dayTemperature:n,normalDayTemperature:o},this.showDateInfo=!0},getWeekNumber:function(e){e=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),e.setUTCDate(e.getUTCDate()+4-(e.getUTCDay()||7));var t=new Date(Date.UTC(e.getUTCFullYear(),0,1)),a=Math.ceil(((e-t)/864e5+1)/7);return a}}},f=m,g=(a("034f"),Object(u["a"])(f,o,n,!1,null,null,null)),y=g.exports,v=a("86e3"),b=a.n(v);r["default"].config.productionTip=!1,r["default"].component("calendar",b.a),new r["default"]({render:function(e){return e(y)}}).$mount("#app")},"85ec":function(e,t,a){},be87:function(e,t,a){}});
//# sourceMappingURL=app.975be607.js.map