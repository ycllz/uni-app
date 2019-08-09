<template>
	<!-- 出售 -->
	<view class="main">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					出售资产
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
						<view class="uni-input">{{array[index].name}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="main-list">
			<input-box v-model="body.price" placeholder="出售资产" ref="input1" :verification="['isNull','isInt']" :verificationTip="['出售资产不能为空','出售资产必须是整数']"
			 leftText="出售资产:" :clearShow="false"></input-box>
			<input-box v-model="password" placeholder="二级密码" ref="input2" :verification="['isNull','isInt']" :verificationTip="['二级密码不能为空','二级密码必须是数字']"
			 leftText="二级密码:" :clearShow="false"></input-box>
		</view>

		<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
			<button type="primary" @tap="toSell">确认</button>
		</view>

	</view>
</template>

<script>
	import inputBox from '@/components/input-box/input-box'
	import http from '@/common/vmeitime-http/interface.js'
	import md5 from 'js-md5'


	export default {
		components: {
			inputBox
		},
		data() {
			return {
				message: '',
				password: '',
				value: 0,
				value1: 0,
				value2: 0,
				body: {
					type: 2,
					price: 0,
					safePwd: '',
				},
				array: [{
					id: 1,
					name: '推广收益'
				}, {
					id: 2,
					name: '团队收益'
				}, {
					id: 3,
					name: '收益转存'
				}],
				index: 0,
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			//推广收益
			this.value = option.value
			//团队收益
			this.value1 = option.value1
			//转存收益
			this.value2 = option.value2
			this.array[0].name = this.array[0].name + '(' + this.value + ')'
			this.array[1].name = this.array[1].name + '(' + this.value1 + ')'
			this.array[2].name = this.array[2].name + '(' + this.value2 + ')'
		},
		methods: {
			//切换资产
			bindPickerChange(e) {
				//2 推薦收益 3 團隊收益 4 轉存收益
				if (e.target.value == 0) {
					this.body.type = 2
				} else if (e.target.value == 1) {
					this.body.type = 3
				} else {
					this.body.type = 4
				}
				this.index = e.target.value
			},
			//新增
			toSell() {
				if (this.$refs.input1.getValue() && this.$refs.input2.getValue()) {
					http.config.header = {
						'Authorization': uni.getStorageSync("token")
					}
					let p1 = md5(this.password.toString())
					let p2 = md5(p1)
					this.body.safePwd = p2

					http.post('api/ReferInCome/Exchange', this.body).then((res) => {
						if (res.data.StatusCode == 1) {
							//(0：兑换失败，1：兑换成功，2：二级密码校检失败，3：类型指定错误，
							//4：当前额度小于要兑换的价值，5：低于最低兑换值)
							if (res.data.Data == 0) {
								uni.showToast({
									title:  '兑换失败',
									icon: 'none'
								});
							} else if (res.data.Data == 1) {
								uni.showToast({
									title: '兑换成功~',
									icon: 'none'
								});
								
								setTimeout(function() {
									uni.navigateBack({
										delta: 2
									});
								}, 1500);
								
							} else if (res.data.Data == 2) {
								uni.showToast({
									title: '二级密码错误',
									icon: 'none'
								});
							} else if (res.data.Data == 3) {
								uni.showToast({
									title: '类型指定错误',
									icon: 'none'
								});
							} else if (res.data.Data == 4) {
								uni.showToast({
									title: '当前额度小于要兑换的价值',
									icon: 'none'
								});
							} else if (res.data.Data == 5) {
								uni.showToast({
									title: '低于最低兑换值',
									icon: 'none'
								});
							} else {
								uni.showToast({
									title: '兑换失败',
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
							title:  '网络繁忙，请稍后重试',
							icon: 'none'
						});
					})
				}
			}
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

	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		border-bottom: 1px solid #F5F5F5;
	}

	.uni-list-cell {
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		align-items: center;
	}

	.input-box-left {
		color: #000000 !important;
		font-size: 15px !important;
	}

	.uni-list-cell-left {
		font-size: 14px;
		padding-left: 35upx;
		color: #4a4a4a;
	}

	.uni-list-cell-db {
		width: 75%;
	}

	.uni-list-cell-db uni-picker {
		width: 100%;
	}

	.uni-list-cell-db .uni-input {
		height: 24px;
		padding: 7px 12px;
		line-height: 24px;
		font-size: 15px;
		background: #FFF;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}

	.uni-input-placeholder {
		color: black;
		font-size: 15px;
	}
</style>
