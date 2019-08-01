<template>
	<!-- 找回密码 -->
	<view class="main">
		<view class="main-list">
			<input-box v-model="phone" placeholder="手机号码" leftText="手机号码:"></input-box>
			<view class="cus_yan" @click="refresh">
				<imgcode ref="imgcode"></imgcode>
			</view>
			<view style="border-top: 1px solid #F5F5F5;">
				<input-box v-model="imageCode" placeholder="请输入上图中的验证码" leftText="验证码:"></input-box>
			</view>
			<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
				<button type="primary" @tap="next">下一步</button>
			</view>
		</view>

	</view>
</template>

<script>
	import imgcode from '@/components/zhstars2013-imgcode/zhstars2013-imgcode.vue';
	import inputBox from '@/components/input-box/input-box'


	export default {
		components: {
			imgcode,
			inputBox
		},
		data() {
			return {
				phone: '',
				imageCode: '',
			}
		},
		methods: {
			refresh() {
				this.$refs.imgcode.refresh();
			},
			show() {
				var _self = this;
				setTimeout(function() {
					_self.refresh();
				}, 500);
			},
			next() {
				uni.navigateTo({
					url: 'forgetPasswordScondStep?value=' + this.phone
				})

			},
		},
		mounted() {
			this.show()
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
		padding-bottom: 20px;
	}

	.cus_yan {
		margin: 30upx;
	}
</style>
