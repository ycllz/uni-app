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
			<input-box v-model="body.f_SubBranchName" placeholder="开户行地址" leftText="开户行地址:"></input-box>

			<sunui-upbasic :upImgConfig="upImgBasic" @onUpImg="upBasicData" @onImgDel="delImgInfo" ref="uImage"></sunui-upbasic>

			<input-box v-model="body.code" placeholder="请输入验证码" @rightClick="countDown" :rightText="content"></input-box>
		</view>

		<view class="view-btn" style="padding-left: 20upx;padding-right: 20upx;margin-top: 20upx;">
			<button type="primary" @tap="submitAdd">确认</button>
		</view>
		<yu-toast :message="message" verticalAlign="center" ref="toast"></yu-toast>

	</view>
</template>

<script>
	import inputBox from '@/components/input-box/input-box'
	import http from '@/common/vmeitime-http/interface.js'

	export default {
		data() {
			return {
				message: '',
				content: '发送验证码',
				totalTime: 120,
				canClick: true, //添加canClick
				body: {
					type: 0,
					typeName: "",
					userId: "",
					account: "",
					accountName: "",
					filePath: "",
					f_SubBranchName: "",
					code: ""
				},
				basicArr: [],
				// 基础版配置
				upImgBasic: {
					// 后端图片接口地址
					basicConfig: {
						url: 'http://39.100.76.224:8081/api/Upload/UploadImage'
					},
					// 是否开启提示(提醒上传图片的数量)
					// tips: false,
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: false,
					// 图片数量
					count: 2,
					// 相机来源(相机->camera,相册->album,两者都有->all,默认all)
					sourceType: 'all',
					// 是否压缩上传照片(仅小程序生效)
					sizeType: true,
					// 上传图片背景修改 
					upBgColor: '#E8A400',
					// 上传icon图标颜色修改(仅限于iconfont)
					upIconColor: '#fff',
					// 上传svg图标名称
					// upSvgIconName: 'icon-card',
					// 上传文字描述(仅限四个字)
					// upTextDesc: '上传证书',
					// 删除按钮位置(left,right,bleft,bright),默认右上角
					delBtnLocation: '',
					// 是否隐藏添加图片
					isAddImage: false,
					// 是否隐藏删除图标
					// isDelIcon: false,
					// 删除图标定义背景颜色
					// delIconColor: '',
					// 删除图标字体颜色
					// delIconText: '',
					// 上传图标替换(+),是个http,https图片地址(https://www.playsort.cn/right.png)
					iconReplace: ''
				},
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
			submitAdd() {

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
				if (this.body.f_SubBranchName == '') {
					this.message = '请输入开户行地址'
					this.$refs.toast.show()
					return
				}

				this.body.filePath = '/upload/images/thum_5bbcd94d18774e1faa2e2ab4168dafad.png'
				http.config.header = {
					'Authorization': uni.getStorageSync("token")
				}
				http.post('api/PayModel/AddPayModel', this.body).then((res) => {
					if (res.data.StatusCode == 1) {

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
				this.sendCodeMessage()
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
				http.get('api/NoAuthorize/SendCodeMessage?account=15882039655').then((res) => {
					if (res.data.StatusCode == 1) {
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
			// 删除图片 -2019/05/12(本地图片进行删除)
			async delImgInfo(e) {
				console.log('你删除的图片地址为:', e, this.basicArr.splice(e.index, 1));
			},
			// 基础版
			async upBasicData(e) {
				console.log('===>', e);
				// 上传图片数组
				let arrImg = [];
				let res = ''
				for (let i = 0, len = e.length; i < len; i++) {
					try {
						if (e[i].path_server != "") {
							res = await arrImg.push(e[i].path_server.split(','));
						}
					} catch (err) {
						console.log('上传失败...');
					}
				}
				// 图片信息保存到data数组
				this.basicArr = arrImg;
				console.log('-----------------------');
				console.log(arrImg);
				console.log(res)

				// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
				if (arrImg.length == this.upImgBasic.count) {
					uni.showToast({
						title: `上传成功`,
						icon: 'none'
					});
				}
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
