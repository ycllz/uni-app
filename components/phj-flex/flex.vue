<template>
	<view class="layout" :style="style">
		<slot />
	</view>
</template>

<script>
	export default {
		name: "flex",
		props: {
			vstyle: {
				type: Object
			},
			width: {
				type: String
			},
			height: {
				type: String
			},
			flexDirection: { //项目的排列方向
				type: String,
				default: "row",
				validator(value) {
					return [
						"row", //主轴为水平方向，起点在左端。
						"row-reverse", //主轴为水平方向，起点在右端。
						"column", //主轴为垂直方向，起点在上沿。
						"column-reverse" //主轴为垂直方向，起点在下沿。
					].indexOf(value) > -1;
				}
			},
			flexWrap: { //轴线排不下，如何换行
				type: String,
				default: 'nowrap',
				validator(value) {
					return [
						"nowrap", //不换行。
						"wrap", //换行，第一行在上方。
						"wrap-reverse" //换行，第一行在下方。
					].indexOf(value) > -1;
				}
			},
			justifyContent: { //主轴对齐方式
				type: String,
				default: 'flex-start',
				validator(value) {
					return [
						"flex-start", //左对齐。
						"flex-end", //右对齐。
						"center", //居中。
						"space-between", //两端对齐，项目之间的间隔都相等。
						"space-around", //每个项目两侧的间隔相等。
					].indexOf(value) > -1;
				}
			},
			alignItems: { //交叉轴对齐方式
				type: String,
				default: 'stretch',
				validator(value) {
					return [
						"flex-start", //上对齐。
						"flex-end", //下对齐。
						"center", //居中。
						"baseline", //项目的第一行文字的基线对齐。
						"stretch", //如果项目未设置高度或设为auto，将占满整个容器的高度。
					].indexOf(value) > -1;
				}
			},
			alignContent: { //多根轴线（多行）的对齐方式
				type: String,
				default: 'stretch',
				validator(value) {
					return [
						"flex-start", //上对齐。
						"flex-end", //下对齐。
						"center", //居中。
						"space-between", //与交叉轴两端对齐，轴线之间的间隔平均分布。
						"space-around", //每根轴线两侧的间隔都相等。
						"stretch", //如果项目未设置高度或设为auto，将占满整个容器的高度。
					].indexOf(value) > -1;
				}
			}
		},
		data() {
			return {
				style: {}
			}
		},
		created() {
			Object.assign(this.style, this.vstyle)
			this.style.width = this.width
			this.style.height = this.height
			this.style.flexDirection = this.flexDirection
			this.style.flexWrap = this.flexWrap
			this.style.justifyContent = this.justifyContent
			this.style.alignItems = this.alignItems
			this.style.alignContent = this.alignContent
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.layout {
		display: flex;
	}
</style>
