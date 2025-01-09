<template>
	<view class="cloud-city-container">
		<!-- 云城背景 -->
		<view class="cloud-city-background">
			<view class="cloud cloud-1"></view>
			<view class="cloud cloud-2"></view>
			<view class="cloud cloud-3"></view>
		</view>

		<!-- 云城内容区域 -->
		<view class="cloud-city-content">
			<text class="welcome-text">欢迎来到云城\n</text>
			<text class="description-text">探索未知的世界，发现无限可能</text>
		</view>

		<!-- 进入云城按钮 -->
		<view class="enter-button" @click="enterCloudCity">
			<text class="button-text">进入云城</text>
		</view>		
	</view>
</template>

<script setup>
import { ID } from '../stores/gameInfo';

// 进入云城按钮点击事件
function enterCloudCity() {
	// 这里可以添加跳转逻辑，例如：
	uni.navigateTo({ url: '/pages/GameHome/GameHome' });
}
</script>

<style lang="less">
.cloud-city-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 70vh;
	background: linear-gradient(135deg, #89cff0, #a6d8ff); /* 天空蓝渐变背景 */
	color: #fff;
	overflow: hidden; /* 禁止页面滑动 */
	position: relative;
}

/* 云城背景 */
.cloud-city-background {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
}

.cloud {
	position: absolute;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 50%;
	animation: float 10s infinite ease-in-out;
	opacity: 0.8;
}

.cloud::before,
.cloud::after {
	content: '';
	position: absolute;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 50%;
}

.cloud::before {
	width: 80%;
	height: 80%;
	top: -20%;
	left: 10%;
}

.cloud::after {
	width: 60%;
	height: 60%;
	top: -30%;
	right: 10%;
}

.cloud-1 {
	width: 20vw; /* 150px -> 20vw */
	height: 8vw; /* 60px -> 8vw */
	top: 20%;
	left: 10%;
	animation-duration: 12s;
}

.cloud-2 {
	width: 26.67vw; /* 200px -> 26.67vw */
	height: 10.67vw; /* 80px -> 10.67vw */
	top: 40%;
	left: 50%;
	animation-duration: 15s;
}

.cloud-3 {
	width: 16vw; /* 120px -> 16vw */
	height: 6.67vw; /* 50px -> 6.67vw */
	top: 60%;
	left: 80%;
	animation-duration: 10s;
}

@keyframes float {
	0%, 100% {
		transform: translateY(0) translateX(0);
	}
	25% {
		transform: translateY(-2.67vw) translateX(1.33vw); /* 20px -> 2.67vw, 10px -> 1.33vw */
	}
	50% {
		transform: translateY(0) translateX(2.67vw); /* 20px -> 2.67vw */
	}
	75% {
		transform: translateY(2.67vw) translateX(1.33vw); /* 20px -> 2.67vw, 10px -> 1.33vw */
	}
}

/* 云城内容区域 */
.cloud-city-content {
	text-align: center;
	margin-bottom: 5.33vw; /* 40px -> 5.33vw */
	z-index: 2;
	animation: fadeIn 2s ease-in-out;
}

.welcome-text {
	font-size: 5vw; /* 32px -> 4.27vw */
	font-weight: bold;
	margin-bottom: 2.13vw; /* 16px -> 2.13vw */
	text-shadow: 0.27vw 0.27vw 0.53vw rgba(0, 0, 0, 0.3); /* 2px -> 0.27vw, 4px -> 0.53vw */
}

.description-text {
	font-size: 3vw; /* 18px -> 2.4vw */
	color: rgba(255, 255, 255, 0.9);
	text-shadow: 0.13vw 0.13vw 0.27vw rgba(0, 0, 0, 0.2); /* 1px -> 0.13vw, 2px -> 0.27vw */
}

/* 进入云城按钮 */
.enter-button {
	width: 80%;
	max-width: 50vw; /* 300px -> 50vw */
	height: 10vw; /* 50px -> 10vw */
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, #ff9a9e, #fad0c4); /* 柔和粉色渐变 */
	color: #fff;
	font-size: 3.2vw; /* 18px -> 3.2vw */
	font-weight: bold;
	border-radius: 5vw; /* 25px -> 5vw */
	box-shadow: 0 0.8vw 2.4vw rgba(0, 0, 0, 0.2); /* 4px -> 0.8vw, 12px -> 2.4vw */
	cursor: pointer;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	z-index: 2;
	animation: pulse 2s infinite ease-in-out;
}

.enter-button:active {
	transform: scale(0.95);
	box-shadow: 0 0.4vw 1.6vw rgba(0, 0, 0, 0.2); /* 2px -> 0.4vw, 8px -> 1.6vw */
}

.button-text {
	text-shadow: 0.13vw 0.13vw 0.27vw rgba(0, 0, 0, 0.2); /* 1px -> 0.13vw, 2px -> 0.27vw */
}

@keyframes fadeIn {
	0% {
		opacity: 0;
		transform: translateY(2.67vw); /* 20px -> 2.67vw */
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes pulse {
	0%, 100% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.05);
	}
}
</style>