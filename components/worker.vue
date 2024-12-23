<template>
	<view class="wholewrap">
		<view class="whole">
			<view class="workerWrap" :style="`animation-delay: ${delay + ''}s;`">
				<view class="black"></view>
				<!-- <view class="cloud"></view> -->
				<view class="leg-back" :style=" `background-image: url(/static/worker${type}/leg-back.png);`"></view>
				<view class="hand-back" :style=" `background-image: url(/static/worker${type}/hand-back.png);`"></view>
				<view class="body" :style=" `background-image: url(/static/worker${type}/body.png);`" ></view>
				<view class="leg-front" :style=" `background-image: url(/static/worker${type}/leg-front.png);`"></view>
				<view class="hand-front" :style=" `background-image: url(/static/worker${type}/hand-front.png);`"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['type','delay'])
</script>

<style lang="less">
	
	.wholewrap {
		position: relative;
		width: 44vw;
		height: 19vw;
		
		.whole {
			position: absolute;
			width: 30%;
			height: 100%;
			
			
			.workerWrap {
				position: relative;
				width: 70%; 
				height: 90%;
				animation: move 3s linear infinite;
				
				.body {
					position: absolute;
					width: 100%;
					height: 70%;
					background: no-repeat center center / contain;
				}
				
				.hand-front{
					position: absolute;
					top: 37%;
					left: 22%;
					width: 57%;
					height: 32%;
					background:  no-repeat center center / contain;
					transform-origin: 10% 20%;
					animation: rotateHand 1.6s linear infinite;
					animation-delay: -.8s;
				}
				
				.hand-back{
					position: absolute;
					top: 32%;
					left: 54%;
					width: 60%;
					height: 35%;
					background:  no-repeat center center / contain;
					transform-origin: 10% 20%;
					animation: rotateHand 1.6s linear infinite;
				}
				
				.leg-front {
					position: absolute;
					top: 58%;
					left: 7%;
					width: 67%;
					height: 35%;
					transform-origin: 50% 0%;
					animation: rotateLeg 1.6s linear infinite;
					background:  no-repeat center center / contain;
					animation-delay: -1.6s;
				}
				
				.leg-back {
					position: absolute;
					top: 58%;
					left: 20%;
					width: 67%;
					height: 35%;
					transform-origin: 50% 0%;
					animation: rotateLeg 1.6s linear infinite;
					background: no-repeat center center / contain;
					animation-delay: -.8s;
				}
			
				.black {
					position: absolute;
					top: 46%;
					left: -10%;
					width: 100%;
					height: 100%;
					background: url("../static/workerPublic/black.png") no-repeat center center / contain;
				}
				
				.cloud {
					position: absolute;
					top: 60%;
					left: -70%;
					width: 50%;
					height: 50%;
					background: url("../static/workerPublic/cloud.png") no-repeat center center / contain;
					animation: cloudMovement 3s infinite ease-in-out;
				}
			}
		}
		
		
		// @keyframes cloudMovement {
		//   0% {
		//     transform: translateX(0) scale(1);
		//     opacity: 0.5;
		//   }
		//   50% {
		//     transform: translateX(-10px) scale(1.9);
		//     opacity: 0.8;
		//   }
		//   100% {
		//     transform: translateX(-20px) scale(1);
		//     opacity: 0.5;
		//   }
		// }
		
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
			49.99% {
				transform: scaleX(1);
			}
		  50% {
		    left: 18vw;
				transform: scaleX(-1);
		  }
			99.99% {
				transform: scaleX(-1);
			}
		  100% {
		    left: 0;
		  }
		}

	}
</style>
