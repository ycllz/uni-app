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

			<input-box v-model="body.accountName" placeholder="账户名称" leftText="账户名称:"></input-box>
			<input-box v-model="body.account" placeholder="账号" leftText="账号:"></input-box>
			<view v-if="body.type == 3">
				<input-box v-model="body.f_SubBranchName" placeholder="开户行地址" leftText="开户行地址:"></input-box>
			</view>


			<view class="choose-code">请选择收款码:
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageList" :key="index">
						<view class="uni-uploader__file" style="position: relative;">
							<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
							<view class="close-view" @click="close(index)">×</view>
						</view>
					</block>
					<view class="uni-uploader__input-box" v-show="imageList.length < 1">
						<view class="uni-uploader__input" @tap="chooseImage"></view>
					</view>
				</view>
			</view>

			<view class="border-top-view">
				<input-box v-model="body.code" placeholder="请输入验证码" @rightClick="sendCodeMessage" :rightText="content"></input-box>
			</view>

		</view>

		<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
			<button type="primary" @tap="uploadImage">确认</button>
		</view>
		<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>

	</view>
</template>

<script>
	import inputBox from '@/components/input-box/input-box'
	import http from '@/common/vmeitime-http/interface.js'
	import image from '@/common/image.js';

	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]

	export default {
		data() {
			return {
				baseUrl: '',
				message: '',
				content: '发送验证码',
				totalTime: 120,
				canClick: true, //添加canClick
				body: {
					type: 1,
					typeName: "支付宝",
					account: "",
					userAccount: '',
					accountName: "",
					filePath: "",
					f_SubBranchName: "",
					code: ""
				},
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],

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
					id: 3,
					name: '工商银行'
				}],
				index: 0,
			}
		},
		components: {
			inputBox
		},
		methods: {
			//切换支付方式
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				if (e.target.value == 0) {
					this.body.type = 1
					this.body.typeName = '支付宝'
				} else if (e.target.value == 1) {
					this.body.type = 2
					this.body.typeName = '微信'
				} else {
					this.body.type = 3
					this.body.typeName = '银行卡'
				}
				this.index = e.target.value
			},
			//新增
			uploadImage() {

				if (this.body.accountName == '') {
					this.message = '请输入账户名称'
					this.$refs.toast.show()
					return
				}
				if (this.body.account == '') {
					this.message = '请输入账户'
					this.$refs.toast.show()
					return
				}
				if (this.body.type == 3 && this.body.f_SubBranchName == '') {
					this.message = '请输入开户行地址'
					this.$refs.toast.show()
					return
				}

				if (this.imageList.length == 0) {
					this.message = '请选择收款码'
					this.$refs.toast.show()
					return
				}

				if (this.body.code == '') {
					this.message = '请输入验证码'
					this.$refs.toast.show()
					return
				}
				this.body.userAccount = uni.getStorageSync("account")
				var images = [];

				for (var i = 0, len = this.imageList.length; i < len; i++) {
					var image_obj = {
						name: 'image-' + i,
						uri: this.imageList[i]
					};
					images.push(image_obj);
				}

				uni.uploadFile({
					url: this.baseUrl + 'api/Upload/UploadImage',
					files: images,
					filePath: images[0].uri,
					header: {
						'Authorization': uni.getStorageSync("token")
					},
					name: 'file',
					success: (uploadFileRes) => {
						console.log(uploadFileRes)
						let res = JSON.parse(uploadFileRes.data)
						console.log(res)
						if (res.StatusCode == 1) {
							if (res.Data.isSuccess) {
								this.body.filePath = res.Data.filePath
								this.submitAdd()
							} else {
								this.message = res.Data.msg
								this.$refs.toast.show()
							}
						} else {

						}
					},
					fail: (e) => {
						this.message = '请求失败'
						this.$refs.toast.show()
					}
				});
			},
			submitAdd() {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				http.post('api/PayModel/AddPayModel', this.body).then((res) => {
					if (res.data.StatusCode == 1) {
						this.message = '添加成功'
						this.$refs.toast.show()
						uni.navigateBack()
					} else {
						this.message = res.data.Message
						this.$refs.toast.show()
					}
				}).catch((err) => {
					this.message = '请求失败'
					this.$refs.toast.show()
				})
			},
			//倒计时
			countDown() {
				if (!this.canClick) return //改动的是这两行代码
				this.canClick = false
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
			//发送验证码
			sendCodeMessage() {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				let body = {
					'Account': uni.getStorageSync("account")
				}
				http.post('api/NoAuthorize/SendCodeMessage', body).then((res) => {
					if (res.data.StatusCode == 1) {
						this.countDown()
						this.message = '验证码发送成功'
						this.$refs.toast.show()
					} else {
						this.message = res.data.Message
						this.$refs.toast.show()
					}
				}).catch((err) => {
					this.message = '请求失败'
					this.$refs.toast.show()
				})
			},


			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			close(e) {
				this.imageList.splice(e, 1);
			},
			chooseImage: async function() {
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {

						// #ifdef APP-PLUS
						//提交压缩,因为使用了H5+ Api,所以自定义压缩目前仅支持APP平台
						var compressd = cp_images => {
							this.imageList = this.imageList.concat(cp_images) //压缩后的图片路径
						}
						image.compress(res.tempFilePaths, compressd);
						// #endif

						// #ifndef APP-PLUS
						this.imageList = this.imageList.concat(res.tempFilePaths) //非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
						// #endif

					}
				})
			},
		},

		mounted() {
			this.baseUrl = 'http://39.100.76.224:8081/'
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

	.border-top-view {
		border-top: 1px solid #F5F5F5;
	}


	/* 文件上传  satrt */
	.uni-uploader__files {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.uni-uploader__file {
		margin: 10upx;
		width: 210upx;
		height: 210upx;
	}

	.uni-uploader__img {
		display: block;
		width: 210upx;
		height: 210upx;
	}

	.close-view {
		text-align: center;
		line-height: 30upx;
		height: 35upx;
		width: 35upx;
		background: #ef5350;
		color: #FFFFFF;
		position: absolute;
		top: 1upx;
		right: 1upx;
		font-size: 35upx;
		border-radius: 8upx;
	}

	.uni-uploader__input-box {
		position: relative;
		margin: 10upx;
		width: 208upx;
		height: 208upx;
		border: 2upx solid #D9D9D9;
	}

	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}

	.uni-uploader__input-box:before {
		width: 4upx;
		height: 79upx;
	}

	.uni-uploader__input-box:after {
		width: 79upx;
		height: 4upx;
	}

	.uni-uploader__input-box:active {
		border-color: #999999;
	}

	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #999999;
	}

	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.choose-code {
		margin: 15px;
		font-size: 14px;
	}

	/* 	文件上传 endw */
</style>
