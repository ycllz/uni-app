<template>
	<view>
		<view v-if="showHeader" class="status" :style="{position:headerPosition,top:statusTop}"></view>
		<view v-if="showHeader" class="header" :style="{position:headerPosition,top:headerTop}">

			<view class="icon-btn">
				<view class="icon tongzhi" @tap="toMsg"></view>
				<view class="icon setting" @tap="toSetting"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 用户信息 -->
		<view class="user">
			<!-- 头像 -->
			<view class="left">
				<image :src="user.face" @tap="toSetting"></image>
			</view>
			<!-- 昵称,个性签名 -->
			<view class="right">
				<view class="username" @tap="toLogin">{{userDetail.f_name}}</view>
				<view class="signature" @tap="toSetting">{{user.signature}}</view>
			</view>
			<!-- 二维码按钮 -->
			<!-- <view class="erweima" @tap="toMyQR">
				<view class="icon qr"></view>
			</view> -->
		</view>
		<!-- VIP banner -->
		<!-- <view class="VIP">
			<view class="img">
				<image src="/static/img/VIP.png"></image>
			</view>
			<view class="title">开通VIP会员</view>
			<view class="tis">会员特权</view>
		</view> -->
		<!-- 订单-余额 -->
		<view class="order">
			<!-- 军粮 -->
			<view class="balance-info">
				<view class="left">
					<view class="box" @tap="toRecerd(1)">
						<view class="num">{{userDetail.f_digcoinvalue}}</view>
						<view class="text">军粮</view>
					</view>
					<view class="box" @tap="toRecerd(2)">
						<view class="num">{{userDetail.f_totalincomevalue}}</view>
						<view class="text">累计收益</view>
					</view>
					<view class="box" @tap="toRecerd(3)">
						<view class="num">{{userDetail.f_refervalue}}</view>
						<view class="text">推广收益</view>
					</view>
				</view>
			</view>

			<!-- 订单类型 -->
			<view class="list">
				<view class="box" v-for="(row,index) in orderList" :key="index" @tap="toOrderList(index)">
					<view class="img">
						<image :src="row.img"></image>
					</view>
					<view class="text">{{row.text}}</view>
				</view>
			</view>

		</view>
		<!-- 工具栏 -->
		<view class="toolbar">
			<!-- <view class="title">我的工具栏</view> -->
			<view class="list">
				<view class="box" v-for="(row,index) in mytoolbarList" :key="index" @tap="toPage(row.url)">
					<view class="img">
						<image :src="row.img"></image>
					</view>
					<view class="text">{{row.text}}</view>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place-bottom"></view>
		<!-- mask:  	true 无遮罩层              		|     false 有遮罩层 						 -->
		<!-- click:  	true 点击空白无法关闭加载状态   |     false 点击空白可关闭加载状态 -->
		<w-loading text="加载中.." mask="true" click="false" ref="loading"></w-loading>
	</view>
</template>

