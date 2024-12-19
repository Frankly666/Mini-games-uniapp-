<template>
	<view class="groundPopWrap">
		<view class="board" :style="`transform: translateY(${offset});`">
			<view class="close" @click="closePop"></view>
			<view class="title">
				{{groundMap[groundType]}}
			</view>
			<view class="desc">
				
			</view>
			
			<view class="btn">
				<text>租用</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['groundType', 'closePop', 'offset'])
	const groundMap = {
		1: "小地皮",
		2: "稀缺地皮",
		3: "大地皮",
		4: "资源地皮",
		5: "黑土地皮",
		6: "钻石地皮"
	}
</script>

<style lang="less">
	.groundPopWrap {
		position: fixed;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, .7);
		
		.board {
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 80vw;
			height: 70vw;
			background: url('../static/ground/board.png') no-repeat center center /contain;
			
			
			.close {
				position: absolute;
				right: 0;
				width: 15vw;
				height: 15vw;
				background: url('../static/ground/close.png') no-repeat center center /contain;
			}
			
			
			.title {
				position: relative;
				top: -2vw;
				width: 50%;
				height: 20vw;
				text-align: center;
				line-height: 19vw;
				color: white;
				font-weight: bold;
				background: url('../static/ground/title.png') no-repeat center center /contain;
			}
			
			.desc {
				
			}
			
			.btn {
				position: absolute;
				bottom: 8vw;
				display: flex;
				justify-content: center;
				width: 26vw;
				height: 15vw;
				color: white;
				text-align: center;
				line-height: 13.4vw;
				font-size: 5vw;
				font-weight: bold;
				background: url('../static/ground/btn2.png') no-repeat center center /contain;
			}
		}
	}
</style>