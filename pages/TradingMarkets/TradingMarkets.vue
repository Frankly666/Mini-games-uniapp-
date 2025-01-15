<template>
	<view class="tradingMarketWrap">		
		<view class="return" @click="back"></view>
		<view class="reload" @click="updateData">
			<text class="text">刷新</text>
		</view>
		<assets-header1 :judge='2'/>
		<market-publish 
			v-if="isShowMarketPublish" 
			:controlPublish='controlPublish' 
			:title='marketItems[marketCurrentIndex]'
			:gemItems='gemItems'
			:gemImgName='gemImgName'
			:updateData='updateData'
		/>
		<buy-cell-pop 
			v-if="isShowBuySellPop" 
			:controlShowPop='controlShowPop'
			:gemName='gemImgName[itemCurrentIndex]'
			:gemChName='gemItems[itemCurrentIndex]'
			:marketName='marketItems[marketCurrentIndex]'
			:certainItem='certainRequirement'
			:updateData='updateData'
			/>
		
		<!-- 转赠弹窗 -->
		<sent-pop-vue
			v-if="isShowSentPop"
			:closePop = '() => {setShowSentPop(false)}'
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
			
			<view class="sent" @click="() => {setShowSentPop(true)}">
				<text>转赠</text>
			</view>
			
			<view class="publish" @click="() => {controlPublish(true)}">
				<text>发布{{marketItems[marketCurrentIndex]}}</text>
			</view>
		</view>
		
		<!-- 石头 -->
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
					<view class="item" v-for="(item, index) in showListData" :key="index">
						<view class="numWrap">
							<view class="gemImg" :style="`background-image: url(${getGemImg(gemImgName[itemCurrentIndex])});`"></view>
							<view class="num">
								<text>{{marketItems[marketCurrentIndex]}} : {{formatLargeNumber(item[numName])}}个</text>
							</view>
						</view>
						<view class="priceWrap">
							<view class="priceImg"></view>
							<view class="price">
								<text>{{formatLargeNumber(item[priceName])}}/个</text>
							</view>
						</view>
						<view class="button" @click="() => {setCertainIndex(index);controlShowPop(true)}">
							<text>{{buttonWord[marketCurrentIndex]}}</text>
						</view>
						<!-- 新增：取消按钮 -->
						<view 
							v-if="(marketCurrentIndex === 0 && item.sellerId === userId) || (marketCurrentIndex === 1 && item.buyerId === userId)"
							class="cancelButton" 
							@click="() => {handleCancel(item)}"
						>
							<text>取消</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, onMounted, ref } from 'vue'
	import assetsHeader1 from '../../components/assetsHeader.vue';
	import marketPublish from '../../components/marketPublish.vue';
	import buyCellPop from '../../components/buyCellPop.vue';
	import sentPopVue from '../../components/sentPop.vue';
	import { formatLargeNumber } from '../../utils/formatLargeNumber'
	import { JEWEL, useGameInfoStore } from '../../stores/gameInfo';
	import { roundToOneDecimal } from '../../utils/roundToOneDecimal';
	import { getUserAssets } from '../../utils/updateGameInfo';
	import { addAssetsChangeRecord, assetsNameMap } from '../../utils/addAssetsChangeRecord ';
	import { showTips } from '../../utils/error';
	import { checkTradingRequrementAssets } from '../../utils/checkTradingRequrementAssets';

	const marketCurrentIndex = ref(0)
	const itemCurrentIndex = ref(0)
	const itemCertainIndex = ref(0)
	const isShowMarketPublish = ref(false)
	const isShowBuySellPop = ref(false)
	const gemItems = ['金刚石', '资源石', '能量石']
	const gemImgName = ['diamond', 'resourceStone', 'powerStone']
	const marketItems = ['出售', '求购']
	const buttonWord = ['购买', '出售']
	const marketDB = uniCloud.importObject('market')
	const assetsDB = uniCloud.importObject('assets')
	const sellRequirement = ref({})
	const buyRequirement = ref({})
	const isShowSentPop = ref(false)
	const userId = uni.getStorageSync('id')
	const gameInfo = useGameInfoStore()
	
	// 动态得到展示的字段名
	const showListData = computed(() => {
		const itemName = gemImgName[itemCurrentIndex.value]
		return marketCurrentIndex.value === 0 ? sellRequirement.value[itemName] : buyRequirement.value[itemName]
	})
	const numName = computed(() => {
		return marketCurrentIndex.value === 0 ? "sellNum" : "buyNum" 
	})
	const priceName = computed(() => {
		return marketCurrentIndex.value === 0 ? "sellPrice" : "buyPrice" 
	})
	
	// 用户点击得到的某个具体的需求
	const certainRequirement = computed(() => {
		const itemName = gemImgName[itemCurrentIndex.value];
		const list = marketCurrentIndex.value === 0 ? sellRequirement.value : buyRequirement.value;
		
		return list[itemName][itemCertainIndex.value]
	})
	
	function setItemIndex(index) {
		itemCurrentIndex.value = index
	}
	
	function setMarketIndex(index) {
		marketCurrentIndex.value = index
	}
	
	function back() {
		uni.navigateBack({
			delta: 1
		})
	}
	
	function getGemImg(item) {
		return `../../static/market/${item}.png`
	}
	
	// 发布的弹窗控制
	function controlPublish(bool) {
		isShowMarketPublish.value = bool
	}
	
	// 购买或者出售的弹窗控制
	function controlShowPop (bool) {
		isShowBuySellPop.value = bool;
	}
	function setCertainIndex(index) {
		itemCertainIndex.value = index;
	}
	
	// 转赠的弹窗
	function setShowSentPop(type) {
		isShowSentPop.value = type
	}
	
	async function updateData() {
		gemImgName.forEach(async (item) => {
			const res1 = await marketDB.selectSellRequirement(item);
			const res2 = await marketDB.selectBuyRequirement(item);
			sellRequirement.value[item] = res1.data
			buyRequirement.value[item] = res2.data
		})
	}
	
	
	// 取消操作
	async function handleCancel(item) {
		uni.showLoading({
			title: "数据检查中..."
		})
		
		
		const res = await checkTradingRequrementAssets(item);
		uni.hideLoading()
		if(res.code === -2) {
			showTips("请刷新后同步数据")
			return
		}
		
	  uni.showModal({
	    title: '确认取消',
	    content: '您确定要撤销这条记录吗？\n操作后将返还你的资源',
	    success: async (res) => {
	      if (res.confirm) {
	        try {
	          // 显示加载提示
	          uni.showLoading({
	            title: '处理中...',
	            mask: true, // 防止用户点击其他区域
	          });
	
	          // 构造云函数参数
	          const params = {
	            userId: uni.getStorageSync('id'), // 当前用户 ID
	            recordId: item._id, // 交易记录 ID
	            resourceType: item.gemType, // 资源类型
	            resourceAmount: marketCurrentIndex.value === 0 ? item.sellNum : item.buyNum, // 资源数量
	            price: marketCurrentIndex.value === 0 ? item.sellPrice : item.buyPrice, // 资源单价
	            type: marketCurrentIndex.value, // 交易类型（0: 出售, 1: 求购）
	          };
	
	          // 调用云函数
	          const result = await uniCloud.callFunction({
	            name: 'cancelTradeRequirement',
	            data: params,
	          });
	
	          // 隐藏加载提示
	          uni.hideLoading();
	
	          // 处理云函数返回结果
	          if (result.result.code === 0) {
	            uni.showToast({
	              title: '取消成功',
	              icon: 'success',
	              duration: 2000, // 提示显示时长
	            });
	
	            getUserAssets();
	
	            // 取消出售记录
	            if (marketCurrentIndex.value === 0) {
	              addAssetsChangeRecord(
	                uni.getStorageSync('id'),
	                item.gemType,
	                item.sellNum,
	                `出售市场中取消出售${assetsNameMap[item.gemType]}(单价${item.sellPrice}), 退回: `
	              );
	            } else {
	              addAssetsChangeRecord(
	                uni.getStorageSync('id'),
	                JEWEL,
	                roundToOneDecimal(item.buyNum * item.buyPrice),
	                `求购市场中取消求购${assetsNameMap[item.gemType]}(单价${item.buyPrice}), 退回: `
	              );
	            }
	
	            // 刷新数据
	            await updateData();
	          } else if (result.result.code === -2) {
	            // 数据过期，提示用户刷新
	            showTips("请刷新同步数据");
	          } else if(result.result.code === -3) {
							showTips('该条记录已经被取消请刷新')
						}else {
	            uni.showToast({
	              title: '取消失败：请刷新',
	              icon: 'none',
	              duration: 3000, // 提示显示时长
	            });
	          }
	        } catch (err) {
	          // 隐藏加载提示
	          uni.hideLoading();
	
	          // 显示错误提示
	          uni.showToast({
	            title: '取消失败：' + err.message,
	            icon: 'none',
	            duration: 3000, // 提示显示时长
	          });
	        }
	      }
	    },
	  });
	}
	
	
	onMounted(async () => {
		await updateData()
	})
