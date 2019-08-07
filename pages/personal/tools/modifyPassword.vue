<template>
	<view class="center">
		<view class="center-list" style="margin-top: 20upx;">
			<template v-if="type == 1">
				<input-box v-model="newPassword" placeholder="新密码" ref="input1" :verification="['isNull','isPassWord']"
				 :verificationTip="['密码不能为空','密码必须是6-16位数字和字母的组成']" leftText="新密码:"></input-box>
				<input-box v-model="confimNewPassword" placeholder="确认新密码" ref="input2" :verification="['isNull','isPassWord']"
				 :verificationTip="['密码不能为空','密码必须是6-16位数字和字母的组成']" leftText="新密码:"></input-box>
				<input-box v-model="codemsg" placeholder="请输入验证码" ref="input3" :verification="['isNull']" :verificationTip="['验证码不能为空']"
				 @rightClick="sendCodeMessage" :rightText="content"></input-box>
			</template>
			<template v-else-if="type == 2">
				<input-box v-model="newPassword" placeholder="新密码" ref="input4" :verification="['isNull','isInt']" :verificationTip="['二级密码不能为空','二级密码必须是数字']"
				 leftText="新密码:"></input-box>
				<input-box v-model="confimNewPassword" placeholder="确认新密码" ref="input5" :verification="['isNull','isInt']"
				 :verificationTip="['二级密码不能为空','二级密码必须是数字']" leftText="新密码:"></input-box>
				<input-box v-model="codemsg" placeholder="请输入验证码" ref="input6" :verification="['isNull']" :verificationTip="['验证码不能为空']"
				 @rightClick="sendCodeMessage" :rightText="content"></input-box>
			</template>


		</view>

		<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
			<button type="primary" @tap="submitModify">确认修改</button>
		</view>
	</view>
</template>

<script>
	import inputBox from '@/components/input-box/input-box'
	import http from '@/common/vmeitime-http/interface.js'
	import md5 from 'js-md5'

	export default {
		data() {
			return {
				content: '发送验证码',
				totalTime: 120,
				canClick: true, //添加canClick
				message: '',
				type: 0,
				code: '',
				oldPassword: '',
				newPassword: '',
				confimNewPassword: '',
				codemsg: '',
			}
		},
		components: {
			inputBox
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.type = option.type
		},
		methods: {

			validate() {
				//登录密码
				if (this.type == 1) {
					if (this.$refs.input1.getValue() && this.$refs.input2.getValue() && this.$refs.input3.getValue()) {
						return true
					} else {
						return false
					}

				} else if (this.type == 2) {
					//二级支付密码
					if (this.$refs.input4.getValue() && this.$refs.input5.getValue() && this.$refs.input6.getValue()) {
						if(this.newPassword.length != 6 || this.confimNewPassword.length != 6){
							uni.showToast({
								title:  '二级密码必须是6位',
								icon: 'none'
							});
							return false
						}else{
							return true
						}
					} else {
						return false
					}
				} else {
					return false
				}
			},
			//确认修改
			submitModify() {
				if (this.validate()) { 
					if (this.newPassword != this.confimNewPassword) {
						uni.showToast({
							title:  '两次输入密码不一致6位',
							icon: 'none'
						});
						return
					}

					let p2 = md5(this.confimNewPassword.toString())
					let newPwd = md5(p2)

					http.config.header = {
						'Authorization': uni.getStorageSync("token")
					}

					http.post('api/Account/UpdatePassword?psd=' + newPwd + "&type=" +
						this.type + "&codemsg=" + this.codemsg).then((res) => {
						if (res.data.StatusCode == 1) {
							uni.showToast({
								title:  '修改成功6位',
								icon: 'none'
							});
						} else {
							uni.showToast({
								title:  res.data.Message,
								icon: 'none'
							});
						}
					}).catch((err) => {
						uni.showToast({
							title:  '网络繁忙，请稍后重试',
							icon: 'none'
						});
					})
				}
			},
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
					'Account': uni.getStorageSync("account")
				}
				http.post('api/NoAuthorize/SendCodeMessage', body).then((res) => {
					if (res.data.StatusCode == 1) {
						//发送验证码(0：发送失败，1：发送成功，2：参数为空，3：重复发送短信
						if (res.data.Data == 1) {
							uni.showToast({
								title:  '发送成功',
								icon: 'none'
							});
							this.countDown()
						} else if (res.data.Data == 0) {
							uni.showToast({
								title:  '发送失败',
								icon: 'none'
							});
						} else if (res.data.Data == 2) {
							uni.showToast({
								title:  '参数为空',
								icon: 'none'
							});
						}else if (res.data.Data == 3) {
							uni.showToast({
								title:  '重复发送短信',
								icon: 'none'
							});
						} else {
							uni.showToast({
								title:  '发送失败',
								icon: 'none'
							});
						}
					} else {
						uni.showToast({
							title:  res.data.Message,
							icon: 'none'
						});
					}
				}).catch((err) => {
					uni.showToast({
						title:  '网络繁忙，请稍后重试',
						icon: 'none'
					});
				})
			},
		}
	}
</script>

<style>
	@import '../../../common/common.css';

	page,
	view {
		display: flex;
	}

	page {
		display: flex;
		min-height: 100%;
		background-color: #EFEFEF;
	}

	template {
		display: flex;
		flex: 1;
	}

	.view-btn {
		padding-left: 20upx;
		padding-right: 20upx;
	}
</style>
