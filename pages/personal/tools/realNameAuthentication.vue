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
	</view>
</template>

<script>
	import inputBox from '@/components/input-box/input-box'
	import http from '@/common/vmeitime-http/interface.js'
	export default {
		data() {
			return {
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
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				
				http.post('api/Account/RealName?userId=' + uni.getStorageSync("account") + "&realname=" + this.realName +
					"&cardId=" + this.idCard).then((res) => {
					
				}).catch((err) => {
					console.log("222222222222")
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
