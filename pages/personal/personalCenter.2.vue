<template>
	<view class="center">
		<header>
			<p>
				<span>我的111</span>
				<span><i class=" iconfont icon-shutDown "></i></span>
			</p>
		</header>	
		
		<div class="info">
			<img src="food1.png" >
			<p class="info_name"><span>sangders设计</span> <i class="iconfont icon-nan"></i></p>
			<p class="info_text">小小设计学徒一枚！网址。。。。</p>
			<div class="info_item">
				<p>16</p>
				<p>关注</p>
			</div>
			<div class="info_item">
				<p>32</p>
				<p>粉丝</p>
			</div>
			<div class="info_item">
				<p>3</p>
				<p>动态</p>
			</div>
		</div>
		
			
		<div class="iconCon">
			<div>
				<i class="iconfont icon-xiezuo icon_comment"></i>
				<p>文章</p>
			</div>
			<div>
				<i class="iconfont icon-tupian icon_comment"></i>
				<p>图片</p>
			</div>
			<div>
				<i class="iconfont icon-yinyue icon_comment"></i>
				<p>音乐</p>
			</div>
			<div>
				<i class="iconfont icon-shipin icon_comment"></i>
				<p>视频</p>
			</div>
		</div>
		
		<div class="ui-table">
			<div class="ui-table-cell">
				<span>收藏</span>
				<i class="iconfont icon-you1"></i>
			</div>
			<div>
				<span>互动</span>
				<i class="iconfont icon-you1"></i>
			</div>
			<div>
				<span>偶遇</span>
				<i class="iconfont icon-you1"></i>
			</div>
			<div>
				<span>设置</span>
				<i class="iconfont icon-you1"></i>
			</div>
			<div>
				<span>反馈</span>
				<i class="iconfont icon-you1"></i>
			</div>
			<div>
				<span>关于</span>
				<i class="iconfont icon-you1"></i>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: false,
				avatarUrl: '../../static/logo.png',
				account: ''
			}
		},
		methods: {
			
		},
		mounted() {
			this.account = uni.getStorageSync("account");
		}
	}
</script>

<style>
	*{
				margin: 0;
				padding: 0;
				font-family: "微软雅黑";
			}
			header{
				/* 头部包含背景图 */
				background-color: #ffda19;
				width: 100%;
				overflow: hidden;
				
				height: 160px;
			}
			header>p{
				/* 放我的和关机图标 */
				height: 50px;
				line-height: 50px;
			}
			header>p>span:nth-of-type(1){
				display: inline-block;
				float: left;
				padding-left: 16px;
				font-size: 18px;
				font-weight: bold;
			}
			header>p>span:nth-of-type(2){
				display: inline-block;
				float: right;
				padding-right: 16px;
			}
			header>p>span:nth-of-type(2)>i{
				font-size: 18px;
				font-weight: bold;
			}
			
			
			.info{
				/* 存放个人信息的 */
				width: calc( 100% - 32px );
				background-color: #FFFFFF;
				margin-left: 16px;
				margin-top: -48px;
				float: left;
				border-radius: 8px;
				box-shadow: 0 0 6px rgba(255,218,25,0.6);
			}
			.info>img{
				width: 66px;
				height: 66px;
				border-radius: 66px;
				margin: 0 auto;
				display: block;
				margin-top: -33px;
				border: 1px solid #ffda19;
			}
			.info_name{
				text-align: center;
				font-size: 16px;
				color: #444444;
				height: 30px;
				line-height: 30px;
			}
			.info_text{
				text-align: center;
				height: 30px;
				line-height: 30px;
				font-size: 14px;
				color: #6F6F6F;
			}
			.info_item{
				width: calc( 100% / 3 );
				float: left;
				text-align: center;
				padding: 4px 0;
			}
			.info_item>p:nth-of-type(1){
				font-size: 12px;
			}
			.info_item>p:nth-of-type(2){
				font-size: 14px;
				color: #6F6F6F;
			}
			.info_item:nth-of-type(1){
				border-radius: 0 0 0 8px;
			}
			.info_item:nth-last-of-type(1){
				border-radius: 0 0 8px 0;
			}
			
			.iconCon{
				/* 放功能的图标 */
				width: 100%;
				float: left;
				overflow: hidden;
				margin-top: 16px;
				padding: 32px 0;
			}
			.iconCon>div{
				float: left;
				width: calc( 100% / 4 );
				text-align: center;
				
			}
			
			.ui-table{
				float: left;
				width: calc( 100% - 64px );
				background-color: #FFFFFF;
				border-top: 8px solid #EFEFF4;
				padding: 0 32px;
			}
			.ui-table>div{
				height: 50px;
				line-height: 50px;
				border-bottom: 1px solid #EFEFF4;
			}
			.ui-table>div>span{
				float: left;
			}
			.ui-table>div>i{
				float: right;
			}
			
			.icon_comment{
				border-radius: 100px;
				font-size: 20px;
				width: 30px;
				height: 30px;
				display: inline-block;
				line-height: 30px;
				color: #FFFFFF;
			}
			
			.icon-xiezuo{
				background-color: #fbdc58;
			}
			.icon-tupian{
				background-color: #94ede2;
			}
			.icon-yinyue{
				background-color: #bceccd;
			}
			.icon-shipin{
				background-color: #ffbadc;
			}
</style>
