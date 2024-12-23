<template>
	<view class="mineWrap">
		<view class="mineBg">
		</view>
		<view class="return" @click="back"></view>
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
			width: 100%;
			height: 40vh;
			background: url('../../static/mine/mineBg.webp') no-repeat center center /cover;
		}
		
		.return {
			position: fixed;
			z-index: 99;
			bottom: 4vw;
			left: 7vw;
			width: 15vw;
			height: 15vw;
			background: url("../../static/ground/return.png") no-repeat center center /contain;
		}
	}
</style>
