<template>
	<view class="tradingMarketWrap">
		<view class="return" @click="back"></view>
		<assets-header1 :judge='2'/>
		<market-publish 
			v-if="isShowMarketPublish" 
			:controlPublish='controlPublish' 
			:title='marketItems[marketCurrentIndex]'
			:gemItems='gemItems'
			:gemImgName='gemImgName'
		/>
		<buy-cell-pop 
			v-if="isShowBuySellPop" 
			:controlShowPop='controlShowPop'
			:gemName='gemImgName[itemCurrentIndex]'
			:gemChName='gemItems[itemCurrentIndex]'
			:marketName='marketItems[marketCurrentIndex]'
			/>
		
		<!-- 出售求购 -->
		<view class="topWrap">
			<view class="markets">
				<view
					:class="{'marketItem': true, 'active': marketCurrentIndex === index}"
					v-for="(item,index) in marketItems"
					@click="() =>{setMarketIndex(index)}"
					>
					<text>{{item}}市场</text>
				</view>
			</view>
			
			<view class="publish" @click="() => {controlPublish(true)}">
				<text>发布{{marketItems[marketCurrentIndex]}}</text>
			</view>
		</view>
		
		<!-- 资源石 -->
		<view class="gemstones">
			<view class="tabs">
				<view 
					:class="{'gemItem': true, 'active': itemCurrentIndex === index}"
					v-for="(item,index) in gemItems"
					@click="() =>{setItemIndex(index)}"
					>
					<view class="gemImg" :style="`background-image: url(${getGemImg(gemImgName[index])});`"></view>
					<text>{{item}}</text>
				</view>
			</view>
			
			<view class="contentWrap">
				<view class="content">
					<view class="item" v-for="item in 5">
						<view class="gemImg" :style="`background-image: url(${getGemImg(gemImgName[itemCurrentIndex])});`"></view>
						<view class="num">
							<text>{{marketItems[marketCurrentIndex]}} : {{item}}个</text>
						</view>
						<view class="priceImg"></view>
						<view class="price">
							<text>{{0.226}}/个</text>
						</view>
						<view class="button" @click="controlShowPop(true)">
							<text>{{buttonWord[marketCurrentIndex]}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import assetsHeader1 from '../../components/assetsHeader.vue';
	import marketPublish from '../../components/marketPublish.vue';
	import buyCellPop from '../../components/buyCellPop.vue';
	
	const marketCurrentIndex = ref(0)
	const itemCurrentIndex = ref(0)
	const isShowMarketPublish = ref(false)
	const isShowBuySellPop = ref(false)
	const gemItems = ['金刚石', '资源石', '无球粒陨石']
	const gemImgName = ['diamond', 'resourceStone', 'meteorite']
	const marketItems = ['出售', '求购']
	const buttonWord = ['购买', '出售']
	
	function setItemIndex(index) {
		itemCurrentIndex.value = index
	}
	
	function setMarketIndex(index) {
		marketCurrentIndex.value = index
	}
	
	function back() {
		uni.navigateTo({
			url:'/pages/Home/Home'
		})
	}
	
	function getGemImg(item) {
		return `../../static/market/${item}.png`
	}
	
	function controlPublish(bool) {
		isShowMarketPublish.value = bool
	}
	
	function controlShowPop (bool) {
		isShowBuySellPop.value = bool;
	}
</script>

<style lang="less">
	.tradingMarketWrap {
		position: relative;
		width: 100vw;
		height: 100vh;
		background-color: rgba(139, 203, 244, 1);
		
		.topWrap {
			position: absolute;
			top: 26vw;
			color: aliceblue;
			font-size: 4vw;
			width: 100%;
			font-weight: bold;
			
			.markets {
				position: absolute;
				width: 43vw;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1vw 4vw;
				height: 10vw;
				border-radius: 5vw;
				background-color: rgba(70, 89,106, .14);
				
				.marketItem {
					display: flex;
					align-items: center;
					border-radius:4vw;
					padding: 2vw;
					box-sizing: border-box;
					
					&.active {
						color: #95e23d;
						background: url('../../static/assetsHeader/marketBg.png') no-repeat center center /cover;
					}
				}
			}
			
			.publish {
				position: absolute;
				top: 1.3vw;
				right: 2vw;
				border-radius:4vw;
				padding: 2vw;
				font-size: 3.5vw;
				color: #dcc5ab;
				background: url('../../static/assetsHeader/marketBg.png') no-repeat center center /cover;
			}
		}
		
		.gemstones {
			position: absolute;
			top: 39vw;
			width: 100%;
			
			.tabs {
				position: absolute;
				width: 100%;
				display: flex;
				justify-content: space-between;
				background-color: rgba(70, 89,106, .14);
				padding: 3vw 0vw;
				border-radius: 4vw;
				color: aliceblue;
				font-weight: bold;
				
				.gemItem {
					.gemImg {
						display: inline;
						width: 9vw;
						height: 9vw;
						background: no-repeat center center / contain;
						margin-right: 1vw;
						
					}
					
					&:first-child.gemImg{
						width: 7vw;
						height:7vw;
					}
				}
				
				
				
				
				
				.gemItem {
					display: flex;
					align-items: center;
					padding: 2vw 2vw;
					border-radius: 2vw;
					
					&:first-of-type {
						margin-left: 4vw;
					}
					
					&:last-of-type {
						margin-right: 5vw;
					}
					
					&.active{
						color: #95e23d;
					}
				}
	
			}
			
			.contentWrap {
				margin-top: 18vw;
				padding: 3vw 5vw;
				width: 100%;
				height: 90vw;
				font-weight: bold;
				font-size: 3.6vw;
				
				.content {
					width: 100%;
					
					.item {
						position: relative;
						display: flex;
						box-sizing: border-box;
						width: 90%;
						height: 13vw;
						line-height: 6vw;
						border-radius: 3vw;
						margin-top: 3vw;
						background-color: aliceblue;
						padding: 3vw;
						border: black 1px solid;
						box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
						
						.gemImg {
							width: 6vw;
							height: 6vw;
							margin-right: 2vw;
							background: no-repeat center center / contain;
						}
						
						.priceImg {
							margin-left: 11vw;
							margin-right: 2vw;
							width: 6vw;
							height: 6vw;
							background: url('../../static/market/powerStone.png') no-repeat center center / contain;
						}
						
						.button {
							position: absolute;
							right: 3vw;
							bottom: 1vw;
							width: 19vw;
							height: 10vw;
							background: url('../../static/market/btn_Blue1.png') no-repeat center center / contain;
							line-height: 8.7vw;
							text-align: center;
							color: aliceblue;
						}
					}
				}
				
			}
		}
		
		.return {
			position: absolute;
			bottom: 5vw;
			left: 5vw;
			width: 13vw;
			height: 13vw;
			background: url("../../static/market/return.png") no-repeat center center / contain;
		}
	}
</style>
