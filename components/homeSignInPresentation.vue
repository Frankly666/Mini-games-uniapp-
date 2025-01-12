<template>
	<view>
		<!-- 弹窗 -->
		<view class="rewardModal" v-if="showRewardModal">
			<view class="modalContent">
				<!-- 礼包名字 -->
				<text class="activityName">{{ selectedActivity.name }}</text>
				
				<!-- 宝石图片和数量 -->
				<view class="rewardInfo">
					<image class="gemImage" src="../static/market/diamond.png" mode="widthFix"></image>
					<text class="gemAmount">{{ selectedActivity.dailyReward }} 金刚石</text>
				</view>
				
				<!-- 签到按钮 -->
				<button class="claimButton" @click="handleClaim">领取</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGameInfoStore } from '../stores/gameInfo';
import { roundToOneDecimal } from '../utils/roundToOneDecimal';
import { getUserAssets } from '../utils/updateGameInfo';

const gameInfo = useGameInfoStore();

// 弹窗显示状态
const showRewardModal = ref(false);

// 当前选中的活动
const selectedActivity = ref(null);

// 页面加载时查询用户未过期的活动
onMounted(async () => {
	const userId = uni.getStorageSync('id');
	if (!userId) return;

	try {
		// 查询用户未过期的活动
		const res = await uniCloud.callFunction({
			name: 'selectPurchaseActivity',
			data: {
				userId
			}
		});

		if (res.result.code === 0 && res.result.data.length > 0) {
			// 找到第一个未签到的活动
			const activity = res.result.data.find(record => {
				const lastClaimTime = record.lastClaimTime ? new Date(record.lastClaimTime) : null;
				const today = new Date();
				today.setHours(0, 0, 0, 0); // 今天的开始时间
				return !lastClaimTime || lastClaimTime < today;
			});

			if (activity) {
				selectedActivity.value = activity;
				showRewardModal.value = true; // 显示弹窗
			}
		}
	} catch (err) {
		console.error('查询失败:', err);
	}
});

// 签到逻辑
const handleClaim = async () => {
	if (!selectedActivity.value) return;

	// 显示加载动画
	uni.showLoading({
		title: '领取中...',
		mask: true
	});

	// 从本地缓存获取用户 ID
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
		// 调用云函数进行签到
		const res = await uniCloud.callFunction({
			name: 'claimDailyReward',
			data: {
				userId,
				activityId: selectedActivity.value.activityId,
				dailyReward: selectedActivity.value.dailyReward
			}
		});

		if (res.result.code === 0) {
			uni.hideLoading();
			uni.showToast({
				title: '领取成功！',
				icon: 'success'
			});

			// 更新本地金刚石数量
			getUserAssets()

			// 关闭弹窗
			showRewardModal.value = false;
		} else {
			uni.hideLoading();
			uni.showToast({
				title: '领取失败，请重试！',
				icon: 'none'
			});
		}
	} catch (err) {
		console.error('领取失败:', err);
		uni.hideLoading();
		uni.showToast({
			title: '领取失败，请重试！',
			icon: 'none'
		});
	}
};
</script>

<style lang="less">
.rewardModal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;

	.modalContent {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 6.7vw; /* 20px -> 6.7vw */
		border-radius: 3.3vw; /* 10px -> 3.3vw */
		width: 70vw;
		height: 70vw;
		text-align: center;
		background: url("../static/ground/board.png") no-repeat center center / contain;

		.rewardInfo {
			position: absolute;
			top: 27.3vw; /* 40px -> 13.3vw */
			left: 35vw;
			display: flex;
			flex-direction: column;
			align-items: center;

			.gemImage {
				width: 12vw; /* 50px -> 13.3vw */
				height: 12vw; /* 50px -> 13.3vw */
				margin-bottom: 2.7vw; /* 10px -> 2.7vw */
			}

			.gemAmount {
				font-size: 4vw; /* 18px -> 4.8vw */
				font-weight: bold;
				color: #333;
			}
		}

		.activityName {
			position: absolute;
			text-align: center;
			top: 14vw;
			left: -1vw;
			width: 100%;
			font-size: 6vw; /* 16px -> 4.3vw */
			color: #555;
			font-weight: bold;
		}

		.claimButton {
			position: absolute;
			width: 26.7vw; /* 80px -> 26.7vw */
			height: 13.3vw; /* 50px -> 13.3vw */
			top: 53.3vw; /* 160px -> 53.3vw */
			left: 50%;
			transform: translateX(-50%);
			color: #fff;
			font-weight: bold;
			font-size: 4.3vw; /* 16px -> 4.3vw */
			border: none;
			cursor: pointer;
			line-height: 12.3vw; /* 50px -> 13.3vw */
			background: url("../static/home/btn_Green.png") no-repeat center center / contain;
		}
	}
}
</style>