<!-- 未审核,审核中, 审核通过, 审核未通过,冻结, 禁用, 删除, 未激活 -->
<script>
	import http from '@/common/vmeitime-http/interface.js'

	export default {
		data() {
			return {
				refreshing: false,
				message: '',
				isfirst: true,
				headerPosition: "fixed",
				headerTop: null,
				statusTop: null,
				showHeader: true,
				userDetail: {},
				//个人信息,
				user: {
					username: '游客1002',
					face: '../../static/face.jpg',
					signature: '点击昵称跳转登录/注册页',
					integral: 0,
					balance: 0,
					envelope: 0
				},
				// 订单类型
				orderList: [{
						text: '领养记录',
						img: "../../static/mingxi.png"
					},
					{
						text: '转让记录',
						img: "../../static/mingxi.png"
					},
					{
						text: '预约记录',
						img: "../../static/mingxi.png"
					}
				],
				// 工具栏列表
				mytoolbarList: [{
						url: './tools/salfCenter',
						text: '安全中心',
						img: '../../static/mingxi.png'
					},
					{
						url: './tools/realNameAuthentication',
						text: '实名认证',
						img: '../../static/mingxi.png'
					},
					{
						url: './tools/myBankCard',
						text: '我的银行卡',
						img: '../../static/mingxi.png'
					},
					{
						url: './tools/myTeam',
						text: '我的团队',
						img: '../../static/mingxi.png'
					},
					{
						url: './tools/inviteFriends',
						text: '邀请好友',
						img: '../../static/mingxi.png'
					},
					{
						url: '',
						text: '系统消息',
						img: '../../static/mingxi.png'
					},
					/* 	{
							url: '',
							text: '银行卡',
							img: '../../static/mingxi.png'
						},
						{
							url: '',
							text: '抽奖',
							img: '../../static/mingxi.png'
						}, */
					// {text:'客服',img:'/static/img/user/kefu.png'},
					// {text:'签到',img:'/static/img/user/mingxi.png'}

				]
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			this.refreshing = true
			this.getUserDetail()
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
		},
		onLoad() {
			this.statusHeight = 0;
			// #ifdef APP-PLUS
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
			//this.getUserDetail();
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			let value = this.userDetail.f_name
			let value1 = uni.getStorageSync("account")
			if (index === 0) {
				uni.navigateTo({
					url: './setting/setting?value=' + value + '&value1=' + value1
				})
			}
		},
		// #endif
		onReady() {
			//此处，演示,每次页面初次渲染都把登录状态重置
			uni.setStorage({
				key: 'UserInfo',
				data: false,
				success: function() {},
				fail: function(e) {}
			});
		},
		onShow() {
			this.getUserDetail()
			/* uni.getStorage({
				key: 'UserInfo',
				success: (res) => {
					if (!res.data) {
						if (this.isfirst) {
							//this.toLogin();
						}
						return;
					}
					this.user = res.data;
				},
				fail: (e) => {
					//this.toLogin(); 
				}
			}); */
		},
		methods: {

			//消息列表
			toMsg() {
				uni.navigateTo({
					url: '../../msg/msg'
				})
			},
			toOrderList(index) {
				//uni.setStorageSync('tbIndex', index);
				var toUrl = ""
				switch (index) {
					case 0:
						toUrl = './order/adoptRecord'
						break;
					case 1:
						toUrl = './order/transferRecord'
						break;
					case 2:
						toUrl = './order/reservationRecord'
						break;
				}
				uni.navigateTo({
					url: toUrl
				})
			},
			toRecerd(index) {
				console.log(index)
				var toUrl = ""
				let value = ""
				switch (index) {
					case 1:
						value = this.userDetail.f_digcoinvalue
						toUrl = './order/diffRecord?value=' + value
						break;
					case 2:
						value = this.userDetail.f_totalincomevalue
						toUrl = './order/profitRecord?value=' + value
						break;
					case 3:
						//推广收益
						value = this.userDetail.f_refervalue
						//团对收益
						let vaue1 = this.userDetail.f_teamvalue
						//转存收益
						let value2 = this.userDetail.f_revincomevalue
						toUrl = './order/promoteRecord?value=' + value + '&value1=' + vaue1 + '&value2=' + value2
						break;
				}
				uni.navigateTo({
					url: toUrl
				})
			},
			toSetting() {
				/* let vaue = this.userDetail.f_name
				let value1 = uni.getStorageSync("account")
				uni.navigateTo({
					url: '../../user/setting/setting?value=' + value + '&value1=' + vaue1
				}) */
			},
			toMyQR() {
				/* uni.navigateTo({
					url: '../../user/myQR/myQR'
				}) */
			},
			toLogin() {
				/* uni.showToast({
					title: '请登录',
					icon: "none"
				});
				uni.navigateTo({
					url: '../../login/login'
				})
				this.isfirst = false; */
			},
			isLogin() {
				//实际应用中,用户登录状态应该用token等方法去维持登录状态.
				const value = uni.getStorageSync('UserInfo');
				if (value) {
					return true;
				}
				return false
			},
			toDeposit() {
				uni.navigateTo({
					url: '../../user/deposit/deposit'
				})
			},
			toPage(url) {
				if (url == './tools/realNameAuthentication') {
					//实名认证
					url = './tools/realNameAuthentication?value=' + this.userDetail.f_status
				}
				uni.navigateTo({
					url: url
				})
			},
			//详情
			getUserDetail() {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}

				http.post('api/UserInfo/GetUserModel').then((res) => {
					if (res.data.StatusCode == 1) {
						this.refreshing = false;
						uni.stopPullDownRefresh();
						this.userDetail = res.data.Data
						this.user.username = this.userDetail.f_name

					} else {
						this.refreshing = false;
						uni.stopPullDownRefresh();
						uni.showToast({
							title:   res.data.Message,
							icon: 'none'
						});
						
					}
				}).catch((err) => {
					this.refreshing = false;
					uni.stopPullDownRefresh();
					uni.showToast({
						title:  '请求失败',
						icon: 'none'
					});
				})
			}
		},
		mounted() {
			this.user.signature = uni.getStorageSync("account")
		}
	}
