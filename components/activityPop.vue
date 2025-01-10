<template>
	<view class="announcementWrap">
		<!-- 购买成功就用来领取的组件 -->
		<home-sign-in-presentation-vue v-if="isBuySuccus" :activity="selectedActivity" @close="isBuySuccus = false" />
		
		<view class="pop">
			<view class="title">
				<text>活动</text>
			</view>
			
			<view class="close" @click="() => {props.handleShow(2, false)}"></view>
			
			<!-- 活动列表 -->
			<view class="activityList">
				<view class="activityCard" v-for="(activity, index) in activities" :key="index">
					<!-- 左边：图片和名称 -->
					<view class="left">
						<image class="itemImage" :src="activity.image" mode="widthFix"></image>
						<text class="itemName">{{ activity.name }}</text>
					</view>
					
					<!-- 中间：描述和价格 -->
					<view class="middle">
						<text class="itemDescription">{{ activity.description }}</text>
						<text class="itemPrice">价格: {{ activity.price }} 宝石</text>
					</view>
					
					<!-- 右边：购买按钮 -->
					<view class="right">
						<button 
							class="buyButton" 
							:class="{ disabled: isPurchased(activity.id) }" 
							:disabled="isPurchased(activity.id)"
							@click="showConfirmModal(activity)"
						>
							{{ isPurchased(activity.id) ? '已拥有' : '购买' }}
						</button>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 自定义确认弹窗 -->
		<view class="customModal" v-if="isModalVisible">
			<view class="modalContent">
				<text class="modalTitle">确认购买</text>
				<text class="modalMessage">确定要购买 {{ selectedActivity.name }} 吗？</text>
				<view class="modalButtons">
					<button class="modalButton cancel" @click="hideConfirmModal">取消</button>
					<button class="modalButton confirm" @click="handleConfirmPurchase">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGameInfoStore } from '../stores/gameInfo';
import homeSignInPresentationVue from './homeSignInPresentation.vue';

const gameInfo = useGameInfoStore();
const props = defineProps(['handleShow']);
const isBuySuccus = ref(false);

const activities = ref([
	{	
		id: '1',
		image: '/static/home/th.jpg',
		name: '蛇年限定礼包',
		description: '每日产出金刚石2个共持续18天',
		price: 58, // 价格（水晶）
		duration: 18, // 礼包期限（天）
		dailyReward: 2 // 每日收获数量
	}
]);

// 已购买的活动 ID 列表
const purchasedActivityIds = ref([]);

// 自定义弹窗状态
const isModalVisible = ref(false);
const selectedActivity = ref(null);

// 封装查询已购买活动的函数
const fetchPurchasedActivities = async () => {
	const userId = uni.getStorageSync('id');
	if (!userId) return;

	try {
		const res = await uniCloud.callFunction({
			name: 'selectPurchaseActivity',
			data: {
				userId
			}
		});

		if (res.result.code === 0) {
			// 更新已购买的活动 ID 列表
			purchasedActivityIds.value = res.result.data;
		} else {
			console.error('查询失败:', res.result.message);
		}
	} catch (err) {
		console.error('查询失败:', err);
	}
};

// 显示确认弹窗
const showConfirmModal = (activity) => {
	selectedActivity.value = activity;
	isModalVisible.value = true;
};

// 隐藏确认弹窗
const hideConfirmModal = () => {
	isModalVisible.value = false;
};

const handleConfirmPurchase = async () => {
	if (!selectedActivity.value) return;

	uni.showLoading({
		title: '购买中...',
		mask: true
	});

	if (gameInfo.assets.jewel < selectedActivity.value.price) {
		uni.hideLoading();
		uni.showToast({
			title: '余额不足！',
			icon: 'none'
		});
		return;
	}

	const userId = uni.getStorageSync('id');
	if (!userId) {
		uni.hideLoading();
		uni.showToast({
			title: '用户未登录，请重新登录！',
			icon: 'none'
		});
		return;
	}

	try {
		// 调用云函数进行购买
		const purchaseRes = await uniCloud.callFunction({
			name: 'purchaseActivity',
			data: {
				userId,
				activityId: selectedActivity.value.id,
				price: selectedActivity.value.price,
				duration: selectedActivity.value.duration,
				dailyReward: selectedActivity.value.dailyReward,
				name: selectedActivity.value.name
			}
		});

		if (purchaseRes.result.code === 0) {
			uni.hideLoading();
			uni.showToast({
				title: '购买成功！',
				icon: 'success'
			});

			// 更新本地余额
			gameInfo.assets.jewel -= selectedActivity.value.price;

			// 重新查询已购买的活动
			await fetchPurchasedActivities();

			// 显示领取组件
			isBuySuccus.value = true;
		} else {
			uni.hideLoading();
			uni.showToast({
				title: '购买失败，请重试！',
				icon: 'none'
			});
		}
	} catch (err) {
		console.error('购买失败:', err);
		uni.hideLoading();
		uni.showToast({
			title: '购买失败，请重试！',
			icon: 'none'
		});
	}

	hideConfirmModal();
};

