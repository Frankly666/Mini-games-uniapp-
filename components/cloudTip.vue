<template>
	<view class="cloudWrap">
		<view class="mine item" @click="toTradingMarket">
			<text>矿洞</text>
		</view>
		<view class="ground item">
			<text>地皮管理</text>
		</view>
		<view class="mart item" >
			<text>交易中心</text>
		</view>
		<view class="talentCenter item">
			<text>人才中心</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"cloudTip",
		data() {
			return {
				
			};
		},
		methods :{
			toTradingMarket() {
				console.log("hhhh")
				uni.navigateTo({
					url: '/pages/TradingMarkets/TradingMarkets'
				});
			}
		}
	}
</script>

<style lang="less">
	.cloudWrap {
		position: absolute;
		width: 100%;
		height: 100%;
		font-weight: bold;
		font-size: 4vw;
		
		.item {
			position: absolute;
			background: url("../static/home/1.png") no-repeat center center / contain;
			animation: floatAnimation1 3s ease-in-out infinite;
			opacity: 0.8;
			width: 25vw;
			height: 20vw;
		}
		
		.mine {
			top: 50vw;
			left: 195vw;
			width: 20vw;
			
			
			text {
				position: absolute;
				top: 5vw;
				left: 5vw;
			}
		}
		
		.ground {
			top: 104vw;
			left: 55vw;
			animation: floatAnimation2 2.5s ease-in-out infinite;
			text {
				position: absolute;
				top: 5vw;
				left: 4.4vw;
			}
		}
		
		.mart {
			top: 170vw;
			left: 228vw;
			animation: floatAnimation3 3s ease-in-out infinite;
			
			text {
				position: absolute;
				top: 5vw;
				left: 4.4vw;
			}
		}
		
		.talentCenter {
			top: 115vw;
			left: 150vw;
			animation: floatAnimation2 2.8s ease-in-out infinite;
			
			text {
				position: absolute;
				top: 5vw;
				left: 4.4vw;
			}
		}
		
		@keyframes floatAnimation1 {
		  0%, 100% {
		    transform: translateY(0);
		  }
		  50% {
		    transform: translateY(-15px);
		  }
		}
		
		@keyframes floatAnimation2 {
		  0%, 100% {
		    transform: translateY(0);
		  }
		  50% {
		    transform: translateY(-20px);
		  }
		}
		
		@keyframes floatAnimation3 {
		  0%, 100% {
		    transform: translateY(0);
		  }
		  50% {
		    transform: translateY(-25px);
		  }
		}
	}
</style>