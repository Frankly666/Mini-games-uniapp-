<template>
	<view class="tradingMarketWrap">		
		<view class="return" @click="back"></view>
		<view class="reload" @click="updateData">
			<text class="text">刷新</text>
		</view>

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

						<!-- 新增：取消按钮 -->
						<view 
							v-if="(marketCurrentIndex === 0 && item.sellerId === userId) || (marketCurrentIndex === 1 && item.buyerId === userId)"
							class="cancelButton" 
							@click="() => {handleCancel(item)}"
						>
							<text>取消</text>
						</view>
					</view>
					<view class="tips" v-if="showListData?.length === 0">
						<text>{{tips}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 确认弹窗 -->
		<view v-if="showConfirmModal" class="confirmModal">
			<view class="modalContent">
				<text class="modalTitle">确认取消</text>
				<text class="modalText">您确定要撤销这条记录吗？\n操作后将返还你的资源</text>
				<view class="modalButtons">
					<view class="modalButton cancel" @click="closeConfirmModal">取消</view>
					<view class="modalButton confirm" @click="confirmCancel">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, onMounted, ref } from 'vue'
	import myPublishListVue from '../components/myPublishList.vue';
	import { formatLargeNumber } from '../utils/formatLargeNumber'
	import { JEWEL, useGameInfoStore } from '../stores/gameInfo';
	import { roundToOneDecimal } from '../utils/roundToOneDecimal';
	import { getUserAssets } from '../utils/updateGameInfo';
	import { addAssetsChangeRecord, assetsNameMap } from '../utils/addAssetsChangeRecord ';
	import { showTips } from '../utils/error';
	import { checkTradingRequrementAssets } from '../utils/checkTradingRequrementAssets';

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
	const isShowMyPublishPop = ref(false);
	const userId = uni.getStorageSync('id')
	const gameInfo = useGameInfoStore()
	const props = defineProps(["close","updateOutData"])
	const tips = ref('加载中...')
	const showConfirmModal = ref(false) // 控制确认弹窗显示
	const cancelItem = ref(null) // 存储当前要取消的项

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
		updateData()
	}
	
	function setMarketIndex(index) {
		marketCurrentIndex.value = index
		updateData()
	}
	
	function back() {
		props.close();
	}
	
	function getGemImg(item) {
		return `../../static/market/${item}.png`
	}
	
	async function updateData() {
		tips.value='加载中'
		uni.showLoading({
			title: "加载中..."
		})
		const itemName = gemImgName[itemCurrentIndex.value]
		if(marketCurrentIndex.value === 0) {
			const res1 = await marketDB.selectMySellRequirement(userId, itemName);
			sellRequirement.value[itemName] = res1.data
			if(res1.data.length === 0) tips.value = '暂无发布'
		}else {
			const res2 = await marketDB.selectMyBuyRequirement(userId, itemName);
			buyRequirement.value[itemName] = res2.data
			if(res1.data.length === 0) tips.value = '暂无发布'
		}
		uni.hideLoading()
	}
	
	// 打开确认弹窗
	function handleCancel(item) {
		cancelItem.value = item
		showConfirmModal.value = true
	}
	
	// 关闭确认弹窗
	function closeConfirmModal() {
		showConfirmModal.value = false
		cancelItem.value = null
	}
	
	// 确认取消操作
	async function confirmCancel() {
		if (!cancelItem.value) return
		
		try {
			uni.showLoading({
				title: '处理中...',
				mask: true,
			})
			
			const params = {
				userId: uni.getStorageSync('id'),
				recordId: cancelItem.value._id,
				resourceType: cancelItem.value.gemType,
				resourceAmount: marketCurrentIndex.value === 0 ? cancelItem.value.sellNum : cancelItem.value.buyNum,
				price: marketCurrentIndex.value === 0 ? cancelItem.value.sellPrice : cancelItem.value.buyPrice,
				type: marketCurrentIndex.value,
			}
			
			const result = await uniCloud.callFunction({
				name: 'cancelTradeRequirement',
				data: params,
			})
			
			uni.hideLoading()
			
			if (result.result.code === 0) {
				uni.showToast({
					title: '取消成功',
					icon: 'success',
					duration: 2000,
				})
				
				getUserAssets()
				
				if (marketCurrentIndex.value === 0) {
					addAssetsChangeRecord(
						uni.getStorageSync('id'),
						cancelItem.value.gemType,
						cancelItem.value.sellNum,
						`出售市场中取消出售${assetsNameMap[cancelItem.value.gemType]}(单价${cancelItem.value.sellPrice}), 退回: `
					)
				} else {
					addAssetsChangeRecord(
						uni.getStorageSync('id'),
						JEWEL,
						roundToOneDecimal(cancelItem.value.buyNum * cancelItem.value.buyPrice),
						`求购市场中取消求购${assetsNameMap[cancelItem.value.gemType]}(单价${cancelItem.value.buyPrice}), 退回: `
					)
				}
				
				await updateData()
				props.updateOutData()
			} else if (result.result.code === -2) {
				showTips("请刷新同步数据")
			} else if(result.result.code === -3) {
				showTips('该条记录已经被取消请刷新')
			} else {
				uni.showToast({
					title: '取消失败：请刷新',
					icon: 'none',
					duration: 3000,
				})
			}
		} catch (err) {
			uni.hideLoading()
			uni.showToast({
				title: '取消失败：' + err.message,
				icon: 'none',
				duration: 3000,
			})
		} finally {
			closeConfirmModal()
		}
	}
	
	onMounted(async () => {
		await updateData()
	})
