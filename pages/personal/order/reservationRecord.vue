<template>
	<!-- 预约记录 -->
	<view>
		<view class="main">
			<view class="main-list">
				<cmd-cell-item title="勇邓" brief="花费微分:7" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="勇邓" brief="花费微分:7" addon="2019-07-22 22:22:12" />


			</view>



		</view>
		<view class="load-more-view">
			<text class="loadMore">加载中...</text>
		</view>
		<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>
	</view>
</template>

<script>
	import http from '@/common/vmeitime-http/interface.js'
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'


	export default {
		components: {
			cmdCellItem,
		},
		data() {
			return {
				value: 0,
				message: '',
				recordList: [],
				refreshing: false,
				body: {
					account: '',
					page: 1,
					rowCount: 10
				}
			}
		},
		onLoad() {
			this.refreshing = true;
			this.getData();
		},
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.refreshing = true;
			this.getData();
		},
		onReachBottom() {
			this.getData();
		},
		methods: {
			getData() {

				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				http.post('api/DigitalCoin/GetSubscribePageListByAccount', this.body).then((res) => {
					if (res.data.StatusCode == 1) {

					} else {
						this.message = res.data.Message
						this.$refs.toast.show()
					}

				}).catch((err) => {
					this.message = '请求失败'
					this.$refs.toast.show()
				})

				for (var i = 0; i < 35; i++) {
					this.recordList.push({
						"name": "测试数据-" + i,
						"id": i
					})
				}
				this.refreshing = false;
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

	.load-more-view {
		font-size: 14px;
		text-align: center;
	}
</style>
