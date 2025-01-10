<template>
  <view class="transferRecordPopup">
    <!-- 弹窗背景 -->
    <view class="mask" @click="closePopup"></view>

    <!-- 弹窗内容 -->
    <view class="popup">
      <view class="header">
        <text class="title">转赠记录</text>
        <view class="closeBtn" @click="closePopup">×</view>
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
            <!-- 转赠时间 -->
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

// 关闭弹窗
function closePopup() {
  emit('close'); // 触发关闭事件
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
      name: 'selectUserSendRecord',
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
      uni.showToast({ title: res.result.message || '还没有赠送记录', icon: 'none' });
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

// 定义事件
const emit = defineEmits(['close']);
</script>


<style lang="less">
.transferRecordPopup {
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
          width: 30%;

          .avatar {
            position: absolute;
						top: 5vw;
            width: 8vw;
            height: 8vw;
            border-radius: 50%;
          }

          .info {
            position: absolute;
            display: flex;
            flex-direction: column;

            .name {
              font-size: 3.7vw; /* 28rpx -> 3.7vw */
              font-weight: bold;
            }

            .gameID {
              font-size: 3.2vw; /* 24rpx -> 3.2vw */
              color: #666;
            }
          }

          &.left {
            justify-content: flex-start;
            .avatar {
              left: 0;
            }

            .info {
              left: 10vw;
            }
          }

          &.right {
            justify-content: flex-end;
            .avatar {
              left: 53vw;
            }

            .info {
            }
          }
        }

        .transferInfo {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1; // 中间部分占据剩余空间
          margin: 0 2.7vw; /* 20rpx -> 2.7vw */

          .stoneImg {
            width: 5vw; /* 60rpx -> 8vw */
            height: 5vw; /* 60rpx -> 8vw */
          }

          .stoneNum {
            font-size: 3.2vw; /* 24rpx -> 3.2vw */
            color: #666;
          }

          .transferTime {
            font-size: 2.7vw; /* 20rpx -> 2.7vw */
            color: #999;
            margin-top: 1vw; /* 8rpx -> 1vw */
          }
        }
      }
    }
  }
}
</style>