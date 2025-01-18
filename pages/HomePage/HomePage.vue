<template>
  <view class="container">
    <!-- 顶部 Header -->
    <view class="header">
      <!-- 三个点的图标 -->
      <view class="menu-icon" @click="showMenu = true">
        <text class="icon">···</text>
      </view>
      <text class="header-title">趣选城</text>
    </view>

    <!-- 弹窗 -->
    <view class="menu-popup" v-if="showMenu">
      <view class="menu-mask" @click="showMenu = false"></view>
      <view class="menu-content">
        <view class="menu-item" @click="handleLogout">退出登录</view>
      </view>
    </view>

    <!-- 页面内容 -->
    <view class="content">
      <!-- 动态显示页面内容 -->
      <view class="section" v-if="activeTab === 'intro'">
        <text class="section-title">介绍</text>
        <text class="section-description">这里是趣选城的介绍页面。</text>
      </view>
      <view class="section" v-if="activeTab === 'market'">
        <mart-vue></mart-vue>
      </view>
      <view class="section" v-if="activeTab === 'cloud'">
        <click-into-cloud-city-vue></click-into-cloud-city-vue>
      </view>
      <view class="section" v-if="activeTab === 'promotion'">
        <!-- 使用 v-if 控制 recommend-vue 的加载和销毁 -->
        <recommend-vue v-if="activeTab === 'promotion'"></recommend-vue>
      </view>
      <view class="section" v-if="activeTab === 'guild'">
        <text class="section-title">公会</text>
        <text class="section-description">这里是趣选城的公会页面。</text>
      </view>
    </view>

    <!-- 底部 Tab 栏 -->
    <view class="tab-bar">
      <!-- 介绍 Tab（禁用） -->
      <view class="tab-item disabled">
        <text class="tab-text">介绍</text>
      </view>
      <!-- 集市 Tab（可点击） -->
      <view class="tab-item" :class="{ active: activeTab === 'market' }" @click="handleMarket">
        <text class="tab-text">集市</text>
      </view>
      <!-- 云城 Tab（可点击） -->
      <view class="tab-item" :class="{ active: activeTab === 'cloud' }" @click="handleCloud">
        <text class="tab-text">云城</text>
      </view>
      <!-- 推广 Tab（可点击） -->
      <view class="tab-item" :class="{ active: activeTab === 'promotion'}" @click="handlePromotion">
        <text class="tab-text">推广</text>
      </view>
      <!-- 公会 Tab（禁用） -->
      <view class="tab-item disabled">
        <text class="tab-text">公会</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import martVue from '../../components/mart.vue';
import clickIntoCloudCityVue from '../../components/clickIntoCloudCity.vue';
import recommendVue from '../../components/recommend.vue';
import { useGameInfoStore } from '../../stores/gameInfo';
import { checkUpdate } from '../../utils/checkUpdate';


// 当前选中的 Tab
const activeTab = ref('cloud');
const gameInfo = useGameInfoStore()
const bgm = gameInfo.bgm;
// 控制弹窗显示
const showMenu = ref(false);

// 处理集市 Tab 点击
function handleMarket() {
  activeTab.value = 'market';
  console.log('切换到集市页面');
}

// 处理云城 Tab 点击
function handleCloud() {
  activeTab.value = 'cloud';
  console.log('切换到云城页面');
}

// 推广点击
function handlePromotion() {
  activeTab.value = 'promotion';
  console.log('切换到推广页面');
}

// 处理退出登录
function handleLogout() {
  // 清空本地缓存
  uni.setStorageSync('phone', ''); // 清空手机号
  uni.setStorageSync('id', ''); // 清空用户 ID
  uni.setStorageSync('token', ''); // 清空 token（如果有）

  // 关闭弹窗
  showMenu.value = false;

  // 跳转到登录页面
  uni.reLaunch({
    url: '/pages/login/login', // 替换为你的登录页面路径
  }); 
	bgm.stop()
}

onMounted(() => {
	checkUpdate()
	// bgm播放设置
	bgm.src ='/static/bgm/bgm.mp3'
	bgm.autoplay = true;
	bgm.loop = true;
	if(gameInfo.bgmIsOpen) {
		bgm.play()
	}
	
})
</script>

<style lang="less">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f8f8;
}

/* Header */
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vw; /* 60px -> 15vw */
  background: linear-gradient(135deg, #6ec3f4, #a1dffb); /* 更浅的天蓝色渐变背景 */
  color: #fff;
  font-size: 5vw; /* 20px -> 5vw */
  font-weight: bold;
  box-shadow: 0 0.5vw 2.5vw rgba(108, 195, 244, 0.3); /* 浅蓝色阴影 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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

.header-title {
  text-shadow: 0.27vw 0.27vw 0.53vw rgba(0, 0, 0, 0.1); /* 更柔和的文字阴影 */
  color: #ffffff; /* 纯白色文字 */
  letter-spacing: 0.5vw; /* 增加文字间距 */
  font-family: 'PingFang SC', 'Helvetica Neue', sans-serif; /* 使用更现代的字体 */
}

/* 弹窗 */
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
	width: 20%;
  background-color: #fff;
  border-radius: 3vw; /* 12px -> 3vw */
  box-shadow: 0 0.5vw 2.5vw rgba(0, 0, 0, 0.1); /* 2px -> 0.5vw, 10px -> 2.5vw */
  padding: 4vw; /* 16px -> 4vw */
  z-index: 1002;
}

.menu-item {
  font-size: 4vw; /* 16px -> 4vw */
	font-weight: bold;
  color: #333;
  padding: 3vw 0; /* 12px -> 3vw */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

/* 页面内容 */
.content {
  flex: 1;
  padding: 20vw 4vw 17.5vw; /* 80px -> 20vw, 16px -> 4vw, 70px -> 17.5vw */
  box-sizing: border-box;
  overflow-y: hidden;
}

.section {
  margin-bottom: 4vw; /* 16px -> 4vw */
  padding: 5vw; /* 20px -> 5vw */
  background-color: #fff;
  border-radius: 3vw; /* 12px -> 3vw */
  box-shadow: 0 0.5vw 2vw rgba(0, 0, 0, 0.1); /* 2px -> 0.5vw, 8px -> 2vw */
}

.section-title {
  font-size: 4.5vw; /* 18px -> 4.5vw */
  font-weight: bold;
  color: #333;
  margin-bottom: 2vw; /* 8px -> 2vw */
}

.section-description {
  font-size: 3.5vw; /* 14px -> 3.5vw */
  color: #666;
}

/* 底部 Tab 栏 */
.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 15vw; /* 60px -> 15vw */
  background-color: #fff;
  box-shadow: 0 -0.5vw 2.5vw rgba(0, 0, 0, 0.1); /* 2px -> 0.5vw, 10px -> 2.5vw */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.tab-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tab-item.active {
  background-color: #f0f0f0;
}

.tab-item.active .tab-text {
  color: #007aff;
  font-weight: bold;
}

.tab-item.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.tab-text {
  font-size: 3.5vw; /* 14px -> 3.5vw */
  color: #333;
  transition: color 0.3s ease;
}
</style>