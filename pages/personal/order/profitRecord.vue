<template>
	<!-- 我的收益 -->
	<view>
		<view class="main">

			<view class="top-card" style="margin-top: 20upx;">
				<uni-card>
					累计收益 {{value}}
				</uni-card>
			</view>

			<view class="main-list" style="margin-top: 30upx;">
				<!-- <cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" /> -->
			</view>
			<uLi-load-more :status="loadMoreStatus"></uLi-load-more>
		</view>
		
	</view>



</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import uniCard from "@/components/uni-card/uni-card"
	import http from '@/common/vmeitime-http/interface.js'
	import uLiLoadMore from "@/components/uLi-load-more/uLi-load-more.vue"

	export default {
		components: {
			cmdCellItem,
			uniCard,
			uLiLoadMore
		},
		data() {
			return {
				value: 0,
				message: '',
				loadMoreStatus: 'more',
				list: [],
				refreshing: false,
				body: {
					page: 1,
					rowCount: 15,
					type: 1,
					userId: '',
				}
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.value = option.value
		},
		onReachBottom() {
			if (this.list.length < this.body.rowCount) {
				uni.showToast({
					title:  '没有更多了~',
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
					'Authorization': uni.getStorageSync("token"),
					'Content-Type': 'application/json'
				}

				http.post('api/ReferInCome/GetPageListByUserIdAndType', this.body).then((res) => {
					if (res.data.StatusCode == 1) {

					} else {
						uni.showToast({
							title:  res.data.Message,
							icon: 'none'
						});
					}
				}).catch((err) => {
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
		padding-top: 15upx;
		background: #efefef;
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

	.top-card .uni-card {
		border-radius: 10px;
		text-align: center;
		padding-top: 15px;
		padding-bottom: 15px;
	}
</style>
