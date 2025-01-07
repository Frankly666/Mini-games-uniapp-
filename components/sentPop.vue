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
			
			<!-- 受赠者电话 -->
			<view class="sentPhone">
				<view class="phoneInputWrap">
					<input 
						type="number" 
						:value="phoneInputValue" 
						placeholder="请输入赠送对象电话" 
						@input="res => {setPhoneNumValue(res.detail.value)}"
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
	import { netWorkError, showTips } from '../utils/error';
	
	const gameInfo = useGameInfoStore()
	const props = defineProps(['closePop', 'title', 'gemItems', 'gemImgName', 'updateData'])
	const selectIndex = ref(0)
	const inputNumValue = ref(0)
	const phoneInputValue = ref(null)
	const premium = 0.08;
	
	
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
	function setPriceValue(price) {
		inputPriceValue.value = price
	}
	function setNumValue(num) {
		inputNumValue.value = num
	}
	function setPhoneNumValue(num) {
		phoneInputValue.value = num
	}
	
	// 处理加减数量以及设置最大值
	function handleSellNum(num){
		const max = gameInfo.assets[props.gemImgName[selectIndex.value]] | 0
		if(num === true) {
			inputNumValue.value = max
			return
		}
		const tem = inputNumValue.value + num;
		if(tem < 0) return;
		if(tem > max && isSell.value) return;
		inputNumValue.value += num;
	}
	
	
	
	// 发布求购的逻辑操作
	async function confirmFun() {
		const gemType = props.gemImgName[selectIndex.value]
		
		if(needPowerStoneNum.value > gameInfo.assets[gemType] || inputNumValue.value < 0) {
			showTips("转赠数量有误")
			return
		}
		if(phoneInputValue.value < 999999999 || phoneInputValue.value > 99999999999) {
			showTips("号码格式有误")
			return
		}
		
		uni.showLoading({
			title: '转赠中',
			mask: true
		})
		
		// 求购后端逻辑操作
		uniCloud.callFunction({
			name:"sentAssets",
			data:{
				phone: phoneInputValue.value,
				userId: gameInfo.id,
				assetsType: gemType,
				sendNum: inputNumValue.value,
				premium: premium
			}
		}).then(res => {
			if(res.result > 0) {
				gameInfo.assets[gemType] =  roundToOneDecimal(gameInfo.assets[gemType] - needPowerStoneNum.value) ;
				props.closePop()
				uni.hideLoading()
			}else {
				if(res.result === -1) {
					showTips("未找到该用户")
				}else if(res.result === -2) {
					showTips("不能给自己转赠")
				}
			}
		})
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
			height: 57vh;
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

			
			.sentPhone {
				position: absolute;
				top: 58vw;
				display: flex;
				align-items: center;
				width: 85%;
				height: 8vw;
				padding: 0 4vw;
				box-sizing: border-box;
				
				.phoneInputWrap {
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
				bottom: 24vw;
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
				bottom: 11vw;
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