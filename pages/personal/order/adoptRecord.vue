<template>
	<!-- 领养记录 -->
	<view class="main">
		<view class="main-list">
			<wuc-tab :tab-list="tabList" textFlex :tabCur.sync="tabCur" @change="tabChange" tab-class="text-center text-black bg-white"
			 select-class="text-orange"></wuc-tab>

			<view class="main-list-item" v-for="item in recordList" :key="item.id">
				<view>
					<text>区块编号:</text><text>{{item.f_code}}</text>
				</view>
				<view>
					<text>区块狗:</text><text>{{item.f_name}}</text>
				</view>
				<view>
					<text>价值:</text><text>{{item.f_price}}</text>
				</view>
				<view>
					<text>智能合约收益:</text><text>{{item.f_timelimit}}/{{item.f_rateofrateStr}}%</text>
				</view>
				<view>
					<text>获得收益:{{item.f_income}}</text><text></text>
				</view>
				<view>
					<text>转让时间:</text><text>{{item.f_transfertime}}</text>
				</view>
				<view style="margin-top: 10px;">
					<template v-if="tabCur == 0">
						<view class="view-btn">
							<uni-tag text="付款" type="success" @click="goPay(item._id)"></uni-tag>
							<!-- <button type="primary" @click="goPay(item._id)">付款</button> -->
						</view>
						<view class="view-btn1">
							<uni-tag text="取消" type="warning" @click="goCancel(item._id)"></uni-tag>
							<!-- <button type="default">取消</button> -->
						</view>
					</template>
					<template v-else-if="tabCur == 1">
						<!-- <view class="view-btn">
							<uni-tag text="付款" type="success" @click="goPay(item._id)"></uni-tag>
							<button type="primary">已完成(收益中)</button>
						</view>
						<view class="view-btn1">
							<button type="default">锁仓</button>
						</view> -->
					</template>
					<template v-else>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	import uniCard from "@/components/uni-card/uni-card"
	import regExpUtil from '@/common/regExpUtil.js'
	import http from '@/common/vmeitime-http/interface.js'
	import uniTag from "@/components/uni-tag/uni-tag.vue"

	export default {
		components: {
			WucTab,
			uniCard,
			uniTag
		},
		data() {
			return {
				refreshing: false,
				message: '',
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
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.refreshing = true;
			this.getAdoptRecords();
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
					this.recordList = []
					if (res.data.StatusCode == 1) {
						if (res.data.Data) {
							let resData = res.data.Data
							for (let i = 0; i < resData.length; i++) {
								resData[i].f_rateofrateStr = resData[i].f_rateofrate * 100
							}
							this.recordList = res.data.Data
						}

					} else {
						uni.showToast({
							title:  res.data.Message,
							icon: 'none'
						});
					}
					this.refreshing = false;
					uni.stopPullDownRefresh();
				}).catch((err) => {
					this.refreshing = false;
					uni.stopPullDownRefresh();
					uni.showToast({
						title:  '网络繁忙，请稍后重试',
						icon: 'none'
					});
				
				})
			},
			goPay(order) {
				if (!regExpUtil.isNullOrEmpty(order)) {
					uni.navigateTo({
						url: 'payMoney?value=' + order
					})
				}

			},
			goCancel(order){
				
				
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
		float: left;
		margin-left: 20%;
		margin-right: 20%;
	}
</style>
