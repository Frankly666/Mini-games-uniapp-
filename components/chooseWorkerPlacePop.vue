<template>
	<view class="chooseWorkerPlaceWrap">
		<view class="chooseboard">
			<view class="chooseclose" @click="closePop"/>
			
			<view class="chooseTitle">
				请选择所工作土地类型
			</view>
			<view class="wrap1">
				<view class="innerWrap" v-for="item in 5">
					<view class="itemWrap" v-if="judgeHaveThisGround(item)">
						<view class="groundImg" :style=" `background-image: url(../static/ground/ground${item}.png);`"></view>
						<view class="groundDesc">
							<view class="groundName">
								{{gameInfo.groundsMeta[item].groundName}}
							</view>
							<view class="groundPrice">
								每日产出{{gameInfo.groundsMeta[item].dailyEarnings}}金刚石
							</view>
						</view>
						<view 
							@click="selectIndex=item"
							class="select" 
							:style=" `background-image: url(${selectIndex === item ? selectImg : unselectImg});`" 
						/>
					</view> 
				</view>
			</view>
			<view class="retireBtn" @click="confirmRetire">
				确认招募
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, ref } from 'vue';
	import { POWERSTONE, useGameInfoStore } from '../stores/gameInfo';
	import {roundToOneDecimal} from '../utils/roundToOneDecimal';
	import {findEmptyGround} from '../utils/findEmptyGround.js'
	import {getWorkerEndTime} from "../utils/getWorkerEndTime.js"
	import {updateOwnGrounds} from "../utils/updateOwnGrounds.js"
	import { netWorkError, showTips } from '../utils/error';
	
	const props = defineProps(["closePop", "workerType"])
	const gameInfo = useGameInfoStore()
	const selectImg = "../static/ground/select.png" 
	const unselectImg = "../static/ground/unselect.png"
	const selectIndex = ref(0)
	const workerPrice = gameInfo.workersMeta[props.workerType].retainerPrice;
	
	// 用户当前拥有的地皮种类判断
	function judgeHaveThisGround(type) {
		const list = Object.keys(gameInfo.ownGrounds)
		let flag = false;
		
		// 遍历判断当前类型的地皮中是否存在无工人工作的地皮
		for(let item of list) {
			if(item == type) {
				const temList = gameInfo.ownGrounds[item];
				for(let ground of temList) {
					if(!ground.isHaveWorker){
						flag = true;
						break;
					}
				}
				if(flag === true) break;
			}
		}
		
		// 小地皮是本来就有的
		return flag;
	}
	
	
	// 确认招募的逻辑函数
	function confirmRetire() {
		const nowNum = gameInfo.assets[POWERSTONE];
		// 余额不足
		if(nowNum < workerPrice) {
			showTips("余额不足")
			return;
		}
		
		if(selectIndex.value < 1) {
			showTips("请选择地皮")
			return;
		}
		
		uni.showLoading({
			mask: true,
			title: "招聘中..."
		})
		
		// 数据库操作逻辑
		uniCloud.callFunction({
			name:"hireWorker",
			data: {
				userId: uni.getStorageSync('id'),
				hirePrice: workerPrice,
				workerType: props.workerType,
				groundType: selectIndex.value,
				groundIndex: findEmptyGround(selectIndex.value),
				workerEndTime: getWorkerEndTime(props.workerType)
			}
		}).then(res => {
			if(res){
				props.closePop()
				updateOwnGrounds()
				const nowNum = gameInfo.assets[POWERSTONE];
				gameInfo.assets[POWERSTONE] = roundToOneDecimal(nowNum - workerPrice)
				uni.hideLoading()
			}else {
				netWorkError()
			}
		})
	}
</script>

<style lang="less">
	.chooseWorkerPlaceWrap {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 999;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, .7);
		
		.chooseboard {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			top: -7vw;
			left: 2vw;
			width: 78vw;
			height: 60vw;
			font-weight: bold;
			background: url(../static/ground/board.png) no-repeat center center /contain;
			
			.chooseclose {
				position: absolute;
				right: 1vw;
				top: -2vw;
				width: 10vw;
				height: 10vw;
				background: url(../static/ground/close.png) no-repeat center center /contain;
			}
			
			.chooseTitle {
				position: relative;
				top: 3vw;
				left: -1vw;
				width: 70%;
				font-size: 4vw;
				text-align: center;
				border-radius: 5vw;
				padding: .3vw 0;
				// background-color: rgba(207, 179, 115, 1) ;
				color: rgb(115, 58, 9);
			}
			
			.wrap1 {
				position: absolute;
				top: 10vw;
				left: -.7vw;
				display: flex;
				flex-direction: column;
				width: 97%;
				height: 45vw;
				padding: 0 3vw;
				box-sizing: border-box;
				overflow: auto;
				
				.itemWrap {
					display: flex;
					align-items: center;
					width: 100%;
					height: 15vw;
					box-sizing: border-box;
					padding-left: 3vw;
					padding-right: 5vw;
					
					.groundImg {
						width: 12vw;
						height: 12vw;
						background: no-repeat center center /contain;
					}
					
					.groundDesc {
						flex: 1;
						display: flex;
						flex-direction: column;
						padding: 2vw 0;
						width: 40%;
						text-align: center;
						font-size: 3vw;
						
						.groundName {
							
						}
					}
					
					.select {
						width: 10%;
						height: 100%;
						background: url('../static/ground/btn2.png') no-repeat center center /contain;
					}
				} 
			}
		
			.retireBtn {
				position: absolute;
				text-align: center;
				line-height: 16vw;
				bottom: -21vw;
				width: 30vw;
				height: 17vw;
				color: aliceblue;
				background: url('../static/ground/btn2.png') no-repeat center center /contain;
			}
		}
	}
</style>