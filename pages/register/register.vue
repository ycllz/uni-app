<template>
	<!-- 注册 -->
	<view class="main">
		<view class="main-list">
			<input-box v-model="body.userAccount" ref="input1" :verification="['isNull','isPhoneNum']" :verificationTip="['手机号码不能为空','请输入正确的手机号']"
			 placeholder="请输入手机号" leftText="手机号:"></input-box>
			<input-box v-model="body.msgCode" ref="input2" placeholder="请输入验证码" :verification="['isNull']" :verificationTip="['验证码不能为空']"
			 @rightClick="sendCodeMessage" :rightText="content"></input-box>
			<input-box v-model="body.userName" ref="input3" :verification="['isNull']" :verificationTip="['用户名不能为空']"
			 placeholder="用户名" leftText="用户名:"></input-box>
			<input-box v-model="loginPassword" ref="input4" :verification="['isNull','isPassWord']" :verificationTip="['登录密码不能为空','登录密码必须是6-16位数字和字母的组成']"
			 placeholder="登录密码" leftText="登录密码:"></input-box>
			<input-box v-model="secondaryLoginPassword" ref="input5" :verification="['isNull','isPassWord']" :verificationTip="['确认密码不能为空','登录密码必须是6-16位数字和字母的组成']"
			 placeholder="确认登录密码" leftText="确认登录密码:"></input-box>
			<input-box v-model="securityPassword" ref="input6" :verification="['isNull','isInt']" :verificationTip="['二级密码不能为空','二级密码必须是数字']"
			 placeholder="必须输入6位数字" leftText="二级密码:"></input-box>
			<input-box v-model="secondarySecurityPassword" ref="input7" :verification="['isNull','isInt']" :verificationTip="['二级密码不能为空','二级密码必须是数字']"
			 placeholder="必须输入6位数字" leftText="确认二级密码:"></input-box>
			<input-box v-model="body.recommenderAccount" ref="input8" :verification="['isNull']" :verificationTip="['邀请码不能为空']"
			 placeholder="邀请账号" leftText="邀请码:"></input-box> 

			<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
				<button type="primary" @tap="submit">确认</button>
			</view> 
			
		</view>

		<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>
	</view>
</template>

<script>
	import inputBox from '@/components/input-box/input-box'
	import http from '@/common/vmeitime-http/interface.js'
	import regExpUtil from '@/common/regExpUtil.js'
	import md5 from 'js-md5'



	export default {
		components: {
			inputBox
		},
		data() {
			return {
				message: '',
				account: '',
				content: '发送验证码',
				totalTime: 120,
				canClick: true, //添加canClick
				code: '',
				loginPassword: "",
				secondaryLoginPassword: "",
				securityPassword: "",
				secondarySecurityPassword: "",
				msgCode: "",
				body: {
					userAccount: "",
					msgCode: "",
					userName: "",
					loginPassword: "",
					securityPassword: "",
					recommenderAccount: ""
				}
			}
		},
		/* onBackPress(options) {
			if (options.from === 'navigateBack') {
				uni.redirectTo({
					url: '../login/login'
				});
				return false;
			}
			this.back();
			return true;
		}, */
		methods: {
			//倒计时
			countDown() {
				if (!this.canClick) return //改动的是这两行代码
				this.canClick = false
				let clock = window.setInterval(() => {
					this.totalTime--
					this.content = this.totalTime + 's后重新发送'
					if (this.totalTime < 0) {
						window.clearInterval(clock)
						this.content = '重新发送验证码'
						this.totalTime = 10
						this.canClick = true //这里重新开启
					}
				}, 1000)
			},
			//发送验证码
			sendCodeMessage() {
				if(!regExpUtil.isPhoneNum(this.body.userAccount)){
					this.message = '请输入正确的手机号'
					this.$refs.toast.show()
					return
				}
				
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				//+this.account  todo
				let body = {
					'Account': this.body.userAccount
				}
				http.post('api/NoAuthorize/SendCodeMessage', body).then((res) => {
					if (res.data.StatusCode == 1) {
						//发送验证码(0：发送失败，1：发送成功，2：参数为空，3：重复发送短信
						if (res.data.Data == 1) {
							this.message = '发送成功'
							this.$refs.toast.show()
							this.countDown()
							
						} else if (res.data.Data == 0) {
							this.message = '发送失败'
							this.$refs.toast.show()
						} else if (res.data.Data == 2) {
							this.message = '参数为空'
							this.$refs.toast.show()
						}else if (res.data.Data == 3) {
							this.message = '重复发送短信'
							this.$refs.toast.show()
						}else{
							this.message = '发送失败'
							this.$refs.toast.show()
						}
					} else {
						this.message = res.data.Message
						this.$refs.toast.show()
					}
				}).catch((err) => {
					this.message = '请求失败'
					this.$refs.toast.show()
				})
			},
			submit() {
				if (this.$refs.input1.getValue() && this.$refs.input2.getValue() && this.$refs.input3.getValue() && this.$refs.input4.getValue() &&
					this.$refs.input5.getValue() && this.$refs.input6.getValue() && this.$refs.input7.getValue() && this.$refs.input8.getValue()
				) {
					console.log(this.loginPassword)
					console.log(this.secondaryLoginPassword)
					

					if (this.loginPassword != this.secondaryLoginPassword) {
						this.message = '两次登录密码不一致'
						this.$refs.toast.show()
						return
					}
					
					if(this.securityPassword.length != 6 || this.secondarySecurityPassword.length != 6){
						this.message = '二级密码必须是6位'
						this.$refs.toast.show()
						return
					}

					if (this.securityPassword != this.secondarySecurityPassword) {
						this.message = '两次二级密码不一致'
						this.$refs.toast.show()
						return
					}

					let p1 = md5(this.loginPassword.toString())
					this.body.loginPassword = md5(p1)

					
					let p3 = md5(this.securityPassword.toString())
					this.body.securityPassword = md5(p3)
					
					http.post('api/NoAuthorize/Register', this.body).then((res) => {
						if (res.data.StatusCode == 1) {
							this.message = '注册成功，请登录'
							this.$refs.toast.show()
							uni.redirectTo({
								url: '../login/login'
							});
						} else {
							this.message = res.data.Message
							this.$refs.toast.show()
						}
					}).catch((err) => {
						this.message = '请求失败'
						this.$refs.toast.show()
					})
				}
			},
		},
		mounted() {
			//this.show()
		}
	}
</script>

<style>
	.main {
		flex-direction: column;
		min-height: 100vh;
		background-color: #EFEFEF;
		padding-top: 15upx;
	}

	.main-list {
		background-color: #FFFFFF;
		width: 750upx;
		flex-direction: column;
		padding-bottom: 20px;
	}
</style>
