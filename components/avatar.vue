<template>
	<view class="avatar" >
		<view class="avatarImg" :style="`background-image: url(${avatar});`" v-if="avatar" >
		</view>
		<view class="userName">
			<text>{{gameInfo.userName}}</text>
		</view>
	</view>
	
</template>

<script setup>
	import { ref } from 'vue';
	import { useGameInfoStore } from '../stores/gameInfo';
	
	const gameInfo = useGameInfoStore();
	const avatar = uni.getStorageSync('avatar')	
	
</script>

<style lang="less">
	.avatar {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: fixed;
		top: 2vw; 
		left: 3vw;
		width: 20.33vw; 
		height: 20.33vw; 
		z-index: 99;
		background: url("../static/toolsBar/avatar.png") no-repeat center center / contain;
		
		.avatarImg {
			position: absolute;
			top: 2.1vw; 
			left: 2.3vw;
			width: 15vw; 
			height: 15vw;
			border-radius: 50%;
			z-index: 100;
			background: url('/static/assetsHeader/微信图片_20240816182202.jpg') no-repeat center center / contain;
		}
		
		.userName {
			position: absolute;
			width: 20vw;
			text-align: center;
			top: 19vw; 
			left: 0vw; 
			font-weight: bold;
			color: #fff;
		}
	}

</style>