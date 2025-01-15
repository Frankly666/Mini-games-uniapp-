<template>
  <view class="transfer-popup">
    <view class="popup-mask" @click="closePopup"></view>
    <view class="popup-content">
      <text class="popup-title">转移资源</text>

      <!-- 当前能量石余额 -->
      <view class="balance-info">
        <image class="energy-stone-icon" src="/static/market/powerStone.png" mode="aspectFit"></image>
        <text class="balance-text">当前能量石余额: {{ currentPowerStoneBalance }}</text>
      </view>

      <!-- 接收者游戏ID输入框 -->
      <input class="popup-input" placeholder="请输入接收者游戏ID" v-model="receiverGameID" />

      <!-- 资源数量输入框 -->
      <input class="popup-input" placeholder="请输入资源数量" v-model="resourceAmount" />

      <!-- 确认按钮 -->
      <button class="popup-button" @click="confirmTransferResource">确认转移</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { POWERSTONE, useGameInfoStore } from '../stores/gameInfo';
import { updateAssets } from '../utils/updateGameInfo';
import { addAssetsChangeRecord } from '../utils/addAssetsChangeRecord ';
import getUserIDByGameID from '../utils/getUserIDByGameID';
import { roundToOneDecimal } from '../utils/roundToOneDecimal';

const gameInfo = useGameInfoStore();

// 接收者游戏ID
const receiverGameID = ref('');

// 资源数量
const resourceAmount = ref('');

// 获取当前用户的能量石余额
const currentPowerStoneBalance = computed(() => {
  return gameInfo.assets.powerStone || 0; // 如果未定义，默认返回 0
});

// 关闭弹窗
const emit = defineEmits(['close']);
function closePopup() {
  emit('close');
}

// 确认转移资源
async function confirmTransferResource() {
  if (!receiverGameID.value || !resourceAmount.value) {
    uni.showToast({ title: '请输入完整的接收者游戏ID和资源数量', icon: 'none' });
    return;
  }

  // 检查能量石余额是否足够
  if (parseFloat(resourceAmount.value) > currentPowerStoneBalance.value) {
    uni.showToast({ title: '能量石余额不足', icon: 'none' });
    return;
  }

  // 显示加载中提示
  uni.showLoading({ title: '正在转移资源...', mask: true });

  try {
    // 调用云函数
    const res = await uniCloud.callFunction({
      name: 'sentAssets', // 云函数名称
      data: {
        gameID: receiverGameID.value, // 接收者游戏ID
        userId: uni.getStorageSync('id'), // 当前用户的ID
        assetsType: 'powerStone', // 资源类型（假设为能量石）
        sendNum: parseFloat(resourceAmount.value), // 转移数量
        premium: 0, // 手续费比例（0 表示无手续费）
				type: 2
      },
    });

    // 隐藏加载中提示
    uni.hideLoading();

    // 处理云函数返回结果
    if (res.result.code === 1) {
      uni.showToast({ title: '资源转移成功', icon: 'success' });
			
			// 转赠者需要扣除转赠的数量
			await addAssetsChangeRecord(uni.getStorageSync('id'), POWERSTONE, roundToOneDecimal(resourceAmount.value), `在商人集市中向游戏ID为${receiverGameID.value}的转赠能量石, 扣除(无手续费):`)
			// 受赠者需要加上所转赠的数量
			const result = await getUserIDByGameID(receiverGameID.value);
			if (result.code === 0) {
					console.log('用户唯一 _id:', result.data._id);
					const useId = result.data._id;
					addAssetsChangeRecord(useId, POWERSTONE, roundToOneDecimal(resourceAmount.value), `在商人集市中收到游戏ID为${uni.getStorageSync('gameID')}的店主转赠能量石, 共获得(无手续费):`)
			} else {
					console.error('获取用户 _id 失败:', result.message);
					// 在这里处理错误逻辑
			}
      closePopup(); // 关闭弹窗
    } else {
      let errorMessage = '资源转移失败';
      switch (res.result.code) {
        case -1:
          errorMessage = '受赠者不存在';
          break;
        case -2:
          errorMessage = '赠送者和受赠者不能为同一用户';
          break;
        case -3:
          errorMessage = '资源不足';
          break;
        case -4:
          errorMessage = '无效的资源类型';
          break;
      }
      uni.showToast({ title: errorMessage, icon: 'none' });
    }
  } catch (err) {
    // 隐藏加载中提示
    uni.hideLoading();
    console.error('调用云函数失败:', err);
    uni.showToast({ title: '网络错误，请稍后重试', icon: 'none' });
  }
}

onMounted(() => {
	updateAssets()
})
</script>

<style lang="less">
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

.balance-info {
  display: flex;
  align-items: center;
  margin-bottom: 4vw; /* 16px -> 4vw */
	margin-top: 4vw;
}

.energy-stone-icon {
  width: 6vw; /* 24px -> 6vw */
  height: 6vw; /* 24px -> 6vw */
  margin-right: 2vw; /* 8px -> 2vw */
}

.balance-text {
  font-size: 3.5vw; /* 14px -> 3.5vw */
  color: #333;
  font-weight: bold;
}

.popup-input {
  width: 100%;
  height: 10vw; /* 40px -> 10vw */
  padding: 3vw; /* 12px -> 3vw */
  font-size: 3.5vw; /* 14px -> 3.5vw */
  border: 0.27vw solid #e0e0e0; /* 1px -> 0.27vw */
  border-radius: 2vw; /* 8px -> 2vw */
  margin-bottom: 4vw; /* 16px -> 4vw */
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
</style>