<template>
	<!-- 转让记录 -->
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
				<template v-if="tabCur == 0">
					<view>
						<text>创建时间:</text><text>{{item.f_createtime}}</text>
					</view>
				</template>
				<template v-else>
					<view>
						<text>转让时间:</text><text>{{item.f_transfertime}}</text>
					</view>
				</template>

				<view style="margin-top: 10px;">
					<template v-if="tabCur == 1">
						<view class="view-btn">
							<!-- <button type="primary" @click="goConfim(item._id)">确认</button> -->
							<uni-tag text="确认" type="success" @click="goConfim(item._id)"></uni-tag>
						</view>
						<view class="view-btn1">
							<uni-tag text="申诉" type="warning" @click="goAppeal(item._id)"></uni-tag>
							<!-- <button type="default" @click="goAppeal(item._id)">申诉</button> -->
						</view>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	import uniCard from "@/components/uni-card/uni-card"
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
						name: '待转让'
					},
					{
						name: '转让中'
					}, {
						name: '已完成'
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
				http.post('api/Order/GetTransferList?type=' + type).then((res) => {
					if (res.data.StatusCode == 1) {
						if (res.data.Data) {
							let resData = res.data.Data
							for (let i = 0; i < resData.length; i++) {
								resData[i].f_rateofrateStr = resData[i].f_rateofrate * 100
							}
							this.recordList = res.data.Data
						} else {
							this.recordList = []
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
			//确认
			goConfim(orderId) {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				let body = {
					orderId:orderId
				}
				http.post('api/Order/Confim',body).then((res) => {
					if (res.data.StatusCode == 1) {
						//确认订单(0：订单状态异常，1：成功，2：人员不匹配，3:二级密码不正确，4：提交失败)
						if (res.data.Data == 1) {
							uni.showToast({
								title:  '确认成功',
								icon: 'none'
							});
							uni.navigateBack()
						} else if (res.data.Data == 0) {
							uni.showToast({
								title:  '订单状态异常',
								icon: 'none'
							});
						} else if (res.data.Data == 2) {
							uni.showToast({
								title:  '人员不匹配',
								icon: 'none'
							});
						} else if (res.data.Data == 3) {
							uni.showToast({
								title:  '二级密码不正确',
								icon: 'none'
							});
						} else if (res.data.Data == 4) {
							uni.showToast({
								title:  '提交失败',
								icon: 'none'
							});
						}
					} else {
						uni.showToast({
							title: res.data.Message,
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
			//申诉
			goAppeal(orderId) {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				
				http.post('api/Order/Appeal?orderId='+orderId).then((res) => {
					if (res.data.StatusCode == 1) {
						//申诉（待付款到期，待确认时可以点击，状态如下：0：用户不匹配，1：处理成功，2：订单状态不匹配，
						//3：已经申诉过了，4：没有到申诉时间，5：处理失败）
						if (res.data.Data == 1) {
							uni.showToast({
								title:  '处理成功',
								icon: 'none'
							});
						} else if (res.data.Data == 0) {
							uni.showToast({
								title:  '用户不匹配',
								icon: 'none'
							});
						} else if (res.data.Data == 2) {
							uni.showToast({
								title:  '订单状态不匹配',
								icon: 'none'
							});
						} else if (res.data.Data == 3) {
							uni.showToast({
								title:  '请不要重复申诉',
								icon: 'none'
							});
						} else if (res.data.Data == 4) {
							uni.showToast({
								title:  '该时间暂不支持申诉',
								icon: 'none'
							});
						} else if (res.data.Data == 5) {
							uni.showToast({
								title:  '处理失败',
								icon: 'none'
							});
						}
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
