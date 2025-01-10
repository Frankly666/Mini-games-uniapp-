<template>
	<view class="settingWrap">
		<view class="bgc">
			<view class="close" @click="() => {props.handleShow(0, false)}"></view>
			<view class="title">
				<text>设置</text>
			</view>
			<view 
				class="switch" 
				@click="() => {handleImg()}"
				:style="`background-image: url(${gameInfo.bgmIsOpen ?  openImg : closeImg});`"
				>
					<text class="text">bgm</text>
			</view>
			<view class="exit" @click="exit">
				<text>退出云城</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { useGameInfoStore } from '../stores/gameInfo';
	
	const gameInfo = useGameInfoStore()
	const props = defineProps(['handleShow']);
	const openImg = '../static/toolsBar/switchOn.png'
	const closeImg = '../static/toolsBar/switchOff.png'
	const bgm = useGameInfoStore().bgm
	
	function handleImg() {
		gameInfo.bgmIsOpen = !gameInfo.bgmIsOpen
		if(gameInfo.bgmIsOpen) bgm.play();
		else bgm.pause()
	}
	
	function exit() {
		bgm.stop();
		bgm.onStop(() => {
			console.log('音乐停止播放')
		})
		
		uni.navigateTo({
			url:'/pages/HomePage/HomePage'
		})
	}
	
</script>

<style lang="less">
	.settingWrap {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, .7);
		
		
		.bgc {
			position: relative;
			width: 90vw;
			height: 70vw;
			background: url('../static/toolsBar/board1.png') no-repeat center center / contain;
			
			.close {
				position: absolute;
				right: 1vw;
				top: 9vw;
				width: 10vw;
				height: 10vw;
				transform: rotate(45deg);
				background: url('../static/toolsBar/close_btn.png') no-repeat center center / contain;
			}
			
			.title {
				position: absolute;
				right: 27vw;
				top: 7.5vw;
				width: 40vw;
				height: 15vw;
				text-align: center;
				line-height: 14vw;
				font-weight: bold;
				font-size: 4vw;
				color: aliceblue;
				// background: url('../static/toolsBar/title.png') no-repeat center center / contain;				
			}
			
			.switch {
				position: absolute;
				left: 10vw;
				top: 22vw;
				width: 9vw;
				height: 9vw;
				background: no-repeat center center / contain;
				color: #877862;
				font-weight: bold;
				font-size: 4vw;
				
				.text {
					position: absolute;
					right: -11vw;
					top: 1.3vw;
				}
				
			}
			
			.exit {
				position: absolute;
				bottom: 13vw;
				left: 32.5vw;
				width: 23vw;
				height: 11vw;
				background: url('../static/home/btn_Green.png') no-repeat center center / contain;
				color: #fefba8;
				text-align: center;
				line-height: 9vw;
				font-weight: bold;
				
			}
		}
		
	}

</style>