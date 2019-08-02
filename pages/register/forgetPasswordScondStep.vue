<template>
	<!-- 忘记密码 第二步 -->
	<view class="main">
		<view class="main-list">
			<input-box :inputValue="account" disabled="true" :clearShow="false" leftText="账号:"></input-box>
			<input-box v-model="newPassword" placeholder="新密码" leftText="新密码:"></input-box>
			<input-box v-model="confimNewPassword" placeholder="确认新密码" leftText="新密码:"></input-box>
			<input-box v-model="code" placeholder="请输入验证码" @rightClick="countDown" :rightText="content"></input-box>
		</view>
		<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
			<button type="primary" @tap="submit">确认</button>
		</view>
		<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>
	</view>
</template>

<script>
	import inputBox from '@/components/input-box/input-box'
	import http from '@/common/vmeitime-http/interface.js'
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
				newPassword: '',
				confimNewPassword: '',
				code: '',
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			//忘记密码的账号
			this.account = option.value
		},
		methods: {
			//倒计时
			countDown() {
				if (!this.canClick) return //改动的是这两行代码
				this.canClick = false
				this.sendCodeMessage()
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
					'Account': '15882039655'
				}
				http.post('api/NoAuthorize/SendCodeMessage',body).then((res) => {
					if (res.data.StatusCode == 1) {
						this.message = '验证码发送成功'
						this.$refs.toast.show()
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
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				this.account = uni.getStorageSync("account")
				let body = {
					account: this.account,
					password: this.newPassword,
					msg: this.code
				}
				http.post('api/NoAuthorize/RetrievePassword', body).then((res) => {
					if (res.data.StatusCode == 1) {

					} else {
						this.message = res.data.Message
						this.$refs.toast.show()
					}
				}).catch((err) => {
					this.message = '请求失败'
					this.$refs.toast.show()
				})
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
</style>
