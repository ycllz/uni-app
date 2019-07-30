<template>
	<view class="center">
		<view class="center-list">
			<!-- <input-box v-model="code" placeholder="验证码" rightText="发验证码"></input-box> -->
			<input-box v-model="oldPassword" placeholder="旧密码" leftText="旧密码:"></input-box>
		</view>

		<view class="center-list" style="margin-top: 20upx;">
			<input-box v-model="newPassword" placeholder="新密码" leftText="新密码:"></input-box>
			<input-box v-model="confimNewPassword" placeholder="确认新密码" leftText="新密码:"></input-box>


		</view>

		<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
			<button type="primary" @tap="submitModify">确认修改</button>
		</view>
		<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>
	</view>
</template>

<script>
	import inputBox from '@/components/input-box/input-box'
	import http from '@/common/vmeitime-http/interface.js'


	export default {
		data() {
			return {
				message: '',
				type: 0,
				code: '',
				oldPassword: '',
				newPassword: '',
				confimNewPassword: ''
			}
		},
		components: {
			inputBox
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.type = option.type
		},
		methods: {
			submitModify() {
				if (this.oldPassword == '') {
					this.message = '请输入旧密码'
					this.$refs.toast.show()
					return
				}

				if (this.newPassword == '' || this.confimNewPassword == '') {
					this.message = '请输入新密码'
					this.$refs.toast.show()
					return
				}

				if (this.newPassword != this.confimNewPassword) {
					this.message = '两次输入密码不一致'
					this.$refs.toast.show()
					return
				}

				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}

				http.post('api/Account/UpdatePassword?account=' + uni.getStorageSync("account") + "&psd=" + this.oldPassword +
					"&secondaryPsd=" + this.confimNewPassword + "&type=" + this.type).then((res) => {


					if (res.data.StatusCode == 1) {
						this.message = '修改成功'
						this.$refs.toast.show()
					} else {
						this.message = res.data.Message
						this.$refs.toast.show()
					}
				}).catch((err) => {
					this.message = '请求失败'
					this.$refs.toast.show()
				})
			}
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
