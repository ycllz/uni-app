<template>
	<view>
		<view class="center">
			<view class="center-list">
				<view class="center-list-item" @tap="toPage(1)">
					<image class="image-icon" src="../../../static/password.png"></image>
					<text class="list-text">修改登录密码</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
				<view class="center-list-item" @tap="toPage(2)">
					<image class="image-icon" src="../../../static/pay.png"></image>
					<text class="list-text">修改支付密码</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toPage(index) {
				let path = ''
				if(index == 1){
					path = './modifyPassword?type='+index
				}else {
					path = './modifyPassword?type='+index
				}
				uni.navigateTo({
					url: path
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

	.image-icon {
		width: 25px;
		height: 25px;
		margin-top: 12px;
		margin-right: 5px;
		display: inline-block;
		overflow: hidden;
		position: relative;
	}
	
	.center-list-item{
		border-bottom: 1px solid #efefef;
	}
</style>
