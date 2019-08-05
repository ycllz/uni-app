<template>
	<!-- 注册 -->
	<view class="main">
		<view class="main-list">
			<input-box v-model="body.userAccount" placeholder="请输入手机号" leftText="手机号:"></input-box>
			<input-box v-model="body.msgCode" placeholder="请输入验证码" @rightClick="sendCodeMessage" :rightText="content"></input-box>
			<input-box v-model="body.userName" placeholder="用户名" leftText="用户名:"></input-box>
			<input-box v-model="loginPassword" placeholder="登录密码" leftText="登录密码:"></input-box>
			<input-box v-model="secondaryLoginPassword" placeholder="确认登录密码" leftText="确认登录密码:"></input-box>
			<input-box v-model="securityPassword" placeholder="必须输入6位数字" leftText="二级密码:"></input-box>
			<input-box v-model="secondaryLoginPassword" placeholder="必须输入6位数字" leftText="确认二级密码:"></input-box>
			<input-box v-model="body.recommenderAccount" placeholder="邀请码" leftText="邀请码:"></input-box>

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
				body: {
					userAccount: "",
					chartCode: "",
					msgCode: "",
					userName: "",
					loginPassword: "",
					secondaryLoginPassword: "",
					securityPassword: "",
					secondarySecurityPassword: "",
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
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				//+this.account  todo
				let body = {
					'Account': uni.getStorageSync("account")
				}
				http.post('api/NoAuthorize/SendCodeMessage', body).then((res) => {
					if (res.data.StatusCode == 1) {
						this.countDown()
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


				let p1 = md5(this.loginPassword.toString())
				this.body.loginPassword = md5(p1)

				let p2 = md5(this.secondaryLoginPassword.toString())
				this.body.secondaryLoginPassword = md5(p2)

				let p3 = md5(this.securityPassword.toString())
				this.body.securityPassword = md5(p3)

				let p4 = md5(this.secondarySecurityPassword.toString())
				this.body.secondarySecurityPassword = md5(p4)



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
			},
		},
		mounted() {
			this.show()
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
