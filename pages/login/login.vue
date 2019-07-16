<template>
	<view class="zai-box">
		<image src="../../static/login.png" mode='aspectFit' class="zai-logo"></image>
		<view class="zai-title">LOGO区域</view>
		<view class="zai-form">
			<input class="zai-input" placeholder-class v-model="account" placeholder="请输入用户名" />
			<input class="zai-input" placeholder-class v-model="password" password placeholder="请输入密码" />
			<view class="zai-label">忘记密码？</view>
			<button class="zai-btn" @click="bindLogin">立即登录</button>
			<navigator url="../zaizai-register/index" hover-class="none" class="zai-label">还没有账号？点此注册.</navigator>
		</view>

		<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>
	</view>
</template>


<script>
	import http from '../../common/vmeitime-http/interface.js'
	import service from '../../service.js'
	import md5 from 'js-md5'
	import yuToast from '@/components/yu-toast/yu-toast'


	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				message: '',
				positionTop: 0
			}
		},
		components: {
			yuToast
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			bindLogin() {

				let pwd = 123456
				let p1 = md5(pwd.toString())
				let p2 = md5(p1)
				console.log(p2)

				let body = {
					"grant_type": "password",
					"username": "18510011002",
					"password": p2
				}
				http.config.header = {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
				http.post('oauth2/token', body).then((res) => {
					this.message = '登录成功'
					this.$refs.toast.show()
					this.toMain("18510011002");
				}).catch((err) => {
					this.message = '失败' + err
					this.$refs.toast.show()
				})


				/* if (validUser) {
				    this.toMain(this.account);
				} else {
				    uni.showToast({
				        icon: 'none',
				        title: '用户账号或密码不正确',
				    });
				} */
			},

			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
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

			}
		},
		onReady() {

		}
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
		margin-top: 150upx;
	}

	.zai-input {
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}

	.input-placeholder,
	.zai-input {
		color: #94afce;
	}

	.zai-label {
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}

	.zai-btn {
		background: #ff65a3;
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
</style>
