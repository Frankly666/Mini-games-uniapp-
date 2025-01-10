<template>
	<view class="shop-owner-container">
		<!-- 弹窗组件 -->
		<user-to-shopkeeper-pop-vue
			v-if="isShowPop"
			:owner="selectedOwner"
			@close="handlePop(false)"
		/>
		
		<!-- Header -->
		<view class="header">
			<view class="back-icon" @click="handleBack">
				<text class="icon">←</text>
			</view>
			<text class="header-title">店主交易大厅</text>
		</view>

		<!-- 店主信息卡片 -->
		<view class="shop-owner-card" v-for="(owner, index) in shopOwners" :key="index">
			<!-- 店主头像 -->
			<image class="owner-avatar" :src="owner.avatar" mode="aspectFill"></image>
			
			<!-- 店主信息 -->
			<view class="owner-info">
				<text class="owner-name">店主: {{ owner.name }}</text>
				<text class="owner-id">游戏ID: {{ owner.gameId }}</text>
				<text class="owner-wechat">微信号: {{ owner.wechat }}</text>
			</view>
			
			<!-- 转移资源按钮 -->
			<button class="transfer-btn" @click="transferResources(owner)">转移资源</button>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserToShopkeeperPopVue from '../../components/userToShopkeeperPop.vue';
import { updateAssets } from '../../utils/updateGameInfo';

// 控制弹窗显示
const isShowPop = ref(false);
// 当前选中的店主信息
const selectedOwner = ref(null);

// 店主信息数据
const shopOwners = ref([]);

// 加载店主信息
async function loadShopOwners() {
  try {
    const res = await uniCloud.callFunction({
      name: 'selectAllMerchant', // 调用云函数
    });

    if (res.result.code === 200) {
      shopOwners.value = res.result.data; // 更新店主信息
    } else {
      uni.showToast({ title: res.result.message || '加载失败', icon: 'none' });
    }
  } catch (err) {
    console.error('加载失败:', err);
    uni.showToast({ title: '加载失败', icon: 'none' });
  }
}

// 组件挂载时加载店主信息
onMounted(() => {
  loadShopOwners();
	updateAssets()
});

// 控制弹窗显示
const handlePop = (type) => {
  isShowPop.value = type;
};

// 返回按钮点击事件
const handleBack = () => {
  console.log('返回上一页');
  uni.navigateTo({
    url: "/pages/HomePage/HomePage"
  });
};

// 转移资源按钮点击事件
const transferResources = (owner) => {
  console.log('跳转到资源转移页面，店主信息:', owner);
  selectedOwner.value = owner; // 设置当前选中的店主
  handlePop(true); // 显示弹窗
};


// 组件挂载时调用
onMounted(() => {
	updateAssets()
});
</script>

<style lang="less">
.shop-owner-container {
	display: flex;
	flex-direction: column;
	background-color: #f5f5f5;
	min-height: 100vh;
	padding: 4vw; /* 添加页面内边距 */
}

/* Header */
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

/* 店主信息卡片 */
.shop-owner-card {
	display: flex;
	align-items: center;
	width: calc(100% - 8vw); /* 宽度减去左右 padding */
	background-color: #fff;
	border-radius: 3vw; /* 12px -> 3vw */
	box-shadow: 0 1vw 3vw rgba(0, 0, 0, 0.1); /* 4px -> 1vw, 12px -> 3vw */
	padding: 4vw; /* 16px -> 4vw */
	margin: 2vw auto; /* 8px -> 2vw */
}

.owner-avatar {
	width: 15vw; /* 60px -> 15vw */
	height: 15vw; /* 60px -> 15vw */
	border-radius: 50%;
	margin-right: 4vw; /* 16px -> 4vw */
}

.owner-info {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.owner-name {
	font-size: 4vw; /* 16px -> 4vw */
	font-weight: bold;
	color: #333;
	margin-bottom: 1vw; /* 4px -> 1vw */
}

.owner-id {
	font-size: 3.5vw; /* 14px -> 3.5vw */
	color: #666;
	margin-bottom: 1vw; /* 4px -> 1vw */
}

.owner-wechat {
	font-size: 3.5vw; /* 14px -> 3.5vw */
	color: #666;
}

/* 转移资源按钮 */
.transfer-btn {
	background-color: #007aff;
	color: #fff;
	font-size: 3vw; /* 12px -> 3vw */
	font-weight: bold;
	border: none;
	border-radius: 1.5vw; /* 6px -> 1.5vw */
	padding: 1.5vw 3vw; /* 6px -> 1.5vw, 12px -> 3vw */
	cursor: pointer;
	transition: background-color 0.3s ease;
	min-width: 20vw; /* 80px -> 20vw */
}

.transfer-btn:active {
	background-color: #005bb5;
}
</style>