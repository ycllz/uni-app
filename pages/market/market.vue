<template>
	<view class="index-left">
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
							<text class="card-title card-list2-title">预约/领养军粮:{{item.f_ReserveValue}}/{{item.f_RealtimeValue}} </text>
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
					<template v-if="item.f_Status !=1">
						<view class="card-bottm row card-tag">
							<uni-tag :text="item.f_StatusStr" type="success" @click="diffSubscribe(item)"></uni-tag>
						</view>
					</template>
					<template v-else> 
						<view class="card-bottm row card-tag">
							<uni-tag :text="item.f_StatusStr" type="default" ></uni-tag>
						</view>
					</template>
				</view>
			</view>
		</block>
		<!-- mask:  	true 无遮罩层              		|     false 有遮罩层 						 -->
		<!-- click:  	true 点击空白无法关闭加载状态   |     false 点击空白可关闭加载状态 -->
		<w-loading text="加载中.." mask="true" click="false" ref="loading"></w-loading>
	</view>
</template>

<script>
	import http from '@/common/vmeitime-http/interface.js'
	import regExpUtil from '@/common/regExpUtil.js'
	import uniTag from "@/components/uni-tag/uni-tag.vue"

	let keys = 0;
	export default {
		components: {
			uniTag,
		},
		data() {
			return {
				message: '',
				refreshing: false,
				lists: [],
				msgId: '',
				timer: null,
				fetchPageNum: 1
			}
		},
		onLoad() {

		},
		onShow() {
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
							resData[i].f_RateOfRateStr = (resData[i].f_RateOfRate * 100).toString().substr(0, 2) + '%'
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
						uni.showToast({
							title: res.data.Message,
							icon: 'none'
						});
					}
				}).catch((err) => {
					this.refreshing = false;
					uni.stopPullDownRefresh();
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
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
				let templateId = item.f_ID
				if (item.f_Status == 4) {

					//预约
					this.$refs.loading.open()
					let account = uni.getStorageSync("account")
					let diff = item.f_ReserveValue
					http.post('api/UserInfo/DiffSubscribe?templateId=' + templateId).then((res) => {
						this.$refs.loading.close()
						if (res.data.StatusCode == 1) {
							//微分预约(0:预约失败，1：预约成功，2：当前帐户未审核,3:当前帐户未激活,4:余额不足)
							if (res.data.Data == 1) {
								uni.showToast({
									title: '预约成功',
									icon: 'none'
								});
								this.getData();
							}else if(res.data.Data == 0){
								uni.showToast({
									title: '预约失败',
									icon: 'none'
								});
							} else if(res.data.Data == 2){
								uni.showToast({
									title: '当前帐户未审核',
									icon: 'none'
								});
							}else if(res.data.Data == 3){
								uni.showToast({
									title: '当前帐户未激活',
									icon: 'none'
								});
							}else if(res.data.Data == 4){
								uni.showToast({
									title: '余额不足',
									icon: 'none'
								});
							}else {
								uni.showToast({
									title: '预约失败',
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
							title: '请求失败',
							icon: 'none'
						});
						this.$refs.loading.close()
					})
					//} else {
				} else if (item.f_Status == 2 || item.f_Status == 3) {
					//抢购
					this.$refs.loading.open()

					http.post('api/Order/PlaceOrder?templateId=' + templateId).then((res) => {
						if (res.data.StatusCode == 1) {
							this.msgId = res.data.Data
							if (regExpUtil.isNullOrEmpty(this.msgId)) {
								this.$refs.loading.close()
								uni.showToast({
									title: '预约失败',
									icon: 'none'
								});
							} else {
								this.timer = setInterval(
									this.processResult, 5000
								);
							}
						} else {
							this.$refs.loading.close()
							uni.showToast({
								title: res.data.Message,
								icon: 'none'
							});
						}
					}).catch((err) => {
						this.$refs.loading.close()
						uni.showToast({
							title: '请求失败',
							icon: 'none'
						});
					})
				}
			},
			processResult(msgId) {

				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}

				http.post('api/Order/ProcessResult?msgId=' + this.msgId).then((res) => {
					if (res.data.StatusCode == 1) {
						//获取订单抢购处理结果(1:抢购成功，0:抢购失败,-1代表处理中，其余代表失败)
						if (res.data.Data == 1) {
							this.$refs.loading.close()
							window.clearInterval(this.timer); // 清除定时器
							this.timer = null;
							uni.showToast({
								title: '领养成功',
								icon: 'none'
							});
						} else if (res.data.Data == 0) {
							this.$refs.loading.close()
							window.clearInterval(this.timer); // 清除定时器
							this.timer = null;
							uni.showToast({
								title: '领养失败',
								icon: 'none'
							});
						} else if (res.data.Data == -1) {

						} else {
							this.$refs.loading.close()
							window.clearInterval(this.timer); // 清除定时器
							this.timer = null;
							uni.showToast({
								title: '领养失败',
								icon: 'none'
							});
						}
					} else {
						window.clearInterval(this.timer); // 清除定时器
						this.timer = null;
						this.$refs.loading.close()
						uni.showToast({
							title:  res.data.Message,
							icon: 'none'
						});
					}

				}).catch((err) => {
					window.clearInterval(this.timer); // 清除定时器
					this.timer = null;
					this.$refs.loading.close()
					uni.showToast({
						title:  '网络繁忙，请稍后重试',
						icon: 'none'
					});
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

	.card-tag {
		margin-top: 10upx;
		margin-bottom: 10upx;
	}
</style>
