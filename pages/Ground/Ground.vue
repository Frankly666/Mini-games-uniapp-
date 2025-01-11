<template>
	<view class="groundWrap">
		<!-- 签到组件 -->
		<grond-sign-in-presentation-vue />
		
		<!-- 地皮购买弹窗 -->
		<buy-ground-pop-vue 
					v-if="isShowGroundPop" 
					:groundType="groundType" 
					:groundIndex="groundIndex"
					:closePop="() => {handleIsShowGroundPop(false)}"
					:updateData="updateData"
					/>
						
		<!-- 绝对定位 -->
		<assets-header :judge='2'></assets-header>
		<view class="return" @click="back"></view>
		
		<!-- 树木动图 -->
		<view class="treesWrap1">
			<view class="left">
				<view class="lTree1 item1"></view>
				<view class="lTree2 item1"></view>
				<view class="lTree3 item1"></view>
				<view class="lTree4 item1"></view>
				<view class="lTree5 item1"></view>
			</view>
		</view>
		<view class="treesWrap2">
			<view class="right">
				<view class="rTree1 item2"></view>
				<view class="rTree2 item2"></view>
				<view class="rTree3 item2"></view>
				<view class="rTree4 item2"></view>
				<view class="rTree5 item2"></view>
			</view>
		</view>
		
		<!-- 地皮 -->
		<view class="grounds">
			<view class="item small" v-for="item in 1">
				<view class="realGround type1">
					<view class="personWrap"  v-show="selectWorker(1, item)">
						<worker-vue :type="selectWorker(1, item)"  :delay="-item"></worker-vue>
					</view>
					<view class="lockGround" v-show="!judgeOwnThisGround(1, item)" @click="() => { clickLockGround(1, item)}">
						<view class="title">
							<text >{{gameInfo.groundsMeta[1].groundName}}</text>
						</view>
					</view>
				</view>
			</view>
									  
			
									    
			<view class="item big" v-for="item in 3">
				<view class="realGround type3">
					<view class="personWrap" v-show="selectWorker(3, item)">
						<worker-vue :type="selectWorker(3, item)" :delay="-item"></worker-vue>
					</view>
					<view class="lockGround" v-show="!judgeOwnThisGround(3, item)" @click="() => {clickLockGround(3, item)}">
						<view class="title">
							<text style="color: brown;">{{gameInfo.groundsMeta[3].groundName}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="item resource" v-for="item in 1">
				<view class="realGround type4">
					<view class="personWrap" v-show="selectWorker(4, item)">
						<worker-vue :type="selectWorker(4, item)" :delay="-item"></worker-vue>
					</view>
					<view class="lockGround" v-show="!judgeOwnThisGround(4, item)" @click="() => {clickLockGround(4, item)}">
						<view class="title">
							<text>{{gameInfo.groundsMeta[4].groundName}}</text>
						</view>
					</view>
				</view>
			</view>
									   
			<view class="item black" v-for="item in 1">
				<view class="realGround type5">
					<view class="personWrap" v-show="!!selectWorker(5, item)">
						<worker-vue :type="selectWorker(5, item)" :delay="-item"></worker-vue>
					</view>
					<view class="lockGround" v-show="!judgeOwnThisGround(5, item)" @click="() => {clickLockGround(5, item)}"> 
						<view class="title">
							<text style="color: black;">{{gameInfo.groundsMeta[5].groundName}}</text>
						</view>
					</view>
				</view>
			</view>
									   
			<view class="item diamond" v-for="item in 1">
				<view class="realGround type6">
					<view class="diamonds">
						<view class="d1 item"></view>
						<view class="d2 item"></view>
						<view class="d3 item"></view>
					</view>
					<view class="personWrap" v-show="selectWorker(6, item)">
						<worker-vue :type="selectWorker(6, item)" :delay="-item"></worker-vue>
					</view>
					<view class="lockGround" v-show="!judgeOwnThisGround(6, item)" @click="() => {clickLockGround(6, item)}">
						<view class="title">
							<text style="color: chocolate;">{{gameInfo.groundsMeta[6].groundName}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 资源地皮 -->
			<view class="item scarce" v-for="item in 19">
				<view class="realGround type2">
					<view class="personWrap"  v-show="selectWorker(2, item)">
						<worker-vue :type="selectWorker(2, item)" :delay="-item"></worker-vue>
					</view>
					<view class="lockGround" v-show="!judgeOwnThisGround(2, item)" @click="() => { clickLockGround(2, item)}">
						<view class="title">
							<text >{{gameInfo.groundsMeta[2].groundName}}</text>
						</view>
					</view>
				</view>
			</view>		 
			
		</view>
	
		<!-- 云朵 -->
		<view class="cloudsLeft clouds unlock">
			<view class="" v-for="item in 2">
				<view class="leftItem1 leftItem" />
				<view class="leftItem2 leftItem" />
			</view>
		</view>
		<view class="cloudsLeft clouds lock">
			<view class="" v-for="item in 10">
				<view class="leftItem1 leftItem" />
				<view class="leftItem2 leftItem" />
			</view>
		</view>
		<view class="cloudsRight clouds unlock">
			<view class="" v-for="item in 2">
				<view class="rightItem1 rightItem" />
				<view class="rightItem2 rightItem" />
			</view>
		</view>
		<view class="cloudsRight clouds lock">
			<view class="" v-for="item in 10">
				<view class="rightItem1 rightItem" />
				<view class="rightItem2 rightItem" />
			</view>
		</view>

	</view>
</template>

<script setup>
	import { onMounted, onUnmounted, ref } from 'vue';
	import assetsHeader from '../../components/assetsHeader.vue';
	import workerVue from '../../components/worker.vue';
	import buyGroundPopVue from '../../components/buyGroundPop.vue';
	import { useGameInfoStore } from '../../stores/gameInfo';
	import grondSignInPresentationVue from '../../components/grondSignInPresentation.vue';

	const groundType = ref(null)
	const groundIndex = ref(null);
	const isShowGroundPop = ref(false);
	const groundsDB = uniCloud.importObject('grounds');
	const gameInfo = useGameInfoStore();
	const userGrounds = ref(gameInfo.ownGrounds);
	function back() {
		uni.navigateBack({
			delta:1
		})
	}
	
	// if(!gameInfo.ownGrounds) await updateData()
	
	// 处理弹窗的函数
	function handleIsShowGroundPop(flag) {
		isShowGroundPop.value = flag;
	}
	
	// 点击地皮以及解锁逻辑
	async function clickLockGround(type, index) {
		// 弹窗然后给弹窗的组件确定传入的参数
		groundType.value = type
		groundIndex.value = index	
		handleIsShowGroundPop(true);
	} 
	
	// 用来判断用户是否拥有这个地皮
	function judgeOwnThisGround(type, index) {
		let flag = false
		const thisGrounds = userGrounds.value?.[type];
		if(thisGrounds) {
			for(let i = 0; i < thisGrounds.length; i ++ ) {
				const item = thisGrounds[i];
				if(item.groundIndex === index) {
					flag = true;
					break;
				}
			}
		}
		return flag;
	}
	
	// 用来判断该地皮是否有工人工作, 应该展现哪个工人进行工作
	function selectWorker(type, index) {
		const thisGrounds = gameInfo.ownGrounds?.[type];
		if(thisGrounds) {
			for(let i = 0; i < thisGrounds.length; i ++ ) {
				const item = thisGrounds[i];
				if(item.groundIndex === index) {
					return item.workerType
				}
			}
		}
		return false;
	}
	
	async function updateData() {
	  try {
	    const userId = uni.getStorageSync('id');
	    if (!userId) {
	      console.error('用户 ID 为空');
	      return;
	    }
	
	    // 调用云函数
	    const res = await uniCloud.callFunction({
	      name: 'selectUserGrounds', // 云函数名称
	      data: { userId } // 传入参数
	    });
	
	    console.log('云函数返回结果:', res); // 打印云函数返回结果
	
	    if (res.result.code === 0) {
	      const classifyGrounds = res.result.data;
	      userGrounds.value = classifyGrounds;
	      gameInfo.ownGrounds = classifyGrounds;
	    } else {
	      console.error('云函数调用失败:', res.result.message);
	    }
	  } catch (error) {
	    console.error('updateData 出错:', error.message);
	  }
	}
	
	onMounted(async () => {
		if(!gameInfo.ownGrounds) await updateData()
	})
</script>
 
<style lang="less">
	.groundWrap {
		position: relative;
		width: 100vw;
		height: 533vw;
		overflow: hidden;
		background: url("../../static/ground/groundBgc.png")  no-repeat top center / contain;
		
		.return {
			position: fixed;
			z-index: 99;
			bottom: 4vw;
			left: 7vw;
			width: 15vw;
			height: 15vw;
			background: url("../../static/ground/return.png") no-repeat center center /contain;
		}
		
		.treesWrap1 {
			.item1 {
				position: absolute;
				width: 30vw;
				height: 40vw;
				background: url('../../static/ground/tree1.png') no-repeat center center /contain;
				animation: swing 4s infinite linear;
			}
			
			.left {
				position: absolute;
				left: -16vw;
				
				.lTree1 {
					top: 50vw;
				}
				
				.lTree2 {
					top: 130vw;
					animation-duration: 2.7s;
				}
				
				
				.lTree3 {
					top: 230vw;
					animation-duration: 3.8s;
				}
				
				.lTree4 {
					top: 330vw;
					animation-duration: 4.5s;
				}
				
				.lTree5 {
					top: 430vw;
					animation-duration: 4.8s;
				}
				
			}
			
		}
		
		.treesWrap2 {
			.item2 {
				position: absolute;
				width: 30vw;
				height: 40vw;
				background: url('../../static/ground/tree2.png') no-repeat center center /contain;
				animation: swing 4s infinite linear;
			}
			
			.right {
				position: absolute;
				left: 90vw;
				
				.rTree1 {
					top: 50vw;
				}
				
				.rTree2 {
					top: 130vw;
					animation-duration: 2.7s;
				}
				
				
				.rTree3 {
					top: 230vw;
					animation-duration: 3.8s;
				}
				
				.rTree4 {
					top: 330vw;
					animation-duration: 4.5s;
				}
				
				.rTree5 {
					top: 430vw;
					animation-duration: 4.8s;
				}
				
			}
			
		}
		
			
		.grounds {
			display: flex;
			flex-wrap: wrap;
			padding: 30vw 10vw 20vw 10vw;
			box-sizing: border-box;
			justify-content: space-between;
			width: 100%;
			height: 100%;
			
			.item {
				width: 35vw;
				height: 32vw;
				
				.realGround {
					position: relative;
					width: 100%;
					height: 100%;
					background: no-repeat center center /contain;
					
					&.type1 {
						background-image: url("../../static/ground/ground1.png");
					}
					
					&.type2 {
						background-image: url("../../static/ground/ground2.png");
					}
					
					&.type3 {
						background-image: url("../../static/ground/ground3.png");
					}
					
					&.type4 {
						background-image: url("../../static/ground/ground4.png");
					}
					
					&.type5 {
						background-image: url("../../static/ground/ground5.png");
					}
					
					&.type6 {
						background-image: url("../../static/ground/ground4.png");
					}
					
					.personWrap {
						position: absolute;
						left: 3vw;
						top: 5vw;
					}
					
					.diamonds {
						position: absolute;
						left: 25%;
						top: 1%;
						
						.item {
							position: absolute;
							width: 10vw;
							height: 10vw;
							background: no-repeat center center /contain;
							
							&.d1 {
								background-image: url('../../static/ground/diamond1.png');
							}
							
							&.d2 {
								top: 4vw;
								left: 10vw;
								background-image: url('../../static/ground/diamond2.png');
							}
							
							&.d3 {
								top: 10vw;
								left: 3vw;
								background-image: url('../../static/ground/diamond2.png');
							}
						}
						
					}
					
					.lockGround {
						position: absolute;
						top: -3vw;
						width: 110%;
						height: 110%;
						color: rgb(107, 92, 37);
						font-size: 3.5vw;
						font-weight: bold;
						background: url("/static/ground/lockGround.png") no-repeat center center /contain;
						
						.title {
							width: 100%;
							text-align: center;
							position: absolute;
							top: 15%;
						}
					}
				}
			}
			
			
			
			
		}
				
		.clouds {
			position: absolute;
			top: 10%;
			width: 50%;
			
			&.cloudsLeft.unlock {
				left: 0;
				top: 10vw;
				animation: moveLeft 2s linear;
				animation-fill-mode: forwards;
				animation-delay: .3s;
			}
			
			&.cloudsLeft.lock {
				top: 140vw;
				
				.leftItem {
					margin-bottom: 3vw;
				}
			}
			
			.leftItem {
				width: 110%;
				height: 20vw;
				margin-bottom: 10vw;
				background: no-repeat top center / contain;
				
				&.leftItem1 {
					background-image: url('../../static/ground/cloud1.png');
				}
				
				&.leftItem2 {
					background-image: url('../../static/ground/cloud2.png');
				}
			}
			
			
			
			
			
			
			
			&.cloudsRight.unlock {
				right: 0;
				top: 14vw;
				animation: moveRight 2s linear;
				animation-fill-mode: forwards;
				animation-delay: .3s;
			}
			
			&.cloudsRight.lock {
				right: 0;
				top: 140vw;
				.rightItem {
					width: 110%;
					height: 20vw;
					margin-bottom: 3vw;
				}
			}
			
			.rightItem {
				width: 110%;
				height: 20vw;
				margin-bottom: 10vw;
				background: no-repeat top center / contain;
				
				&.rightItem1 {
					background-image: url('../../static/ground/cloud1.png');
				}
				
				&.rightItem2 {
					background-image: url('../../static/ground/cloud2.png');
				}
			}
		}
		
		
		
		@keyframes moveLeft {
			0% {
				left: 0;
			}
			
			100% {
				left: -100%;
			}
		}
		
		@keyframes moveRight {
			0% {
				right: 0;
			}
			
			100% {
				right: -100%;
			}
		}
		
		
		@keyframes swing {
		  0%, 100% {
		    transform: rotate(0deg);
		  }
		  50% {
		    transform: rotate(25deg);
		  }
		}
	}
</style>
