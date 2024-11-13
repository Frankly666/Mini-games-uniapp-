<template>
	<view class="talentWrap">
		<view class="close" @click="handleShowTanlentPop(false)"></view>
		<view class="board"></view>
	</view>
</template>

<script setup>
	const props = defineProps(["handleShowTanlentPop"])
</script>

<style lang="less">
	.talentWrap {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, .7);
		
		.close {
			position: absolute;
			bottom: 7vw;
			width: 13vw;
			height: 13vw;
			background: url("../static/talentCenter/close.png") no-repeat center center / contain;
		}
		
		.board {
			position: absolute;
			top: 13vw;
			width: 86vw;
			height: 140vw;
			background: url("../static/talentCenter/talentCenter.png") no-repeat center center / contain;
		}
	}
</style>