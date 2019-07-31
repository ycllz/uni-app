<template>
<!-- 忘记密码 第二步 -->
	<view class="main">
		<view class="main-list">
			<view>15882039655</view>
			<input-box v-model="newPassword" placeholder="新密码" leftText="新密码:"></input-box>
			<input-box v-model="confimNewPassword" placeholder="确认新密码" leftText="新密码:"></input-box>
			<input-box v-model="code" placeholder="请输入验证码" @rightClick="countDown" :rightText="content"></input-box>
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
				newPassword: '',
				confimNewPassword: '',
				code:'',
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
