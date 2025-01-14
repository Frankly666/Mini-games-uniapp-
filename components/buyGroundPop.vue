<template>
  <view class="groundPopWrap">
    <view class="board" :style="`transform: translateY(${offset});`">
      <view class="close" @click="closePop"></view>
      <view class="title">
        {{ groundMeta.groundName }}
      </view>
      <view class="contentWrap">
        <view class="price">
          解锁价格: {{ groundMeta.unlockFunds }}能量石
        </view>
        <view class="duration">
          解锁时限: {{ groundMeta.duration }}天
        </view>
        <view class="desc">
          描述: 每天收获{{ groundMeta.dailyEarnings }}块能量石
        </view>
      </view>

      <view class="btn" @click="confirmUnlock">
        <text>解锁</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { POWERSTONE, useGameInfoStore } from '../stores/gameInfo';
import { addAssetsChangeRecord } from '../utils/addAssetsChangeRecord ';
import { netWorkError, showSuccus, showTips } from '../utils/error';
import { getGroundEndTime } from '../utils/getGroundEndTime';
import { roundToOneDecimal } from '../utils/roundToOneDecimal';
import { getUserAssets } from '../utils/updateGameInfo';

const props = defineProps(['groundType', 'groundIndex', 'closePop', 'offset', 'updateData']);
const gameInfo = useGameInfoStore();
const groundMeta = gameInfo.groundsMeta[props.groundType];


// 检查用户是否购买了活动礼包(只要购买了, 就可以开发土地)
async function checkActivity() {
  try {
    const res = await uniCloud.callFunction({
      name: 'selectAllActivitt',
      data: {
        userId: uni.getStorageSync('id')
      }
    });

    if (res.result.code === 0) {
      // 检查是否有 activityId 为 1 的活动
      const hasActivity = res.result.data.some(record => record.activityId === '1');
      return hasActivity;
    } else {
      console.error('查询活动失败:', res.result.message);
      return false;
    }
  } catch (err) {
    console.error('调用云函数失败:', err);
    return false;
  }
}

// 确认解锁
async function confirmUnlock() {
    const haveActivity = await checkActivity();
    if (!haveActivity) {
        showTips('未购买蛇年限定礼包');
        return;
    }

    const unlockFunds = gameInfo.groundsMeta[props.groundType].unlockFunds;
    const nowNum = gameInfo.assets[POWERSTONE];
		const groundName = gameInfo.groundsMeta[props.groundType].groundName;

    // 钱不够就直接跳出
    if (nowNum < unlockFunds) {
        showTips('余额不足');
        return;
    }

    uni.showLoading({
        mask: true,
        title: '解锁中'
    });

    // 数据库操作逻辑
    uniCloud.callFunction({
        name: 'buyGround',
        data: {
            addUserGroundData: {
                userId: uni.getStorageSync('id'),
                groundType: props.groundType,
                groundIndex: props.groundIndex,
                rentTime: new Date(), // 租赁时间
                endTime: getGroundEndTime(props.groundType), // 结束时间
                lastClaimTime: null, // 初始化领取时间为 null
                isHaveWorker: false,
                workerType: null,
                workerEndTime: null
            },
            userId: uni.getStorageSync('id'),
            unlockFunds: unlockFunds
        }
    })
    .then(res => {
        uni.hideLoading(); // 隐藏加载动画
        if (res.result.code === 0) {
            showSuccus("解锁成功!");
            // 更新本地余额
            getUserAssets();
						
						// 明细更新
						addAssetsChangeRecord(uni.getStorageSync('id'), POWERSTONE, unlockFunds, `解锁${groundName}扣除: `)
            props.closePop();
            props.updateData(); // 更新地皮数据
        } else {
            showTips(`解锁失败: ${res.result.message}`);
        }
    })
    .catch(err => {
        uni.hideLoading(); // 隐藏加载动画
        showTips('网络错误，请稍后重试');
        console.error('购买失败:', err);
    });
}
</script>

<style lang="less">
.groundPopWrap {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);

  .board {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    width: 80vw;
    height: 70vw;
    text-align: left;
    background: url('../static/ground/board.png') no-repeat center center / contain;

    .close {
      position: absolute;
      right: 0;
      width: 15vw;
      height: 15vw;
      background: url('../static/ground/close.png') no-repeat center center / contain;
    }

    .title {
      position: relative;
      top: -2vw;
      width: 50%;
      height: 20vw;
      text-align: center;
      line-height: 19vw;
      color: white;
      font-weight: bold;
      background: url('../static/ground/title.png') no-repeat center center / contain;
    }

    .contentWrap {
      position: absolute;
      top: 27%;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;

      .price,
      .duration,
      .desc {
        width: 80%;
        font-size: 4vw;
        color: rgb(133, 84, 32);
      }

      .duration {
        margin: 1.5vw 0;
      }
    }

    .btn {
      position: absolute;
      bottom: 8vw;
      display: flex;
      justify-content: center;
      width: 26vw;
      height: 15vw;
      color: white;
      text-align: center;
      line-height: 13.4vw;
      font-size: 5vw;
      font-weight: bold;
      background: url('../static/ground/btn2.png') no-repeat center center / contain;
    }
  }
}
</style>