</script>

<style lang="less">
	.tradingMarketWrap {
		position: relative;
		width: 100vw;
		height: 100vh;
		background-color: rgba(139, 203, 244, 1);
		
		
		
		.topWrap {
			position: absolute;
			top: 33vw;
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
			
			.sent {
				position: absolute;
				right: 23vw;
				top: 2vw;
				width: 16vw;
				height: 8vw;
				line-height: 7.5vw;
				text-align: center;
				border-radius: 5vw;
				background-color: rgba(70, 89,106, .14);
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
			top: 47vw;
			width: 100%;
			
			.tabs {
				position: absolute;
				width: 100%;
				display: flex;
				justify-content: space-between;
				background-color: rgba(70, 89,106,.14);
				padding: 3vw 0vw;
				border-radius: 4vw;
				color: aliceblue;
				font-weight: bold;
				
				.gemItem {
					.gemImg {
						display: inline;
						width: 10vw;
						height: 10vw;
						background: no-repeat center center / contain;
						margin-right: 1vw;
					}
					
					&:first-of-type>.gemImg {
						width: 11vw;
						height: 11vw;
					}
					
					&:last-of-type>.gemImg {
						width: 8vw;
						height: 8vw;
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
					height: 50vh;
					overflow-y: auto;
					
					.tip {
						margin-top: 5vw;
						width: 88%;
						text-align: center;
						color: aliceblue;
					}
					
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
						
						.numWrap {
							display: flex;
							width: 36vw;
							margin-left: -2vw;
							.gemImg {
								width: 8vw;
								height: 8vw;
								margin-right: 2vw;
								background: no-repeat center center / contain;
							}
						}
						
						.priceWrap {
							display: flex;
							margin-left: -2vw;
							.priceImg {
								margin-right: 2vw;
								width: 6vw;
								height: 6vw;
								background: url('../../static/market/jewel.png') no-repeat center center / contain;
							}
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
						
						.cancelButton {
							position: absolute;
							right: 23vw;
							top: 3vw;
							width: 10vw;
							height: 6vw;
							line-height: 5vw;
							background: url('../../static/market/btn_Purple.png') no-repeat center center / contain;
							text-align: center;
							color: aliceblue;
							font-size: 2.7vw;
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
		
		.reload {
			position: absolute;
			bottom: 7vw;
			right: 5vw;
			width: 10vw;
			height: 10vw;
			background: url("../../static/market/reload.png") no-repeat center center / contain;
			
			.text {
				position: absolute;
				width: 100%;
				text-align: center;
				bottom: -4vw;
				font-size: 3vw;
				font-weight: bold;
			}
		}
	}
</style>
