(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/register"],{3297:function(t,e,o){"use strict";o.r(e);var n=o("44b5"),s=o("7aa5");for(var a in s)"default"!==a&&function(t){o.d(e,t,function(){return s[t]})}(a);o("4bec");var r=o("2877"),i=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=i.exports},"44b5":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},s=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return s})},"4bec":function(t,e,o){"use strict";var n=o("8f67"),s=o.n(n);s.a},"55f5":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(o("2120")),s=(a(o("199f")),a(o("c916")));function a(t){return t&&t.__esModule?t:{default:t}}var r=function(){return Promise.all([o.e("common/vendor"),o.e("components/input-box/input-box")]).then(o.bind(null,"fe9b"))},i={components:{inputBox:r},data:function(){return{message:"",account:"",content:"发送验证码",totalTime:120,canClick:!0,code:"",loginPassword:"",secondaryLoginPassword:"",securityPassword:"",secondarySecurityPassword:"",body:{userAccount:"",chartCode:"",msgCode:"",userName:"",loginPassword:"",secondaryLoginPassword:"",securityPassword:"",secondarySecurityPassword:"",recommenderAccount:""}}},methods:{countDown:function(){var t=this;if(this.canClick){this.canClick=!1;var e=window.setInterval(function(){t.totalTime--,t.content=t.totalTime+"s后重新发送",t.totalTime<0&&(window.clearInterval(e),t.content="重新发送验证码",t.totalTime=10,t.canClick=!0)},1e3)}},sendCodeMessage:function(){var e=this;n.default.config.header={Authorization:t.getStorageSync("token")};var o={Account:t.getStorageSync("account")};n.default.post("api/NoAuthorize/SendCodeMessage",o).then(function(t){1==t.data.StatusCode?(e.countDown(),e.message="验证码发送成功",e.$refs.toast.show()):(e.message=t.data.Message,e.$refs.toast.show())}).catch(function(t){e.message="请求失败",e.$refs.toast.show()})},submit:function(){var e=this,o=(0,s.default)(this.loginPassword.toString());this.body.loginPassword=(0,s.default)(o);var a=(0,s.default)(this.secondaryLoginPassword.toString());this.body.secondaryLoginPassword=(0,s.default)(a);var r=(0,s.default)(this.securityPassword.toString());this.body.securityPassword=(0,s.default)(r);var i=(0,s.default)(this.secondarySecurityPassword.toString());this.body.secondarySecurityPassword=(0,s.default)(i),n.default.post("api/NoAuthorize/Register",this.body).then(function(o){1==o.data.StatusCode?(e.message="注册成功，请登录",e.$refs.toast.show(),t.redirectTo({url:"../login/login"})):(e.message=o.data.Message,e.$refs.toast.show())}).catch(function(t){e.message="请求失败",e.$refs.toast.show()})}},mounted:function(){this.show()}};e.default=i}).call(this,o("6e42")["default"])},"7aa5":function(t,e,o){"use strict";o.r(e);var n=o("55f5"),s=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,function(){return n[t]})}(a);e["default"]=s.a},"8f67":function(t,e,o){}},[["c95b","common/runtime","common/vendor"]]]);