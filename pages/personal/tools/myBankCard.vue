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
						<text>账户名称：</text>
					</div>
					<div>
						<text>账户：{{item.f_account}}</text>
					</div>
					<div>
						<text>账户类型：{{item.f_name}}</text>
					</div>
				</div>
				<div class="div-btn">
					<button type="warn">操作</button>
				</div>
			</view>

			<!-- <view class="main-list-item">
				<div class="div-image">
					<image src="../../../static/face.jpg"></image>
				</div>
				<div class="div-card">
					<div>
						<text>账户名称：赵长东</text>
					</div>
					<div>
						<text>账户：15882039655</text>
					</div>
					<div>
						<text>账户类型：支付宝支付</text>
					</div>
				</div>
				<div class="div-btn">
					<button type="warn">操作</button>
				</div>
			</view> -->

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
		<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>

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
				cardList: [],
			}
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
				http.post('api/PayModel/GetListByAccount?account=' + uni.getStorageSync("account")).then((res) => {
					if (res.data.StatusCode == 1) {
						this.cardList = res.data.Data
					} else {
						this.message = res.data.Message
						this.$refs.toast.show()
					}
				}).catch((err) => {
					this.message = '请求失败'
					this.$refs.toast.show()
				})
			},
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
		height: 195upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 15upx 20upx;
		border-bottom: 1px solid #c8c7cc;
		font-size: 15px;
	}

	.div-image {
		float: left;
	}

	.div-image uni-image {
		width: 80px;
		height: 80px;
	}

	.div-card {
		width: 320upx;
		margin-left: 15upx;
		margin-top: 22upx;
		float: left;
	}

	.div-btn {
		margin-top: 45upx;
	}

	.div-btn uni-button {
		width: 60px;
		height: 30px;
		font-size: 14px;
	}

	.div-tip {
		padding: 24upx;
		font-size: 20upx;
	}

	.div-tip .red-tip {
		color: #D53A33;
	}
</style>
