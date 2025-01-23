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
				<view class="condeEntry">
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
		
		
		<view class="referralListWrap">
			<sub-referrers-detail-pop-vue/>
		</view>
		
		
		
		<!-- 二维码组件 -->
	<!-- 	<uqrcode
			ref="QRCode"
			:value="qrCodeContent"
			:size="200"
			canvas-id="qrcode"
			@complete="onQRCodeComplete"
		></uqrcode> -->
		
		<!-- 提示信息 -->
		<!-- <text class="tip">扫描二维码，加入我们！</text> -->
		
		<!-- 下载按钮 -->
		<!-- <button class="download-button" @click="handleDownloadImage">下载分享图</button> -->
		
		<!-- 推荐按钮 -->
		<!-- <view class="button-container">
			<button class="recommend-button direct" @click="handleDirectRecommend">直推用户</button>
			<button class="recommend-button indirect" @click="handleIndirectRecommend">间推用户</button>
		</view> -->
		
		<!-- 隐藏的画布，用于生成最终图片 -->
		<canvas
			canvas-id="shareCanvas"
			:style="{ width: canvasWidth + 'px', height: canvasHeight + 'px', position: 'absolute', top: '-9999px' }"
		></canvas>
		
		
    
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

// 二维码内容
const qrCodeContent = ref('');

// 弹窗相关状态
const showPopup = ref(false);
const popupType = ref('');

// 画布尺寸
const canvasWidth = ref(300); // 画布宽度
const canvasHeight = ref(400); // 画布高度

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

// 获取最新 APK 下载地址并更新二维码内容
const loadLatestApkUrl = async () => {
  try {
    const apkUrl = await getLatestApkUrl();
    qrCodeContent.value = apkUrl;
    console.log('最新 APK 下载地址:', apkUrl);
  } catch (err) {
    console.error('获取下载地址失败', err);
    uni.showToast({
      title: '获取下载地址失败，请稍后重试',
      icon: 'none'
    });
  }
};

// 二维码生成完成回调
const onQRCodeComplete = (res) => {
  if (res.success) {
    console.log('二维码生成成功');
  } else {
    console.error('二维码生成失败', res);
  }
};

// 处理直接推荐按钮点击
const handleDirectRecommend = () => {
  popupType.value = 'direct';
  showPopup.value = true;
};

// 处理间接推荐按钮点击
const handleIndirectRecommend = () => {
  popupType.value = 'indirect';
  showPopup.value = true;
};

// 关闭弹窗
const handleClosePopup = () => {
  showPopup.value = false;
};

// 生成并下载图片
const handleDownloadImage = async () => {
  uni.showLoading({ title: '生成图片中...', mask: true });

  try {
    // 获取二维码的临时文件路径
    const qrCodeTempFilePath = await new Promise((resolve, reject) => {
      uni.canvasToTempFilePath({
        canvasId: 'qrcode',
        success: (res) => resolve(res.tempFilePath),
        fail: (err) => reject(err)
      });
    });

    // 创建画布上下文
    const ctx = uni.createCanvasContext('shareCanvas');

    // 清空画布
    ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

    // 绘制背景颜色（浅色）
    ctx.setFillStyle('#f8f9fa'); // 浅灰色背景
    ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value);

    // 绘制游戏标题
    ctx.setFontSize(24);
    ctx.setFillStyle('#333333'); // 深灰色字体
    ctx.setTextAlign('center');
    ctx.fillText('趣选城', canvasWidth.value / 2, 50);

    // 绘制用户信息模块背景
    ctx.setFillStyle('#ffffff'); // 白色背景
    ctx.fillRect(20, 60, canvasWidth.value - 40, 100); // 矩形背景

    // 绘制用户头像
    const avatar = await new Promise((resolve, reject) => {
      uni.getImageInfo({
        src: userInfo.value.avatar,
        success: (res) => resolve(res.path),
        fail: (err) => reject(err)
      });
    });
    ctx.drawImage(avatar, 40, 100, 60, 60); // 头像尺寸调整为 60x60

    // 绘制用户名和推荐码
    ctx.setFontSize(16);
    ctx.setFillStyle('#333333'); // 深灰色字体
    ctx.setTextAlign('left');
    ctx.fillText(`用户名: ${userInfo.value.userName}`, 120, 120);
    ctx.fillText(`推荐码: ${userInfo.value.inviteCode}`, 120, 150);

    // 绘制二维码模块背景
    ctx.setFillStyle('#ffffff'); // 白色背景
    ctx.fillRect(20, 180, canvasWidth.value - 40, 220); // 矩形背景

    // 绘制二维码（整体居中）
    const qrCodeSize = 160; // 二维码尺寸
    const qrCodeX = (canvasWidth.value - qrCodeSize) / 2; // 水平居中
    const qrCodeY = 200; // 垂直位置
    ctx.drawImage(qrCodeTempFilePath, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);

    // 绘制提示文字（位于二维码下方）
    ctx.setFontSize(14);
    ctx.setFillStyle('#666666'); // 灰色字体
    ctx.setTextAlign('center');
    ctx.fillText('扫描二维码，加入我们！', canvasWidth.value / 2, qrCodeY + qrCodeSize + 30);

    // 绘制完成
    ctx.draw(false, () => {
      // 将画布内容生成图片
      uni.canvasToTempFilePath({
        canvasId: 'shareCanvas',
        success: (res) => {
          const shareImagePath = res.tempFilePath;

          // 保存图片到相册
          uni.saveImageToPhotosAlbum({
            filePath: shareImagePath,
            success: () => {
              uni.hideLoading();
              uni.showToast({ title: '图片已保存', icon: 'success' });
            },
            fail: (err) => {
              uni.hideLoading();
              console.error('保存图片失败:', err);
              uni.showToast({ title: '保存图片失败，请重试', icon: 'none' });
            }
          });
        },
        fail: (err) => {
          uni.hideLoading();
          console.error('生成图片失败:', err);
          uni.showToast({ title: '生成图片失败，请重试', icon: 'none' });
        }
      });
    });
  } catch (err) {
    uni.hideLoading();
    console.error('生成图片失败:', err);
    uni.showToast({ title: '生成图片失败，请重试', icon: 'none' });
  }
};

// 页面加载时获取用户信息和最新 APK 下载地址
onMounted(() => {
  loadUserInfo.value; // 触发 computed
  loadLatestApkUrl();
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