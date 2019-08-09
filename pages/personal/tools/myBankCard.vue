<template>
	<!-- 我的银行卡 -->
	<view class="main">
		<cmd-nav-bar :fixed="false" back title="我的银行卡" iconTwo="add" @iconTwo="addbank()" font-color="#000" background-color="#fff"></cmd-nav-bar>
		<view class="main-list">
			<view class="main-list-item" v-for="item in cardList" :key="item.f_id">
				<view v-if="item.f_type == 1" class="div-image">
					<image src="../../../static/pay_bao.png"></image>
				</view>
				<view v-else-if="item.f_type == 2" class="div-image">
					<image src="../../../static/wei_chat.png"></image>
				</view>
				<view v-else class="div-image">
					<image src="../../../static/bank_card.png"></image>
				</view>

				<div class="div-card">
					<div>
						<text>账户名称：{{item.f_accountname}}</text>
					</div>
					<div>
						<text>账户：{{item.f_account}}</text>
					</div>
					<div>
						<text>账户类型：{{item.f_name}}</text>
					</div>
				</div>
				<div class="div-btn">
					<button class="mini-btn" type="warn" @click="disPayModel(item._id)" size="mini">禁用</button>
					<!-- 	<button type="warn">操作</button> -->
				</div>
			</view>

			<view class="div-tip">
				<text>
					为确保能一次性通过审核，请按如下几点上传:
					1，所有收款方式的实名信息必须和要提交实名认证的实名一致。
					2，支付宝账号一定要确保输入账号能进行付款操作，不要关闭支付宝应用中的‘通过邮箱找到我’或‘通过手机号找到我’的隐私功能
					3，微信不要关闭通过手机号添加好友的功能。
					4，一定要认真填写银行卡收款信息。
					5，至少要上传银行卡，支付宝，微信三种收款方式。
					<div class="red-tip">
						***请认真填写并上传收款方式，一旦通过审核，不得再修改和添加，银行卡收款方式不允许关闭***
					</div>

				</text>
			</view>
			<br />
		</view>

	</view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import http from '@/common/vmeitime-http/interface.js'


	export default {
		components: {
			cmdNavBar
		},
		data() {
			return {
				message: '',
				refreshing: false,
				cardList: [],
			}
		},
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.refreshing = true;
			this.queryBankList();
		},
		onShow() {
			this.queryBankList();
		},
		methods: {
			addbank() {
				uni.navigateTo({
					url: 'addBankCard'
				})
			},
			queryBankList() {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				http.post('api/PayModel/GetList').then((res) => {
					if (res.data.StatusCode == 1) {
						let resData = res.data.Data
						/* for (var i = 0; i < resData.length; i++) {
							resData[i].f_accountnameStr = resData[i].f_accountname.length > 12 ? resData[i].f_accountname.substring(0, 12) +
								'...' : resData[i].f_accountname
							resData[i].f_accountStr = resData[i].f_account.length > 12 ? resData[i].f_account.substring(0, 12) +
								'...' : resData[i].f_account
						} */
						this.cardList = res.data.Data
					} else {
						uni.showToast({
							title: res.data.Message,
							icon: 'none'
						});
					}
					this.refreshing = false;
					uni.stopPullDownRefresh();
				}).catch((err) => {
					uni.showToast({
						title: '网络繁忙，请稍后重试',
						icon: 'none'
					});
					this.refreshing = false;
					uni.stopPullDownRefresh();
				})
			},
			disPayModel(id) {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				http.post('api/PayModel/DisPayModel?id=' + id).then((res) => {
					if (res.data.StatusCode == 1) {
						//禁用收款码 0 失败 1 成功 2 未找到收款方式 3 至少保留两种收款方式
						if (res.data.Data == 0) {
							uni.showToast({
								title: '处理失败',
								icon: 'none'
							});
						} else if (res.data.Data == 0) {
							uni.showToast({
								title: '处理成功',
								icon: 'none'
							});
							this.queryBankList()
						} else if (res.data.Data == 0) {
							uni.showToast({
								title: '未找到收款方式',
								icon: 'none'
							});
						} else if (res.data.Data == 0) {
							uni.showToast({
								title: '至少保留两种收款方式',
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: '处理失败',
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
						title: res.data.Message,
						icon: 'none'
					});
					this.refreshing = false;
					uni.stopPullDownRefresh();
				})
			}
		},
		mounted() {
			this.queryBankList()
		}
	}
</script>

<style>
	.body {
		/*距离顶部范围应该在88-95范围内*/
		padding-top: 90upx;
		top: var(--status-bar-height);
	}

	.main {
		flex-direction: column;
		min-height: 100vh;
		background-color: #EFEFEF;
	}

	.main-list {
		margin-top: 15upx;
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

	.main-list-item::before {
		content: '';
		display: inline-block;
		height: 100%;
		width: 0;
		vertical-align: middle;
	}


	.div-image {
		display: inline-block;
		vertical-align: middle;

	}

	.div-image>uni-image {
		width: 160upx;
		height: 160upx;
	}

	.div-image>image {
		width: 160upx;
		height: 160upx;
	}


	.div-card {
		width: 400upx;
		margin-left: 15upx;
		margin-top: 22upx;
		display: inline-block;
		vertical-align: middle;
	}

	.div-btn {
		display: inline-block;
		vertical-align: middle;
	}

	.div-tip {
		padding: 24upx;
		font-size: 20upx;
	}

	.div-tip .red-tip {
		color: #D53A33;
	}
</style>
