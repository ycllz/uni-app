<template>
	<view class="index">
		<block v-for="list in lists" :key="list.id">
			<view class="row">
				<view class="card card-list2" v-for="item in list.data" @click="goDetail(item)" :key="item.keys">
					<image class="card-img card-list2-img" :src="item.img_src"></image>
					<text class="card-num-view card-list2-num-view">{{item.img_num}}P</text>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">{{item.title}} </text>
						</view>
						<view @click.stop="share(item)" class="card-share-view"></view>
					</view>
				</view>
			</view>
		</block>
		<text class="loadMore">加载中...</text>
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
			this.getData();
		},
		methods: {
			getData() {


				/* http.config.header = {
					'Authorization': uni.getStorageSync("token")
				} */
				/* http.config.baseUrl = "http://39.100.76.224:8081/api"
				//设置请求前拦截器
				http.interceptor.request = (config) => {
					config.header = {
						'Content-Type': 'application/json;charset=UTF-8',
						'Content-Type': 'application/x-www-form-urlencoded',
						"Authorization": uni.getStorageSync("token")
					}
				} */
				http.config.header = {
					'Content-Type': 'application/json;charset=UTF-8'
				}

				http.get('/TemplateInfo/GetCanSelledTemplateList').then((res) => {
					console.log("1111111111111")

				}).catch((err) => {
					console.log("222222222222")

				})





				/* uni.request({
					url: this.$serverUrl + '/api/picture/posts.php?page=' + (this.refreshing ? 1 : this.fetchPageNum) +
						'&per_page=10',
					success: (ret) => {
						console.log('得到lists', lists);
						if (this.refreshing) {
							this.refreshing = false;
							uni.stopPullDownRefresh()
							this.lists = lists;
							this.fetchPageNum = 2;
						} else {
							this.lists = this.lists.concat(lists);
							this.fetchPageNum += 1;
						}
					}
				}); */
			},
			goDetail(e) {
				uni.navigateTo({
					url: '../detail/detail?data=' + encodeURIComponent(JSON.stringify(e))
				})
			},
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function(value) {
					return value.name
				})
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
								'WXSenceTimeline' : 'WXSceneSession',
							type: 0,
							title: 'uni-app模版',
							summary: e.title,
							imageUrl: e.img_src,
							href: 'https://uniapp.dcloud.io',
							success: (res) => {
								console.log('success:' + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								})
							}
						});
					}
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
</style>
