(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/register"],{3297:function(t,e,o){"use strict";o.r(e);var a=o("9a3a"),n=o("7aa5");for(var s in n)"default"!==s&&function(t){o.d(e,t,function(){return n[t]})}(s);o("4bec");var r=o("2877"),i=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=i.exports},"4bec":function(t,e,o){"use strict";var a=o("8f67"),n=o.n(a);n.a},"55f5":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=s(o("2120")),n=(s(o("199f")),s(o("c916")));function s(t){return t&&t.__esModule?t:{default:t}}var r=function(){return Promise.all([o.e("common/vendor"),o.e("components/input-box/input-box")]).then(o.bind(null,"fe9b"))},i={components:{inputBox:r},data:function(){return{message:"",account:"",content:"发送验证码",totalTime:120,canClick:!0,code:"",loginPassword:"",secondaryLoginPassword:"",securityPassword:"",secondarySecurityPassword:"",body:{userAccount:"",chartCode:"",msgCode:"",userName:"",loginPassword:"",secondaryLoginPassword:"",securityPassword:"",secondarySecurityPassword:"",recommenderAccount:""}}},methods:{countDown:function(){var t=this;if(this.canClick){this.canClick=!1;var e=window.setInterval(function(){t.totalTime--,t.content=t.totalTime+"s后重新发送",t.totalTime<0&&(window.clearInterval(e),t.content="重新发送验证码",t.totalTime=10,t.canClick=!0)},1e3)}},sendCodeMessage:function(){var e=this;a.default.config.header={Authorization:t.getStorageSync("token")};var o={Account:"15882039655"};a.default.post("api/NoAuthorize/SendCodeMessage",o).then(function(t){1==t.data.StatusCode?(e.countDown(),e.message="验证码发送成功",e.$refs.toast.show()):(e.message=t.data.Message,e.$refs.toast.show())}).catch(function(t){e.message="请求失败",e.$refs.toast.show()})},submit:function(){var e=this,o=(0,n.default)(this.loginPassword.toString());this.body.loginPassword=(0,n.default)(o);var s=(0,n.default)(this.secondaryLoginPassword.toString());this.body.secondaryLoginPassword=(0,n.default)(s);var r=(0,n.default)(this.securityPassword.toString());this.body.securityPassword=(0,n.default)(r);var i=(0,n.default)(this.secondarySecurityPassword.toString());this.body.secondarySecurityPassword=(0,n.default)(i),a.default.post("api/NoAuthorize/Register",this.body).then(function(o){1==o.data.StatusCode?(e.message="注册成功，请登录",e.$refs.toast.show(),t.navigateBack({delta:1})):(e.message=o.data.Message,e.$refs.toast.show())}).catch(function(t){e.message="请求失败",e.$refs.toast.show()})}},mounted:function(){this.show()}};e.default=i}).call(this,o("6e42")["default"])},"7aa5":function(t,e,o){"use strict";o.r(e);var a=o("55f5"),n=o.n(a);for(var s in a)"default"!==s&&function(t){o.d(e,t,function(){return a[t]})}(s);e["default"]=n.a},"8f67":function(t,e,o){},"9a3a":function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},n=[];o.d(e,"a",function(){return a}),o.d(e,"b",function(){return n})}},[["c95b","common/runtime","common/vendor"]]]);