<template>
	<view class="ruleWrap">
		<view class="pop">
			<view class="title">
				<text>玩法</text>
			</view>
			
			<view class="close" @click="() => {props.handleShow(4, false)}"></view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['handleShow']);
</script>

<style lang="less">
.ruleWrap {
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	z-index: 1000;
	background-color: rgba(0, 0, 0, .7);
	color: aliceblue;
	
	.pop {
		position: relative;
		width: 80vw;
		height: 95vw;
		background: url('../static/toolsBar/board1.png') no-repeat  center center / 100% 90%;
		
		.title {
			position: absolute;
			left: 31.5vw;
			top: 10vw;
			text-align: center;
			width: 15vw;
			height: 5vw;
			font-weight: bold;
			font-size: 6vw;
		}
		
		.close {
			position: absolute;
			right: 1vw;
			top: 7vw;
			width: 11vw;
			height: 11vw;
			transform: rotate(45deg);
			background: url('../static/toolsBar/close_btn.png') no-repeat  center center / contain;
		}
	}
}
</style>