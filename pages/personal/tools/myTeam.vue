<template>
	<view>
		<view class="main">

			<view class="main-list">
				<cmd-cell-item title="-12" brief="预约/领养扣除" addon="2019-07-22 22:22:12" />
			</view>
			<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>
		</view>
	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import http from '@/common/vmeitime-http/interface.js'
	export default {
		components: {
			cmdCellItem
		},
		data() {
			return {
				message: '',
				body: {
					page: 1,
					rowCount: 10
				}
			}
		},
		methods: {
			getPageList() {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				this.body.account = uni.getStorageSync("account")
				http.post('api/UserInfo/GetTeamPageList', this.body).then((res) => {
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
		background-color: #EFEFEF;
		padding-top: 15upx;
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
</style>
