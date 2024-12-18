<template>
	<view class="wholewrap">
		<view class="whole">
			<view class="workerWrap">
				<view class="leg-back"></view>
				<view class="hand-back"></view>
				<view class="body" ></view>
				<view class="leg-front"></view>
				<view class="hand-front"></view>
				
			</view>
		</view>
		
	</view>
</template>

<script setup>
	const props = defineProps(['type'])
	
	
</script>

<style lang="less">
	.wholewrap {
		position: relative;
		width: 48vw;
		height: 22vw;
		
		.whole {
			position: absolute;
			width: 30%;
			height: 100%;
			animation: move 2.5s linear infinite;
			
			.workerWrap {
				position: relative;
				width: 70%; 
				height: 90%;
				
				.body {
					position: absolute;
					width: 100%;
					height: 70%;
					background: url("/static/worker1/body.png") no-repeat center center / contain;
				}
				
				.hand-front{
					position: absolute;
					top: 36%;
					left: 18%;
					width: 60%;
					height: 35%;
					background: url("/static/worker1/hand-front.png") no-repeat center center / contain;
					transform-origin: 10% 20%;
					animation: rotateHand 1.6s linear infinite;
					animation-delay: .8s;
				}
				
				.hand-back{
					position: absolute;
					top: 31%;
					left: 54%;
					width: 60%;
					height: 35%;
					background: url("/static/worker1/hand-back.png") no-repeat center center / contain;
					transform-origin: 10% 20%;
					animation: rotateHand 1.6s linear infinite;
				}
				
				.leg-front {
					position: absolute;
					top: 57%;
					left: 7%;
					width: 67%;
					height: 35%;
					transform-origin: 50% 0%;
					animation: rotateLeg 1.6s linear infinite;
					background: url("/static/worker1/leg-front.png") no-repeat center center / contain;
					animation-delay: 1.6s;
				}
				
				.leg-back {
					position: absolute;
					top: 58%;
					left: 20%;
					width: 67%;
					height: 35%;
					transform-origin: 50% 0%;
					animation: rotateLeg 1.6s linear infinite;
					background: url("/static/worker1/leg-back.png") no-repeat center center / contain;
					animation-delay: .8s;
				}
			}
		}
		
		
		
		
		@keyframes rotateHand {
		  0% {
		    transform: rotate(0deg);
		  }
		  50% {
		    transform: rotate(50deg);
		  }
		  100% {
		    transform: rotate(0deg);
		  }
		}
		
		@keyframes rotateLeg {
		  0% {
		    transform: rotate(-25deg);
		  }
		  50% {
		    transform: rotate(25deg);
		  }
		  100% {
		    transform: rotate(-25deg);
		  }
		}
		
		@keyframes move {
		  0% {
		    left: 0;
		  }
			49% {
				transform: scaleX(1);
			}
		  50% {
		    left: 18vw;
				transform: scaleX(-1);
		  }
			99% {
				transform: scaleX(-1);
			}
		  100% {
		    left: 0;
		  }
		}

	}
</style>