// 判断活动是否已购买
const isPurchased = (activityId) => {
	return purchasedActivityIds.value.some(item => item.activityId === activityId);
};

// 页面加载时查询用户已购买的活动
onMounted(async () => {
	await fetchPurchasedActivities();
});
</script>


<style lang="less">
.announcementWrap {
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	z-index: 1000;
	background-color: rgba(0, 0, 0, 0.7);
	color: #333;
	
	.pop {
		position: relative;
		width: 90vw;
		height: 110vw;
		background: url('../static/toolsBar/board1.png') no-repeat  center center / 100% 90%;
		
		.title {
			position: absolute;
			left: 33.5vw;
			top: 10vw;
			text-align: center;
			width: 15vw;
			height: 5vw;
			font-weight: bold;
			font-size: 6vw;
			color: #333;
		}
		
		.close {
			position: absolute;
			right: 1vw;
			top: 9vw;
			width: 11vw;
			height: 11vw;
			transform: rotate(45deg);
			background: url('../static/toolsBar/close_btn.png') no-repeat  center center / contain;
		}
		
		.activityList {
			position: absolute;
			top: 27vw;
			left: 5vw;
			right: 5vw;
			bottom: 5vw;
			height: 70%;
			overflow-y: auto;
			
			.activityCard {
				display: flex;
				align-items: center;
				margin-bottom: 4vw;
				padding: 2vw;
				background-color: rgba(255, 255, 255, 0.9);
				border-radius: 2vw;
				box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
				
				.left {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					
					.itemImage {
						width: 10vw;
						height: 10vw;
						margin-bottom: 1vw;
					}
					
					.itemName {
						font-size: 3vw;
						font-weight: bold;
						color: #333;
					}
				}
				
				.middle {
					flex: 2;
					display: flex;
					flex-direction: column;
					justify-content: center;
					padding: 0 2vw;
					
					.itemDescription {
						font-size: 3vw;
						margin-bottom: 1vw;
						color: #555;
					}
					
					.itemPrice {
						font-size: 3.5vw;
						color: #e67e22;
					}
				}
				
				.right {
					flex: 1;
					display: flex;
					justify-content: center;
					
					.buyButton {
						background-color: #e67e22;
						color: #fff;
						font-size: 3.5vw;
						padding: 1vw 3vw;
						border-radius: 2vw;
						border: none;
						cursor: pointer;

						&.disabled {
							background-color: #ccc;
							cursor: not-allowed;
						}
					}
				}
			}
		}
	}
	
	.customModal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1001; /* 确保弹窗在最顶层 */
		
		.modalContent {
			background-color: #fff;
			padding: 4vw;
			border-radius: 2vw;
			width: 70vw;
			text-align: center;
			
			.modalTitle {
				font-size: 5vw;
				font-weight: bold;
				color: #333;
				margin-bottom: 3vw;
			}
			
			.modalMessage {
				font-size: 4vw;
				color: #555;
				margin-bottom: 4vw;
			}
			
			.modalButtons {
				display: flex;
				justify-content: space-between;
				margin-top: 4vw;
				
				.modalButton {
					flex: 1;
					margin: 0 2vw;
					padding: 2vw;
					border: none;
					border-radius: 2vw;
					font-size: 4vw;
					cursor: pointer;
					
					&.cancel {
						background-color: #ccc;
						color: #333;
					}
					
					&.confirm {
						background-color: #e67e22;
						color: #fff;
					}
				}
			}
		}
	}
}
</style>