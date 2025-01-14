<template>
  <view class="ruleWrap">
    <view class="pop">
      <view class="title">
        <text>背包</text>
      </view>

      <view class="itemList">
        <view class="item hoe" v-if="showHoe">
          <text>锄头</text>
          <!-- 添加到期时间 -->
          <text class="endTime" v-if="endTime">{{ formatEndTime(endTime) }}</text>
        </view>
      </view>

      <view class="close" @click="() => {props.handleShow(1, false)}"></view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['handleShow']);
const endTime = ref(''); // 用于存储锄头的到期时间

// 是否显示锄头
const showHoe = ref(false);

// 格式化到期时间，精确到天
function formatEndTime(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}到期`;
}

// 请求活动记录并检查是否需要显示锄头
async function isShowHoe() {
  const userId = uni.getStorageSync('id'); // 获取用户 ID
  if (!userId) {
    console.error('用户 ID 不存在');
    return false;
  }

  try {
    // 调用云函数获取用户的活动记录
    const res = await uniCloud.callFunction({
      name: 'selectAllActivitt', // 假设云函数名为 selectAllActivitt
      data: {
        userId: userId,
      },
    });

    // 检查是否存在 activityId === '1' 的活动
    const hoeActivity = res.result.data.find(record => record.activityId === '1');
    if (hoeActivity) {
      showHoe.value = true; // 更新显示状态
      endTime.value = hoeActivity.endTime; // 设置到期时间
    }
    return !!hoeActivity;
  } catch (err) {
    console.error('请求活动记录失败:', err);
    return false;
  }
}

// 在组件加载时调用 isShowHoe
isShowHoe();
</script>

<style lang="less">
.ruleWrap {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, .7);
  color: aliceblue;

  .pop {
    position: relative;
    width: 80vw;
    height: 95vw;
    background: url('../static/toolsBar/board1.png') no-repeat center center / 100% 90%;

    .title {
      position: absolute;
      left: 31.5vw;
      top: 10vw;
      text-align: center;
      width: 15vw;
      height: 5vw;
      font-weight: bold;
      font-size: 6vw;
    }

    .itemList {
      position: absolute;
      top: 26vw;
      left: 7vw;

      .item {
        position: absolute;
        width: 15vw;
        height: 15vw;
        background: no-repeat center center / contain;
        color: black;
        font-weight: bold;

        &.hoe {
          background-image: url('../static/home/hammer.png');
        }

        text {
          position: absolute;
          top: 16vw;
          left: 4vw;
        }

        .endTime {
          position: absolute;
          top: 22vw; /* 调整位置，确保不重叠 */
          left: 0;
          width: 110%;
          text-align: center;
          font-size: 2vw; /* 调整字体大小 */
          color: #333; /* 调整字体颜色 */
        }
      }
    }

    .close {
      position: absolute;
      right: 1vw;
      top: 7vw;
      width: 11vw;
      height: 11vw;
      transform: rotate(45deg);
      background: url('../static/toolsBar/close_btn.png') no-repeat center center / contain;
    }
  }
}
</style>