<template>
	<view class="popup-container">
		<!-- 遮罩层 -->
		<view class="mask" @click="handleClose"></view>
		
		<!-- 弹窗内容 -->
		<view class="popup-content">
			<!-- 关闭按钮 -->
			<view class="close-btn" @click="handleClose">×</view>
			
			<!-- 店主信息 -->
			<view class="owner-info">
				<image class="owner-avatar" :src="owner.avatar" mode="aspectFill"></image>
				<text class="owner-name">店主: {{ owner.name }}</text>
				<text class="owner-id">游戏ID: {{ owner.gameId }}</text>
				<text class="owner-wechat">微信号: {{ owner.wechat }}</text>
			</view>
			
			<!-- 资源转移表单 -->
			<view class="transfer-form">
				

				<!-- 游戏ID输入框 -->
				<view class="input-group">
					<text class="label">店主游戏ID</text>
					<input class="input" type="text" placeholder="请输入店主的游戏ID" v-model="ownerGameId" />
				</view>
				<!-- 资源数量输入框 -->
				<view class="input-group">
					<text class="label">所转移能量石数量</text>
					<input class="input" type="number" placeholder="请输入能量石数量" v-model="resourceAmount" />
				</view>
				
				<!-- 当前能量石余额 -->
				<view class="balance-info">
					<image class="energy-stone-icon" src="/static/market/powerStone.png" mode="aspectFit"></image>
					<text class="balance-text">当前能量石余额: {{ currentPowerStoneBalance }}</text>
				</view>

				<!-- 手续费显示 -->
				<view class="fee-info">
					<image class="energy-stone-icon" src="/static/market/powerStone.png" mode="aspectFit"></image>
					<text class="fee-text">手续费: 8%</text>
				</view>

				<!-- 总扣除能量石数量 -->
				<view class="total-deduction">
					<image class="energy-stone-icon" src="/static/market/powerStone.png" mode="aspectFit"></image>
					<text class="total-text">总扣除能量石数量: {{ totalDeduction.toFixed(2) }}</text>
				</view>

				<!-- 确认转移按钮 -->
				<button class="submit-btn" @click="handleSubmit">确认转移</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useGameInfoStore } from '../stores/gameInfo';
import { updateAssets } from '../utils/updateGameInfo';

const gameInfo = useGameInfoStore();

// 接收父组件传递的 props
const props = defineProps({
	owner: {
		type: Object,
		required: true
	}
});

// 定义资源数量和店主游戏ID
const resourceAmount = ref(0);
const ownerGameId = ref(props.owner.gameId);

// 获取当前用户的能量石余额
const currentPowerStoneBalance = computed(() => {
  return gameInfo.assets.powerStone || 0; // 如果未定义，默认返回 0
});

// 计算总扣除能量石数量（包括手续费）
const totalDeduction = computed(() => {
  const amount = parseFloat(resourceAmount.value) || 0; // 获取输入的能量石数量
  const fee = amount * 0.08; // 计算手续费（8%）
  return amount + fee; // 返回总扣除数量
});

// 关闭弹窗
const emit = defineEmits(['close']);
const handleClose = () => {
	emit('close');
};

// 提交资源转移
const handleSubmit = async () => {
  // 校验输入
  if (!ownerGameId.value || !resourceAmount.value || resourceAmount.value < 0) {
    uni.showToast({ title: '请输入完整的游戏ID和能量石数量', icon: 'none' });
    return;
  }

  // 获取当前用户的 ID
  const userId = uni.getStorageSync('id');
  if (!userId) {
    uni.showToast({ title: '用户未登录', icon: 'none' });
    return;
  }

  // 检查能量石余额是否足够
  if (totalDeduction.value > currentPowerStoneBalance.value) {
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
        gameID: ownerGameId.value, // 店主的游戏ID
        userId, // 当前用户的ID
        assetsType: 'powerStone', // 资源类型（假设为能量石）
        sendNum: parseFloat(resourceAmount.value), // 转移数量
        premium: 0.08, // 手续费比例
      },
    });

    // 隐藏加载中提示
    uni.hideLoading();
    console.log('云函数返回结果:', res.result);

    // 处理云函数返回结果
    if (res.result.code === 1) {
      uni.showToast({ title: '资源转移成功', icon: 'success' });
      handleClose(); // 关闭弹窗
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
        default:
          errorMessage = res.result.message || '未知错误';
      }
      uni.showToast({ title: errorMessage, icon: 'none' });
    }
  } catch (err) {
    // 隐藏加载中提示
    uni.hideLoading();
    console.error('调用云函数失败:', err);
    uni.showToast({ title: '网络错误，请稍后重试', icon: 'none' });
  }
};


onMounted(async () => {
	await updateAssets()
})
</script>

<style lang="less">
.popup-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.mask {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
	position: relative;
	width: 80vw;
	background-color: #fff;
	border-radius: 4vw;
	padding: 6vw;
	box-shadow: 0 0.5vw 2.5vw rgba(0, 0, 0, 0.1);
}

/* 关闭按钮 */
.close-btn {
	position: absolute;
	top: 2vw;
	right: 2vw;
	font-size: 6vw;
	color: #666;
	cursor: pointer;
	transition: color 0.3s ease;
}

.close-btn:hover {
	color: #333;
}

.owner-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 6vw;
}

.owner-avatar {
	width: 15vw;
	height: 15vw;
	border-radius: 50%;
	margin-bottom: 2vw;
}

.owner-name {
	font-size: 4vw;
	font-weight: bold;
	color: #333;
	margin-bottom: 1vw;
}

.owner-id,
.owner-wechat {
	font-size: 3.5vw;
	color: #666;
	margin-bottom: 1vw;
}

.transfer-form {
	display: flex;
	flex-direction: column;
}

/* 当前能量石余额 */
.balance-info {
	display: flex;
	align-items: center;
	margin-bottom: 6vw;
}

.balance-text {
	font-size: 3.5vw;
	color: #333;
	font-weight: bold;
}

.input-group {
	margin-bottom: 6vw;
}

.label {
	font-size: 3.5vw;
	color: #333;
	margin-bottom: 2vw;
	font-weight: bold;
}

.input {
	width: 100%;
	height: 10vw;
	padding: 3vw;
	font-size: 3.5vw;
	border: 0.27vw solid #e0e0e0;
	border-radius: 2vw;
	box-sizing: border-box;
	transition: border-color 0.3s ease;
}

.input:focus {
	border-color: #007aff;
	outline: none;
}

/* 手续费显示 */
.fee-info {
	display: flex;
	align-items: center;
	margin-bottom: 6vw;
}

.energy-stone-icon {
	width: 6vw;
	height: 6vw;
	margin-right: 2vw;
}

.fee-text {
	font-size: 3.5vw;
	color: black;
	font-weight: bold;
}

/* 总扣除能量石数量 */
.total-deduction {
	margin-bottom: 6vw;
}

.total-text {
	font-size: 3.5vw;
	color: #333;
	font-weight: bold;
}

/* 确认转移按钮 */
.submit-btn {
	background: linear-gradient(135deg, #6a11cb, #2575fc);
	color: #fff;
	font-size: 4vw;
	font-weight: bold;
	border: none;
	border-radius: 3vw;
	padding: 3vw;
	cursor: pointer;
	transition: background 0.3s ease, transform 0.2s ease;
	box-shadow: 0 0.5vw 1.5vw rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
}
</style>