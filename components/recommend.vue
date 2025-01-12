<template>
  <view>
    <!-- 用户信息展示 -->
    <view class="user-info">
      <image :src="userInfo.avatar" class="avatar"></image>
      <view class="details">
        <text class="username">{{ userInfo.userName }}</text>
        <text class="invite-code">推荐码: {{ userInfo.inviteCode }}</text>
      </view>
    </view>

    <!-- 二维码组件 -->
    <uqrcode
      ref="QRCode"
      :value="qrCodeContent"
      :size="200"
      canvas-id="qrcode"
      @complete="onQRCodeComplete"
    ></uqrcode>

    <!-- 提示信息 -->
    <text class="tip">扫描二维码，加入我们！</text>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 用户信息
const userInfo = ref({
  userName: '',
  avatar: '',
  inviteCode: ''
});

// 二维码内容
const qrCodeContent = ref('');

// 从本地缓存获取用户信息
const loadUserInfo = () => {
  const cachedUserInfo = uni.getStorageSync('userInfo') || {};
  userInfo.value = {
    userName: cachedUserInfo.userName || '默认用户',
    avatar: cachedUserInfo.avatar || '/static/default-avatar.png',
    inviteCode: cachedUserInfo.inviteCode || '000000'
  };
  // 设置二维码内容
  qrCodeContent.value = `https://example.com?invite=${userInfo.value.inviteCode}`;
};

// 二维码生成完成回调
const onQRCodeComplete = (res) => {
  if (res.success) {
    console.log('二维码生成成功');
  } else {
    console.error('二维码生成失败', res);
  }
};

// 页面加载时获取用户信息
onMounted(() => {
  loadUserInfo();
});
</script>

<style>
/* 用户信息样式 */
.user-info {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #f9f9f9;
  border-radius: 10rpx;
  margin: 20rpx;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.details {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.invite-code {
  font-size: 28rpx;
  color: #666;
}

/* 二维码样式 */
.uqrcode {
  margin: 20rpx auto;
  display: block;
}

/* 提示信息样式 */
.tip {
  display: block;
  text-align: center;
  font-size: 28rpx;
  color: #888;
  margin-top: 20rpx;
}
</style>