<template>
	<view>
		<view class="main">

			<view class="main-list">
				<cmd-cell-item v-for="item in list" :key="item.id" :title="item.f_name" :brief="item.f_phone" :addon="item.f_createtime" />
			</view>
			<uLi-load-more :status="loadMoreStatus"></uLi-load-more>
		</view>

	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import http from '@/common/vmeitime-http/interface.js'
	import uLiLoadMore from "@/components/uLi-load-more/uLi-load-more.vue"

	export default {
		components: {
			cmdCellItem,
			uLiLoadMore
		},
		data() {
			return {
				message: '',
				loadMoreStatus: 'more',
				list: [],
				refreshing: false,
				body: {
					page: 1,
					rowCount: 15
				}
			}
		},
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.refreshing = true;
			this.getPageList();
		},
		onReachBottom() {
			if (this.list.length < this.body.rowCount) {
				uni.showToast({
					title:  '没有更多了',
					icon: 'none'
				});
				
			} else {
				this.body.page++;
				this.getPageList();
			}
		},
		methods: {
			getPageList() {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				this.body.account = uni.getStorageSync("account")
				http.post('api/UserInfo/GetTeamPageList', this.body).then((res) => {
					this.refreshing = false;
					uni.stopPullDownRefresh();
					if (res.data.StatusCode == 1) {
						this.list = res.data.Data
					} else {
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
		},
		mounted() {
			this.getPageList()
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
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 15upx 20upx;
		border-bottom: 1px solid #c8c7cc;
		font-size: 15px;
	}
</style>
