(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{206:function(e,t,r){var content=r(209);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(34).default)("19d59658",content,!0,{sourceMap:!1})},207:function(e,t,r){"use strict";r(111),r(203),r(26),r(17),r(204),r(57),r(58),r(35);var n=r(6),o=r(110),l=["purple","indigo","blue","normal","yellow","orange","red"],c=[-5,-3.5,-1.5,1.5,3.5,5],d=function(e){(e=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()))).setUTCDate(e.getUTCDate()+4-(e.getUTCDay()||7));var t=new Date(Date.UTC(e.getUTCFullYear(),0,1));return Math.ceil(((e-t)/864e5+1)/7)},m=function(e,t,r){var n=[{key:"blue",popover:{label:"Temperatura mitja >1.5º per baix del normal"},highlight:{contentClass:"anomaly-cold--1",fillMode:"light"},dates:[]},{key:"indigo",popover:{label:"Temperatura mitja >3.5º per baix del normal"},highlight:{contentClass:"anomaly-cold--2",fillMode:"light"},dates:[]},{key:"purple",popover:{label:"Temperatura mitja >5º per baix del normal"},highlight:{contentClass:"anomaly-cold--3",fillMode:"light"},dates:[]},{key:"red",popover:{label:"Temperatura mitja >5º per dalt del normal"},highlight:{contentClass:"anomaly-hot--3",fillMode:"light"},dates:[]},{key:"orange",popover:{label:"Temperatura mitja >3.5º per dalt del normal"},highlight:{contentClass:"anomaly-hot--2",fillMode:"light"},dates:[]},{key:"yellow",popover:{label:"Temperatura mitja >1.5º per dalt del normal"},highlight:{contentClass:"anomaly-hot--1",fillMode:"light"},dates:[]},{key:"normal",popover:{label:"Temperatura mitja normal per a la data"},highlight:{contentClass:"normal",fillMode:"light"},dates:[]}],l=new Date("01-01-".concat(r)),c=new Date;r!==o.a&&new Date("12-31-".concat(r));for(var d=0,m=function(){var r=new Date(l),o=f(e,t,l,d);d++;var c=h(o),m=n.find((function(e){return e.key===c}));m&&m.dates.push(r),l.setDate(l.getDate()+1)};l<c;)m();return n},h=function(e){return e<c[0]?l[0]:e>=c[0]&&e<c[1]?l[1]:e>=c[1]&&e<c[2]?l[2]:e>=c[2]&&e<c[3]?l[3]:e>=c[3]&&e<c[4]?l[4]:e>=c[4]&&e<=c[5]?l[5]:l[6]},f=function(e,t,r,n){try{var o=d(r),l=t.aggregations[2].buckets.find((function(e){return e.key===o}))[1].value;return e.hits.hits[n]._source.t_avg-l}catch(e){return null}};t.a={data:function(){return{daySelected:null,showDateInfo:!1,calculatedDates:[],created:!1,calendar:null,visitedYearSet:new Set,currentYear:o.a}},asyncData:function(e){return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,l,c,d,h;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=(r=(r=parseInt(e.route.name))||o.a)===o.a?"":"-".concat(r),t.next=5,fetch("https://sergitopo.github.io/temperature-calendar/client/page/"+"daily-temperatures".concat(r,".json"),{method:"GET",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 5:return n=t.sent,t.next=8,n.json();case 8:return l=t.sent,t.next=11,fetch("https://sergitopo.github.io/temperature-calendar/client/page/weekly-avg.json",{method:"GET",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 11:return c=t.sent,t.next=14,c.json();case 14:return d=t.sent,h=m(l,d,parseInt(e.route.name)),t.abrupt("return",{calculatedDates:h,dates:h,dailyTemperature:l,weekOfYearAvg:d});case 17:case"end":return t.stop()}}),t)})))()},mounted:function(){var e=this;this.visitedYearSet.add(this.year),this.created=!0,this.$nextTick((function(){e.calendar=e.$refs.calendar,e.year===e.currentYear&&e.calendar.focusDate&&e.calendar.focusDate(new Date)}))},methods:{requestData:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.year===e.currentYear?"":"-".concat(e.year),t.next=3,fetch("".concat("https://sergitopo.github.io/temperature-calendar/client/page/","daily-temperatures").concat(r,".json"),{method:"GET",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 3:return n=t.sent,t.next=6,n.json();case 6:return e.dailyTemperature=t.sent,t.next=9,fetch("https://sergitopo.github.io/temperature-calendar/client/page/weekly-avg.json",{method:"GET",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 9:return o=t.sent,t.next=12,o.json();case 12:e.weekOfYearAvg=t.sent,e.calculatedDates=m(e.dailyTemperature,e.weekOfYearAvg,parseInt(e.year));case 14:case"end":return t.stop()}}),t)})))()},onYearChange:function(e){e.year!==this.year||!0!==this.create?this.$router.push("/".concat(e.year)):this.created=!1},getDayTemperatures:function(e){var t=this.getWeekNumber(e.date),r=Math.round(Math.abs((e.date-new Date("01-01-".concat(this.year)))/864e5)),n=this.weekOfYearAvg.aggregations[2].buckets.find((function(e){return e.key===t}))[1].value,o=this.dailyTemperature.hits.hits[r]._source.t_avg;console.log(o),console.log(n),this.daySelected={day:e.ariaLabel,dayTemperature:o,normalDayTemperature:n},this.showDateInfo=!0},getWeekNumber:function(e){return d(e)}}}},208:function(e,t,r){"use strict";var n=r(206);r.n(n).a},209:function(e,t,r){(t=r(33)(!1)).push([e.i,".modal-mask{position:fixed;z-index:9998;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);display:table;transition:opacity .3s ease}.modal-wrapper{display:table-cell;vertical-align:middle}.modal-container{width:300px;margin:0 auto;padding:20px 30px;background-color:#fff;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.33);transition:all .3s ease;font-family:Helvetica,Arial,sans-serif}.modal-header h3{margin-top:0;color:#42b983}.modal-body{margin:20px 0}.modal-default-button{float:right}.modal-enter,.modal-leave-active{opacity:0}.modal-enter .modal-container,.modal-leave-active .modal-container{transform:scale(1.1)}.vc-day-content{width:calc(var(--day-content-width) + 10px)!important}",""]),e.exports=t},210:function(e,t,r){"use strict";r.r(t);var n={name:"modal"},o=(r(208),r(12)),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("transition",{attrs:{name:"modal"}},[r("div",{staticClass:"modal-mask"},[r("div",{staticClass:"modal-wrapper"},[r("div",{staticClass:"modal-container"},[r("div",{staticClass:"modal-header"},[e._t("header",[e._v("\n                  default header\n                ")])],2),e._v(" "),r("div",{staticClass:"modal-body"},[e._t("body",[e._v("\n                  default body\n                ")])],2),e._v(" "),r("div",{staticClass:"modal-footer"},[e._t("footer",[r("button",{staticClass:"modal-default-button",on:{click:function(t){return e.$emit("close")}}},[e._v("\n                    OK\n                  ")])])],2)])])])])}),[],!1,null,null,null);t.default=component.exports},218:function(e,t,r){"use strict";r.r(t);var n={name:"App",layout:"menu",data:function(){return{year:2016}},mixins:[r(207).a]},o=r(12),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[e.created?r("calendar",{ref:"calendar",class:{"avoid-back-arrow":2016===this.year},attrs:{"from-date":new Date("01-01-"+this.year),"to-date":new Date,attributes:e.calculatedDates,"is-expanded":"",columns:e.$screens({lg:4,md:2},1),rows:e.$screens({lg:3,md:6},12)},on:{dayclick:e.getDayTemperatures,"update:to-page":e.onYearChange,"update:from-page":e.onYearChange}}):e._e(),e._v(" "),e.showDateInfo?r("modal",{on:{close:function(t){e.showDateInfo=!1}}},[e._t("header",[r("h3",{attrs:{slot:"header"},slot:"header"},[e._v(e._s(e.daySelected.day))])]),e._v(" "),e._t("body",[r("div",{attrs:{slot:"body"},slot:"body"},[r("div",{staticStyle:{"padding-bottom":"1em"}},[e._v(e._s("Temperatura mitja del dia: "+e.daySelected.dayTemperature))]),e._v(" "),r("div",[e._v(e._s("Temperatura mitja habitual de: "+Math.round(100*e.daySelected.normalDayTemperature)/100))])])])],2):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Modal:r(210).default})}}]);