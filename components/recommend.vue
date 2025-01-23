<template>
  <view class="VRBg">
		<!-- 标题 -->
		<view class="title">
			<text>推广</text>
		</view>
		
		<!-- 用户信息展示 -->
		<view class="user-info">
			<view class="top">
				<image :src="userInfo.avatar" class="avatar"></image>
				<view class="details">
					<text class="username">{{ userInfo.userName }}</text>
					<text class="invite-code">游戏ID: {{ userInfo.gameID }}</text>
				</view>
				<view class="condeEntry" @click="handleClickQRCode">
					<text>推广二维码</text>
				</view>
			</view>
			<view class="bottom">
				<view class="left item">
					<text class="subTitle">直推用户</text>
					<text class="num">{{1}}</text>
				</view>
				
				<view class="right item">
					<text class="subTitle">直推用户</text>
					<text class="num">{{1}}</text>
				</view>
			</view>
		</view>
		
		<!-- 推荐用户列表 -->
		<view class="referralListWrap">
			<sub-referrers-detail-pop-vue/>
		</view>
		
  </view>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { getLatestApkUrl } from '../utils/getLatestApkUrl';
import subReferrersDetailPopVue from './subReferrersDetailPop.vue';
import { useGameInfoStore } from '../stores/gameInfo';

// 用户信息
const userInfo = ref({
  userName: '',
  avatar: '',
  inviteCode: '',
	gameID: ''
});

// 跳到推荐页面
const handleClickQRCode = () => {
	uni.navigateTo({
		url: "/pages/QRCodeAndInviteCode/QRCodeAndInviteCode"
	})
}

// 获取游戏信息
const gameInfo = useGameInfoStore();

// 从本地缓存获取用户信息
const loadUserInfo = computed(() => {
  const cachedUserInfo = uni.getStorageSync('userInfo') || {};
  userInfo.value = {
    userName: gameInfo.userName || cachedUserInfo.userName,
    avatar: gameInfo.avatar || cachedUserInfo.avatar,
    inviteCode: cachedUserInfo.inviteCode || '000000',
		gameID: cachedUserInfo.gameID
  };
});

// 监听 gameInfo 的变化
watch(
  () => gameInfo,
  (newGameInfo) => {
    userInfo.value.userName = newGameInfo.userName || userInfo.value.userName;
    userInfo.value.avatar = newGameInfo.avatar || userInfo.value.avatar;
  },
  { deep: true }
);

// 页面加载时获取用户信息和最新 APK 下载地址
onMounted(() => {
  loadUserInfo.value; // 触发 computed
});
</script>

<style lang="less">
.VRBg {
	display: flex;
	flex-direction: column;
	align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 60vw;
	padding-top: 8vh;
	background: url("../static/invitePage/VRBg.png") no-repeat center center / contain;
	
	.title {
		position: absolute;
		top: 11vh;
		color: white;
		font-weight: bold;
		font-size: 4vw;
	}
	
	/* 用户信息样式 */
	.user-info {
		position: absolute;
		top: 18vh;
		display: flex;
		flex-direction: column;
		width: 90vw;
		height: 38vw;
		padding: 5vw;
		box-sizing: border-box;
		background-color: #f9f9f9;
		border-radius: 2.5vw;
		
		.top {
			width: 100%;
			display: flex;
			.avatar {
				width: 13vw;
				height: 13vw;
				border-radius: 50%;
				margin-right: 4vw;
			}
				
			.details {
				display: flex;
				flex-direction: column;
				
				.username {
					font-size: 4vw;
					font-weight: bold;
					color: #333;
				}
				
				.invite-code {
					margin-top: 2vw;
					font-size: 3vw;
					color: #666;
				}
			}
			
			.condeEntry {
				position: absolute;
				width: 15vw;
				height: 7vw;
				right: 6vw;
				font-size: 3vw;
				background: url("../static/invitePage/code.png") no-repeat center center / contain;
				
				text {
					position: absolute;
					top: 8vw;
				}
			}
		}
	
		.bottom {
			display: flex;
			justify-content: space-between;
			width: 100%;
			margin-top: 2vw;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 48%;
				height: 15vw;
				border-radius: 3vw;
				padding: 2vw 5vw;
				box-sizing: border-box;
				font-size: 3.7vw;
				
				.num {
					margin-top: 2vw;
					font-size: 4.5vw;
					font-weight: bold;
					color: black;
				}
				
				&.left {
					color: #6975a1;
					background: url("../static/invitePage/directBg.png") no-repeat center center / cover;
				}
				
				&.right {
					color: #7769a1;
					background: url("../static/invitePage/indirectBg.png") no-repeat center center / cover;
				}
			}
		}
		
	}
	
	.referralListWrap {
		position: absolute;
		width: 90vw;
		height: 48vh;
		top: 40vh;
	}
	
	/* 二维码样式 */
	.uqrcode {
		margin: 5vw auto;
		display: block;
	}
	
	/* 提示信息样式 */
	.tip {
		display: block;
		text-align: center;
		font-size: 4vw;
		color: #888;
		margin-top: 5vw;
	}
	
	/* 下载按钮样式 */
	.download-button {
		width: 30vw;
		height: 10vw;
		line-height: 6vw;
		background-color: #007aff;
		color: #fff;
		font-size: 4vw;
		border-radius: 2.5vw;
		padding: 2vw 0;
		margin: 5vw auto;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	
	/* 按钮容器样式 */
	.button-container {
		display: flex;
		justify-content: space-around;
		margin-top: 5vw;
	
		/* 推荐按钮样式 */
		.recommend-button {
			width: 35vw; /* 缩小按钮宽度 */
			font-size: 3.5vw; /* 缩小字体大小 */
			border-radius: 2.5vw;
			padding: 1.5vw 0; /* 缩小内边距 */
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	
			/* 直接推荐按钮样式 */
			&.direct {
				background-color: #007aff; /* 蓝色 */
				color: #fff;
			}
	
			/* 间接推荐按钮样式 */
			&.indirect {
				background-color: #34c759; /* 绿色 */
				color: #fff;
			}
		}
	}
}
</style>