<template xlang="wxml">
	<view class="container">
		<view class="qrimg">
			<div style="margin-left: 40px;padding-top: 40px;color: #af243d;">
				<text>{{account}}</text>
			</div>
			<view class="qrimg-i">
				<tki-qrcode v-if="ifShow" :icon="icon" cid="qrcode2" ref="qrcode2" :val="val" :size="size" :onval="onval" :loadMake="loadMake"
				 :usingComponents="true" @result="qrR" />
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				account:'',
				ifShow: true,
				val: '二维码', // 要生成的二维码值
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				background: '#b4e9e2', // 背景色
				foreground: '#309286', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '../../../static/face.jpg', // 二维码图标
				iconsize: 40, // 二维码图标大小
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			}
		},
		methods: {
			qrR(res) {
				this.src = res
			},
		},
		mounted() {
			this.account = uni.getStorageSync("account")
			this.val = this.account
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 1200upx;
		background: url(../../../static/back_groud.jpg);
	}

	.qrimg {
		flex-direction: column;
		width: 100%;
		margin-left: 70px;
		display: flex;
		justify-content: center;
	}

	.qrimg-i {
		margin-right: 10px;
		padding-top: 80px;
	}

	slider {
		width: 100%;
	}

	input {
		width: 100%;
		margin-bottom: 20upx;
	}

	.btns {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	button {
		width: 100%;
		margin-top: 10upx;
	}
</style>
