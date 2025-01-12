<template>
	<view class="publishWrap">
		<view class="board">
			<view class="close" @click="closePop"></view>
			
			<view class="title">
				<text>转赠</text>
			</view>
			
			<view class="gems">
				<view class="gemItem" v-for="(item,index) in gemItems">
					<view 
						:class="{'imgWrap': true, 'active': index === selectIndex}" 
						@click="() => {handleIndex(index)}" 
						>
						<view class="gemImg" :style="`background-image: url(${getGemImg(gemImgName[index])});`"></view>
					</view>
					<view class="name">
						<text>{{item}}</text>
					</view>
				</view> 
			</view>
			
			<view class="publishNum">
				<view class="sub" @click="() => {handleSellNum(-1)}"></view>
				<view class="inputWrap">
					<input type="number" :value="inputNumValue" @input="res => {setNumValue(res.detail.value)}"/>
				</view>
				<view class="add" @click="() => {handleSellNum(1)}"></view>
				<view class="max"  @click="() => {handleSellNum(true)}">
					<text>最大</text>
				</view>
			</view>
			
			<!-- 受赠者gameID -->
			<view class="sentGameID">
				<view class="gameIDInputWrap">
					<input 
						type="text" 
						:value="gameIDInputValue" 
						placeholder="请输入赠送对象游戏ID" 
						@input="res => {setGameIDValue(res.detail.value)}"
					/>
				</view>
			</view>
			
			<view class="tip" >
				<view class="premium item">
					<text>手续费</text>
					<view class="itemImg" :style="`background-image: url(${getGemImg(gemImgName[selectIndex])});`"></view>
					<text>{{premium*100}}%</text>
				</view>
				<view class="needPowerStone item">
					<text>最终需要扣除</text>
					<view class="itemImg" :style="`background-image: url(${getGemImg(gemImgName[selectIndex])});`"></view>
					<text>{{needPowerStoneNum}}</text>
				</view>
			</view>
			
			<view class="confirmBtn" @click="confirmFun">
				<text>确认转赠</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, onMounted, ref } from 'vue';
	import { JEWEL, POWERSTONE, useGameInfoStore } from '../stores/gameInfo';
	import { roundToOneDecimal } from '../utils/roundToOneDecimal';
	import { netWorkError, showSuccus, showTips } from '../utils/error';
