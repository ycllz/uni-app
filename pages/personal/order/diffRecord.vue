<template>
	<!-- 微分 -->
	<view>
		<view class="main">
			<view class="top-card" style="margin-top: 20upx;">
				<uni-card>
					当前剩余微分 {{currentDiff}}
				</uni-card>
			</view>
			<view class="main-list" style="margin-top: 30upx;">
				<!-- <cmd-cell-item title="-12" brief="预约/领养扣除" addon="2019-07-22 22:22:12" /> -->
			</view>
			<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>
		</view>
	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import uniCard from "@/components/uni-card/uni-card"
	import http from '@/common/vmeitime-http/interface.js'

	export default {
		components: {
			cmdCellItem,
			uniCard
		},
		data() {
			return {
				currentDiff: 0,
				message: '',
				body: {
					account: '',
					page: 1,
					rowCount: 10
				}
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.currentDiff = option.value
		},
		methods: {
			getPageList() {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				this.body.account = uni.getStorageSync("account")
				http.post('api/DigitalCoin/GetValidPageListByAccount', this.body).then((res) => {
					if (res.data.StatusCode == 1) {

					} else {
						this.message = res.data.Message
						this.$refs.toast.show()
					}
				}).catch((err) => {
					this.message = '请求失败'
					this.$refs.toast.show()
				})
			}
		},
		mounted() {
			this.getPageList()
		}
	}
</script>

<style>
	.main {
		flex-direction: column;
		min-height: 100vh;
		padding-top: 15upx;
		background: #efefef;
	}

	.main-list {
		background-color: #FFFFFF;
		width: 750upx;
		flex-direction: column;
	}

	.main-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.top-card .uni-card {
		border-radius: 10px;
		text-align: center;
		padding-top: 15px;
		padding-bottom: 15px;
	}
</style>
