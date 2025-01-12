<template>
  <view class="transferRecordPage">
    <!-- 页面头部 -->
    <view class="header">
      <view class="back-icon" @click="handleBack">
        <text class="icon">←</text>
      </view>
      <text class="header-title">转赠记录</text>
      <!-- 三个点的图标 -->
      <view class="menu-icon" @click="showMenu = true">
        <text class="icon">···</text>
      </view>
    </view>

    <!-- 菜单弹窗 -->
    <view class="menu-popup" v-if="showMenu">
      <view class="menu-mask" @click="showMenu = false"></view>
      <view class="menu-content">
        <view class="menu-item" @click="handleSetWechat">设置微信号</view>
        <view class="menu-item" @click="handleTransferResource">转移资源</view>
        <view class="menu-item" @click="handleRefreshRecords">刷新记录</view> <!-- 新增 -->
      </view>
    </view>

    <!-- 设置微信号弹窗 -->
    <view class="wechat-popup" v-if="showWechatPopup">
      <view class="popup-mask" @click="showWechatPopup = false"></view>
      <view class="popup-content">
        <text class="popup-title">设置微信号</text>
        <input class="popup-input" placeholder="请输入微信号" v-model="wechat" />
        <button class="popup-button" @click="confirmSetWechat">确认</button>
      </view>
    </view>

    <!-- 转移资源弹窗 -->
		<merchant-send-pop-vue v-if="showTransferPopup"  @close="showTransferPopup = false"/>

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
import merchantSendPopVue from '../../components/merchantSendPop.vue';
import { getUserAssets, updateAssets } from '../../utils/updateGameInfo';

const recordList = ref([]); // 转赠记录列表
const showMenu = ref(false); // 控制菜单弹窗显示
const showWechatPopup = ref(false); // 控制设置微信号弹窗显示
const showTransferPopup = ref(false); // 控制转移资源弹窗显示
const wechat = ref(''); // 微信号输入框的值
const receiverGameID = ref(''); // 接收者游戏ID输入框的值
const resourceAmount = ref(''); // 资源数量输入框的值

// 获取石头图片
function getStoneImg(assetsType) {
  const stoneImages = {
    resourceStone: '/static/market/resourceStone.png',
    powerStone: '/static/market/powerStone.png',
    diamond: '/static/market/diamond.png',
  };
  return stoneImages[assetsType] || '/static/stones/default.png';
}

// 刷新记录
function handleRefreshRecords() {
  showMenu.value = false; // 关闭菜单弹窗
  loadTransferRecords(); // 调用加载转赠记录的函数
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

// 处理设置微信号
function handleSetWechat() {
  showMenu.value = false; // 关闭菜单弹窗
  showWechatPopup.value = true; // 打开设置微信号弹窗
}

// 处理转移资源
function handleTransferResource() {
  showMenu.value = false; // 关闭菜单弹窗
  showTransferPopup.value = true; // 打开转移资源弹窗
}

// 确认设置微信号
async function confirmSetWechat() {
  if (!wechat.value) {
    uni.showToast({ title: '请输入微信号', icon: 'none' });
    return;
  }

  const userId = uni.getStorageSync('id'); // 从本地缓存获取用户 ID
  if (!userId) {
    uni.showToast({ title: '用户未登录', icon: 'none' });
    return;
  }

  uni.showLoading({ title: '设置中...' });

  try {
    // 调用云函数
    const res = await uniCloud.callFunction({
      name: 'updateWechat', // 云函数名称
      data: {
        userId: userId, // 传递 userId
        wechat: wechat.value, // 传递 wechat
      },
    });

    // 处理云函数返回结果
    if (res.result.code === 200) {
      uni.showToast({ title: '设置成功', icon: 'success' });
      showWechatPopup.value = false; // 关闭弹窗
    } else {
      uni.showToast({ title: res.result.message || '设置失败', icon: 'none' });
    }
  } catch (err) {
    console.error('设置失败:', err);
    uni.showToast({ title: '设置失败', icon: 'none' });
  } finally {
    uni.hideLoading();
  }
}

// 确认转移资源
function confirmTransferResource() {
  if (!receiverGameID.value || !resourceAmount.value) {
    uni.showToast({ title: '请输入完整的接收者游戏ID和资源数量', icon: 'none' });
    return;
  }
  // 这里可以调用云函数或接口转移资源
  console.log('接收者游戏ID:', receiverGameID.value);
  console.log('资源数量:', resourceAmount.value);
  uni.showToast({ title: '转移成功', icon: 'success' });
	getUserAssets()
  showTransferPopup.value = false; // 关闭弹窗
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
	updateAssets()
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

/* 三个点的图标 */
.menu-icon {
  position: absolute;
  left: 89vw; /* 16px -> 4vw */
  cursor: pointer;
}

.menu-icon .icon {
  font-size: 6vw; /* 24px -> 6vw */
  font-weight: bold;
}

/* 菜单弹窗 */
.menu-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
}

.menu-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.menu-content {
  position: absolute;
  top: 15vw; /* 60px -> 15vw */
  right: 4vw; /* 16px -> 4vw */
  background-color: #fff;
  border-radius: 3vw; /* 12px -> 3vw */
  box-shadow: 0 0.5vw 2.5vw rgba(0, 0, 0, 0.1); /* 2px -> 0.5vw, 10px -> 2.5vw */
  padding: 4vw; /* 16px -> 4vw */
  z-index: 1002;
}

.menu-item {
  font-size: 4vw; /* 16px -> 4vw */
  color: #333;
  padding: 3vw 0; /* 12px -> 3vw */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

/* 设置微信号弹窗和转移资源弹窗 */
.wechat-popup,
.transfer-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
}

.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 3vw; /* 12px -> 3vw */
  box-shadow: 0 0.5vw 2.5vw rgba(0, 0, 0, 0.1); /* 2px -> 0.5vw, 10px -> 2.5vw */
  padding: 4vw; /* 16px -> 4vw */
  width: 80vw; /* 320px -> 80vw */
  z-index: 1002;
}

.popup-title {
  font-size: 4.5vw; /* 18px -> 4.5vw */
  font-weight: bold;
  color: #333;
  margin-bottom: 4vw; /* 16px -> 4vw */
}

.popup-input {
  width: 100%;
  height: 10vw; /* 40px -> 10vw */
  padding: 3vw; /* 12px -> 3vw */
  font-size: 3.5vw; /* 14px -> 3.5vw */
  border: 0.27vw solid #e0e0e0; /* 1px -> 0.27vw */
  border-radius: 2vw; /* 8px -> 2vw */
  margin-bottom: 4vw; /* 16px -> 4vw */
	margin-top: 4vw;
  box-sizing: border-box;
}

.popup-button {
  width: 100%;
  height: 10vw; /* 40px -> 10vw */
  background-color: #007aff;
  color: #fff;
  font-size: 4vw; /* 16px -> 4vw */
  border: none;
  border-radius: 2vw; /* 8px -> 2vw */
  cursor: pointer;
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
  height: 6vw; /* 60rpx -> 8vw */
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