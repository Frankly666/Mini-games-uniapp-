<template>
  <view class="avatar">
    <!-- 头像区域 -->
    <view class="avatarImg" :style="`background-image: url(${avatarUrl});`" v-if="avatarUrl"></view>
    <!-- 用户名 -->
    <view class="userName">
      <text>{{ gameInfo.userName }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useGameInfoStore } from '../stores/gameInfo';

const gameInfo = useGameInfoStore();

// 使用 computed 计算 avatarUrl
const avatarUrl = computed(() => {
  return gameInfo.avatar || uni.getStorageSync('avatar') || '';
});

// 如果需要监听 avatar 的变化，可以使用 watch
watch(
  () => gameInfo.avatar,
  (newAvatar) => {
    if (newAvatar) {
      uni.setStorageSync('avatar', newAvatar); // 更新本地缓存
    }
  }
);
</script>

<style lang="less">
.avatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 5vw;
  left: 3vw;
  width: 20.33vw;
  height: 20.33vw;
  z-index: 99;

  .avatarImg {
    position: absolute;
    top: 2.1vw;
    left: 2.3vw;
    width: 15vw;
    height: 15vw;
    border-radius: 50%;
    z-index: 100;
    background: no-repeat center center / contain;
  }

  .userName {
    position: absolute;
    width: 28vw;
    text-align: center;
    top: 18.3vw;
    left: -3vw;
    font-weight: bold;
    color: #fff;
  }
}
</style>