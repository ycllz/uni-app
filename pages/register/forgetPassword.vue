<template>
	<!-- 找回密码 -->
	<view class="main">
		<view class="main-list">
			<input-box v-model="phone" placeholder="手机号码" leftText="手机号码:"></input-box>
			<view class="cus_yan" @click="refresh">
				<imgcode ref="imgcode"></imgcode>
			</view>
			{{show()}}
			<input-box v-model="imageCode" placeholder="请输入上图中的验证码" leftText="验证码:"></input-box>


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
			refresh: function() {
				this.$refs.imgcode.refresh();
			},
			show: function() {
				var _self = this;
				setTimeout(function() {
					_self.refresh();
				}, 500);
			},
			next() {

			},
		}
	}
</script>

<style>

</style>
