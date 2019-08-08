<template>
	<!-- 推广累计 -->
	<view>
		<view class="main">
			<cmd-nav-bar :fixed="false" right-color="#2196f3" right-text="出售" back title="推广收益" @rightText="goSell()"></cmd-nav-bar>
			<view class="top-card" style="margin-top: 20upx;">
				<uni-card>
					推广累计 {{value}}
				</uni-card>
			</view>

			<view class="main-list" style="margin-top: 30upx;">
				<!-- <cmd-cell-item title="2.08" brief="推广奖励" addon="2019-07-22 22:22:12" /> -->
			</view>
			<uLi-load-more :status="loadMoreStatus"></uLi-load-more>
		</view>
	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import uniCard from "@/components/uni-card/uni-card"
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import http from '@/common/vmeitime-http/interface.js'
	import uLiLoadMore from "@/components/uLi-load-more/uLi-load-more.vue"

	export default {
		components: {
			cmdCellItem,
			uniCard,
			cmdNavBar,
			uLiLoadMore
		},
		data() {
			return {
				loadMoreStatus: 'more',
				value: 0,
				value1: 0,
				value2: 0,
				list:[],
				message: '',
				body: {
					page: 1,
					rowCount: 10,
					type: 2,
					userId: '1111',
				}
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			//推广收益
			this.value = option.value
			//团队收益
			this.value1 = option.value1
			//转存收益
			this.value2 = option.value2
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
					'Authorization': uni.getStorageSync("token"),
					'Content-Type': 'application/json'
				}

				http.post('api/ReferInCome/GetPageListByUserIdAndType', this.body).then((res) => {
					if (res.data.StatusCode == 1) {

					} else {
						uni.showToast({
							title: res.data.Message,
							icon: 'none'
						});
					}
				}).catch((err) => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
				})
			},
			goSell() {
				uni.navigateTo({
					url: 'sell?value=' + this.value + '&value1=' + this.value1 + '&value2=' + this.value2
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
