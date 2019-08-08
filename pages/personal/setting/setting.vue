<template>
	<view>
		<view class="main">
			<view class="main-list">
				<cmd-cell-item title="用户名" :addon="name" arrow />
				<cmd-cell-item title="手机" :addon="account" arrow />
				<cmd-cell-item title="客服中心" arrow />
				<cmd-cell-item title="帮助中心" arrow />

				<view style="margin-top: 100upx;margin-left: 30upx;margin-right:30upx ;">
					<button type="default" @click="safeQuit()">安全退出</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	export default {
		components: {
			cmdCellItem
		},
		data() {
			return {
				name: '',
				account: '',
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			//推广收益
			this.name = option.value
			//团队收益
			this.account = option.value1

		},
		methods: {
			safeQuit() {
				//清除缓存
				uni.clearStorage();
				// 退出当前应用，改方法只在App中生效  
				plus.runtime.quit();
				// uni.reLaunch({
				// 	url: '../../login/login'
				// });
			}
		}
	}
</script>

<style>
	.main {
		flex-direction: column;
		min-height: 100vh;
	}

	.main-list {
		background-color: #FFFFFF;
		width: 750upx;
		flex-direction: column;
	}

	.main-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}
</style>
