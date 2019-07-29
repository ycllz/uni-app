<template>
	<view class="index">
		<block v-for="row in lists" :key="row.id">
			<view class="row">
				<view class="card card-list2" v-for="item in row.list" :key="item.f_ID">
					<image class="card-img card-list2-img" src="../../static/map2.jpg"></image>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">{{item.f_Name}} </text>
							<text class="card-title card-list2-title">级别:{{item.f_LevelStr}} </text>
						</view>
					</view>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">价值:{{item.f_StartPrice}}-{{item.f_EndPrice}} </text>
						</view>
					</view>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">领养时间:{{item.f_StartTime}}-{{item.f_EndTime}} </text>
						</view>
					</view>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">预约/领养微分:{{item.f_ReserveValue}}/{{item.f_RealtimeValue}} </text>
						</view>
					</view>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">智能合约收益:{{item.f_TimeLimit}}天/{{item.f_RateOfRateStr}} </text>
						</view>
					</view>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">可挖WIA:{{item.f_CoinNum}}枚 </text>
						</view>
					</view>
					<!-- <view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">可挖DOGE:收益{{item.f_TimeLimit}}% </text>
						</view>
					</view> -->
					<view class="card-bottm row">
						<button type="primary" @click="diffSubscribe(item)" plain="true">{{item.f_StatusStr}}</button>
					</view>

				</view>
			</view>
		</block>
		<w-loading text="加载中.." mask="true" click="false" ref="loading"></w-loading>
		<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>
	</view>
</template>

<script>
	import http from '@/common/vmeitime-http/interface.js'

	let keys = 0;
	export default {
		data() {
			return {
				message:'',
				refreshing: false,
				lists: [],
				msgId: '',
				timer: null,
				fetchPageNum: 1
			}
		},
		onLoad() {
			this.getData();
		},
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.refreshing = true;
			this.getData();
		},
		onReachBottom() {
			//this.getData();
		},
		methods: {
			getData() {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				http.post('api/TemplateInfo/GetCanSelledTemplateList').then((res) => {
					if (res.data.StatusCode == 1) {
						this.lists = []
						let resData = res.data.Data
						for (let i = 0; i < resData.length; i++) {
							resData[i].f_LevelStr = this.getLevelStr(resData[i].f_Level)
							resData[i].f_StatusStr = this.getStatusStr(resData[i].f_Status)
							resData[i].f_RateOfRateStr = resData[i].f_RateOfRate * 100 + '%'
							if (i % 2 == 0) {
								let row = {}
								row.list = []
								row.id = i
								row.list.push(resData[i])
								this.lists.push(row)
							} else {
								this.lists[this.lists.length - 1].id = i
								this.lists[this.lists.length - 1].list.push(resData[i])
							}
						}
						this.refreshing = false;
						uni.stopPullDownRefresh();
					} else {
						console.log(res.data.Message)
						this.message = res.data.Message
						this.$refs.toast.show()
					}


				}).catch((err) => {
					this.refreshing = false;
					uni.stopPullDownRefresh();
					this.message = '请求失败'
					this.$refs.toast.show()
				})
			},
			getStatusStr(value) {
				let res = "可预约"
				switch (value) {
					//(1：停止抢购，2：可以抢购，3：已预约 4：可预约)
					case 1:
						res = "繁殖中"
						break;
					case 2:
						res = "抢购"
						break;
					case 3:
						res = "已预约"
						break;
					case 4:
						res = "待预约"
						break;
				}
				return res
			},
			getLevelStr(value) {
				let res = "其他"
				switch (value) {
					case 1:
						res = "普通"
						break;
					case 2:
						res = "勇者"
						break;
					case 3:
						res = "卓越"
						break;
					case 4:
						res = "稀有"
						break;
				}
				return res
			},

			diffSubscribe(item) {
				//(1：停止抢购，2：可以抢购，3：已预约 4：可预约)
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}

				if (item.f_Status == 4) {
					//预约
					let account = uni.getStorageSync("account")
					let diff = item.f_ReserveValue
					http.post('api/UserInfo/DiffSubscribe?account=' + account + "&diff=" + diff).then((res) => {
						if (res.data.StatusCode == 1) {
							this.getData();
						} else {
							this.message = res.data.Message
							this.$refs.toast.show()
						}
					}).catch((err) => {
						this.message = '请求失败'
						this.$refs.toast.show()
					})
				} else if (item.f_Status == 1) {
					//抢购
					this.$refs.loading.open()
					let templateId = item.f_ID
					http.post('api/Order/PlaceOrder?templateId=' + templateId).then((res) => {
						if (res.data.StatusCode == 1) {
							this.msgId = res.data
							this.timer = setInterval(
								this.processResult, 1000
							);
						} else {
							this.$refs.loading.close()
							this.message = res.data.Message
							this.$refs.toast.show()
						}
					}).catch((err) => {
						this.$refs.loading.close()
						this.message = '请求失败'
						this.$refs.toast.show()
					})
				}


				/* http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}

				let templateId = item.f_ID
				http.post('api/Order/PlaceOrder?templateId=' + templateId).then((res) => {
					this.msgId = res.data
					this.timer = setInterval(
						this.processResult, 1000
					);
				}).catch((err) => {
					console.log("222222222222")
				}) */
			},
			processResult(msgId) {

				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}

				http.post('api/Order/ProcessResult?msgId=' + this.msgId).then((res) => {
					if (res.data.StatusCode == 1) {
						this.fetchPageNum++
						if (this.fetchPageNum == 5) {
							this.$refs.loading.close()
							window.clearInterval(this.timer); // 清除定时器
							this.timer = null;
						}
					} else {
						this.message = res.data.Message
						this.$refs.toast.show()
					}

				}).catch((err) => {
					this.$refs.loading.close()
					this.message = '请求失败'
					this.$refs.toast.show()
				})
			}
		}
	}
</script>

<style>
	@import '../../common/common.css';

	page,
	view {
		display: flex;
	}

	page {
		display: flex;
		min-height: 100%;
		background-color: #EFEFEF;
	}

	template {
		display: flex;
		flex: 1;
	}

	.card-bottm uni-button[type=primary][plain] {
		color: #249873 !important;
		border: 1px solid #249873 !important;
		background-color: rgba(0, 0, 0, 0);
	}

	.card-bottm uni-button {
		margin-bottom: 10px !important;
		margin-top: 10px !important;
		width: 95px !important;
		height: 30px !important;
		line-height: 30px !important;
		text-align: center;
		font-size: 20px;
	}
</style>
