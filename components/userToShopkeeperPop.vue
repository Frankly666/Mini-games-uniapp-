<template>
	<view class="popup-container">
		<!-- 遮罩层 -->
		<view class="mask" @click="handleClose"></view>
		
		<!-- 弹窗内容 -->
		<view class="popup-content">
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
					<text class="label">能量石数量</text>
					<input class="input" type="number" placeholder="请输入能量石数量" v-model="resourceAmount" />
				</view>

				<!-- 手续费显示 -->
				<view class="fee-info">
					<image class="energy-stone-icon" src="/static/market/powerStone.png" mode="aspectFit"></image>
					<text class="fee-text">手续费: 8%</text>
				</view>

				<!-- 确认转移按钮 -->
				<button class="submit-btn" @click="handleSubmit">确认转移</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

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

// 关闭弹窗
const emit = defineEmits(['close']);
const handleClose = () => {
	emit('close');
};

// 提交资源转移
const handleSubmit = () => {
	if (!ownerGameId.value || !resourceAmount.value) {
		console.log('请输入完整的游戏ID和能量石数量');
		return;
	}
	console.log('店主游戏ID:', ownerGameId.value);
	console.log('转移能量石数量:', resourceAmount.value);
	// 这里可以添加资源转移逻辑
	handleClose(); // 关闭弹窗
};
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
	color: #666;
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

.submit-btn:active {
	background: linear-gradient(135deg, #5a0db5, #1c5fd8);
	transform: scale(0.98);
}
</style>