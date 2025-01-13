<template>
  <!-- 签到组件 -->
  <view>
    <!-- 弹窗 -->
    <view class="rewardModal" v-if="showClaimModal">
      <view class="modalContent">
        <!-- 标题 -->
        <text class="activityName">今日地皮产出能量石</text>

        <!-- 能量石图片和数量 -->
        <view class="rewardInfo">
          <image class="gemImage" src="../static/market/powerStone.png" mode="widthFix"></image>
          <text class="gemAmount">{{ totalEarnings }} 能量石</text>
        </view>

        <!-- 领取按钮 -->
        <button
          class="claimButton"
          :disabled="isClaiming"
          @click="claimEarnings"
        >
          <text v-if="!isClaiming">领取</text>
          <text v-else>领取中...</text>
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { POWERSTONE, useGameInfoStore } from '../stores/gameInfo';
import { roundToOneDecimal } from '../utils/roundToOneDecimal';
import { getUserAssets } from '../utils/updateGameInfo';
import { addAssetsChangeRecord } from '../utils/addAssetsChangeRecord ';

const gameInfo = useGameInfoStore();
const userGrounds = ref({}); // 用户的地皮数据
const showClaimModal = ref(false); // 是否显示领取弹窗
const isClaiming = ref(false); // 是否正在领取
let directEarning = 0;
let indirectEarning = 0;

console.log("hhhhh")

// 查询用户地皮
async function fetchUserGrounds() {
  try {
    const res = await uniCloud.callFunction({
      name: 'selectGrounds',
      data: {
        userId: uni.getStorageSync('id')
      }
    });

    if (res.result.code === 0) {
      userGrounds.value = res.result.data;
    } else {
      console.error('查询失败:', res.result.message);
    }
  } catch (err) {
    console.error('调用云函数失败:', err);
  }
}

// 判断今天是否已经签到
function isTodayClaimed(lastClaimTime) {
  if (!lastClaimTime) return false; // 如果 lastClaimTime 为 null，表示未签到
  const today = new Date().toDateString();
  const claimDate = new Date(lastClaimTime).toDateString();
  return today === claimDate;
}

// 判断地皮是否过期
function isGroundExpired(endTime) {
  const now = new Date();
  return new Date(endTime) > now;
}

// 计算需要领取的地皮收益
const totalEarnings = computed(() => {
  let total = 0;
  for (const groundType in userGrounds.value) {
    userGrounds.value[groundType].forEach(ground => {
      if (isGroundExpired(ground.endTime) && !isTodayClaimed(ground.lastClaimTime)) {
        const thisGround = gameInfo.groundsMeta[groundType];
        total += thisGround.dailyEarnings;
        directEarning += thisGround.dailyEarnings * thisGround.directPushEarnings;
        indirectEarning += thisGround.dailyEarnings * thisGround.inDepthReturns;
      }
    });
  }
  return total; // 将 return 移到 forEach 外部
});

// 监听 totalEarnings 的变化，自动显示弹窗
watch(totalEarnings, (newValue) => {
  if (newValue > 0) {
    showClaimModal.value = true;
  }
});

// 领取收益
async function claimEarnings() {
  if (isClaiming.value) return; // 防止重复点击

  isClaiming.value = true; // 设置为正在领取状态
  uni.showLoading({
    title: '领取中...',
    mask: true // 防止用户点击其他区域
  });

  try {
    const res = await uniCloud.callFunction({
      name: 'claimGroundRewards',
      data: {
        userId: uni.getStorageSync('id'),
        earnings: totalEarnings.value,
				directEarning: roundToOneDecimal(directEarning),
				indirectEarning: roundToOneDecimal(indirectEarning)
      }
    });
		

    if (res.result.code === 0) {
      uni.hideLoading();
      uni.showToast({
        title: '领取成功！',
        icon: 'success',
        duration: 2000
      });

      // 更新本地能量石数量
      getUserAssets()
			
			// 地皮领取明细
			addAssetsChangeRecord(uni.getStorageSync('id'), POWERSTONE, roundToOneDecimal(totalEarnings.value), '每日所拥有土地收入: ')

      // 重新查询地皮数据
      await fetchUserGrounds();

      // 关闭弹窗
      showClaimModal.value = false;
    } else {
      uni.hideLoading();
      uni.showToast({
        title: res.result.message || '领取失败，请重试！',
        icon: 'none',
        duration: 2000
      });
    }
  } catch (err) {
    console.error('领取失败:', err);
    uni.hideLoading();
    uni.showToast({
      title: '领取失败，请重试！',
      icon: 'none',
      duration: 2000
    });
  } finally {
    isClaiming.value = false; // 重置领取状态
  }
}

onMounted(async () => {
  await fetchUserGrounds();
});
</script>

<style lang="less">
.rewardModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .modalContent {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 6.7vw; /* 20px -> 6.7vw */
    border-radius: 3.3vw; /* 10px -> 3.3vw */
    width: 70vw;
    height: 70vw;
    text-align: center;
    background: url("../static/ground/board.png") no-repeat center center / contain;

    .activityName {
      position: absolute;
      text-align: center;
      top: 14vw;
      left: -1vw;
      width: 100%;
      font-size: 6vw; /* 16px -> 4.3vw */
      color: #555;
      font-weight: bold;
    }

    .rewardInfo {
      position: absolute;
      top: 27.3vw; /* 40px -> 13.3vw */
      left: 30vw;
      display: flex;
      flex-direction: column;
      align-items: center;

      .gemImage {
        width: 11vw; /* 50px -> 13.3vw */
        height: 11vw; /* 50px -> 13.3vw */
        margin-bottom: 2.7vw; /* 10px -> 2.7vw */
      }

      .gemAmount {
        font-size: 4vw; /* 18px -> 4.8vw */
        font-weight: bold;
        color: #333;
      }
    }

    .claimButton {
      position: absolute;
      width: 27vw; /* 80px -> 26.7vw */
      height: 14vw; /* 50px -> 13.3vw */
      top: 53.3vw; /* 160px -> 53.3vw */
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-weight: bold;
      font-size: 4.3vw; /* 16px -> 4.3vw */
      border: none;
      cursor: pointer;
      line-height: 12.3vw; /* 50px -> 13.3vw */
      background: url("../static/home/btn_Green.png") no-repeat center center / contain;

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
}
</style>