<template>
  <view class="container">
    <!-- 顶部 Header -->
    <view class="header">
      <view class="menu-icon" @click="showMenu = true">
        <text class="icon"></text>
      </view>
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
      <view class="section intro" v-if="activeTab === 'intro'">
				<image src="../../static/rule.jpg" mode="widthFix"></image>
      </view>
      <view class="section" v-if="activeTab === 'mart'">
        <mart-vue></mart-vue>
      </view>
      <view class="section" v-if="activeTab === 'promotion'">
        <recommend-vue v-if="activeTab === 'promotion'"></recommend-vue>
      </view>
      <view class="section" v-if="activeTab === 'guild'">
        <text class="section-title">公会</text>
        <text class="section-description">这里是趣选城的公会页面。</text>
      </view>
    </view>

    <!-- 底部 Tab 栏 -->
    <view class="tab-bar">
			<!-- 集市 Tab（可点击） -->
			<view class="tab-item mart" :class="{ active: activeTab === 'mart' }" @click="handleMarket">
			  <text class="tab-text">集市</text>
			</view>
      <!-- 介绍 Tab（禁用） -->
      <view class="tab-item introduce" :class="{ active: activeTab === 'intro'}" @click="handleInto">
        <text class="tab-text">介绍</text>
      </view>
      <!-- 云城 Tab（可点击） -->
      <view class="tab-item entrance" @click="handleCloud">
      </view>
      <!-- 推广 Tab（可点击） -->
      <view class="tab-item promotion" :class="{ active: activeTab === 'promotion'}" @click="handlePromotion">
        <text class="tab-text">推广</text>
      </view>
      <!-- 公会 Tab（禁用） -->
      <view class="tab-item disabled union" @click="handleUnion">
        <text class="tab-text">联盟</text>
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
const activeTab = ref('mart');
const gameInfo = useGameInfoStore()
const bgm = gameInfo.bgm;
// 控制弹窗显示
const showMenu = ref(false);

// 处理集市 Tab 点击
function handleMarket() {
  activeTab.value = 'mart';
}

// 处理介绍 Tab 点击
function handleInto() {
  activeTab.value = 'intro';
}

// 处理云城 Tab 点击
function handleCloud() {
  uni.navigateTo({ url: '/pages/GameHome/GameHome' });
}

// 推广点击
function handlePromotion() {
  activeTab.value = 'promotion';
  console.log('切换到推广页面');
}

// 联盟
function handleUnion() {
	 uni.showToast({
	    title: '暂未开放', // 提示内容
	    icon: 'none', // 不显示图标
	    duration: 2000 // 提示持续时间，单位毫秒
	  })
}

// 处理退出登录
function handleLogout() {
  // 清空本地缓存
  uni.setStorageSync('phone', ''); // 清空手机号
  uni.setStorageSync('id', ''); // 清空用户 ID
  uni.setStorageSync('token', ''); // 清空 token（如果有）
	uni.clearStorageSync()

  // 关闭弹窗
  showMenu.value = false;

  // 跳转到登录页面
  uni.reLaunch({
    url: '/pages/login/login', // 替换为你的登录页面路径
  }); 
	bgm.stop()
}

onMounted(() => {
	// #ifndef APP
	checkUpdate()
	// #endif
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

  /* Header */
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
		width: 100vw;
    color: #fff;
    font-size: 5vw; /* 20px -> 5vw */
    font-weight: bold;
    top: 0;
    left: 0;
    right: 0;
		
		
    /* 三个点的图标 */
    .menu-icon {
      position: absolute;
			position: fixed;
			top: 7vw;
			right: 4vw;
			width: 7vw;
			height: 7vw;
			background: url('../../static/homePage/more.png') no-repeat center center / contain;
			z-index: 1000;

      .icon {
        font-size: 6vw; /* 24px -> 6vw */
        font-weight: bold;
      }
    }

    .header-title {
      text-shadow: 0.27vw 0.27vw 0.53vw rgba(0, 0, 0, 0.1); /* 更柔和的文字阴影 */
      color: #ffffff; /* 纯白色文字 */
      letter-spacing: 0.5vw; /* 增加文字间距 */
      font-family: 'PingFang SC', 'Helvetica Neue', sans-serif; /* 使用更现代的字体 */
    }
  }

  /* 弹窗 */
  .menu-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1001;

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

      .menu-item {
        font-size: 4vw; /* 16px -> 4vw */
        font-weight: bold;
        color: #333;
        padding: 3vw 0; /* 12px -> 3vw */
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #f0f0f0;
        }
      }
    }
  }

  /* 页面内容 */
  .content {
    flex: 1;
    padding: 20vw 4vw 17.5vw; /* 80px -> 20vw, 16px -> 4vw, 70px -> 17.5vw */
    box-sizing: border-box;
    overflow-y: auto;
		max-height: 85vh;

    .section {
			
			&.intro {
				position: fixed;
				width: 100vw;
				height: 90vh;
				top: 0;
				left: 0;
				overflow-y: auto;
				image {
					width: 100%;
				}
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
    }
  }

  /* 底部 Tab 栏 */
  .tab-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30vw; /* 60px -> 15vw */
    background-color: #fff;
    position: fixed;
		width: 100vw;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
		background: url("../../static/homePage/tabBg.png") no-repeat center center / contain;

    .tab-item {
			position: relative;
			width: 7vw;
			height: 7vw;
			background: no-repeat center center / contain;
			color: #d8d8d8;
			
			
			&.active{
				color: black;
			}
			
			.tab-text {
				position: absolute;
				text-align: center;
				width: 100%;
				font-size: 3vw;
				top: 8vw;
			}
			
			&.entrance {
				width: 15vw;
				height: 15vw;
				border-radius: 50%;
				background-image: url('../../static/homePage/entrance.png');
			}
			
			&.mart {
				background-image: url('../../static/homePage/mart.png');
				&.active{
					background-image: url('../../static/homePage/martActive.png');
				}
			}
			
			&.introduce{
				background-image: url('../../static/homePage/introduce.png');
				&.active{
					background-image: url('../../static/homePage/introduceActive.png');
				}
			}
			
			&.promotion {
				background-image: url('../../static/homePage/popularize.png');
				&.active{
					background-image: url('../../static/homePage/popularizeActive.png');
				}
			}
			
			&.union {
				background-image: url('../../static/homePage/union.png');
				&.active{
					background-image: url('../../static/homePage/unionActive.png');
				}
			}

    }
  }
}
</style>