</script>
<style lang="scss">
	page {
		position: relative;
		background-color: #fff;
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #f06c7a;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */

	}

	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #f06c7a;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.icon-btn {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;

			.icon {
				color: #fff;
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}

	.place {
		background-color: #f06c7a;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.place-bottom {
		height: 300upx;
	}

	.user {
		width: 92%;
		padding: 0 4%;
		display: flex;
		align-items: center;
		margin-top: -1px;
		background-color: #f06c7a;
		padding-bottom: 120upx;

		.left {
			width: 20vw;
			height: 20vw;
			flex-shrink: 0;
			margin-right: 20upx;
			border: solid 1upx #fff;
			border-radius: 100%;

			image {
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}

		}

		.right {
			width: 100%;

			.username {
				font-size: 50upx;
				color: #fff;
			}

			.signature {
				color: #eee;
				font-size: 28upx;
			}
		}

		.erweima {
			flex-shrink: 0;
			width: 10vw;
			height: 10vw;
			margin-left: 5vw;
			border-radius: 100%;

			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(to left, #fbbb37 0%, #fcf0d0 105%);

			.icon {
				color: #7b6335;
				font-size: 42upx;
			}
		}
	}

	.order {
		width: 84%;
		margin: 30upx 4% 30upx 4%;
		padding: 30upx 4% 20upx 4%;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.1);
		border-radius: 15upx;

		.list {
			display: flex;
			padding-bottom: 10upx;
			padding-top: 25upx;

			.box {
				width: 33.333333%;

				.img {
					width: 28vw;
					height: 10.5vw;
					display: flex;
					justify-content: center;

					image {
						width: 9vw;
						height: 9vw;
					}
				}

				.text {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 28upx;
					color: #3d3d3d;
				}
			}
		}

		.balance-info {
			display: flex;
			padding: 10upx 0;
			padding-bottom: 3vw;

			.left {
				width: 100%;
				display: flex;

				.box {
					width: 50%;
					font-size: 28upx;

					.num {
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						color: #f9a453;
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 29upx;
						color: #3d3d3d;
					}
				}
			}

			.right {
				border-left: solid 1upx #17e6a1;
				width: 25%;

				.box {

					.img {
						width: 100%;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: flex-end;

						.icon {
							font-size: 45upx;
							color: #e78901;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 28upx;
						color: #3d3d3d;
					}
				}
			}
		}
	}

	.VIP {
		width: 84%;
		margin: -65upx auto 20upx auto;
		padding: 30upx 4%;
		background: linear-gradient(to left, #dea96d 0%, #f6d59b 100%);
		box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.2);
		border-radius: 15upx;
		display: flex;
		align-items: center;

		.img {
			flex-shrink: 0;
			width: 60upx;
			height: 60upx;

			image {
				width: 60upx;
				height: 60upx;
			}
		}

		.title {
			width: 100%;
			color: #796335;
			font-size: 30upx;
		}

		.tis {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			color: #fcf0d0;
			font-size: 26upx;
		}
	}

	.toolbar {
		width: 84%;
		margin: 15px 4% 15px 4%;
		padding: 15px 4% 10px 4%;
		background-color: #fff;
		box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.1);
		border-radius: 15upx;

		.title {
			padding-top: 10upx;
			margin: 0 0 10upx 3%;
			font-size: 30upx;
			height: 80upx;
			display: flex;
			align-items: center;
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			padding-top: 30upx;

			.box {
				width: 33.333333%;
				margin-bottom: 50upx;
			
				.img {
					width: 28vw;
					height: 10.5vw;
					display: flex;
					justify-content: center;
			
					image {
						width: 9vw;
						height: 9vw;
					}
				}
			
				.text {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 28upx;
					color: #3d3d3d;
				}
			}
		}
	}
</style>
