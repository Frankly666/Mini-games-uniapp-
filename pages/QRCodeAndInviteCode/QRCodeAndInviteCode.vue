<template>
	<view class="wholeBg">
		<view class="cover"></view>
		<view class="return" @click="handleBack"/>
		<view class="title">
			<text>邀请</text>
		</view>
		
		<!-- 邀请码 -->
		<view class="codeBg">
			<view class="inviteUrl">
				<text>{{ qrCodeContent }}</text>
			</view>
			
			<!-- 二维码组件 -->
			<view class="QRCodeWrap">
				<uqrcode
					ref="QRCode"
					:value="qrCodeContent"
					:size="100"
					canvas-id="qrcode"
					@complete="onQRCodeComplete"
				/>
			</view>
			
			<view class="inviteCode">
				<text>{{ inviteCode }}</text>
			</view>
			
			<view class="copy" @click="handleCopy"/>
		</view>
		
		<view class="btns">
			<view class="left item" @click="downLoadInviteQrCode">
				<text>保存二维码</text>
			</view>
			<view class="right item" @click="handleCopyUrl">
				<text>复制邀请链接</text>
			</view>
		</view>
		
		
		<!-- 隐藏的画布，用于生成最终图片 -->
		<canvas
			canvas-id="shareCanvas"
			:style="{ width: canvasWidth + 'px', height: canvasHeight + 'px', position: 'absolute', top: '-9999px' }"
		/>
		
	</view>
</template>

<script setup>
	import { onMounted, ref } from 'vue';
	import { getLatestApkUrl } from '../../utils/getLatestApkUrl';
	import { useGameInfoStore } from '../../stores/gameInfo';
	
	// 二维码内容
	const qrCodeContent = ref('');
	const gameInfo = useGameInfoStore();
	const inviteCode = uni.getStorageSync('userInfo').inviteCode;
	
	// 画布尺寸
	const canvasWidth = ref(300); // 画布宽度
	const canvasHeight = ref(400); // 画布高度
	
	function handleBack() {
		console.log("dianji")
		uni.navigateBack({
			delta:1
		})
	}
	
	// 二维码生成完成回调
	const onQRCodeComplete = (res) => {
	  if (res.success) {
	    console.log('二维码生成成功');
	  } else {
	    console.error('二维码生成失败', res);
	  }
	};
	
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
	
	// 复制邀请码
	const handleCopy = () => {
		uni.setClipboardData({
			data: inviteCode,
			success: () => {
			          uni.showToast({
			            title: '复制成功',
			            icon: 'none'
			          });
			        },
			fail: () => {
				uni.showToast({
					title: '复制失败',
					icon: 'none'
				});
			}
		})
	}
	
	// 复制邀请链接
	const handleCopyUrl = () => {
		uni.setClipboardData({
			data: qrCodeContent.value,
			success: () => {
			          uni.showToast({
			            title: '复制成功',
			            icon: 'none'
			          });
			        },
			fail: () => {
				uni.showToast({
					title: '复制失败',
					icon: 'none'
				});
			}
		})
	}
	
	// 下载二维码
	const downLoadInviteQrCode = async () => {
	  console.log("生成二维码图片");
	  uni.showLoading({ title: '生成图片中...', mask: true });
	
	  try {
	    // 获取二维码的临时文件路径
	    const qrCodeTempFilePath = await new Promise((resolve, reject) => {
	      uni.canvasToTempFilePath({
	        canvasId: 'qrcode', // 二维码的 canvasId
	        success: (res) => resolve(res.tempFilePath),
	        fail: (err) => reject(err)
	      });
	    });
	
	    // 保存二维码图片到相册
	    uni.saveImageToPhotosAlbum({
	      filePath: qrCodeTempFilePath,
	      success: () => {
	        uni.hideLoading();
	        uni.showToast({ title: '二维码已保存', icon: 'success' });
	      },
	      fail: (err) => {
	        uni.hideLoading();
	        console.error('保存二维码失败:', err);
	        uni.showToast({ title: '保存二维码失败，请重试', icon: 'none' });
	      }
	    });
	  } catch (err) {
	    uni.hideLoading();
	    console.error('生成二维码失败:', err);
	    uni.showToast({ title: '生成二维码失败，请重试', icon: 'none' });
	  }
	};
	
	// 页面加载时获取用户信息和最新 APK 下载地址
	onMounted(() => {
	  loadLatestApkUrl();
	});

</script>

<style lang="less">
.wholeBg {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	background: url('../../static/invitePage/bg.png') no-repeat center center/cover;
	
	.cover {
		position: absolute;
		top: 0;
		width: 100vw;
		height: 30vw;
		background: url('../../static/invitePage/cover.png') no-repeat center center/cover;
	}
	
	.return {
		position: absolute;
		left: 3vw;
		top: 3vh;
		width: 8vw;
		height: 8vw;
		z-index: 99;
		background: url('../../static/invitePage/return.png') no-repeat center center/contain;
	}
	
	.title {
		position: absolute;
		top: 5vh;
		width: 100%;
		text-align: center;
		color: aliceblue;
		font-size: 4vw;
		font-weight: bold;
	}
	
	.codeBg{
		position: absolute;
		top: 30vh;
		display: flex;
		justify-content: center;
		width: 100vw;
		height: 90vw;
		background: url('../../static/invitePage/urlAndCode.png') no-repeat center center/contain;
		
		.inviteUrl {
			position: absolute;
			top: 15vw;
			color: aliceblue;
			font-size: 2.2vw;
			width: 55%;
			overflow: hidden;
			text-align: center;
			color: gray;
		}
		
		.inviteCode {
			position: absolute;
			bottom: 10vw;
			width: 100%;
			text-align: center;
			color: aliceblue;
			
		}
		
		.QRCodeWrap{
			position: absolute;
			top: 31.5vw;
			display: flex;
			justify-content: center;
			width: 100vw;
		}
	
		.copy {
			position: absolute;
			bottom: 8vw;
			right: 23vw;
			width: 10vw;
			height: 10vw;
		}
		
	}
	
	.btns {
		display: flex;
		justify-content: space-between;
		position: absolute;
		bottom: 10vw;
		width: 100%;
		padding: 5vw 10vw;
		box-sizing: border-box;
		
		.item {
			width: 45%;
			height: 10vw;
			line-height: 9vw;
			text-align: center;
			border-radius: 3vw;
			color: aliceblue;
			outline: 1px solid white;
		}
	}

}
</style>
