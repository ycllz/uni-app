<template>
	<view class="main">
		<view class="main-list">
			<input-box v-model="inAccount" ref="input1" :verification="['isNull','isPhoneNum']" :verificationTip="['手机号码不能为空','请输入正确的手机号']"
			 placeholder="请输入手机号" leftText="手机号:" :clearShow="false"></input-box>

			<input-box v-model="diff" ref="input2" :verification="['isNull','isInt']" :verificationTip="['调拨军粮不能为空','调拨军粮必须是数字']"
			 placeholder="必须输入位数字" leftText="调拨军粮:" :clearShow="false"></input-box>
		</view>

		<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
			<button type="primary" @tap="submit">确认调拨</button>
		</view>
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
				inAccount: '',
				diff: '',
			}
		},
		methods: {
			submit() {
				if (this.$refs.input1.getValue() && this.$refs.input2.getValue()) {
					http.config.header = {
						'Authorization': uni.getStorageSync("token")
					}
					http.post('api/UserInfo/DiffTurnOut?inAccount=' + this.inAccount + '&diff=' + this.diff).then((res) => {
						if (res.data.StatusCode == 1) {
							//微分转出（0：余额不足，1：预约成功，2：转入账号不存在）
							if (res.data.Data == 0) {
								uni.showToast({
									title: '余额不足',
									icon: 'none'
								});
							} else if (res.data.Data == 1) {
								uni.showToast({
									title: '调拨成功',
									icon: 'none'
								});
								
								setTimeout(function() {
									uni.redirectTo({
										url: 'diffRecord'
									});
								}, 1500);
								
							} else if (res.data.Data == 2) {
								uni.showToast({
									title: '调拨账号不存在',
									icon: 'none'
								});
							} else if (res.data.Data == 3) {
								uni.showToast({
									title: '调拨不允许是同一个账号',
									icon: 'none'
								});
							}else {
								uni.showToast({
									title: '调拨失败',
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
			}
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
</style>
