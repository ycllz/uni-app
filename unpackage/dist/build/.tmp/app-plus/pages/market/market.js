(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/market/market"],{"0a5e":function(e,t,a){"use strict";var s=a("759b"),n=a.n(s);n.a},5508:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement;e._self._c},n=[];a.d(t,"a",function(){return s}),a.d(t,"b",function(){return n})},"759b":function(e,t,a){},"7b17":function(e,t,a){"use strict";a.r(t);var s=a("9060"),n=a.n(s);for(var o in s)"default"!==o&&function(e){a.d(t,e,function(){return s[e]})}(o);t["default"]=n.a},"80bf":function(e,t,a){"use strict";a.r(t);var s=a("5508"),n=a("7b17");for(var o in n)"default"!==o&&function(e){a.d(t,e,function(){return n[e]})}(o);a("0a5e");var r=a("2877"),i=Object(r["a"])(n["default"],s["a"],s["b"],!1,null,null,null);t["default"]=i.exports},9060:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(a("2120")),n=o(a("199f"));function o(e){return e&&e.__esModule?e:{default:e}}var r=function(){return a.e("components/uni-tag/uni-tag").then(a.bind(null,"763b"))},i={components:{uniTag:r},data:function(){return{message:"",refreshing:!1,lists:[],msgId:"",timer:null,fetchPageNum:1}},onLoad:function(){},onShow:function(){this.getData()},onPullDownRefresh:function(){console.log("下拉刷新"," at pages\\market\\market.vue:89"),this.refreshing=!0,this.getData()},onReachBottom:function(){},methods:{getData:function(){var t=this;s.default.config.header={Authorization:e.getStorageSync("token")},s.default.post("api/TemplateInfo/GetCanSelledTemplateList").then(function(a){if(1==a.data.StatusCode){t.lists=[];for(var s=a.data.Data,n=0;n<s.length;n++)if(s[n].f_LevelStr=t.getLevelStr(s[n].f_Level),s[n].f_StatusStr=t.getStatusStr(s[n].f_Status),s[n].f_RateOfRateStr=(100*s[n].f_RateOfRate).toString().substr(0,2)+"%",n%2==0){var o={list:[]};o.id=n,o.list.push(s[n]),t.lists.push(o)}else t.lists[t.lists.length-1].id=n,t.lists[t.lists.length-1].list.push(s[n]);t.refreshing=!1,e.stopPullDownRefresh()}else console.log(a.data.Message," at pages\\market\\market.vue:123"),t.message=a.data.Message,t.$refs.toast.show()}).catch(function(a){t.refreshing=!1,e.stopPullDownRefresh(),t.message="请求失败",t.$refs.toast.show()})},getStatusStr:function(e){var t="可预约";switch(e){case 1:t="繁殖中";break;case 2:t="抢购";break;case 3:t="已预约";break;case 4:t="待预约";break}return t},getLevelStr:function(e){var t="其他";switch(e){case 1:t="普通";break;case 2:t="勇者";break;case 3:t="卓越";break;case 4:t="稀有";break}return t},diffSubscribe:function(t){var a=this;s.default.config.header={Authorization:e.getStorageSync("token")};var o=t.f_ID;if(4==t.f_Status){e.getStorageSync("account"),t.f_ReserveValue;s.default.post("api/UserInfo/DiffSubscribe?templateId="+o).then(function(e){1==e.data.StatusCode?(a.message="预约成功",a.$refs.toast.show(),a.getData()):(a.message=e.data.Message,a.$refs.toast.show())}).catch(function(e){a.message="请求失败",a.$refs.toast.show()})}else 2!=t.f_Status&&3!=t.f_Status||(this.$refs.loading.open(),s.default.post("api/Order/PlaceOrder?templateId="+o).then(function(e){1==e.data.StatusCode?(a.msgId=e.data.Data,n.default.isNullOrEmpty(a.msgId)?(a.$refs.loading.close(),a.message="预约失败",a.$refs.toast.show()):a.timer=setInterval(a.processResult,3e3)):(a.$refs.loading.close(),a.message=e.data.Message,a.$refs.toast.show())}).catch(function(e){a.$refs.loading.close(),a.message="请求失败",a.$refs.toast.show()}))},processResult:function(t){var a=this;s.default.config.header={Authorization:e.getStorageSync("token")},s.default.post("api/Order/ProcessResult?msgId="+this.msgId).then(function(e){1==e.data.StatusCode?(a.$refs.loading.close(),window.clearInterval(a.timer),a.timer=null,1==e.data.Data&&(a.message="领养成功",a.$refs.toast.show())):(window.clearInterval(a.timer),a.timer=null,a.$refs.loading.close(),a.message=e.data.Message,a.$refs.toast.show())}).catch(function(e){window.clearInterval(a.timer),a.timer=null,a.$refs.loading.close(),a.message="请求失败",a.$refs.toast.show()})}}};t.default=i}).call(this,a("6e42")["default"])}},[["56b6","common/runtime","common/vendor"]]]);