(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{212:function(e,t,r){var n=r(74),o=r(8),l=r(10),c=r(18).f,d=r(109),f=r(217),h=d("meta"),m=0,v=Object.isExtensible||function(){return!0},y=function(e){c(e,h,{value:{objectID:"O"+ ++m,weakData:{}}})},meta=e.exports={REQUIRED:!1,fastKey:function(e,t){if(!o(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!l(e,h)){if(!v(e))return"F";if(!t)return"E";y(e)}return e[h].objectID},getWeakData:function(e,t){if(!l(e,h)){if(!v(e))return!0;if(!t)return!1;y(e)}return e[h].weakData},onFreeze:function(e){return f&&meta.REQUIRED&&v(e)&&!l(e,h)&&y(e),e}};n[h]=!0},213:function(e,t,r){var content=r(220);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(52).default)("a06a53d0",content,!0,{sourceMap:!1})},214:function(e,t,r){"use strict";r(73),r(158),r(38),r(14),r(215),r(40),r(55),r(29);var n=r(6),o=r(108),l=["purple","indigo","blue","normal","yellow","orange","red"],c=[-5,-3.5,-1.5,1.5,3.5,5],d=function(e){(e=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()))).setUTCDate(e.getUTCDate()+4-(e.getUTCDay()||7));var t=new Date(Date.UTC(e.getUTCFullYear(),0,1));return Math.ceil(((e-t)/864e5+1)/7)},f=function(e,t,r){var n=[{key:"blue",popover:{label:"Temperatura mitja >1.5º per baix del normal"},highlight:{contentClass:"anomaly-cold--1",fillMode:"light"},dates:[]},{key:"indigo",popover:{label:"Temperatura mitja >3.5º per baix del normal"},highlight:{contentClass:"anomaly-cold--2",fillMode:"light"},dates:[]},{key:"purple",popover:{label:"Temperatura mitja >5º per baix del normal"},highlight:{contentClass:"anomaly-cold--3",fillMode:"light"},dates:[]},{key:"red",popover:{label:"Temperatura mitja >5º per dalt del normal"},highlight:{contentClass:"anomaly-hot--3",fillMode:"light"},dates:[]},{key:"orange",popover:{label:"Temperatura mitja >3.5º per dalt del normal"},highlight:{contentClass:"anomaly-hot--2",fillMode:"light"},dates:[]},{key:"yellow",popover:{label:"Temperatura mitja >1.5º per dalt del normal"},highlight:{contentClass:"anomaly-hot--1",fillMode:"light"},dates:[]},{key:"normal",popover:{label:"Temperatura mitja normal per a la data"},highlight:{contentClass:"normal",fillMode:"light"},dates:[]}],l=new Date("01-01-".concat(r)),c=new Date;r!==o.a&&new Date("12-31-".concat(r));for(var d=0,f=function(){var r=new Date(l),o=m(e,t,l,d);d++;var c=h(o),f=n.find((function(e){return e.key===c}));f&&f.dates.push(r),l.setDate(l.getDate()+1)};l<c;)f();return n},h=function(e){return e<c[0]?l[0]:e>=c[0]&&e<c[1]?l[1]:e>=c[1]&&e<c[2]?l[2]:e>=c[2]&&e<c[3]?l[3]:e>=c[3]&&e<c[4]?l[4]:e>=c[4]&&e<=c[5]?l[5]:l[6]},m=function(e,t,r,n){try{var o=d(r),l=t.aggregations[2].buckets.find((function(e){return e.key===o}))[1].value;return e.hits.hits[n]._source.t_avg-l}catch(e){return null}};t.a={data:function(){return{daySelected:null,showDateInfo:!1,calculatedDates:[],created:!1,calendar:null,visitedYearSet:new Set,currentYear:o.a}},asyncData:function(e){return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,l,c,d,h;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=(r=(r=parseInt(e.route.name))||o.a)===o.a?"":"-".concat(r),t.next=5,fetch("https://sergitopo.github.io/temperature-calendar/client/page/"+"daily-temperatures".concat(r,".json"),{method:"GET",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 5:return n=t.sent,t.next=8,n.json();case 8:return l=t.sent,t.next=11,fetch("https://sergitopo.github.io/temperature-calendar/client/page/weekly-avg.json",{method:"GET",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 11:return c=t.sent,t.next=14,c.json();case 14:return d=t.sent,h=f(l,d,parseInt(e.route.name)),t.abrupt("return",{calculatedDates:h,dates:h,dailyTemperature:l,weekOfYearAvg:d});case 17:case"end":return t.stop()}}),t)})))()},mounted:function(){var e=this;this.visitedYearSet.add(this.year),this.created=!0,this.$nextTick((function(){e.calendar=e.$refs.calendar,e.year===e.currentYear&&e.calendar.focusDate&&e.calendar.focusDate(new Date)}))},methods:{requestData:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.year===e.currentYear?"":"-".concat(e.year),t.next=3,fetch("".concat("https://sergitopo.github.io/temperature-calendar/client/page/","daily-temperatures").concat(r,".json"),{method:"GET",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 3:return n=t.sent,t.next=6,n.json();case 6:return e.dailyTemperature=t.sent,t.next=9,fetch("https://sergitopo.github.io/temperature-calendar/client/page/weekly-avg.json",{method:"GET",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"origin"});case 9:return o=t.sent,t.next=12,o.json();case 12:e.weekOfYearAvg=t.sent,e.calculatedDates=f(e.dailyTemperature,e.weekOfYearAvg,parseInt(e.year));case 14:case"end":return t.stop()}}),t)})))()},onYearChange:function(e){e.year!==this.year||!0!==this.create?this.$router.push("/".concat(e.year)):this.created=!1},getDayTemperatures:function(e){var t=this.getWeekNumber(e.date),r=Math.round(Math.abs((e.date-new Date("01-01-".concat(this.year)))/864e5)),n=this.weekOfYearAvg.aggregations[2].buckets.find((function(e){return e.key===t}))[1].value,o=this.dailyTemperature.hits.hits[r]._source.t_avg;console.log(o),console.log(n),this.daySelected={day:e.ariaLabel,dayTemperature:o,normalDayTemperature:n},this.showDateInfo=!0},getWeekNumber:function(e){return d(e)}}}},215:function(e,t,r){"use strict";var n=r(216),o=r(218);e.exports=n("Set",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),o)},216:function(e,t,r){"use strict";var n=r(2),o=r(3),l=r(53),c=r(15),d=r(212),f=r(156),h=r(72),m=r(8),v=r(5),y=r(157),x=r(41),w=r(113);e.exports=function(e,t,r){var k=-1!==e.indexOf("Map"),D=-1!==e.indexOf("Weak"),T=k?"set":"add",C=o[e],_=C&&C.prototype,j=C,E={},S=function(e){var t=_[e];c(_,e,"add"==e?function(e){return t.call(this,0===e?0:e),this}:"delete"==e?function(e){return!(D&&!m(e))&&t.call(this,0===e?0:e)}:"get"==e?function(e){return D&&!m(e)?void 0:t.call(this,0===e?0:e)}:"has"==e?function(e){return!(D&&!m(e))&&t.call(this,0===e?0:e)}:function(e,r){return t.call(this,0===e?0:e,r),this})};if(l(e,"function"!=typeof C||!(D||_.forEach&&!v((function(){(new C).entries().next()})))))j=r.getConstructor(t,e,k,T),d.REQUIRED=!0;else if(l(e,!0)){var M=new j,O=M[T](D?{}:-0,1)!=M,z=v((function(){M.has(1)})),I=y((function(e){new C(e)})),Y=!D&&v((function(){for(var e=new C,t=5;t--;)e[T](t,t);return!e.has(-0)}));I||((j=t((function(t,r){h(t,j,e);var n=w(new C,t,j);return null!=r&&f(r,n[T],{that:n,AS_ENTRIES:k}),n}))).prototype=_,_.constructor=j),(z||Y)&&(S("delete"),S("has"),k&&S("get")),(Y||O)&&S(T),D&&_.clear&&delete _.clear}return E[e]=j,n({global:!0,forced:j!=C},E),x(j,e),D||r.setStrong(j,e,k),j}},217:function(e,t,r){var n=r(5);e.exports=!n((function(){return Object.isExtensible(Object.preventExtensions({}))}))},218:function(e,t,r){"use strict";var n=r(18).f,o=r(54),l=r(111),c=r(39),d=r(72),f=r(156),h=r(110),m=r(112),v=r(9),y=r(212).fastKey,x=r(24),w=x.set,k=x.getterFor;e.exports={getConstructor:function(e,t,r,h){var m=e((function(e,n){d(e,m,t),w(e,{type:t,index:o(null),first:void 0,last:void 0,size:0}),v||(e.size=0),null!=n&&f(n,e[h],{that:e,AS_ENTRIES:r})})),x=k(t),D=function(e,t,r){var n,o,l=x(e),c=T(e,t);return c?c.value=r:(l.last=c={index:o=y(t,!0),key:t,value:r,previous:n=l.last,next:void 0,removed:!1},l.first||(l.first=c),n&&(n.next=c),v?l.size++:e.size++,"F"!==o&&(l.index[o]=c)),e},T=function(e,t){var r,n=x(e),o=y(t);if("F"!==o)return n.index[o];for(r=n.first;r;r=r.next)if(r.key==t)return r};return l(m.prototype,{clear:function(){for(var e=x(this),data=e.index,t=e.first;t;)t.removed=!0,t.previous&&(t.previous=t.previous.next=void 0),delete data[t.index],t=t.next;e.first=e.last=void 0,v?e.size=0:this.size=0},delete:function(e){var t=x(this),r=T(this,e);if(r){var n=r.next,o=r.previous;delete t.index[r.index],r.removed=!0,o&&(o.next=n),n&&(n.previous=o),t.first==r&&(t.first=n),t.last==r&&(t.last=o),v?t.size--:this.size--}return!!r},forEach:function(e){for(var t,r=x(this),n=c(e,arguments.length>1?arguments[1]:void 0,3);t=t?t.next:r.first;)for(n(t.value,t.key,this);t&&t.removed;)t=t.previous},has:function(e){return!!T(this,e)}}),l(m.prototype,r?{get:function(e){var t=T(this,e);return t&&t.value},set:function(e,t){return D(this,0===e?0:e,t)}}:{add:function(e){return D(this,e=0===e?0:e,e)}}),v&&n(m.prototype,"size",{get:function(){return x(this).size}}),m},setStrong:function(e,t,r){var n=t+" Iterator",o=k(t),l=k(n);h(e,t,(function(e,t){w(this,{type:n,target:e,state:o(e),kind:t,last:void 0})}),(function(){for(var e=l(this),t=e.kind,r=e.last;r&&r.removed;)r=r.previous;return e.target&&(e.last=r=r?r.next:e.state.first)?"keys"==t?{value:r.key,done:!1}:"values"==t?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:(e.target=void 0,{value:void 0,done:!0})}),r?"entries":"values",!r,!0),m(t)}}},219:function(e,t,r){"use strict";r(213)},220:function(e,t,r){(t=r(51)(!1)).push([e.i,".modal-mask{position:fixed;z-index:9998;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);display:table;transition:opacity .3s ease}.modal-wrapper{display:table-cell;vertical-align:middle}.modal-container{width:300px;margin:0 auto;padding:20px 30px;background-color:#fff;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.33);transition:all .3s ease;font-family:Helvetica,Arial,sans-serif}.modal-header h3{margin-top:0;color:#42b983}.modal-body{margin:20px 0}.modal-default-button{float:right}.modal-enter,.modal-leave-active{opacity:0}.modal-enter .modal-container,.modal-leave-active .modal-container{transform:scale(1.1)}.vc-day-content{width:calc(var(--day-content-width) + 10px)!important}",""]),e.exports=t},221:function(e,t,r){"use strict";r.r(t);var n={name:"modal"},o=(r(219),r(13)),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("transition",{attrs:{name:"modal"}},[r("div",{staticClass:"modal-mask"},[r("div",{staticClass:"modal-wrapper"},[r("div",{staticClass:"modal-container"},[r("div",{staticClass:"modal-header"},[e._t("header",[e._v("\r\n                  default header\r\n                ")])],2),e._v(" "),r("div",{staticClass:"modal-body"},[e._t("body",[e._v("\r\n                  default body\r\n                ")])],2),e._v(" "),r("div",{staticClass:"modal-footer"},[e._t("footer",[r("button",{staticClass:"modal-default-button",on:{click:function(t){return e.$emit("close")}}},[e._v("\r\n                    OK\r\n                  ")])])],2)])])])])}),[],!1,null,null,null);t.default=component.exports},222:function(e,t,r){var content=r(225);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(52).default)("3db2afea",content,!0,{sourceMap:!1})},224:function(e,t,r){"use strict";r(222)},225:function(e,t,r){(t=r(51)(!1)).push([e.i,"#app{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50;margin-top:60px}.normal{background-color:#f7f7f7}.anomaly-hot--1{background-color:#fddbc7}.anomaly-hot--2{background-color:#ef8a62}.anomaly-hot--3{background-color:#b2182b}.anomaly-cold--1{background-color:#d1e5f0}.anomaly-cold--2{background-color:#67a9cf}.anomaly-cold--3{background-color:#2166ac}.vc-rounded-full{border-radius:0!important}.phone-viewport{position:fixed;bottom:1px;width:100vw;z-index:2}.vc-day-content{width:calc(var(--day-content-width) + 10px)!important}.vc-w-full.vc-relative{padding-bottom:3rem}.avoid-back-arrow .vc-arrows-container.title-center>div:first-child,.avoid-forward-arrow .vc-arrows-container.title-center>div:last-child{display:none}.md-bottom-bar.md-type-fixed .md-bottom-bar-item{min-width:80px;max-width:unset;transition:.4s cubic-bezier(.4,0,.2,1);transition-property:color;will-change:color}",""]),e.exports=t},229:function(e,t,r){"use strict";r.r(t);var n=r(214),o=r(108),l={name:"App",data:function(){return{year:o.a}},layout:"menu",created:function(){this.requestData()},mixins:[n.a]},c=(r(224),r(13)),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[e.created?r("calendar",{ref:"calendar",staticClass:"avoid-forward-arrow temperature-calendar",attrs:{"from-date":new Date("01-01-"+this.year),"to-date":new Date,attributes:e.calculatedDates,"is-expanded":"",columns:e.$screens({lg:4,md:2},1),rows:e.$screens({lg:3,md:6},12)},on:{dayclick:e.getDayTemperatures,"update:to-page":e.onYearChange,"update:from-page":e.onYearChange}}):e._e(),e._v(" "),e.showDateInfo?r("modal",{on:{close:function(t){e.showDateInfo=!1}}},[e._t("header",[r("h3",{attrs:{slot:"header"},slot:"header"},[e._v(e._s(e.daySelected.day))])]),e._v(" "),e._t("body",[r("div",{attrs:{slot:"body"},slot:"body"},[r("div",{staticStyle:{"padding-bottom":"1em"}},[e._v(e._s("Temperatura mitja del dia: "+e.daySelected.dayTemperature))]),e._v(" "),r("div",[e._v(e._s("Temperatura mitja habitual de: "+Math.round(100*e.daySelected.normalDayTemperature)/100))])])])],2):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Modal:r(221).default})},235:function(e,t,r){"use strict";r.r(t);var n={layout:"menu"},o=r(13),component=Object(o.a)(n,(function(){var e=this.$createElement;return(this._self._c||e)("current-year")}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{CurrentYear:r(229).default})}}]);