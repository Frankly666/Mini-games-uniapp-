<template>
	<view class="talentWrap">
		<view class="close" @click="handleShowTanlentPop(false)"></view>
		<view class="board">
			<view class="listArea">
				<view class="itemWrap">
					<view class="avatarwrap"></view>
				</view>
			</view>
		</view>
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
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 13vw;
			width: 86vw;
			height: 140vw;
			background: url("../static/talentCenter/talentCenter.png") no-repeat center center / contain;
			
			.listArea {
				position: absolute;
				top: 27vw;
				width: 68vw;
				height: 100vw;
				box-sizing: border-box;
				// background-color: aqua;
				
				.itemWrap {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					height: 18vw;
					box-sizing: border-box;
					padding: 0 3vw;
					border-radius: 4vw;
					background-image: linear-gradient(to right, rgba(207, 179, 115, 0.7) 0%, rgba(207,179,115,0.1) 50%, rgba(207,179,115,.7) 100%);
					
					.avatarwrap {
						width: 13vw;
						height: 13vw;
						border-radius: 50%;
						background-image: radial-gradient(circle at center, rgba(207, 179, 115, 0.2) 0%, rgba(207, 179, 115, 1) 100%);
					}
				}
			}
		}
	}
</style>