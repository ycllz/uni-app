<template>
	<!-- 付款 -->
	<view class="main">
		<view class="main-list">
			<view>区块编号:{{orderDetail.f_code}}</view>
			<view>区块狗:{{orderDetail.f_name}}</view>
			<view>区块金额:{{orderDetail._id}}</view>
			<view>智能合约收益:{{orderDetail._id}}</view>
			<view>转让时间:{{orderDetail.f_transfertime}}</view>
			<view>转让方:{{orderDetail.f_selluserid}}</view>
			<view>转让方联系电话:{{orderDetail.f_buyphone}}</view>
			<view>区块狗状态:{{orderDetail.f_statusStr}}</view>
			<view>收益状态:{{orderDetail._id}}</view>
		</view>

		<view>转让方收款账号</view>


		<view class="choose-code">请选上传付款码
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
			<input-box v-model="safePwd" placeholder="二级密码" leftText="二级密码:"></input-box>
		</view>
		<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
			<button type="primary" @tap="uploadImage">确认</button>
		</view>
		<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>
	</view>
</template>

<script>
	import http from '@/common/vmeitime-http/interface.js'
	import inputBox from '@/components/input-box/input-box'
	import image from '@/common/image.js';
	import md5 from 'js-md5'

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
		components: {
			inputBox
		},
		data() {
			return {
				message: '',
				orderDetail: {},
				baseUrl: '',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				safePwd: '',
				body: {
					orderId: "",
					safePwd: "",
					payUrl: ""
				}
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.body.orderId = option.value
		},
		methods: {
			getOrderDetail() {
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				let type = this.tabCur + 1
				http.post('api/Order/GetOrderDetail?orderId=' + this.body.orderId).then((res) => {
					if (res.data.StatusCode == 1) {
						if (res.data.Data) {
							res.data.Data.f_statusStr = this.getStatusStr(res.data.Data.f_status)
							this.orderDetail = res.data.Data
						} else {
							this.orderDetail = {}
						}

					} else {
						this.message = res.data.Message
						this.$refs.toast.show()
					}
				}).catch((err) => {
					this.message = '请求失败'
					this.$refs.toast.show()
				})
			},
			//上传图片
			uploadImage() {

				if (this.safePwd == '') {
					this.message = '请输入二级密码'
					this.$refs.toast.show()
					return
				}
				if (this.imageList.length == 0) {
					this.message = '请上传付款凭证'
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
								this.body.payUrl = res.Data.filePath
								this.submitPay()
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
			submitPay() {
				let p1 = md5(this.safePwd.toString())
				this.body.safePwd = md5(p1)
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				http.post('api/Order/Pay', this.body).then((res) => {
					if (res.data.StatusCode == 1) {
						//支付订单(0：订单状态异常，1：成功，2：人员不匹配,3:二级密码不正确，4：提交失败)
						if (res.data.Data == 1) {
							this.message = '付款成功'
							this.$refs.toast.show()
							uni.navigateBack()
						} else if (res.data.Data == 0) {
							this.message = '订单状态异常'
							this.$refs.toast.show()
						} else if (res.data.Data == 2) {
							this.message = '人员不匹配'
							this.$refs.toast.show()
						} else if (res.data.Data == 3) {
							this.message = '二级密码不正确'
							this.$refs.toast.show()
						} else if (res.data.Data == 4) {
							this.message = '提交失败'
							this.$refs.toast.show()
						}

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
			getStatusStr(value) {
				let res = ''
				switch (value) {
					case 0:
						res = '待支付'
						break;
					case 1:
						res = '收益中'
						break;
					case 2:
						res = '支付超时'
						break;
					case 3:
						res = '待确认'
						break;
					case 4:
						res = '取消'
						break;
					case 5:
						res = '申诉中'
						break;
					case 6:
						res = '订单结束'
						break;
				}
				return res;
			}
		},
		mounted() {
			this.baseUrl = 'http://39.100.76.224:8081/'
			this.getOrderDetail()
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
		font-size: 15px;
		padding: 15px;
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
