<template>
	<view class="tradingMarketWrap">
		<view class="return" @click="back"></view>
		<assets-header1 :judge='2'></assets-header1>
		
		<view class="gemstones">
			<view class="tabs">
				<view 
					:class="{'gemItem': true, 'active': itemCurrentIndex === index}"
					v-for="(item,index) in gemItems"
					@click="() =>{this.itemCurrentIndex = index}"
					>
					<text>{{item}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script >
	import assetsHeader1 from '../../components/assetsHeader.vue';
	
	export default {
		components: {assetsHeader1},
		data() {
			return {
				marketCurrentIndex: 0,
				itemCurrentIndex: 0,
				gemItems: ['金刚石', '资源石', '无球粒陨石']
			}
		},
		methods: {
			back() {
				uni.navigateTo({
					url:'/pages/Home/Home'
				})
			}
		}
	}
</script>

<style lang="less">
	.tradingMarketWrap {
		position: relative;
		width: 100vw;
		height: 100vh;
		background-color: rgba(139, 203, 244, 1);
		.gemstones {
			position: absolute;
			width: 100%;
			
			.tabs {
				position: absolute;
				width: 100%;
				top: 40vw;
				display: flex;
				justify-content: space-between;
				background-color: rgba(70, 89,106, .14);
				padding: 4vw 0;
				border-radius: 4vw;
				color: aliceblue;
				
				.gemItem {
					padding: 1vw 2vw;
					border-radius: 2vw;
					
					&:first-of-type {
						margin-left: 4vw;
					}
					
					&:last-of-type {
						margin-right: 4vw;
					}
					
					&.active{
						// background-color: rgba(0,0,0,.5);
						color: #8fcb46;
						font-weight: bold;
					}
				}
				
				
			}
		}
		
		.return {
			position: absolute;
			bottom: 5vw;
			left: 5vw;
			width: 13vw;
			height: 13vw;
			background: url("../../static/market/return.png") no-repeat center center / contain;
		}
	}
</style>
