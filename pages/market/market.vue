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
							<text class="card-title card-list2-title">智能合约收益:{{item.f_TimeLimit}}天/{{item.f_TimeLimit}}% </text>
						</view>
					</view>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">可挖WIA:{{item.f_RateOfRate}}枚 </text>
						</view>
					</view>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">可挖DOGE:收益{{item.f_TimeLimit}}% </text>
						</view>
					</view>
					<view class="card-bottm row">
						<button type="primary" @click="diffSubscribe(item)" plain="true">预约</button>
					</view>

				</view>
			</view>
		</block>
		<!-- <text class="loadMore">加载中...</text> -->
	</view>
</template>

<script>
	import http from '../../common/vmeitime-http/interface.js'

	let keys = 0;
	export default {
		data() {
			return {
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
				http.get('api/TemplateInfo/GetCanSelledTemplateList').then((res) => {
					this.lists = []
					for (let i = 0; i < res.data.length; i++) {

						res.data[i].f_LevelStr = this.getLevelStr(res.data[i].f_Level)
						console.log(res.data[i].f_LevelStr)
						if (i % 2 == 0) {
							let row = {}
							row.list = []
							row.id = i
							row.list.push(res.data[i])
							this.lists.push(row)
						} else {
							this.lists[this.lists.length - 1].id = i
							this.lists[this.lists.length - 1].list.push(res.data[i])
						}
					}
					this.refreshing = false;
					uni.stopPullDownRefresh();
				}).catch((err) => {
					this.refreshing = false;
					uni.stopPullDownRefresh();
					console.log("222222222222")
				})
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
				/* http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}

				let account = uni.getStorageSync("account")
				let diff = item.f_ReserveValue
				http.post('api/UserInfo/DiffSubscribe?account=' + account + "&diff=" + diff).then((res) => {
					console.log("111111111111111111")
				}).catch((err) => {
					console.log("222222222222")
				}) */

				http.config.header = {
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
				})
			},
			processResult(msgId) {

				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}

				http.post('api/Order/ProcessResult?msgId=' + this.msgId).then((res) => {
					this.fetchPageNum++
					if (this.fetchPageNum == 5) {
						window.clearInterval(this.timer); // 清除定时器
						this.timer = null;
					}
				}).catch((err) => {
					console.log("222222222222")
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
		;
		background-color: rgba(0, 0, 0, 0);
	}

	.card-bottm uni-button {
		margin-bottom: 10px !important;
		;
		margin-top: 10px !important;
		;
		width: 95px !important;
		;
		height: 30px !important;
		;
		line-height: 30px !important;
		;
		text-align: center;
		font-size: 20px;
	}
</style>
