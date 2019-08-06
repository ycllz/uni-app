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
				<input-box v-model="realName" placeholder="真实姓名:" leftText="真实姓名"></input-box>
				<input-box v-model="idCard" placeholder="身份证号:" leftText="请输入您的身份证号"></input-box>
				<input-box v-model="cardNumber" placeholder="银行卡号:" leftText="请输入您的银行卡号"></input-box>
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
				if (this.realName == '') {
					this.message = '请输入真是姓名'
					this.$refs.toast.show()
					return
				}

				if (this.idCard == '') {
					this.message = '请输入身份证号'
					this.$refs.toast.show()
					return
				}

				if (this.cardNumber == '') {
					this.message = '请输入银行卡号'
					this.$refs.toast.show()
					return
				}


				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}

				http.post('api/Account/RealName?realname=' + this.realName +
					"&cardId=" + this.idCard).then((res) => {

					if (res.data.StatusCode == 1) {
						//实名认证(0：提交失败，1：提交成功，2：身份证号码格式不正确,3:至少添加两种收款方式 4 身份信息已存在
						if (res.data.Data == 1) {
							this.message = '信息已提交'
							this.$refs.toast.show()
							uni.navigateBack()
						}else if(res.data.Data == 0){
							this.message = '提交失败'
							this.$refs.toast.show()
						}else if(res.data.Data == 2){
							this.message = '身份证号码格式不正确'
							this.$refs.toast.show()
						}else if(res.data.Data == 3){
							this.message = '至少添加两种收款方式'
							this.$refs.toast.show()
						}else if(res.data.Data == 4){
							this.message = '身份信息已存在'
							this.$refs.toast.show()
						}else{
							this.message = '提交失败'
							this.$refs.toast.show()
						}
						
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
</style>
