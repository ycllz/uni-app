<template>
	<!-- 领养记录 -->
	<view class="main">
		<view class="main-list">
			<wuc-tab :tab-list="tabList" textFlex :tabCur.sync="tabCur" @change="tabChange" tab-class="text-center text-black bg-white"
			 select-class="text-orange"></wuc-tab>

			<view class="main-list-item" v-for="item in recordList" :key="item.id">
				<view>
					<text>区块编号:</text><text>3444534524356752</text>
				</view>
				<view>
					<text>区块狗:</text><text>勇登</text>
				</view>
				<view>
					<text>价值:</text><text>2384≈1280.3437 WIN</text>
				</view>
				<view>
					<text>智能合约收益:</text><text>12天/21%</text>
				</view>
				<view>
					<text>获得收益:</text><text>75.87</text>
				</view>
				<view>
					<text>转让时间:</text><text>2019-07-22 22:22:22</text>
				</view>
				<view style="margin-top: 6px;">
					<view class="view-btn">
						<button type="primary">操作</button>
					</view>
					<view class="view-btn1">
						<button type="default">次要</button>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	import uniCard from "@/components/uni-card/uni-card"
	import http from '@/common/vmeitime-http/interface.js'

	export default {
		components: {
			WucTab,
			uniCard
		},
		data() {
			return {
				tabCur: 0,
				tabList: [{
						name: '领养中'
					},
					{
						name: '已领养'
					},
					{
						name: '取消/申诉'
					}
				],
				recordList: []
			}
		},
		methods: {
			tabChange(index) {
				this.TabCur = index;
				this.getAdoptRecords()
			},
			getAdoptRecords() {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				let type = this.tabCur + 1
				http.post('api/Order/GetAdoptList?type=' + type).then((res) => {
					for (var i = 0; i < 10; i++) {
						this.recordList.push("aasdffasdf")
					}
					console.log("111111111111")
				}).catch((err) => {
					console.log("222222222222")
				})
			}
		},
		mounted() {
			this.tabChange(0)
		}
	}
</script>

<style>
	.text-orange {
		color: #f37b1d
	}

	.text-black {
		color: #333333;
	}

	.bg-white {
		background-color: #ffffff;
	}

	.main {
		flex-direction: column;
		min-height: 100vh;
		background-color: #EFEFEF;
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

	.view-btn {
		width: 50px;
		float: left;
		margin-left: 20px;
	}

	.view-btn1 {
		margin-left: 100px;
	}

	.view-btn uni-button {
		width: 100px;
		height: 30px;
		line-height: 30px;
	}

	.view-btn1 uni-button {
		width: 100px;
		height: 30px;
		line-height: 30px;
	}
</style>
