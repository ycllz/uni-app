<template>
	<!-- 预约记录 -->
	<view>
		<view class="main">
			<view class="main-list">
				<view v-for="item in reservationList" :key="item.id">
					<cmd-cell-item :title="item.f_template_name" :brief="item.f_changevalueStr" :addon="item.f_createtime" />
				</view>
			</view>
			<uLi-load-more :status="loadMoreStatus"></uLi-load-more>
		</view>
		
	</view>
</template>

<script>
	import http from '@/common/vmeitime-http/interface.js'
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
import uLiLoadMore from "@/components/uLi-load-more/uLi-load-more.vue"

	export default {
		components: {
			cmdCellItem,
			uLiLoadMore
		},
		data() {
			return {
				loadMoreStatus: 'more',
				reservationList: '',
				value: 0,
				message: '',
				refreshing: false,
				body: {
					page: 1,
					rowCount: 15
				}
			}
		},
		onReachBottom() {
			console.log(this.reservationList.length )
			console.log(this.body.rowCount )
			if (this.reservationList.length < this.body.rowCount) {
				uni.showToast({
					title: '没有更多了',
					icon: 'none'
				});
			} else {
				this.body.page++;
				this.getData();
			}
		},
		onLoad() {
			this.refreshing = true;
			this.getData();
		},
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.body.page = 1;
			this.refreshing = true;
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
						uni.showToast({
							title:  res.data.Message,
							icon: 'none'
						});
					}

				}).catch((err) => {
					this.refreshing = false;
					uni.stopPullDownRefresh();
					uni.showToast({
						title:  '网络繁忙，请稍后重试',
						icon: 'none'
					});
				
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
