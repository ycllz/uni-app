<template>
	<!-- 军粮 -->
	<view>
		<view class="main">
			<cmd-nav-bar :fixed="false" right-color="#000" font-color="#000" background-color="#fff" right-text="调拨" back title="军粮" @rightText="goTurnOut()"></cmd-nav-bar>
			<!-- <cmd-nav-bar :fixed="false" back title="军粮" right-text="调拨" back  right-color="#000" background-color="#fff"></cmd-nav-bar> -->
			<!-- <view class="top-card" style="margin-top: 20upx;">
				<uni-card>
					当前剩余军粮 {{currentDiff}}
				</uni-card>
			</view> -->
			<view class="main-list" style="margin-top: 30upx;">
				<cmd-cell-item v-for="item in list" :key="item.id" :title="item.f_changevalue" brief="预约/领养扣除" :addon="item.f_createtime" />
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
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	
	export default {
		components: {
			cmdCellItem,
			uniCard,
			uLiLoadMore,
			cmdNavBar
		},
		data() {
			return {
				currentDiff: 0,
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
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.currentDiff = option.value
		},
		onPullDownRefresh() {
			// console.log('下拉刷新');
			// this.refreshing = true;
			// this.getPageList();
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
				this.list = []
				http.post('api/DigitalCoin/GetValidPageList', this.body).then((res) => {

					if (res.data.StatusCode == 1) {
						let resData = res.data.Data
						for (var i = 0; i < resData.length; i++) {
							resData[i].id = 'd_'+i
						}
						this.list = resData
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
			},
			goTurnOut(){
				uni.navigateTo({
					url: 'turnOutDiff'
				})
			},
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
