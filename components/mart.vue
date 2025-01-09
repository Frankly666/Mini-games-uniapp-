<template>
	<view class="market-container">
		<!-- 求购集市卡片 -->
		<view class="card buy-card" @click="navigateToBuyMarket">
			<text class="card-title">交易市集\n</text>
			<text class="card-description">可与玩家进行求购和交易</text>
			<view class="card-icon">🛒</view>
		</view>

		<!-- 出售集市卡片 -->
		<view class="card sell-card" @click="navigateToSellMarket">
			<text class="card-title">商人集市\n</text>
			<text class="card-description">向店主出售物资</text>
			<view class="card-icon">💰</view>
		</view>
	</view>
</template>

<script setup>
// 跳转到求购集市页面
function navigateToBuyMarket() {
	console.log('跳转到求购集市页面');
	// 这里可以添加跳转逻辑，例如：
	uni.navigateTo({ url: "/pages/TradingMarkets/TradingMarkets" });
}

// 跳转到出售集市页面
function navigateToSellMarket() {
	console.log('跳转到出售集市页面');
	// 这里可以添加跳转逻辑，例如：
	uni.navigateTo({ url: "/pages/MerchantCenter/MerchantCenter" });
}
</script>

<style lang="less">
.market-container {
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
	background-color: #f8f8f8;
}

.card {
	position: relative;
	padding: 20px;
	border-radius: 16px;
	background-color: #fff;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	animation: float 3s ease-in-out infinite;
}

/* 漂浮动画 */
@keyframes float {
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
}

/* 求购集市卡片动画延迟 */
.buy-card {
	animation-delay: 0s; /* 第一张卡片无延迟 */
}

/* 出售集市卡片动画延迟 */
.sell-card {
	animation-delay: 1.5s; /* 第二张卡片延迟 1.5 秒 */
}

.card-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin-bottom: 8px;
}

.card-description {
	font-size: 14px;
	color: #666;
}

.card-icon {
	position: absolute;
	top: 20px;
	right: 20px;
	font-size: 24px;
}

/* 求购集市卡片样式 */
.buy-card {
	background: linear-gradient(135deg, #6a11cb, #2575fc);
	color: #fff;
}

.buy-card .card-title,
.buy-card .card-description {
	color: #fff;
}

/* 出售集市卡片样式 */
.sell-card {
	background: linear-gradient(135deg, #ff9a9e, #fad0c4);
	color: #333;
}

.sell-card .card-title {
	color: #333;
}

.sell-card .card-description {
	color: #555;
}
</style>