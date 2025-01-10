<template>
  <view class="transferRecordPage">
    <!-- 页面头部 -->
    <view class="header">
      <view class="back-icon" @click="handleBack">
        <text class="icon">←</text>
      </view>
      <text class="header-title">转赠记录</text>
    </view>

    <!-- 记录列表 -->
    <view class="recordList">
      <view class="card" v-for="(item, index) in recordList" :key="index">
        <!-- 左侧：转赠者信息 -->
        <view class="userInfo left">
          <image class="avatar" :src="item.senderInfo.avatar" mode="aspectFill" />
          <view class="info">
            <text class="name">{{ item.senderInfo.userName }}</text>
            <text class="gameID">ID: {{ item.senderInfo.gameID }}</text>
          </view>
        </view>

        <!-- 中间：转赠信息 -->
        <view class="transferInfo">
          <image class="stoneImg" :src="getStoneImg(item.transferRecord.assetsType)" mode="aspectFill" />
          <text class="stoneNum">×{{ item.transferRecord.sendNum }}</text>
          <!-- 交易时间 -->
          <text class="transferTime">{{ formatTime(item.transferRecord.sendTime) }}</text>
        </view>

        <!-- 右侧：接收者信息 -->
        <view class="userInfo right">
          <image class="avatar" :src="item.receiverInfo.avatar" mode="aspectFill" />
          <view class="info">
            <text class="name">{{ item.receiverInfo.userName }}</text>
            <text class="gameID">ID: {{ item.receiverInfo.gameID }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const recordList = ref([]); // 转赠记录列表

// 获取石头图片
function getStoneImg(assetsType) {
  const stoneImages = {
    resourceStone: '/static/market/resourceStone.png',
    powerStone: '/static/market/powerStone.png',
    diamond: '/static/market/diamond.png',
  };
  return stoneImages[assetsType] || '/static/stones/default.png';
}

// 格式化时间
function formatTime(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 返回上一页
function handleBack() {
  uni.navigateBack();
}

// 加载转赠记录
async function loadTransferRecords() {
  const userId = uni.getStorageSync('id'); // 从本地获取用户 ID
  if (!userId) {
    uni.showToast({ title: '用户未登录', icon: 'none' });
    return;
  }

  uni.showLoading({ title: '加载中...' });

  try {
    const res = await uniCloud.callFunction({
      name: 'selectSendToMerchantRecord',
      data: { userId },
    });

    if (res.result.code === 200) {
      // 解析数据并赋值给 recordList
      recordList.value = res.result.data.map(item => ({
        transferRecord: {
          assetsType: item.transferRecord.assetsType,
          sendNum: item.transferRecord.sendNum,
          sendTime: item.transferRecord.sendTime,
        },
        senderInfo: {
          userName: item.senderInfo.userName,
          avatar: item.senderInfo.avatar,
          gameID: item.senderInfo.gameID,
        },
        receiverInfo: {
          userName: item.receiverInfo.userName,
          avatar: item.receiverInfo.avatar,
          gameID: item.receiverInfo.gameID,
        },
      }));
    } else {
      uni.showToast({ title: res.result.message || '加载失败', icon: 'none' });
    }
  } catch (err) {
    console.error('加载失败', err);
    uni.showToast({ title: '加载失败', icon: 'none' });
  } finally {
    uni.hideLoading();
  }
}

// 组件挂载时调用
onMounted(() => {
  loadTransferRecords();
});
</script>

<style lang="less">
.transferRecordPage {
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  min-height: 100vh;
}

/* 页面头部 */
.header {
  display: flex;
  align-items: center;
  height: 15vw; /* 60px -> 15vw */
  background: linear-gradient(135deg, #6a11cb, #2575fc); /* 渐变背景 */
  color: #fff;
  padding: 0 4vw; /* 16px -> 4vw */
  box-shadow: 0 0.5vw 2.5vw rgba(0, 0, 0, 0.1); /* 2px -> 0.5vw, 10px -> 2.5vw */
  position: sticky;
  top: 0;
  z-index: 999;
}

.back-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.5vw; /* 30px -> 7.5vw */
  height: 7.5vw; /* 30px -> 7.5vw */
  cursor: pointer;
  z-index: 999;
}

.back-icon .icon {
  font-size: 6vw; /* 24px -> 6vw */
  font-weight: bold;
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 4.5vw; /* 18px -> 4.5vw */
  font-weight: bold;
  margin-left: -7.5vw; /* 居中标题 */
}

/* 记录列表 */
.recordList {
  padding: 4vw; /* 16px -> 4vw */
}

.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 3vw; /* 12px -> 3vw */
  box-shadow: 0 1vw 3vw rgba(0, 0, 0, 0.1); /* 4px -> 1vw, 12px -> 3vw */
  padding: 4vw; /* 16px -> 4vw */
  margin-bottom: 4vw; /* 16px -> 4vw */
}

.userInfo {
  display: flex;
  align-items: center;
  width: 37%;
}

.avatar {
  width: 10vw; /* 60px -> 15vw */
  height: 10vw; /* 60px -> 15vw */
  border-radius: 50%;
	box-sizing: border-box;
  object-fit: cover; /* 确保图片按比例缩放并填充容器 */
}

.info {
  display: flex;
  flex-direction: column;
	margin-left: 1vw;
}

.name {
  font-size: 3.7vw; /* 16px -> 4vw */
  font-weight: bold;
  color: #333;
  margin-bottom: 1vw; /* 4px -> 1vw */
}

.gameID {
  font-size: 3vw; /* 14px -> 3.5vw */
  color: #666;
}

.transferInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1; // 中间部分占据剩余空间
}

.stoneImg {
  width: 6vw; /* 60rpx -> 8vw */
  height:6vw; /* 60rpx -> 8vw */
}

.stoneNum {
  font-size: 3.2vw; /* 24rpx -> 3.2vw */
  color: #666;
}

.transferTime {
  font-size: 2vw; /* 12px -> 3vw */
  color: #999;
  margin-top: 1vw; /* 4px -> 1vw */
}
</style>