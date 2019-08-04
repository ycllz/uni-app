<template>
	<view class="zai-box">
		<image src="../../static/face.jpg" mode='aspectFit' class="zai-logo"></image>
		<view class="zai-title"></view>
		<view class="zai-form">
			<input class="zai-input" placeholder-class v-model="account" placeholder="请输入账号" />
			<input class="zai-input" placeholder-class v-model="password" password placeholder="请输入密码" />
			<view class="zai-verify">
				<move-verify @result='verifyResult'></move-verify>
			</view>
			<button class="zai-btn" @click="bindLogin">立即登录</button>
			<view class="zai-label">
				<text @click="forgetPassword">忘记密码</text> <text @click="registerUser" class="register">点此注册</text>
			</view>
			<view class="version">当前版本:0.1 beta</view>
		</view>
		<!-- mask:  	true 无遮罩层              		|     false 有遮罩层 						 -->
		<!-- click:  	true 点击空白无法关闭加载状态   |     false 点击空白可关闭加载状态 -->
		<w-loading text="加载中.." mask="true" click="false" ref="loading"></w-loading>
		<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>
	</view>
</template>


<script>
	import http from '@/common/vmeitime-http/interface.js'
	import service from '../../service.js'
	import md5 from 'js-md5'
	import moveVerify from "@/components/helang-moveVerify/helang-moveVerify.vue"

	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '15882039655',
				password: 'a111111',
				message: '',
				isVerify: false,
				positionTop: 0
			}
		},
		components: {
			"move-verify": moveVerify,
		},
		methods: {
			bindLogin() {


				if (this.account == '') {
					this.message = '请输入账号'
					this.$refs.toast.show()
					return
				}

				if (this.password == '') {
					this.message = '请输入密码'
					this.$refs.toast.show()
					return
				}

				if (!this.isVerify) {
					this.message = '请先验证'
					this.$refs.toast.show()
					return
				}

				this.$refs.loading.open()
				let p1 = md5(this.password.toString())
				let p2 = md5(p1)

				let body = {
					"grant_type": "password",
					"username": this.account,
					"password": p2
				}
				http.config.header = {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
				http.post('oauth2/token', body).then((res) => {
					uni.setStorageSync("account", this.account);
					uni.setStorageSync("token", 'bearer ' + res.data.access_token);
					this.$refs.loading.close()
					this.toMain("18510011002");
				}).catch((err) => {
					this.$refs.loading.close()
					this.message = err.data.error_description
					this.$refs.toast.show()
				})
			},
			verifyResult() {
				this.isVerify = true
			},
			toMain(userName) {
				//this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */

				uni.reLaunch({
					url: '../market/market',
				});

			},
			forgetPassword() {
				uni.reLaunch({
					url: '../register/forgetPassword',
				});
			},
			registerUser() {
				uni.reLaunch({
					url: '../register/register',
				});
			}
		},
	}
</script>

<style>
	.zai-box {
		padding: 0 100upx;
		position: relative;
	}

	.zai-logo {
		width: 100%;
		width: 100%;
		height: 250upx;
		margin-top: 80upx;
	}

	.zai-verify {
		margin-top: 30upx;
		margin-bottom: 30upx;
	}

	.zai-title {
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
	}

	.zai-form {
		margin-top: 110upx;
	}

	.zai-input {
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}

	.zai-label .register {
		margin: 50upx;
	}

	.input-placeholder,
	.zai-input {
		color: #94afce;
	}

	.zai-label {
		padding: 12upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}

	.zai-btn {
		background: #249873;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
	}

	.zai-btn:after {
		border: 0;
	}

	/*按钮点击效果*/
	.zai-btn.button-hover {
		transform: translate(1upx, 1upx);
	}

	.version {
		margin-top: 140upx;
		text-align: center;
		font-size: 14px;
		color: #a7b6d0;
	}
</style>
