<template>
	<!-- 忘记密码 第二步 -->
	<view class="main">
		<view class="main-list">
			<view class="text-box">
				<text class="td">{{account}}</text>
			</view>
			<!-- <input-box v-model="account" :clearShow="false" leftText="账号:"></input-box> -->
			<input-box v-model="newPassword" ref="input1" :verification="['isNull','isPassWord']" :verificationTip="['密码不能为空','密码必须是6-16位数字和字母的组成']"
			 placeholder="新密码" leftText="新密码:" :clearShow="false"></input-box>
			<input-box v-model="confimNewPassword" placeholder="确认新密码" ref="input2" :verification="['isNull','isPassWord']"
			 :verificationTip="['密码不能为空','密码必须是6-16位数字和字母的组成']" leftText="新密码:" :clearShow="false"></input-box>
			<input-box v-model="code" ref="input3" placeholder="请输入验证码" :verification="['isNull']" :verificationTip="['验证码不能为空']"
			 @rightClick="sendCodeMessage" :rightText="content" :clearShow="false"></input-box>
		</view>
		<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
			<button type="primary" @tap="submit">确认</button>
		</view>
	</view>
</template>

<script>
	import inputBox from '@/components/input-box/input-box'
	import http from '@/common/vmeitime-http/interface.js'
	import md5 from 'js-md5'


	export default {
		components: {
			inputBox
		},
		data() {
			return {
				message: '',
				content: '发送验证码',
				totalTime: 120,
				canClick: true, //添加canClick
				newPassword: '',
				confimNewPassword: '',
				code: '',
				account: '',
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			//忘记密码的账号
			console.log("-----------------" + option.value)

			this.account = option.value
			/* setTimeout(function() {
				that.account = a
			}, 1500); */
		},
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
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				let body = {
					'Account': this.account
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
				if (this.$refs.input1.getValue() && this.$refs.input2.getValue() && this.$refs.input3.getValue()) {

					if (this.newPassword != this.confimNewPassword) {
						uni.showToast({
							title: '两次新密码不一致',
							icon: 'none'
						});
						return
					}

					http.config.header = {
						'Authorization': uni.getStorageSync("token")
					}

					let p1 = md5(this.newPassword.toString())
					let p2 = md5(p1)

					let body = {
						account: this.account,
						password: p2,
						codeMsg: this.code
					}
					http.post('api/NoAuthorize/RetrievePassword', body).then((res) => {
						if (res.data.StatusCode == 1) {
							//找回密码(0：处理失败，1：处理成功，2：验证码失效，3：验证码不正确，4：参数为空，5：用户不存在
							if (res.data.Data == 1) {
								uni.showToast({
									title: '处理成功,即将返回登录页面',
									icon: 'none'
								});
								setTimeout(function() {
									//返回2个页面
									uni.navigateBack({
										delta: 2
									});
								}, 1500);

							} else if (res.data.Data == 0) {
								uni.showToast({
									title: '处理失败',
									icon: 'none'
								});
							} else if (res.data.Data == 2) {
								uni.showToast({
									title: '验证码失效',
									icon: 'none'
								});
							} else if (res.data.Data == 3) {
								uni.showToast({
									title: '验证码不正确',
									icon: 'none'
								});
							} else if (res.data.Data == 4) {
								uni.showToast({
									title: '参数为空',
									icon: 'none'
								});
							} else if (res.data.Data == 5) {
								uni.showToast({
									title: '用户不存在',
									icon: 'none'
								});
							} else if (res.data.Data == 6) {
								uni.showToast({
									title: '新密码不能与旧密码相同',
									icon: 'none'
								});
							} else {
								uni.showToast({
									title: '处理失败',
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
	}

	.account {
		border-bottom: 2upx solid #F5F5F5;
		border-top: 2upx solid #F5F5F5;
		height: 88upx;
		line-height: 88upx;
		margin-left: 30upx;
	}

	.text-box {
		height: 90upx;
		vertical-align: middle;
		border-bottom: 2upx solid #F5F5F5;
		display: inline-block;
		line-height: 90upx;
		color: #4A4A4A;
		font-size: 32upx;
	}

	.text-box .td {
		margin-left: 30upx;
	}
</style>
