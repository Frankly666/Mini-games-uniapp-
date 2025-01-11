<template>
	<view class="publishWrap">
		<view class="board">
			<view class="close" @click="() => {controlPublish(false)}"></view>
			
			<view class="title">
				<text>发布{{title}}</text>
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
				<view class="max" v-if="isSell" @click="() => {handleSellNum(true)}">
					<text>最大</text>
				</view>
			</view>
			
			<!-- 单价 -->
			<view class="price" >
				<text v-if="isSell">出售最低单价: {{minimumPrice[gemImgName[selectIndex]]}}个</text>
				<text v-else>求购最低单价: {{minimumPrice[gemImgName[selectIndex]]}}个</text>
				<view class="gemImg" :style="`background-image: url(${getGemImg('jewel')});`"></view>
				<view class="priceInputWrap">
					<input type="digit" :value="inputPriceValue" @input="(res) => {setPriceValue(res.detail.value)}"/>
				</view>
			</view>
			
			<view class="wran">
				<text v-show="isShowWran">(请输入限制范围内的单价)</text>
				<text v-show="isShowNotEnough&&isSell">({{gemItems[selectIndex]}}不足)</text>
				<text v-show="isShowNotEnough&&!isSell">(宝石余额不足)</text>
			</view>
			
			<view class="tip" >
				<view class="own item" v-if="isSell">
					<text>可出售</text>
					<view class="itemImg" :style="`background-image: url(${getGemImg(gemImgName[selectIndex])});`"></view>
					<text>{{gameInfo.assets[gemImgName[selectIndex]] | 0}}</text>
				</view>
				<view class="premium item" v-if="isSell">
					<text>手续费</text>
					<view class="itemImg" :style="`background-image: url(${getGemImg('jewel')});`"></view>
					<text>5%</text>
				</view>
				<view class="obtain item" v-if="isSell">
					<text>预获得</text>
					<view class="itemImg" :style="`background-image: url(${getGemImg('jewel')});`"></view>
					<text>{{expectedNum}}</text>
				</view>
				<view class="needPowerStone item" v-if="!isSell">
					<text>需要扣除</text>
					<view class="itemImg" :style="`background-image: url(${getGemImg('jewel')});`"></view>
					<text>{{needPowerStoneNum}}</text>
				</view>
			</view>
			
			<view class="confirmBtn" @click="confirmFun">
				<text>确认发布</text>
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
	const props = defineProps(['controlPublish', 'title', 'gemItems', 'gemImgName', 'updateData'])
	const selectIndex = ref(0)
	const inputNumValue = ref(0)
	const inputPriceValue = ref(0)
	const isShowNotEnough = ref(false)
	const minimumPrice ={
		'diamond': 2,
		'resourceStone': 0.33,
		'powerStone': 1
	}
	
	
	const expectedNum = computed(() => {
		if(inputPriceValue.value < 0.2 || inputPriceValue.value > 10) return 0
		 const product = inputNumValue.value * inputPriceValue.value * 0.95;
		 return roundToOneDecimal(product)
	})
	
	const needPowerStoneNum = computed(() => {
		if(inputPriceValue.value < 0.2 || inputPriceValue.value > 10) return 0
		return roundToOneDecimal(inputNumValue.value * inputPriceValue.value)
	})
	const isShowWran = computed(() => {
		return (inputPriceValue.value < minimumPrice[props.gemImgName[selectIndex.value]])
	})
	const isSell = computed(() => {
		return props.title === '出售'
	})
	const confirmFun = computed(() => {
		return props.title === '出售' ? confirmSellPublish :  confirmNeedPublish
	})
	
	function getGemImg(item) {
		return `../../static/market/${item}.png`
	}
	function handleIndex(index) {
		selectIndex.value = index
		
		// 切换矿石时需要重置提示信息
		inputNumValue.value = 0
		inputPriceValue.value = 0
		isShowNotEnough.value = false
	}
	function setPriceValue(price) {
		inputPriceValue.value = price
	}
	function setNumValue(num) {
		inputNumValue.value = num
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
	
	// 发布出售逻辑操作
	async function confirmSellPublish() {
		
		if(inputPriceValue.value < minimumPrice[props.gemImgName[selectIndex.value]]) {
			showTips("单价不满足要求")
			return
		};
		if(inputNumValue.value > gameInfo.assets[props.gemImgName[selectIndex.value]]) {
			isShowNotEnough.value = true
			showTips("余额不足")
			return;
		}
		const gemType = props.gemImgName[selectIndex.value]
		uni.showLoading({
			title: '发布中',
			mask:true
		})
		
		// 后端数据操作逻辑
		uniCloud.callFunction({
			name:"sellPublish",
			data:{
				addData: {
					sellerId: uni.getStorageSync('id'),
					demType: gemType,
					sellNum: parseInt(inputNumValue.value),
					sellPrice: parseFloat(inputPriceValue.value),
					isFinished: false,
					publishTime: new Date()
				},
				inputNumValue: inputNumValue.value,
				userId: uni.getStorageSync('id')
			}
		}).then(res => {
			if(res) {
				gameInfo.assets[gemType] -= inputNumValue.value;
				props.controlPublish(false)
				props.updateData()
				uni.hideLoading()
			}else {
				netWorkError()
			}
		})
	}
	
	// 发布求购的逻辑操作
	async function confirmNeedPublish() {
		if(inputPriceValue.value < minimumPrice[props.gemImgName[selectIndex.value]]) {
			showTips("单价不符合要求")
			return
		};
		const gemType = props.gemImgName[selectIndex.value]
		const totalPrice = roundToOneDecimal(inputNumValue.value * inputPriceValue.value)
		
		if(totalPrice > gameInfo.assets[JEWEL]) {
			isShowNotEnough.value = true;
			showTips("余额不足")
			return
		}
		uni.showLoading({
			title: '发布中',
			mask: true
		})
		
		// 求购后端逻辑操作
		uniCloud.callFunction({
			name:"needPublish",
			data:{
				addData: {
					buyerId: uni.getStorageSync('id'),
					demType: gemType,
					buyNum: parseInt(inputNumValue.value),
					buyPrice: parseFloat(inputPriceValue.value),
					isFinished: false,
					publishTime: new Date()
				},
				totalPrice: totalPrice,
				userId: uni.getStorageSync('id')
			}
		}).then(res => {
			if(res) {
				gameInfo.assets[JEWEL] =  roundToOneDecimal(gameInfo.assets[JEWEL] - totalPrice ) ;
				props.controlPublish(false)
				props.updateData()
				uni.hideLoading()
			}else {
				netWorkError()
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
			height: 104vw;
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
			
			.price {
				position: absolute;
				top: 55.3vw;
				display: flex;
				align-items: center;
				border-radius: 3vw;
				width: 81%;
				height: 12vw;
				padding: 0 1.6vw;
				box-sizing: border-box;
				background-color: rgba(0, 0, 0, .1);
				font-size: 3.5vw;
				
				.gemImg {
					margin: 0 2vw;
					width: 6vw;
					height: 6vw;
					background: url('../static/market/powerStone.png') no-repeat center center / contain;
					
				}
				
				.priceInputWrap {
					width: 16vw;
					height: 8vw;
					line-height: 8vw;
					text-align: center;
					border-radius: 3vw;
					background-color: #fff;
					border: black 1px solid;
					
					input {
						display: block;
						text-align: center;
						width: 100%;
						height: 100%;
					}
				}
			}
			
			.wran {
				position: absolute;
				bottom: 30vw;
				color: red;
				font-size: 3vw;
				font-weight: normal;
			}
			
			.tip {
				position: absolute;
				width: 90%;
				height: 7vw;
				bottom: 22vw;
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
				
				.own {
					img {
						
					}
				}
			}
			
			.confirmBtn {
				position: absolute;
				bottom: 10vw;
				width: 24vw;
				height: 10vw;
				text-align: center;
				color: aliceblue;
				line-height: 10vw;
				font-size: 3.4vw;
				background: url('../static/market/btn_Purple.png') no-repeat center center / contain;
			}
		}
	
	}
</style>