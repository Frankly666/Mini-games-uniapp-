<template>
	<view class="activateWrap">
		<view class="board">
			<view class="close" @click="closePop"></view>
			<view class="title">
				<text>添加</text>
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
				<view class="max" @click="() => {handleSellNum(true)}">
					<text>最大</text>
				</view>
			</view>
			
			<view class="tip" >
				<view class="own item">
					<text>我的{{gemItems[selectIndex]}}</text>
					<view class="itemImg" :style="`background-image: url(${getGemImg(gemImgName[selectIndex])});`"></view>
					<text>{{gameInfo.assets[gemImgName[selectIndex]] | 0}}</text>
				</view>
				<view class="obtain item">
					<text>预计日产出</text>
					<view class="itemImg" :style="`background-image: url(${getGemImg('resourceStone')});`"></view>
					<text>{{0}}</text>
				</view>
			</view>
			
			<view class="confirmBtn">
				<text>确认添加</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
import { useGameInfoStore } from '../stores/gameInfo';
	
	const props = defineProps(["closePop"])
	const selectIndex = ref(0)
	const gemItems = ['金刚石']
	const gemImgName = ['diamond', 'meteorite']
	const inputNumValue = ref(0)
	const gameInfo = useGameInfoStore();
	
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
	
	function handleIndex(index) {
		selectIndex.value = index;
	}
	function getGemImg(item) {
		return `../../static/market/${item}.png`
	}
</script>

<style lang="less">
	.activateWrap {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
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
				display: flex;
				justify-content: left;
				width: 90%;
				box-sizing: border-box;
				padding: 0 5vw;
				
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
			
			.tip {
				position: absolute;
				width: 90%;
				height: 7vw;
				bottom: 33vw;
				display: flex;
				justify-content: space-between;
				font-size: 3.8vw;
				padding: 0 5vw;
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
					
					&.obtain {
						.itemImg {
							width: 7vw;
							height: 7vw;
						}
					}
				}
			}
			
			.confirmBtn {
				position: absolute;
				bottom: 11vw;
				width: 28vw;
				height: 15vw;
				text-align: center;
				color: aliceblue;
				line-height: 14vw;
				font-size: 4.2vw;
				background: url('../static/market/btn_Purple.png') no-repeat center center / contain;
			}
		} 
	}
</style>