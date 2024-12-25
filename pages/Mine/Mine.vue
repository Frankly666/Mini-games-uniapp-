<template>
	<view class="mineWrap">
		<view class="mineBg">
			<view class="stonesWrap">
				<view class="stone item1"></view>
				<view class="stone item2"></view>
				<view class="stone item3"></view>
				<view class="stone item4"></view>
				<view class="stone item5"></view>
				<view class="stone item6"></view>
				<view class="stone item7"></view>
				<view class="stone item8"></view>
				<view class="stone item9"></view>
				<view class="stone item10"></view>
			</view>
			
			<view class="miner"></view>
		</view>
		<view class="header1">
			<view class="return" @click="back"></view>
		</view>
		<view class="scrollArea">
			<view class="mineContent"></view>
			<view class="intro"></view>
		</view>
		
	</view>
</template>

<script setup>
	function back() {
		uni.navigateBack({
			delta:1
		})
	}
</script>
       
<style lang="less">
	.mineWrap {
		position: relative;
		width: 100vw;
		height: 100vh;
		background-color: #fff;
		
		.mineBg {
			position: fixed;
			top: 0;
			width: 100%;
			height: 36vh;
			background: url('../../static/mine/mineBg.webp') no-repeat center center /cover;
			
			.miner {
				position: absolute;
				left: 0vw;
				top: 12vw;
				width: 30vw;
				height: 30vw;
				background: url('../../static/mine/spr_axe.gif') no-repeat center center /cover;
				animation: minerRun 15s linear infinite;
			}
			
			.stonesWrap {
				position: absolute;
				.stone {
					position: absolute;
					width: 25vw;
					height: 25vw;
					background:  no-repeat center center /contain;
					background-image: url("../../static/mine/stone1.gif");
					
					&.item1 {
						width: 30vw;
						height: 30vw;
						left: 5vw;
						top: 28vw;
					}
					&.item2 {
						left: 70vw;
						top: 10vw;
					}
					&.item3 {
						width: 20vw;
						height: 20vw;
						left: 50vw;
						top: 7vw;
					}
					&.item4 {
						width: 17vw;
						height: 17vw;
						left: 53vw;
						top: 7vw;
					}
					&.item5 {
						width: 20vw;
						height: 20vw;
						left: 6vw;
						top: 12vw;
					}
					&.item6 {
						width: 16vw;
						height: 16vw;
						left: 0vw;
						top: 12vw;
					}
					&.item7 {
						width: 22vw;
						height: 22vw;
						left: -6vw;
						top: 16vw;
					}
					&.item8 {
						width: 39vw;
						height: 39vw;
						left: -10vw;
						top: 33vw;
					}
					&.item9 {
						width: 39vw;
						height: 39vw;
						left: 60vw;
						top: 30vw;
					}
					&.item10 {
						width: 34vw;
						height: 34vw;
						left: 79vw;
						top: 12vw;
					}
				}
			}

		}
		
		.header1 {
			position: fixed;
			z-index: 99;
			top: 30vh;
			width: 100%;
			height: 33vw;
			background: url("../../static/mine/mineHeader.png") no-repeat center center / contain;
		}
		
		.scrollArea {
			position: absolute;
			top: 46vh;
			width: 100%;
			height: 57vh;
			overflow: auto;
			
			.mineContent {
				position: relative;
				bottom: -1vw;
				width: 100%;
				height: 79vh;
				background: url("../../static/mine/mineContent.png") no-repeat center center / contain;
			}
			
			.intro {
				width: 100%;
				height: 80vh;
				background: url("../../static/mine/intro.png") no-repeat center center / contain;;
			}
		}
		
		.return {
			position: absolute;
			top: 3.5vw;
			z-index: 999;
			left: 3vw;
			width: 7vw;
			height: 7vw;
			background: url("../../static/ground/return.png") no-repeat center center /contain;
		}
	}
	
	@keyframes minerRun {
		// 前20%进行挖矿
		0% {
			left: 0;
			background-image: url('../../static/mine/spr_axe.gif');
			transform: scaleX(-1);
		}
		19.99% {
			left: 0;
			background-image: url('../../static/mine/spr_axe.gif');
			transform: scaleX(-1);
		}
		
		// 跑动到最右边
		20% {
			background-image: url('../../static/mine/spr_run.gif');
			left: 0;
			transform: scaleX(1);
		}
		49.9%{
			left: 68vw;
			background-image: url('../../static/mine/spr_run.gif');
			transform: scaleX(1);
		}
		50% {
			left: 68vw;
			background-image: url('../../static/mine/spr_axe.gif');
			transform: scaleX(1);
		}
		
		// 又开始进行挖矿, 方向进行转换
		50.1% {
			left: 68vw;
			background-image: url('../../static/mine/spr_axe.gif');
			transform: scaleX(1);
		}
		69.99% {
			left: 68vw;
			background-image: url('../../static/mine/spr_axe.gif');
			transform: scaleX(1);
		}
		
		// 开始往回跑
		70% {
			left: 68vw;
			background-image: url('../../static/mine/spr_run.gif');
			transform: scaleX(-1);
		}
		100% {
			left: 0vw;
			background-image: url('../../static/mine/spr_run.gif');
			transform: scaleX(-1);
		}
		
	}
</style>
