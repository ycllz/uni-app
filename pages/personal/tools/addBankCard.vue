<template>
	<view class="main">


		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
						<view class="uni-input">{{array[index].name}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="main-list">


			<input-box v-model="name" placeholder="账户名称" leftText="账户名称:"></input-box>
			<input-box v-model="account" placeholder="账号" leftText="账号:"></input-box>


			<view style="height: 200upx;border-bottom: 1px solid #F5F5F5;">
				上传收款码
			</view>
			<input-box v-model="code" placeholder="请输入验证码" @rightClick="countDown" :rightText="content"></input-box>
		</view>

		<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
			<button type="primary" @tap="submitAdd">确认</button>
		</view>


	</view>
</template>

<script>
	import inputBox from '@/components/input-box/input-box'
	import http from '@/common/vmeitime-http/interface.js'

	export default {
		data() {
			return {
				name: '',
				account: '',
				code: '',
				content: '发送验证码',
				totalTime: 60,
				canClick: true, //添加canClick
				array: [{
					id: 1,
					name: '支付宝'
				}, {
					id: 2,
					name: '微信'
				}, {
					id: 3,
					name: '中国银行'
				}, {
					id: 4,
					name: '工商银行'
				}],
				index: 0,
			}
		},
		components: {
			inputBox
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
			},
			submitAdd() {

			},
			countDown() {
				if (!this.canClick) return //改动的是这两行代码
				this.canClick = false
				console.log(111111111111)
				let clock = window.setInterval(() => {
					this.totalTime--
					this.content = this.totalTime + 's后重新发送'
					if (this.totalTime < 0) {
						window.clearInterval(clock)
						this.content = '重新发送验证码'
						this.totalTime = 10
						this.canClick = true //这里重新开启
					}
				}, 1000)
			},
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
