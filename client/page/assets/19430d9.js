(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{218:function(e,t,d){"use strict";d.r(t);var r={name:"App",layout:"menu",data:function(){return{year:2017}},mixins:[d(202).a]},n=d(8),component=Object(n.a)(r,(function(){var e=this,t=e.$createElement,d=e._self._c||t;return d("div",{attrs:{id:"app"}},[e.created?d("calendar",{ref:"calendar",class:{"avoid-back-arrow":2016===this.year},attrs:{"from-date":new Date("01-01-"+this.year),"to-date":new Date,attributes:e.calculatedDates,"is-expanded":"",columns:e.$screens({lg:4,md:2},1),rows:e.$screens({lg:3,md:6},12)},on:{dayclick:e.getDayTemperatures,"update:to-page":e.onYearChange,"update:from-page":e.onYearChange}}):e._e(),e._v(" "),e.showDateInfo?d("modal",{on:{close:function(t){e.showDateInfo=!1}}},[e._t("header",[d("h3",{attrs:{slot:"header"},slot:"header"},[e._v(e._s(e.daySelected.day))])]),e._v(" "),e._t("body",[d("div",{attrs:{slot:"body"},slot:"body"},[d("div",{staticStyle:{"padding-bottom":"1em"}},[e._v(e._s("Temperatura mitja del dia: "+e.daySelected.dayTemperature))]),e._v(" "),d("div",[e._v(e._s("Temperatura mitja habitual de: "+Math.round(100*e.daySelected.normalDayTemperature)/100))])])])],2):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Modal:d(203).default})}}]);