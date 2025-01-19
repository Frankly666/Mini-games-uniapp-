<template>
	<view class="market-container">
		<view class="header">
		  <view class="menu-icon" @click="showMenu = true">
		    <text class="icon"></text>
		  </view>
		</view>
		
		<view class="cardWrap">
			<!-- 求购集市卡片 -->
			<view class="card buy-card" @click="navigateToBuyMarket"/>
			
			<!-- 出售集市卡片 -->
			<view class="card sell-card" @click="navigateToSellMarket"/>
		</view>
		

	</view>
</template>

<script setup>
// 跳转到求购集市页面
function navigateToBuyMarket() {
	console.log('跳转到求购集市页面');
	uni.navigateTo({ url: "/pages/TradingMarkets/TradingMarkets" });
}

// 跳转到出售集市页面
function navigateToSellMarket() {
	console.log('跳转到出售集市页面');
	
	// 从本地缓存中获取用户信息
	const userInfo = uni.getStorageSync("userInfo");
	console.log("userInfo:",userInfo.isMerchant)
	
	// 判断用户是否为商人
	if (userInfo && userInfo.isMerchant) {
		// 如果是商人，跳转到 UserMerchantCenter 页面
		uni.navigateTo({ url: "/pages/UserMerchantCenter/UserMerchantCenter" });
	} else {
		// 如果不是商人，跳转到 MerchantCenter 页面
		uni.navigateTo({ url: "/pages/MerchantCenter/MerchantCenter" });
	}
}
</script>

<style lang="less">
.market-container {
	position: relative;
	width: 100vw;
	height: 100%;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 140vw;
    width: 100vw;
    color: #fff;
    font-size: 5vw; /* 20px -> 5vw */
    font-weight: bold;
    position: absolute;
    top: -15vw;
    left: 0;
    right: 0;
		position: fixed;
    background: url('../static/homePage/bigBg.png') no-repeat center center / contain;

    /* 三个点的图标 */
    .menu-icon {
      position: absolute;
      top: 4vw;
      right: 4vw;
      width: 7vw;
      height: 7vw;
      background: url('../static/homePage/more.png') no-repeat center center / contain;

      .icon {
        font-size: 6vw; /* 24px -> 6vw */
        font-weight: bold;
      }
    }
  }
	
	.cardWrap {
		position: absolute;
		top: 85vw;
		left: -4vw;
		width: 100vw;
		height: auto;
		display: flex;
		justify-content: space-between;
		
		.card {
		  position: absolute;
			background: no-repeat center center / contain;
			width: 60vw;
			height: 60vw;
		
		  /* 求购集市卡片样式 */
		  &.buy-card {
				left: -3vw;
		    background-image: url('../static/homePage/tradingBazaar.png')
		  }
		
		  /* 出售集市卡片样式 */
		  &.sell-card {
				right: -3vw;
		    background-image: url('../static/homePage/merchantsBazaar.png')
		  }
		}
	}
 
}
</style>