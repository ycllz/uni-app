<template>
	<view :style="style">
		<slot />
	</view>
</template>
<script>
	export default {
		name: "flex-item",
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
			order: {//项目的排列顺序。数值越小，排列越靠前，默认为0。
				type: [Number, String],
				default: 0
			},
			flexGrow: {//权重(比例)
				type: [Number, String],
				default: 0
			},
			flexShrink: {//权重(空间不足时按比例缩小)
				type: [Number, String],
				default: 0
			},
			flexBasis: {
				type: String
			},
			alignSelf: {							//项目的对齐方式
				type: String,
				default: 'auto',
				validator(value) {
					return [
						"auto",						//默认。
						"flex-start",				//上对齐。
						"flex-end",					//下对齐。
						"center",					//居中。
						"baseline",					//项目的第一行文字的基线对齐。
						"stretch",					//如果项目未设置高度或设为auto，将占满整个容器的高度。
					].indexOf(value) > -1;
				}
			}
		},
		data() {
			return {
				style: {
				}
			}
		},
		created() {
			Object.assign(this.style, this.vstyle)
			this.style.width = this.width
			this.style.height = this.height
			this.style.order = this.order
			this.style.flexGrow = this.flexGrow
			this.style.flexShrink = this.flexShrink
			this.style.flexBasis = this.flexBasis
			this.style.alignSelf = this.alignSelf
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
</style>