</script>

<style lang="less">
	.tradingMarketWrap {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-color: rgba(139, 203, 244, 1);
		z-index: 9999;
		
		.topWrap {
			position: absolute;
			top: 2vh;
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
						background: url('../static/assetsHeader/marketBg.png') no-repeat center center /cover;
					}
				}
			}
		}
		
		.gemstones {
			position: absolute;
			top: 10vh;
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
				box-sizing: border-box;
				
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
				height: 70vh;
				font-weight: bold;
				font-size: 3.6vw;
				box-sizing: border-box;
				
				.content {
					width: 100%;
					height: 100%;
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
						width: 100%;
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
								background: url('../static/market/jewel.png') no-repeat center center / contain;
							}
						}
										
						.button {
							position: absolute;
							right: 3vw;
							bottom: 1vw;
							width: 19vw;
							height: 10vw;
							background: url('../static/market/btn_Blue1.png') no-repeat center center / contain;
							line-height: 8.7vw;
							text-align: center;
							color: aliceblue;
						}
						
						.cancelButton {
							position: absolute;
							right: 4vw;
							top: 3vw;
							width: 14vw;
							height: 7vw;
							line-height: 7vw;
							background: url('../static/market/btn_Purple.png') no-repeat center center / contain;
							text-align: center;
							color: aliceblue;
							font-size: 2.7vw;
						}
					}
				}
				
				.tips {
					width: 100%;
					text-align: center;
					color: aliceblue;
					font-size: 4vw;
					margin-top: 4vw;
				}
			}
		}
		
		.return {
			position: absolute;
			bottom: 5vw;
			left: 5vw;
			width: 13vw;
			height: 13vw;
			background: url("../static/market/return.png") no-repeat center center / contain;
		}
		
		.reload {
			position: absolute;
			bottom: 7vw;
			right: 5vw;
			width: 10vw;
			height: 10vw;
			background: url("../static/market/reload.png") no-repeat center center / contain;
			
			.text {
				position: absolute;
				width: 100%;
				text-align: center;
				bottom: -4vw;
				font-size: 3vw;
				font-weight: bold;
			}
		}
	
		.myPublish {
			position: absolute;
			bottom: 7vw;
			right: 25vw;
			width: 15vw;
			height: 10vw;
			background: url('../static/ground/record.png') no-repeat center center / contain;
			
			text {
				position: absolute;
				width: 100%;
				text-align: center;
				bottom: -4vw;
				font-size: 3vw;
				font-weight: bold;
			}
		}

		/* 确认弹窗样式 */
		.confirmModal {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 10000; /* 确保弹窗在最上层 */
		}

		.modalContent {
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: #fff;
			padding: 5vw;
			border-radius: 5vw;
			width: 80%;
			text-align: center;
		}

		.modalTitle {
			font-size: 4vw;
			font-weight: bold;
			margin-bottom: 3vw;
		}

		.modalText {
			font-size: 3.6vw;
			margin-bottom: 5vw;
		}

		.modalButtons {
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 8vw;
		}

		.modalButton {
			padding: 3vw 8vw;
			border-radius: 2vw;
			cursor: pointer;
		}

		.modalButton.cancel {
			background-color: #ccc;
			color: #000;
		}

		.modalButton.confirm {
			background-color: green;
			color: #fff;
		}
	}
</style>