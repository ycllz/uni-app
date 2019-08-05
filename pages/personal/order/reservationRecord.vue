<template>
	<!-- 预约记录 -->
	<view>
		<view class="main">
			<view class="main-list">
				<view v-for="item in reservationList" :key="item.id">
					<cmd-cell-item :title="item.f_template_name" :brief="item.f_changevalueStr" :addon="item.f_createtime" />
				</view>
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
				reservationList: '',
				value: 0,
				message: '',
				recordList: [],
				refreshing: false,
				body: {
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
			onPullDownRefresh() {
				console.log('下拉刷新');
				this.refreshing = true;
				this.getData();
			},
			getData() {

				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				http.post('api/DigitalCoin/GetSubscribePageList', this.body).then((res) => {
					if (res.data.StatusCode == 1) {
						let resData = res.data.Data
						if (resData) {
							for (let i = 0; i < resData.length; i++) {
								resData[i].id = 'r_' + i
								resData[i].f_changevalueStr = '花费军粮:' + resData[i].f_changevalue
							}
							this.reservationList = resData
						} else {
							this.reservationList = []
						}
						this.refreshing = false;
						uni.stopPullDownRefresh();
					} else {
						this.refreshing = false;
						uni.stopPullDownRefresh();
						this.message = res.data.Message
						this.$refs.toast.show()
					}

				}).catch((err) => {
					this.refreshing = false;
					uni.stopPullDownRefresh();
					this.message = '请求失败'
					this.$refs.toast.show()
				})
			}
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
