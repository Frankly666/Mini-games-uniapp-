<template>
	<view class="loadingWrap">
		<view class="loading"></view>
		<view class="tips">加载中...</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="less">
	.loadingWrap {
		position: fixed;
		top: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 99999;
		width: 100vw;
		height: 100vh;
		background-color: rgba(255, 255, 255, 1);
		
		.loading {
			position: relative;
			top: -10vw;
			width: 30vw;
			height: 30vw;
			background: url("../static/home/loading1.gif") no-repeat center center / contain;
		}
		
		.tips {
			position: relative;
			top: -10vw;
			font-weight: bold;
		}
	}
</style>