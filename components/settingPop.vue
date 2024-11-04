<template>
	<view class="settingWrap">
		<view class="bgc">
			<view class="close" @click="() => {props.handleShow(0, false)}"></view>
			<view 
				class="switch" 
				@click="() => {handleImg()}"
				:style="`background-image: url(${isOpen ?  openImg : closeImg});`"
				/>
			<view class="exit" @click="exit">
				<text>退出游戏</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { useGameInfoStore } from '../stores/gameInfo';
	
	const props = defineProps(['handleShow']);
	const isOpen = ref(true)
	const openImg = '../static/toolsBar/switchOn.png'
	const closeImg = '../static/toolsBar/switchOff.png'
	const bgm = useGameInfoStore().bgm
	
	
	function handleImg() {
		isOpen.value = !isOpen.value
		if(isOpen.value) bgm.play();
		else bgm.pause()
	}
	
	function exit() {
		bgm.stop();
		bgm.onStop(() => {
			console.log('音乐停止播放')
		})
		
		uni.navigateTo({
			url:'/pages/Mock/Mock'
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
			width: 80vw;
			height: 60vw;
			background: url('../static/toolsBar/settings.png') no-repeat center center / contain;
			
			.close {
				position: absolute;
				right: 0vw;
				top: 2vw;
				width: 8vw;
				height: 8vw;
				background: url('../static/toolsBar/button_close.png') no-repeat center center / contain;
			}
			
			.switch {
				position: absolute;
				left: 24vw;
				top: 13.8vw;
				width: 15vw;
				height: 6vw;
				background: no-repeat center center / contain;
			}
			
			.exit {
				position: absolute;
				bottom: 5vw;
				left: 28.4vw;
				width: 23vw;
				height: 11vw;
				background: url('../static/home/btn_Green.png') no-repeat center center / contain;
				color: #fefba8;
				text-align: center;
				line-height: 9vw;
				
			}
		}
		
	}

</style>