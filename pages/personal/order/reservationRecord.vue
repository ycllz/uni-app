<!-- 预约记录 -->
<template>
	<view>
		<div v-for="(target, index) in recordList" :key="index">
			<text> {{target.name}} </text>
		</div>
		<text class="loadMore">加载中...</text>
	</view>
</template>

<script>
	import http from '../../../common/vmeitime-http/interface.js'

	export default {
		data() {
			return {
				recordList: [],
				refreshing: false,
			}
		},
		onLoad() {
			this.refreshing = true;
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
				let params = {
					"page": 1,
					"rowCount": 10
				}


				/* http.config.header = {
					'Authorization':  "bearer iJgPdeF2Nccb7z5ovVl_RkqHmQ1y0HvEysH4Bx-WW1s3w3_pEX2uYfCKFlz7GRSELev2l0Fes1RxCtAEYXaRNbSxtCHwGmUsa9zKeTYfh4GocC53vHVzXMkU2ckfcnxKgQSquzZ7vZJdqMK4qDLLEUdrd0ePJd3kqKVNV1tXomrd3OUIgZoXB049LFjGpOpc75D3qDUkQoHEjdA__-uiyvbLl5tmhZs4SXYdBd4UqnSW4LiZe0JujZNPOQLZ1jNy" //uni.getStorageSync("token")
				} */
				http.get('api/DigitalCoin/GetPageList', params).then((res) => {
					console.log("1111111111111")
					/* uni.setStorageSync("account", this.account);
					uni.setStorageSync("token", res.access_token); */

				}).catch((err) => {
					console.log("222222222222")
					/* this.message = '失败' + err
					this.$refs.toast.show() */
				})
				
				for(var i=0;i<35;i++){
					this.recordList.push({
						"name":"测试数据-"+i,
						"id":i
					})
				}
				this.refreshing = false;
			}
		}
	}
</script>

<style>

</style>
