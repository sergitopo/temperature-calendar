(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{202:function(e,t,r){"use strict";r(105),r(207),r(29),r(16),r(208),r(57),r(58),r(33);var n=r(6),o=["purple","indigo","blue","normal","yellow","orange","red"],l=[-5,-3.5,-1.5,1.5,3.5,5],c=function(e){(e=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()))).setUTCDate(e.getUTCDate()+4-(e.getUTCDay()||7));var t=new Date(Date.UTC(e.getUTCFullYear(),0,1));return Math.ceil(((e-t)/864e5+1)/7)},d=function(e,t,r){var n=[{key:"blue",popover:{label:"Temperatura mitja >1.5º per baix del normal"},highlight:{contentClass:"anomaly-cold--1",fillMode:"light"},dates:[]},{key:"indigo",popover:{label:"Temperatura mitja >3.5º per baix del normal"},highlight:{contentClass:"anomaly-cold--2",fillMode:"light"},dates:[]},{key:"purple",popover:{label:"Temperatura mitja >5º per baix del normal"},highlight:{contentClass:"anomaly-cold--3",fillMode:"light"},dates:[]},{key:"red",popover:{label:"Temperatura mitja >5º per dalt del normal"},highlight:{contentClass:"anomaly-hot--3",fillMode:"light"},dates:[]},{key:"orange",popover:{label:"Temperatura mitja >3.5º per dalt del normal"},highlight:{contentClass:"anomaly-hot--2",fillMode:"light"},dates:[]},{key:"yellow",popover:{label:"Temperatura mitja >1.5º per dalt del normal"},highlight:{contentClass:"anomaly-hot--1",fillMode:"light"},dates:[]},{key:"normal",popover:{label:"Temperatura mitja normal per a la data"},highlight:{contentClass:"normal",fillMode:"light"},dates:[]}],o=new Date("01-01-".concat(r)),l=new Date;2020!==r&&new Date("12-31-".concat(r));for(var c=0,d=function(){var r=new Date(o),l=h(e,t,o,c);c++;var d=f(l),v=n.find((function(e){return e.key===d}));v&&v.dates.push(r),o.setDate(o.getDate()+1)};o<l;)d();return n},f=function(e){return e<l[0]?o[0]:e>=l[0]&&e<l[1]?o[1]:e>=l[1]&&e<l[2]?o[2]:e>=l[2]&&e<l[3]?o[3]:e>=l[3]&&e<l[4]?o[4]:e>=l[4]&&e<=l[5]?o[5]:o[6]},h=function(e,t,r,n){try{var o=c(r),l=t.aggregations[2].buckets.find((function(e){return e.key===o}))[1].value;return e.hits.hits[n]._source.t_avg-l}catch(e){return null}};t.a={data:function(){return{daySelected:null,showDateInfo:!1,calculatedDates:[],created:!1,calendar:null,visitedYearSet:new Set,currentYear:2020}},asyncData:function(e){return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,o,l,c,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=2020===(r=(r=parseInt(e.route.name))||2020)?"":"-".concat(r),t.next=5,fetch("https://sergitopo.github.io/temperature-calendar/client/page/"+"daily-temperatures".concat(r,".json"),{method:"GET",mode:"cors",cache:"force-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 5:return n=t.sent,t.next=8,n.json();case 8:return o=t.sent,t.next=11,fetch("https://sergitopo.github.io/temperature-calendar/client/page/weekly-avg.json",{method:"GET",mode:"cors",cache:"force-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 11:return l=t.sent,t.next=14,l.json();case 14:return c=t.sent,f=d(o,c,parseInt(e.route.name)),t.abrupt("return",{calculatedDates:f,dates:f,dailyTemperature:o,weekOfYearAvg:c});case 17:case"end":return t.stop()}}),t)})))()},mounted:function(){var e=this;this.visitedYearSet.add(this.year),this.created=!0,this.$nextTick((function(){e.calendar=e.$refs.calendar,e.year===e.currentYear&&e.calendar.focusDate&&e.calendar.focusDate(new Date)}))},methods:{requestData:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.year===e.currentYear?"":"-".concat(e.year),t.next=3,fetch("".concat("https://sergitopo.github.io/temperature-calendar/client/page/","daily-temperatures").concat(r,".json"),{method:"GET",mode:"cors",cache:"force-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 3:return n=t.sent,t.next=6,n.json();case 6:return e.dailyTemperature=t.sent,t.next=9,fetch("https://sergitopo.github.io/temperature-calendar/client/page/weekly-avg.json",{method:"GET",mode:"cors",cache:"force-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 9:return o=t.sent,t.next=12,o.json();case 12:e.weekOfYearAvg=t.sent,e.calculatedDates=d(e.dailyTemperature,e.weekOfYearAvg,parseInt(e.year));case 14:case"end":return t.stop()}}),t)})))()},onYearChange:function(e){e.year!==this.year||!0!==this.create?this.$router.push("/".concat(e.year)):this.created=!1},getDayTemperatures:function(e){var t=this.getWeekNumber(e.date),r=Math.round(Math.abs((e.date-new Date("01-01-".concat(this.year)))/864e5)),n=this.weekOfYearAvg.aggregations[2].buckets.find((function(e){return e.key===t}))[1].value,o=this.dailyTemperature.hits.hits[r]._source.t_avg;console.log(o),console.log(n),this.daySelected={day:e.ariaLabel,dayTemperature:o,normalDayTemperature:n},this.showDateInfo=!0},getWeekNumber:function(e){return c(e)}}}},203:function(e,t,r){"use strict";r.r(t);var n={name:"modal"},o=(r(212),r(8)),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("transition",{attrs:{name:"modal"}},[r("div",{staticClass:"modal-mask"},[r("div",{staticClass:"modal-wrapper"},[r("div",{staticClass:"modal-container"},[r("div",{staticClass:"modal-header"},[e._t("header",[e._v("\r\n                  default header\r\n                ")])],2),e._v(" "),r("div",{staticClass:"modal-body"},[e._t("body",[e._v("\r\n                  default body\r\n                ")])],2),e._v(" "),r("div",{staticClass:"modal-footer"},[e._t("footer",[r("button",{staticClass:"modal-default-button",on:{click:function(t){return e.$emit("close")}}},[e._v("\r\n                    OK\r\n                  ")])])],2)])])])])}),[],!1,null,null,null);t.default=component.exports},204:function(e,t,r){var content=r(213);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(51).default)("a06a53d0",content,!0,{sourceMap:!1})},206:function(e,t,r){var n=r(52),o=r(10),l=r(11),c=r(12).f,d=r(77),f=r(210),h=d("meta"),v=0,m=Object.isExtensible||function(){return!0},y=function(e){c(e,h,{value:{objectID:"O"+ ++v,weakData:{}}})},meta=e.exports={REQUIRED:!1,fastKey:function(e,t){if(!o(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!l(e,h)){if(!m(e))return"F";if(!t)return"E";y(e)}return e[h].objectID},getWeakData:function(e,t){if(!l(e,h)){if(!m(e))return!0;if(!t)return!1;y(e)}return e[h].weakData},onFreeze:function(e){return f&&meta.REQUIRED&&m(e)&&!l(e,h)&&y(e),e}};n[h]=!0},207:function(e,t,r){"use strict";var n=r(2),o=r(28).find,l=r(107),c=r(19),d=!0,f=c("find");"find"in[]&&Array(1).find((function(){d=!1})),n({target:"Array",proto:!0,forced:d||!f},{find:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),l("find")},208:function(e,t,r){"use strict";var n=r(209),o=r(211);e.exports=n("Set",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),o)},209:function(e,t,r){"use strict";var n=r(2),o=r(3),l=r(53),c=r(15),d=r(206),f=r(156),h=r(155),v=r(10),m=r(5),y=r(106),x=r(55),w=r(110);e.exports=function(e,t,r){var k=-1!==e.indexOf("Map"),D=-1!==e.indexOf("Weak"),T=k?"set":"add",j=o[e],C=j&&j.prototype,E=j,O={},_=function(e){var t=C[e];c(C,e,"add"==e?function(e){return t.call(this,0===e?0:e),this}:"delete"==e?function(e){return!(D&&!v(e))&&t.call(this,0===e?0:e)}:"get"==e?function(e){return D&&!v(e)?void 0:t.call(this,0===e?0:e)}:"has"==e?function(e){return!(D&&!v(e))&&t.call(this,0===e?0:e)}:function(e,r){return t.call(this,0===e?0:e,r),this})};if(l(e,"function"!=typeof j||!(D||C.forEach&&!m((function(){(new j).entries().next()})))))E=r.getConstructor(t,e,k,T),d.REQUIRED=!0;else if(l(e,!0)){var M=new E,z=M[T](D?{}:-0,1)!=M,Y=m((function(){M.has(1)})),I=y((function(e){new j(e)})),R=!D&&m((function(){for(var e=new j,t=5;t--;)e[T](t,t);return!e.has(-0)}));I||((E=t((function(t,r){h(t,E,e);var n=w(new j,t,E);return null!=r&&f(r,n[T],n,k),n}))).prototype=C,C.constructor=E),(Y||R)&&(_("delete"),_("has"),k&&_("get")),(R||z)&&_(T),D&&C.clear&&delete C.clear}return O[e]=E,n({global:!0,forced:E!=j},O),x(E,e),D||r.setStrong(E,e,k),E}},210:function(e,t,r){var n=r(5);e.exports=!n((function(){return Object.isExtensible(Object.preventExtensions({}))}))},211:function(e,t,r){"use strict";var n=r(12).f,o=r(54),l=r(157),c=r(56),d=r(155),f=r(156),h=r(108),v=r(109),m=r(9),y=r(206).fastKey,x=r(27),w=x.set,k=x.getterFor;e.exports={getConstructor:function(e,t,r,h){var v=e((function(e,n){d(e,v,t),w(e,{type:t,index:o(null),first:void 0,last:void 0,size:0}),m||(e.size=0),null!=n&&f(n,e[h],e,r)})),x=k(t),D=function(e,t,r){var n,o,l=x(e),c=T(e,t);return c?c.value=r:(l.last=c={index:o=y(t,!0),key:t,value:r,previous:n=l.last,next:void 0,removed:!1},l.first||(l.first=c),n&&(n.next=c),m?l.size++:e.size++,"F"!==o&&(l.index[o]=c)),e},T=function(e,t){var r,n=x(e),o=y(t);if("F"!==o)return n.index[o];for(r=n.first;r;r=r.next)if(r.key==t)return r};return l(v.prototype,{clear:function(){for(var e=x(this),data=e.index,t=e.first;t;)t.removed=!0,t.previous&&(t.previous=t.previous.next=void 0),delete data[t.index],t=t.next;e.first=e.last=void 0,m?e.size=0:this.size=0},delete:function(e){var t=x(this),r=T(this,e);if(r){var n=r.next,o=r.previous;delete t.index[r.index],r.removed=!0,o&&(o.next=n),n&&(n.previous=o),t.first==r&&(t.first=n),t.last==r&&(t.last=o),m?t.size--:this.size--}return!!r},forEach:function(e){for(var t,r=x(this),n=c(e,arguments.length>1?arguments[1]:void 0,3);t=t?t.next:r.first;)for(n(t.value,t.key,this);t&&t.removed;)t=t.previous},has:function(e){return!!T(this,e)}}),l(v.prototype,r?{get:function(e){var t=T(this,e);return t&&t.value},set:function(e,t){return D(this,0===e?0:e,t)}}:{add:function(e){return D(this,e=0===e?0:e,e)}}),m&&n(v.prototype,"size",{get:function(){return x(this).size}}),v},setStrong:function(e,t,r){var n=t+" Iterator",o=k(t),l=k(n);h(e,t,(function(e,t){w(this,{type:n,target:e,state:o(e),kind:t,last:void 0})}),(function(){for(var e=l(this),t=e.kind,r=e.last;r&&r.removed;)r=r.previous;return e.target&&(e.last=r=r?r.next:e.state.first)?"keys"==t?{value:r.key,done:!1}:"values"==t?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:(e.target=void 0,{value:void 0,done:!0})}),r?"entries":"values",!r,!0),v(t)}}},212:function(e,t,r){"use strict";var n=r(204);r.n(n).a},213:function(e,t,r){(t=r(50)(!1)).push([e.i,".modal-mask{position:fixed;z-index:9998;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);display:table;transition:opacity .3s ease}.modal-wrapper{display:table-cell;vertical-align:middle}.modal-container{width:300px;margin:0 auto;padding:20px 30px;background-color:#fff;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.33);transition:all .3s ease;font-family:Helvetica,Arial,sans-serif}.modal-header h3{margin-top:0;color:#42b983}.modal-body{margin:20px 0}.modal-default-button{float:right}.modal-enter,.modal-leave-active{opacity:0}.modal-enter .modal-container,.modal-leave-active .modal-container{transform:scale(1.1)}.vc-day-content{width:calc(var(--day-content-width) + 10px)!important}",""]),e.exports=t}}]);