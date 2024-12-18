<template>
	<view class="talentWrap">
		<view class="close" @click="handleShowTanlentPop(false)"></view>
		<view class="board">
			<view class="listArea">
				<view class="itemWrap">
					<view class="avatarwrap"></view>
					<view class="nameAndDesc">
						<view class="name">
							{{"艾伦"}}
						</view>
						<view class="desc">
							{{"每日自动签到"}}
						</view>
					</view>
					<view class="btn">
						<text class="text">招募</text>
					</view>
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
			width: 90vw;
			height: 140vw;
			background: url("../static/talentCenter/talentCenter.png") no-repeat center center / contain;
			
			.listArea {
				position: absolute;
				top: 25vw;
				width: 74vw;
				height: 100vw;
				overflow-y: auto;
				box-sizing: border-box;
				
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
					
					.nameAndDesc {
						display: flex;
						flex-direction: column;
						flex: 1;
						text-align: center;
						margin-left: 2vw;
						margin-top: -5vw;
						
						.name {
							margin-bottom: 1vw;
							font-weight: bold;
							font-size: 3.8vw;
							box-sizing: border-box;
							padding: .3vw 0;
							border-radius: 5vw;
							background-color: rgba(207, 179, 115, 1) ;
							color: rgb(115, 58, 9);
						}
							
						.desc {
							font-size: 3vw;
							font-weight: bold;
							color: rgba(159, 108, 56, 1);
						}
					}
					
					.btn {
						width: 19vw;
						height: 10vw;
						text-align: center;
						line-height: 8.7vw;
						color: aliceblue;
						font-weight: bold;
						background: url("../static/talentCenter/btn2.png") no-repeat center center / contain;

					}
				}
			}
		}
	}
</style>