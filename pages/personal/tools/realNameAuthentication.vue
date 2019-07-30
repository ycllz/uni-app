<template>
	<view class="center">
		<view class="center-list">
			<input-box v-model="realName" placeholder="真实姓名:" leftText="真实姓名"></input-box>
			<input-box v-model="idCard" placeholder="身份证号:" leftText="请输入您的身份证号"></input-box>
			<input-box v-model="cardNumber" placeholder="银行卡号:" leftText="请输入您的银行卡号"></input-box>
		</view>
		
		
		<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
			<button type="primary" @tap="authertication">确认</button>
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
				realName:'',
				idCard:'',
				cardNumber:''
			}
		},
		components: {
			inputBox
		},
		methods: {
			authertication(){
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
				
				http.post('api/Account/RealName?account=' + uni.getStorageSync("account") + "&realname=" + this.realName +
					"&cardId=" + this.idCard).then((res) => {
						
						if (res.data.StatusCode == 1) {
							this.message = '信息已提交'
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
</style>