import { getUserAssets } from '../utils/updateGameInfo';
	
	const gameInfo = useGameInfoStore()
	const props = defineProps(['closePop', 'title','updateData'])
	const selectIndex = ref(0)
	const inputNumValue = ref(0)
	const gameIDInputValue = ref(null)
	const premium = 0.08;
	const gemItems = ['能量石']
	const gemImgName = ['powerStone']
	
	
	// 需要扣除的手续费
	const needPowerStoneNum = computed(() => {
		if(inputNumValue.value <= 0) return 0
		return roundToOneDecimal(inputNumValue.value * (1 + premium))
	})
	
	function getGemImg(item) {
		return `../../static/market/${item}.png`
	}
	function handleIndex(index) {
		selectIndex.value = index
		
		// 切换矿石时需要重置提示信息
		inputNumValue.value = 0
	}
	function setNumValue(num) {
		inputNumValue.value = num
	}
	function setGameIDValue(gameID) {
		gameIDInputValue.value = gameID
	}
	
	// 处理加减数量以及设置最大值
	function handleSellNum(num){
		const max = gameInfo.assets[gemImgName[selectIndex.value]] | 0
		if(num === true) {
			inputNumValue.value = max
			return
		}
		const tem = inputNumValue.value + num;
		if(tem < 0) return;
		if(tem > max && isSell.value) return;
		inputNumValue.value += num;
	}
	
	
	
	// 转赠的逻辑操作
	async function confirmFun() {
	  const gemType = gemImgName[selectIndex.value];
	
	  // 检查转赠数量是否合法
	  if (inputNumValue.value <= 0) {
	    showTips('转赠数量有误');
	    return;
	  }
	
	  // 检查余额是否足够
	  if (needPowerStoneNum.value > gameInfo.assets[gemType]) {
	    showTips('余额不足!');
	    return;
	  }
	
	  // 检查是否输入了 gameID
	  if (!gameIDInputValue.value) {
	    showTips('请输入 gameID');
	    return;
	  }
	
	  // 显示加载中提示
	  uni.showLoading({
	    title: '转赠中',
	    mask: true,
	  });
	
	  try {
	    // 调用云函数进行转赠操作
	    const res = await uniCloud.callFunction({
	      name: 'sentAssets',
	      data: {
	        gameID: gameIDInputValue.value,
	        userId: uni.getStorageSync('id'),
	        assetsType: gemType,
	        sendNum: inputNumValue.value,
	        premium: premium,
	      },
	    });
	
	    console.log('云函数返回结果:', res.result);
	
	    // 处理云函数返回结果
	    if (res.result.code === 1) {
	      // 更新本地资产数量
	      getUserAssets()
				
	      // 显示转赠成功提示
	      showSuccus('转赠成功!');
	      // 关闭弹窗
	      props.closePop();
	    } else {
	      let errorMessage = '转赠失败，请重试';
	      switch (res.result.code) {
	        case -1:
	          errorMessage = '未找到该用户';
	          break;
	        case -2:
	          errorMessage = '不能给自己转赠';
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
	      showTips(errorMessage);
	    }
	  } catch (err) {
	    // 捕获异常并显示错误提示
	    console.error('转赠失败:', err);
	    showTips('转赠失败，请重试');
	  } finally {
	    // 无论成功或失败，都隐藏加载中提示
	    uni.hideLoading();
	  }
	}
	
</script>

<style lang="less">
	.publishWrap {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99;
		width: 100vw;
		height: 100vh;
		font-weight: bold;
		background-color: rgba(0, 0, 0, .7);
		
		.board {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 87vw;
			height: 106vw;
			background: url('../static/market/table.png') no-repeat center center / contain;
			
			.close {
				position: absolute;
				top: 1vw;
				right: 2vw;
				width: 12vw;
				height: 12vw;
				background: url('../static/market/lamb-close.png') no-repeat center center / contain;
			}
			
			.title {
				position: absolute;
				top: 12vw;
				width: 40vw;
				font-size: 5vw;
				text-align: center;
			}
			
			.gems {
				position: absolute;
				top: 21vw;
				left: 10vw;
				display: flex;
				width: 100%;
				
				.gemItem {
					margin-right: 3vw;
					font-size: 3.5vw;
					text-align: center;
					
					.imgWrap {
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 3vw;
						width: 12vw;
						height: 12vw;
						margin-right: 2vw;
						box-sizing: border-box;
						
						
						&.active {
							background-color: rgba(0, 0, 0, .5);
							border: greenyellow 1px solid;
						}
						
						.gemImg {
							width: 9vw;
							height: 9vw;
							background: no-repeat center center / contain;
						}
					}
					
					.name {
						margin-top: 2vw;
						padding-right: 1.4vw;
					}
				}
			}
			
			.publishNum {
				position: absolute;
				top: 42vw;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-radius: 3vw;
				width: 81%;
				height: 12vw;
				padding: 0 3vw;
				box-sizing: border-box;
				background-color: rgba(0, 0, 0, .1);
				
				.add {
					width: 7vw;
					height: 7vw;
					background: url('../static/market/add_btn.png') no-repeat center center / contain;
				}
				
				.sub {
					width: 7vw;
					height: 7vw;
					background: url('../static/market/sub_btn.png') no-repeat center center / contain;
				}
				
				.max {
					margin-left: 2.7vw;
					width: 9vw;
					height: 7vw;
					font-size: 3vw;
					text-align: center;
					line-height: 6vw;
					color: #863f10;
					background: url('../static/market/btn_frame.png') no-repeat center center / contain;
				}
				
				.inputWrap {
					flex: 1;
					margin: 0 3vw;
					height: 9vw;
					line-height: 9vw;
					text-align: center;
					border-radius: 3vw;
					background-color: #fff;
					border: black 1px solid;
					
					input  {
						width: 100%;
						height: 100%;
					}
				}
			}

			
			.sentGameID {
				position: absolute;
				top: 58vw;
				display: flex;
				align-items: center;
				width: 85%;
				height: 8vw;
				padding: 0 4vw;
				box-sizing: border-box;
				
				.gameIDInputWrap {
					width: 100%;
					height: 100%;
					background-color: #fff;
					border: black 1px solid;
					text-align: center;
					border-radius: 3vw;
					
					input {
						width: 100%;
						height: 100%;
					}
				}
			}
			
			.tip {
				position: absolute;
				width: 90%;
				height: 7vw;
				top: 69vw;
				display: flex;
				justify-content: space-between;
				font-size: 3.1vw;
				padding: 0 3vw;
				box-sizing: border-box;
				
				.item {
					display: flex;
					align-items: center;
										
					.itemImg {
						width: 4vw;
						height: 4vw;
						background: no-repeat center center / contain;
						margin: 0 1vw;
					}
				}
			}
			
			.confirmBtn {
				position: absolute;
				top: 78vw;
				width: 25vw;
				height: 12vw;
				text-align: center;
				color: aliceblue;
				line-height: 10vw;
				font-size: 4vw;
				background: url('../static/market/btn_Purple.png') no-repeat center center / contain;
			}
		}
	
	}
</style>