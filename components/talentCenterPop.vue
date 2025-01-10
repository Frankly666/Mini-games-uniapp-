<template>
  <view class="talentWrap">
    <!-- 为工人选择应用的地皮 -->
    <choose-worker-place-pop-vue 
      v-if="isShowChoosePop"
      :closePop="() => {handleShowChoosePop(false)}"
      :workerType="chosenWorkerType"
    />

    <!-- 蒙版 -->
    <view class="mask" v-if="isMaskVisible" @click="closeMask">
      <view class="maskContent">
        <text class="maskText">该功能暂未开放，敬请期待！</text>
      </view>
    </view>

    <view class="close" @click="handleShowTanlentPop(false)"></view>
    <view class="board">
      <view class="listArea">
        <view class="itemWrap" v-for="(item, index) in workersMeta" :key="index">
          <view class="avatarwrap">
            <view class="avatar" :style=" `background-image: url(../static/workersAvatar/worker${index + 1 + ''}.png);`"></view>
          </view>
          <view class="nameAndDesc">
            <view class="name">
              {{item.name}}
            </view>
            <view class="desc">
              {{item.ability}}
            </view>
            <view class="price">
              招募价格: {{item.retainerPrice}} 能量石
            </view>
          </view>
          <view class="btn" @click="() => {hireWorker(index + 1)}">
            <text class="text">招募</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import chooseWorkerPlacePopVue from './chooseWorkerPlacePop.vue';
import { useGameInfoStore } from '../stores/gameInfo';

const isShowChoosePop = ref(false);
const chosenWorkerType = ref(null);
const isMaskVisible = ref(true); // 控制蒙版显示
const props = defineProps(["handleShowTanlentPop", "isVisible"]); // 假设父组件传递 isVisible
const names = ["艾伦", "索菲亚", "杰克", "莱塔", "亚历山大"];
const desc = ["每日自动签到", "加成效率30%", "加成效率50%", "加成效率70%", "加成效率90%"];
const price = [38, 288, 588, 988, 1998];
const gameInfo = useGameInfoStore();

const workersMeta = computed(() => {
  const keys = Object.keys(gameInfo.workersMeta);
  const res = [];
  for (let key of keys) {
    res.push(gameInfo.workersMeta[key]);
  }
  return res;
});

// 监听父组件的 isVisible
watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      isMaskVisible.value = true; // 每次打开弹窗时重置蒙版状态
    }
  }
);

// 控制弹窗
function handleShowChoosePop(type) {
  isShowChoosePop.value = type;
}

// 点击招募的逻辑函数
function hireWorker(workerType) {
  handleShowChoosePop(true);
  chosenWorkerType.value = workerType;
}

// 关闭蒙版
function closeMask() {
  isMaskVisible.value = false;
  props.handleShowTanlentPop(false); // 关闭父组件弹窗
	isMaskVisible.value = true;
}
</script>
<style lang="less">
.talentWrap {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .7);

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;

    .maskContent {
      background-color: #fff;
      padding: 5vw;
      border-radius: 3vw;
      text-align: center;

      .maskText {
        font-size: 4.5vw;
        font-weight: bold;
        color: #333;
      }
    }
  }

  .close {
    position: absolute;
    bottom: 7vw;
    width: 13vw;
    height: 13vw;
    background: url("../static/talentCenter/close.png") no-repeat center center / contain;
  }

  .board {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 13vw;
    width: 90vw;
    height: 140vw;
    background: url("../static/talentCenter/talentCenter.png") no-repeat center center / contain;

    .listArea {
      position: absolute;
      top: 25vw;
      width: 74vw;
      height: 103vw;
      overflow-y: auto;
      box-sizing: border-box;

      .itemWrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 18vw;
        box-sizing: border-box;
        padding: 0 3vw;
        border-radius: 4vw;
        margin-bottom: 3vw;
        background-image: linear-gradient(to right, rgba(207, 179, 115, 0.7) 0%, rgba(207,179,115,0.1) 50%, rgba(207,179,115,.7) 100%);

        .avatarwrap {
          position: relative;
          width: 13vw;
          height: 13vw;
          border-radius: 50%;
          overflow: hidden;
          background-image: radial-gradient(circle at center, rgba(207, 179, 115, 0.2) 0%, rgba(207, 179, 115, 1) 100%);

          .avatar {
            position: absolute;
            top: 40%;
            left: 10%;
            width: 90%;
            height: 90%;
            transform: scale(2);
            background:  no-repeat center center / contain;
          }
        }

        .nameAndDesc {
          position: relative;
          display: flex;
          flex-direction: column;
          flex: 1;
          text-align: center;
          margin-left: 2vw;
          margin-top: -5vw;

          .name {
            margin-bottom: 1vw;
            font-weight: bold;
            font-size: 3.8vw;
            box-sizing: border-box;
            padding: .3vw 0;
            border-radius: 5vw;
            background-color: rgba(207, 179, 115, 1) ;
            color: rgb(115, 58, 9);
          }

          .desc {
            font-size: 3vw;
            font-weight: bold;
            color: rgba(159, 108, 56, 1);
          }

          .price {
            position: absolute;
            top: 110%;
            width: 100%;
            text-align: center;
            font-size: 3vw;
            font-weight: bold;
            color: rgba(159, 108, 56, 1);
          }
        }

        .btn {
          width: 19vw;
          height: 10vw;
          text-align: center;
          line-height: 8.7vw;
          color: aliceblue;
          font-weight: bold;
          background: url("../static/talentCenter/btn2.png") no-repeat center center / contain;
        }
      }
    }
  }
}
</style>