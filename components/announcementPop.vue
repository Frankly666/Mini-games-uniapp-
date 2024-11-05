<template>
	<view class="announcementWrap">
		<view class="pop">
			<view class="title">
				<text>公告</text>
			</view>
			
			<view class="close" @click="() => {props.handleShow(3, false)}"></view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['handleShow']);
</script>

<style lang="less">
.announcementWrap {
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	z-index: 1000;
	background-color: rgba(0, 0, 0, .7);
	color: #dcc5aa;
	
	.pop {
		position: relative;
		width: 80vw;
		height: 100vw;
		background: url('../static/home/border.png') no-repeat  center center / contain;
		
		.title {
			position: absolute;
			left: 31.5vw;
			top: 8vw;
			text-align: center;
			width: 15vw;
			height: 5vw;
			font-weight: bold;
		}
		
		.close {
			position: absolute;
			right: 0;
			top: 6vw;
			width: 10vw;
			height: 10vw;
		}
	}
}
</style>