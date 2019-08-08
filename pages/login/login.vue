<template>
	<view class="zai-box">
		<image src="../../static/face.jpg" mode='aspectFit' class="zai-logo"></image>
		<view class="zai-title"></view>
		<view class="zai-form">
			<input class="zai-input" placeholder-class v-model="account" placeholder="请输入账号" />
			<input class="zai-input" placeholder-class v-model="password" password placeholder="请输入密码" />
			<view class="zai-verify" :key="verifyKey">
				<move-verify :key="verifyKey" @result='verifyResult'></move-verify>
			</view>
			<button class="zai-btn" @click="bindLogin">立即登录</button>
			<view class="zai-label">
				<text @click="forgetPassword">忘记密码</text> <text @click="registerUser" class="register">点此注册</text>
			</view>
			<view class="version">当前版本:{{version}}</view>
		</view>
		<!-- mask:  	true 无遮罩层              		|     false 有遮罩层 						 -->
		<!-- click:  	true 点击空白无法关闭加载状态   |     false 点击空白可关闭加载状态 -->
		<w-loading text="加载中.." mask="true" click="false" ref="loading"></w-loading>
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
				version: '',
				providerList: [],
				hasProvider: false,
				account: '15882039655',
				password: 'a111111',
				message: '',
				isVerify: false,
				positionTop: 0,
				verifyKey: 1,
			}
		},
		onLoad() {
			this.version = plus.runtime.version
		},
		components: {
			"move-verify": moveVerify,
		},
		onShow() {
			console.log(111111111)
			this.isVerify = false
			++this.verifyKey
		},
		methods: {
			bindLogin() {

				if (this.account == '') {
					uni.showToast({
						title:  '请输入账号',
						icon: 'none'
					});
					return
				}

				if (this.password == '') {
					uni.showToast({
						title:  '请输入密码',
						icon: 'none'
					});
					return
				}

				if (!this.isVerify) {
					uni.showToast({
						title:  '请先验证',
						icon: 'none'
					});
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
					this.toMain(this.account);
				}).catch((err) => {
					this.$refs.loading.close()
					console.log(err)
					uni.showToast({
						title:  err.data.error_description,
						icon: 'none'
					});
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
				uni.navigateTo({
					url: '../register/forgetPassword',
				});
			},
			registerUser() {
				uni.navigateTo({
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
