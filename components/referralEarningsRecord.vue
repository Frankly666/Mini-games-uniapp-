<template>
  <view class="referralEarningsPopup">
    <!-- 弹窗背景 -->
    <view class="mask" @click="closePopup"></view>

    <!-- 弹窗内容 -->
    <view class="popup">
      <view class="header">
        <text class="title">推广收益</text>
        <view class="closeBtn" @click="closePopup">×</view>
      </view>

      <!-- 记录列表 -->
      <view class="recordList">
        <view class="card" v-for="(item, index) in referralList" :key="index">
          <!-- 左侧：用户信息 -->
          <view class="userInfo left">
            <image class="avatar" :src="item.avatar" mode="aspectFill" />
            <view class="info">
              <text class="name">{{ item.userName }}</text>
              <text class="gameID">ID: {{ item.gameID }}</text>
            </view>
          </view>

          <!-- 右侧：收益信息 -->
          <view class="earningsInfo">
            <text class="time">{{ formatTime(item.createTime) }}</text>
            <text class="type">{{ item.type === '直接推荐' ? '直推收益' : '间推收益' }}</text>
            <view class="amountWrap">
              <text class="amount">{{ item.amount }}</text>
              <image class="stoneImg" src="/static/market/powerStone.png" mode="aspectFill" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const referralList = ref([]); // 推广收益记录列表

// 格式化时间
function formatTime(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份补零
  const day = String(date.getDate()).padStart(2, '0'); // 日期补零
  const hours = String(date.getHours()).padStart(2, '0'); // 小时补零
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟补零
  return `${year}/${month}/${day} ${hours}:${minutes}`; // 返回 YYYY/MM/DD HH:mm 格式
}

// 关闭弹窗
function closePopup() {
  emit('close'); // 触发关闭事件
}

// 加载推广收益记录
async function loadReferralRecords() {
  const userId = uni.getStorageSync('id'); // 从本地获取用户 ID
  if (!userId) {
    uni.showToast({ title: '用户未登录', icon: 'none' });
    return;
  }

  uni.showLoading({ title: '加载中...' });

  try {
    const res = await uniCloud.callFunction({
      name: 'getReferralList', // 云函数名称
      data: { userId },
    });

    if (res.result) {
      referralList.value = res.result; // 直接赋值
    } else {
      uni.showToast({ title: '还没有推广收益记录', icon: 'none' });
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
  loadReferralRecords();
});

// 定义事件
const emit = defineEmits(['close']);
</script>

<style lang="less">
.referralEarningsPopup {
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

      .card {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 2.7vw;
        width: 100%;
        border-bottom: 0.1vw solid #eee; /* 1rpx -> 0.1vw */

        .userInfo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 60%;

          .avatar {
            width: 8vw;
            height: 8vw;
            border-radius: 50%;
          }

          .info {
            display: flex;
            flex-direction: column;
            margin-left: 2.7vw;

            .name {
              font-size: 3.7vw; /* 28rpx -> 3.7vw */
              font-weight: bold;
            }

            .gameID {
              font-size: 3.2vw; /* 24rpx -> 3.2vw */
              color: #666;
            }
          }
        }

        .earningsInfo {
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          .time {
            font-size: 3.2vw; /* 24rpx -> 3.2vw */
            color: #666;
          }

          .type {
            font-size: 3.2vw; /* 24rpx -> 3.2vw */
            color: #999;
            margin-top: 1vw; /* 4px -> 1vw */
          }

          .amountWrap {
            display: flex;
            align-items: center;
            margin-top: 1vw; /* 4px -> 1vw */

            .amount {
              font-size: 3.2vw; /* 24rpx -> 3.2vw */
              color: #333;
              margin-right: 1vw; /* 4px -> 1vw */
            }

            .stoneImg {
              width: 5vw;
              height: 5vw;
            }
          }
        }
      }
    }
  }
}
</style>