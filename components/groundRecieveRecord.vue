<template>
  <view class="receiveRecordPopup">
    <!-- 弹窗背景 -->
    <view class="mask" @click="closePopup"></view>

    <!-- 弹窗内容 -->
    <view class="popup">
      <view class="header">
        <text class="title">领取记录</text>
        <view class="closeBtn" @click="closePopup">×</view>
      </view>

      <!-- 记录列表 -->
      <view class="recordList">
        <!-- 如果没有记录 -->
        <view v-if="recordList.length === 0" class="empty">
          <text>暂无领取记录</text>
        </view>

        <!-- 如果有记录 -->
        <view v-else class="card" v-for="(item, index) in recordList" :key="index">
          <!-- 时间 -->
          <view class="time">
            <text>{{ formatTime(item.receiveTime) }}</text>
          </view>

          <!-- 领取信息 -->
          <view class="info">
            <text>领取能量石</text>
            <image class="stoneImg" src="/static/market/powerStone.png" mode="aspectFill" />
            <text class="stoneNum">×{{ item.powerStoneAmount }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const recordList = ref([]); // 领取记录列表

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

// 关闭弹窗
function closePopup() {
  emit('close'); // 触发关闭事件
}

// 加载领取记录
async function loadReceiveRecords() {
  const userId = uni.getStorageSync('id'); // 从本地获取用户 ID
  if (!userId) {
    uni.showToast({ title: '用户未登录', icon: 'none' });
    return;
  }

  uni.showLoading({ title: '加载中...' });

  try {
    const res = await uniCloud.callFunction({
      name: 'getReceiveRecords', // 云函数名称
      data: { userId },
    });

    if (res.result.code === 0) {
      // 将数据赋值给 recordList，并按时间倒序排列
      recordList.value = res.result.data.sort((a, b) => new Date(b.receiveTime) - new Date(a.receiveTime));
    } else {
      uni.showToast({ title: res.result.message || '暂无领取记录', icon: 'none' });
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
  loadReceiveRecords();
});

// 定义事件
const emit = defineEmits(['close']);
</script>

<style lang="less">
.receiveRecordPopup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: rgba(0, 0, 0, 0.7);

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .popup {
    position: absolute;
    top: 10vh;
    left: 5vw;
    width: 90vw;
    height: 80vh;
    background-color: #fff;
    border-radius: 2.7vw; /* 20rpx -> 2.7vw */
    padding: 2.7vw; /* 20rpx -> 2.7vw */
    box-sizing: border-box;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.7vw; /* 20rpx -> 2.7vw */

      .title {
        font-size: 4.8vw; /* 36rpx -> 4.8vw */
        font-weight: bold;
        color: black;
      }

      .closeBtn {
        font-size: 5.3vw; /* 40rpx -> 5.3vw */
        cursor: pointer;
      }
    }

    .recordList {
      height: 89%; /* 100rpx -> 13.3vw */
      overflow-y: auto;

      .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 4vw;
        color: #999;
      }

      .card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2.7vw;
        border-bottom: 0.1vw solid #eee; /* 1rpx -> 0.1vw */

        .time {
          font-size: 3.2vw; /* 24rpx -> 3.2vw */
          color: #666;
        }

        .info {
          display: flex;
          align-items: center;
          gap: 1.3vw; /* 10rpx -> 1.3vw */

          text {
            font-size: 3.2vw; /* 24rpx -> 3.2vw */
            color: #333;
          }

          .stoneImg {
            width: 5vw; /* 60rpx -> 8vw */
            height: 5vw; /* 60rpx -> 8vw */
          }

          .stoneNum {
            font-size: 3.2vw; /* 24rpx -> 3.2vw */
            color: #666;
          }
        }
      }
    }
  }
}
</style>