<template>
	<view>
		<view class="main">

			<view style="margin-top: 20upx;">
				<uni-card note="Tips">
					累计收益 2000
				</uni-card>
			</view>

			<view class="main-list" style="margin-top: 30upx;">
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />
				<cmd-cell-item title="+25.50" brief="收益" addon="2019-07-22 22:22:12" />


			</view>



		</view>
	</view>



</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import uniCard from "@/components/uni-card/uni-card"

	export default {
		components: {
			cmdCellItem,
			uniCard
		},
		data() {
			return {

			}
		},

		methods: {

		}
	}
</script>

<style>
	.main {
		flex-direction: column;
		min-height: 100vh;
	}

	.main-list {
		background-color: #FFFFFF;
		width: 750upx;
		flex-direction: column;
	}

	.main-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}
</style>
