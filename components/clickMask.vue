<template>
	<view class="clickMaskWrap">
		<view class="item tradingMarket"@click="toTradingMarket"></view>
		<view class="item talentCenter" @click="toTanlentCenter"></view>
		<view class="item ground" @click="toGround"></view>
		<view class="item mine" @click="toMine"></view>
	</view>
</template>

<script>
	export default {
		name:"clickMask",
		data() {
			return {
				
			};
		},
		methods: {
			toMine() {
				uni.navigateTo({
					url: '/pages/Mine/Mine'
				});
			},
			toGround() {
				uni.navigateTo({
					url: '/pages/Ground/Ground'
				});
			},
			toTanlentCenter() {
				uni.navigateTo({
					url: '/pages/TanlentCenter/TanlentCenter'
				});
			},
			toTradingMarket() {
				uni.navigateTo({
					url: '/pages/TradingMarkets/TradingMarkets'
				});
			}
		}
	}
</script>

<style lang="less">
	.clickMaskWrap {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: all;
		
		.item {
			position: absolute;
			width: 52vw;
			height: 52vw;
		}
		
		.tradingMarket {
			top: 165vw;
			left: 216vw;
		}
		
		.mine {
			top: 50vw;
			left: 180vw;
		}
		
		.talentCenter {
			top: 112vw;
			left: 135vw;
		}
		
		.ground {
			top: 101vw;
			left: 39vw;
		}
	}
</style>