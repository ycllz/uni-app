<template>
	<view class="main">

		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择:
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
						<view class="uni-input">{{array[index].name}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="main-list">

			<input-box v-model="body.accountName" ref="input1" :verification="['isNull']" :verificationTip="['账户名称不能为空']"
			 placeholder="账户名称" leftText="账户名称:" :clearShow="false"></input-box>
			<input-box v-model="body.account" ref="input2" :verification="['isNull']" :verificationTip="['账号不能为空']" placeholder="账号"
			 leftText="账号:" :clearShow="false"></input-box>
			<view v-if="body.type == 3">
				<input-box v-model="body.f_SubBranchName" ref="input4" :verification="['isNull']" :verificationTip="['开户行地址不能为空']"
				 placeholder="开户行地址" leftText="开户行地址:" :clearShow="false"></input-box>
			</view>


			<view class="choose-code" v-if="body.type != 3">请选择收款码:
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageList" :key="index">
						<view class="uni-uploader__file" style="position: relative;">
							<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
							<view class="close-view" @click="close(index)">×</view>
						</view>
					</block>
					<view class="uni-uploader__input-box" v-if="imageList.length < 1">
						<view class="uni-uploader__input" @tap="chooseImage"></view>
					</view>
				</view>
			</view>

			<view class="border-top-view">
				<input-box v-model="body.code" ref="input3" placeholder="请输入验证码" :verification="['isNull']" :verificationTip="['验证码不能为空']"
				 @rightClick="sendCodeMessage" :rightText="content" :clearShow="false"></input-box>
			</view>

		</view>

		<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
			<button type="primary" @tap="uploadImage">确认</button>
		</view>
		<w-loading text="加载中.." mask="true" click="false" ref="loading"></w-loading>
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
			valitate() {
				if (this.$refs.input1.getValue() && this.$refs.input2.getValue() && this.$refs.input3.getValue()) {
					if (this.body.type == 3) {
						if (this.$refs.input4.getValue()) {
							return true
						} else {
							return false
						}
					} else {
						return true
					}

				} else {
					return false
				}
			},
			//新增
			uploadImage() {


				if (this.valitate()) {
					this.body.userAccount = uni.getStorageSync("account")

					if (this.body.type != 3) {
						//银行卡
						if (this.imageList.length == 0) {
							uni.showToast({
								title: '请选择收款码',
								icon: 'none'
							});
							return
						}
						this.$refs.loading.open()
						var images = [];

						for (var i = 0, len = this.imageList.length; i < len; i++) {
							var image_obj = {
								name: 'image-' + i,
								uri: this.imageList[i]
							};
							images.push(image_obj);
						}

						//上传图片
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
										this.$refs.loading.close()
										uni.showToast({
											title: res.Data.msg,
											icon: 'none'
										});
									}
								} else {
									this.$refs.loading.close()
									uni.showToast({
										title: res.Message,
										icon: 'none'
									});
								}
							},
							fail: (e) => {
								this.$refs.loading.close()
								uni.showToast({
									title: '网络繁忙，请稍后重试',
									icon: 'none'
								});
							}
						});
					} else {
						this.$refs.loading.open()
						//微信 支付宝
						this.body.filePath = ''
						this.submitAdd()
					}
				}
			},
			submitAdd() {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				http.post('api/PayModel/AddPayModel', this.body).then((res) => {
					if (res.data.StatusCode == 1) {
						this.$refs.loading.close()
						//新增收款方式 （0：新增失败，1：新增成功，2：用户不存在，3：账号已存在）
						if (res.data.Data == 1) {
							uni.showToast({
								title: '添加成功',
								icon: 'none'
							});
							uni.navigateBack()
						} else if (res.data.Data == 0) {
							uni.showToast({
								title: '新增失败',
								icon: 'none'
							});
						} else if (res.data.Data == 2) {
							uni.showToast({
								title: '用户不存在',
								icon: 'none'
							});
						} else if (res.data.Data == 3) {
							uni.showToast({
								title: '账号已存在',
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: '新增失败',
								icon: 'none'
							});
						}

					} else {
						this.$refs.loading.close()
						uni.showToast({
							title: res.data.Message,
							icon: 'none'
						});
					}
				}).catch((err) => {
					this.$refs.loading.close()
					uni.showToast({
						title: '网络繁忙，请稍后重试',
						icon: 'none'
					});
				})
			},
			//倒计时
			countDown() {
				if (!this.canClick) return //改动的是这两行代码
				this.canClick = false
				let _this = this
				let clock = window.setInterval(() => {
					_this.totalTime--
					_this.content = _this.totalTime + 's后重新发送'
					if (_this.totalTime < 0) {
						window.clearInterval(clock)
						_this.content = '重新发送验证码'
						_this.totalTime = 10
						_this.canClick = true //这里重新开启
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
						//发送验证码(0：发送失败，1：发送成功，2：参数为空，3：重复发送短信
						if (res.data.Data == 1) {
							uni.showToast({
								title: '发送成功',
								icon: 'none'
							});
							this.countDown()
						} else if (res.data.Data == 0) {
							uni.showToast({
								title: '发送失败',
								icon: 'none'
							});
						} else if (res.data.Data == 2) {
							uni.showToast({
								title: '参数为空',
								icon: 'none'
							});
						} else if (res.data.Data == 3) {
							uni.showToast({
								title: '重复发送短信',
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: '发送失败',
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
						title: '网络繁忙，请稍后重试',
						icon: 'none'
					});
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
		height: 84upx;
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		border-bottom: 2upx solid #F5F5F5;
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
		color: #4A4A4A !important;
		font-size: 15px !important;
	}

	.uni-list-cell-left {
		font-size: 14px;
		height: 46upx;
		padding-top: 18upx;
		padding-left: 32upx;
		color: #4A4A4A;
	}

	.uni-list-cell-db {
		width: 75%;
	}

	.uni-list-cell-db uni-picker {
		width: 100%;
	}

	.uni-list-cell-db .uni-input {
		height: 48upx;
		padding: 18upx 24upx;
		line-height: 48upx;
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
		border-top: 2upx solid #F5F5F5;
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
