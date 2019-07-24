<template>
	<!-- 我的收益 -->
	<view>
		<view class="main">

			<view class="top-card" style="margin-top: 20upx;">
				<uni-card>
					累计收益 2000
				</uni-card>
			</view>

			<view class="main-list" style="margin-top: 30upx;">
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />


			</view>



		</view>
	</view>



</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import uniCard from "@/components/uni-card/uni-card"
	import http from '@/common/vmeitime-http/interface.js'

	export default {
		components: {
			cmdCellItem,
			uniCard
		},
		data() {
			return {
				page: 1,
				rowCount: 10
			}
		},

		methods: {
			getPageList() {
				http.config.header = {
					'Authorization': uni.getStorageSync("token"),
					'Content-Type': 'application/json'
				}

				http.get('api/ReferInCome/GetPageListByUserIdAndType?type=1&page='+this.page+'&rowCount='+this.rowCount).then((res) => {
					console.log("11111111111")
				}).catch((err) => {
					console.log("222222222222")
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
