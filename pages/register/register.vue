<template>
	<!-- 注册 -->
	<view class="main">
		<view class="main-list">
			<input-box v-model="body.userAccount" ref="input1" :verification="['isNull','isPhoneNum']" :verificationTip="['手机号码不能为空','请输入正确的手机号']"
			 placeholder="请输入手机号" leftText="手机号:" :clearShow="false"></input-box>
			<input-box v-model="body.msgCode" ref="input2" placeholder="请输入验证码" :verification="['isNull']" :verificationTip="['验证码不能为空']"
			 @rightClick="sendCodeMessage" :rightText="content" :clearShow="false"></input-box>
			<input-box v-model="body.userName" ref="input3" :verification="['isNull','isChineseEnlishAndNumber']"
			 :verificationTip="['用户名不能为空','用户名不能包含特殊字符']" placeholder="用户名" leftText="用户名:" :clearShow="false"></input-box>
			<input-box v-model="loginPassword" ref="input4" :verification="['isNull','isPassWord']" :verificationTip="['登录密码不能为空','登录密码必须是6-16位数字和字母的组成']"
			 placeholder="登录密码" leftText="登录密码:" :clearShow="false"></input-box>
			<input-box v-model="secondaryLoginPassword" ref="input5" :verification="['isNull','isPassWord']" :verificationTip="['确认密码不能为空','登录密码必须是6-16位数字和字母的组成']"
			 placeholder="确认登录密码" leftText="确认登录密码:" :clearShow="false"></input-box>
			<input-box v-model="securityPassword" ref="input6" :verification="['isNull','isInt']" :verificationTip="['二级密码不能为空','二级密码必须是数字']"
			 placeholder="必须输入6位数字" leftText="二级密码:" :clearShow="false"></input-box>
			<input-box v-model="secondarySecurityPassword" ref="input7" :verification="['isNull','isInt']" :verificationTip="['二级密码不能为空','二级密码必须是数字']"
			 placeholder="必须输入6位数字" leftText="确认二级密码:" :clearShow="false"></input-box>
			<input-box v-model="body.recommenderAccount" ref="input8" :verification="['isNull']" :verificationTip="['邀请码不能为空']"
			 placeholder="邀请账号" leftText="邀请账号:" :clearShow="false"></input-box>

			<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
				<button type="primary" @tap="submit">确认</button>
			</view>

		</view>

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
				if (!regExpUtil.isPhoneNum(this.body.userAccount)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
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
							uni.showToast({
								title: '发送成功',
								icon: 'none'
							});

							this.countDown()
						} else if (res.data.Data == 0) {
							uni.showToast({
								title: '发送失败',
								icon: 'none'
							});
						} else if (res.data.Data == 2) {
							uni.showToast({
								title: '参数为空',
								icon: 'none'
							});
						} else if (res.data.Data == 3) {
							uni.showToast({
								title: '重复发送短信',
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: '发送失败',
								icon: 'none'
							});
						}
					} else {
						uni.showToast({
							title: res.data.Message,
							icon: 'none'
						});
					}
				}).catch((err) => {
					uni.showToast({
						title: '网络繁忙，请稍后重试',
						icon: 'none'
					});
				})
			},
			submit() {
				if (this.$refs.input1.getValue() && this.$refs.input2.getValue() && this.$refs.input3.getValue() && this.$refs.input4
					.getValue() &&
					this.$refs.input5.getValue() && this.$refs.input6.getValue() && this.$refs.input7.getValue() && this.$refs.input8.getValue()
				) {
					console.log(this.loginPassword)
					console.log(this.secondaryLoginPassword)


					if (this.loginPassword != this.secondaryLoginPassword) {
						uni.showToast({
							title: '两次登录密码不一致',
							icon: 'none'
						});
						return
					}

					if (this.securityPassword.length != 6 || this.secondarySecurityPassword.length != 6) {
						uni.showToast({
							title: '二级密码必须是6位',
							icon: 'none'
						});
						return
					}

					if (this.securityPassword != this.secondarySecurityPassword) {
						uni.showToast({
							title: '两次二级密码不一致',
							icon: 'none'
						});
						return
					}

					let p1 = md5(this.loginPassword.toString())
					this.body.loginPassword = md5(p1)


					let p3 = md5(this.securityPassword.toString())
					this.body.securityPassword = md5(p3)

					http.post('api/NoAuthorize/Register', this.body).then((res) => {
						if (res.data.StatusCode == 1) {
							//注册（0：注册失败，1：注册成功，2：验证码已失效，3：验证码不正确
							if (res.data.Data == 0) {
								uni.showToast({
									title: '注册失败',
									icon: 'none'
								});
							} else if (res.data.Data == 1) {
								uni.showToast({
									title: '注册成功，即将跳转到登录页',
									icon: 'none'
								});

								setTimeout(function() {
									uni.redirectTo({
										url: '../login/login'
									});
								}, 1500);

							} else if (res.data.Data == 2) {
								uni.showToast({
									title: '验证码已失效',
									icon: 'none'
								});
							} else if (res.data.Data == 3) {
								uni.showToast({
									title: '验证码不正确',
									icon: 'none'
								});
							} else {
								uni.showToast({
									title: '注册失败',
									icon: 'none'
								});
							}

						} else {
							uni.showToast({
								title: res.data.Message,
								icon: 'none'
							});
						}
					}).catch((err) => {
						uni.showToast({
							title: '网络繁忙，请稍后重试',
							icon: 'none'
						});
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
