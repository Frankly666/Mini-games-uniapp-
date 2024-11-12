<template>
	<view class="groundWrap">
		<!-- 绝对定位 -->
		<assets-header :judge='2'></assets-header>
		<view class="return" @click="back"></view>
		
		<!-- 跟随图片一起移动 -->
		<view class="treesWrap1">
			<view class="left">
				<view class="lTree1 item1"></view>
				<view class="lTree2 item1"></view>
				<view class="lTree3 item1"></view>
				<view class="lTree4 item1"></view>
				<view class="lTree5 item1"></view>
			</view>
		</view>
		<view class="treesWrap2">
			<view class="right">
				<view class="rTree1 item2"></view>
				<view class="rTree2 item2"></view>
				<view class="rTree3 item2"></view>
				<view class="rTree4 item2"></view>
				<view class="rTree5 item2"></view>
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import { onMounted, onUnmounted, ref } from 'vue';
	import assetsHeader from '../../components/assetsHeader.vue';
	
	function back() {
		uni.navigateBack({
			delta:1
		})
	}
</script>
 
<style lang="less">
	.groundWrap {
		position: relative;
		width: 100vw;
		height: 533vw;
		background: url("../../static/ground/groundBgc.png")  no-repeat top center / contain;
		
		.return {
			position: fixed;
			bottom: 4vw;
			left: 7vw;
			width: 15vw;
			height: 15vw;
			background: url("../../static/ground/return.png") no-repeat center center /contain;
		}
		
		.treesWrap1 {
			.item1 {
				position: absolute;
				width: 30vw;
				height: 40vw;
				background: url('../../static/ground/tree1.png') no-repeat center center /contain;
				animation: swing 4s infinite linear;
			}
			
			.left {
				position: absolute;
				left: -16vw;
				
				.lTree1 {
					top: 50vw;
				}
				
				.lTree2 {
					top: 130vw;
					animation-duration: 2.7s;
				}
				
				
				.lTree3 {
					top: 230vw;
					animation-duration: 3.8s;
				}
				
				.lTree4 {
					top: 330vw;
					animation-duration: 4.5s;
				}
				
				.lTree5 {
					top: 430vw;
					animation-duration: 4.8s;
				}
				
			}
			
		}
		
		.treesWrap2 {
			.item2 {
				position: absolute;
				width: 30vw;
				height: 40vw;
				background: url('../../static/ground/tree2.png') no-repeat center center /contain;
				animation: swing 4s infinite linear;
			}
			
			.right {
				position: absolute;
				left: 90vw;
				
				.rTree1 {
					top: 50vw;
				}
				
				.rTree2 {
					top: 130vw;
					animation-duration: 2.7s;
				}
				
				
				.rTree3 {
					top: 230vw;
					animation-duration: 3.8s;
				}
				
				.rTree4 {
					top: 330vw;
					animation-duration: 4.5s;
				}
				
				.rTree5 {
					top: 430vw;
					animation-duration: 4.8s;
				}
				
			}
			
		}
		
		@keyframes swing {
		  0%, 100% {
		    transform: rotate(0deg);
		  }
		  50% {
		    transform: rotate(25deg);
		  }
		}
		
	}
</style>
