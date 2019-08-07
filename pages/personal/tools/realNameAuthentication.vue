<template>
	<view class="center">
		<template v-if="isRealNameThrouth == 2">
			实名认证中...
		</template>
		<template v-else-if="isRealNameThrouth == 3">
			已通过实名认证
		</template>
		<template v-else>
			<view class="center-list">
				<input-box v-model="realName" placeholder="真实姓名:" ref="input1" :verification="['isNull','isChineseAndEnlish']"
				 :verificationTip="['真实姓名不能为空','真实姓名只能是中文或字母']" leftText="真实姓名"></input-box>
				<input-box v-model="idCard" ref="input2" :verification="['isNull']" :verificationTip="['身份证号不能为空']" placeholder="身份证号:"
				 leftText="请输入您的身份证号"></input-box>
				<!-- 		<input-box v-model="cardNumber" placeholder="银行卡号:" leftText="请输入您的银行卡号"></input-box> -->
			</view>

			<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
				<button type="primary" @tap="authertication">确认</button>
			</view>
		</template>
		<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>
	</view>
</template>

<script>
	import inputBox from '@/components/input-box/input-box'
	import http from '@/common/vmeitime-http/interface.js'
	import regExpUtil from '@/common/regExpUtil.js'

	export default {
		data() {
			return {
				message: '',
				realName: '',
				idCard: '',
				cardNumber: '',
				isRealNameThrouth: 1,
			}
		},
		components: {
			inputBox
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			//推广收益
			this.isRealNameThrouth = option.value
		},
		methods: {
			authertication() {

				if (this.$refs.input1.getValue() && this.$refs.input2.getValue()) {

					console.log(this.idCard)

					if (!regExpUtil.isIdCard(this.idCard)) {
						uni.showToast({
							title: '请输入正确的身份证号',
							icon: 'none'
						});
						return
					}

					http.config.header = {
						'Authorization': uni.getStorageSync("token")
					}

					let body = {
						realName: this.realName,
						cardId: this.idCard
					}

					http.post('api/Account/RealName', body).then((res) => {

						if (res.data.StatusCode == 1) {
							//实名认证(0：提交失败，1：提交成功，2：身份证号码格式不正确,3:至少添加两种收款方式 4 身份信息已存在
							if (res.data.Data == 1) {
								uni.showToast({
									title: '信息已提交',
									icon: 'none'
								});
								uni.navigateBack()
							} else if (res.data.Data == 0) {
								uni.showToast({
									title: '提交失败',
									icon: 'none'
								});
							} else if (res.data.Data == 2) {
								uni.showToast({
									title: '身份证号码格式不正确',
									icon: 'none'
								});
							} else if (res.data.Data == 3) {
								uni.showToast({
									title: '至少添加两种收款方式',
									icon: 'none'
								});

							} else if (res.data.Data == 4) {
								uni.showToast({
									title: '身份信息已存在',
									icon: 'none'
								});
							} else {
								uni.showToast({
									title: '提交失败',
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
</style>
