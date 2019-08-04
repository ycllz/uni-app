(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/w-loading"],{"5e08":function(n,t,o){"use strict";var e=o("bfae"),a=o.n(e);a.a},"75a1":function(n,t,o){"use strict";o.r(t);var e=o("abc1"),a=o.n(e);for(var c in e)"default"!==c&&function(n){o.d(t,n,function(){return e[n]})}(c);t["default"]=a.a},"794f":function(n,t,o){"use strict";o.r(t);var e=o("d567"),a=o("75a1");for(var c in a)"default"!==c&&function(n){o.d(t,n,function(){return a[n]})}(c);o("5e08");var u=o("2877"),i=Object(u["a"])(a["default"],e["a"],e["b"],!1,null,null,null);t["default"]=i.exports},abc1:function(n,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={name:"w-loading",props:{text:String,mask:Boolean|String,click:Boolean|String},data:function(){return{show:!1}},methods:{preventTouchMove:function(){console.log("stop user scroll it!"," at common\\w-loading.vue:30")},Mclose:function(){"false"!=this.click&&0!=this.click||(this.show=!1)},open:function(){this.show=!0},close:function(){this.show=!1}}};t.default=e},bfae:function(n,t,o){},d567:function(n,t,o){"use strict";var e=function(){var n=this,t=n.$createElement;n._self._c},a=[];o.d(t,"a",function(){return e}),o.d(t,"b",function(){return a})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'common/w-loading-create-component',
    {
        'common/w-loading-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("794f"))
        })
    },
    [['common/w-loading-create-component']]
]);                
