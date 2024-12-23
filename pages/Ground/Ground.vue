<template>
	<view class="groundWrap">
		<!-- 地皮购买弹窗 -->
		<buy-ground-pop-vue 
					v-if="isShowGroundPop" 
					:groundType="groundType" 
					:closePop="() => {handleIsShowGroundPop(false)}"
					>
					
		</buy-ground-pop-vue>
		
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
			<view class="item small">
				<view class="realGround type1">
					<view class="personWrap">
						<worker-vue :type="'5'" :delay='0'></worker-vue>
					</view>
				</view>
			</view>
									  
			<view class="item scarce" v-for="item in 3">
				<view class="realGround type2">
					<view class="personWrap">
						<worker-vue :type="'1'" :delay="-item"></worker-vue>
					</view>
					<view class="lockGround" v-show="false" @click="() => { handleClickGround(2); handleIsShowGroundPop(true)}">
						<view class="title">
							<text >稀缺地皮</text>
						</view>
					</view>
				</view>
			</view>
									    
			<view class="item big" v-for="item in 5">
				<view class="realGround type3">
					<view class="personWrap" v-show="false">
						<worker-vue :type="'3'" :delay="-item"></worker-vue>
					</view>
					<view class="lockGround" v-show="true" @click="() => {handleClickGround(3); handleIsShowGroundPop(true)}">
						<view class="title">
							<text style="color: brown;">大地皮</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="item resource" v-for="item in 6">
				<view class="realGround type4">
					<view class="personWrap" v-show="false">
						<worker-vue :type="'3'" :delay="-item"></worker-vue>
					</view>
					<view class="lockGround" v-show="true" @click="() => {handleClickGround(4); handleIsShowGroundPop(true)}">
						<view class="title">
							<text>资源地皮</text>
						</view>
					</view>
				</view>
			</view>
									   
			<view class="item black" v-for="item in 8">
				<view class="realGround type5">
					<view class="personWrap" v-show="false">
						<worker-vue :type="'3'" :delay="-item"></worker-vue>
					</view>
					<view class="lockGround" v-show="true" @click="() => {handleClickGround(5); handleIsShowGroundPop(true)}"> 
						<view class="title">
							<text style="color: black;">黑土地皮</text>
						</view>
					</view>
				</view>
			</view>
									   
			<view class="item diamond" v-for="item in 3">
				<view class="realGround type6">
					<view class="diamonds">
						<view class="d1 item"></view>
						<view class="d2 item"></view>
						<view class="d3 item"></view>
					</view>
					<view class="personWrap" v-show="false">
						<worker-vue :type="'3'" :delay="-item"></worker-vue>
					</view>
					<view class="lockGround" v-show="true" @click="() => {handleClickGround(6); handleIsShowGroundPop(true)}">
						<view class="title">
							<text style="color: chocolate;">钻石地皮</text>
						</view>
					</view>
				</view>
			</view>
									   
			
		</view>
	
		<!-- 云朵 -->
		<view class="cloudsLeft clouds">
			<view class="" v-for="item in 12">
				<view class="leftItem1 leftItem" />
				<view class="leftItem2 leftItem" />
			</view>
		</view>
		<view class="cloudsRight clouds">
			<view class="" v-for="item in 12">
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

	const groundType = ref("1")
	const isShowGroundPop = ref(false);
	
	function back() {
		uni.navigateBack({
			delta:1
		})
	}
	
	// 处理弹窗的函数
	function handleClickGround(type) {
		groundType.value = type;
	}
	function handleIsShowGroundPop(flag) {
		isShowGroundPop.value = flag;
	}
	
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
						width: 100%;
						height: 100%;
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
			
			&.cloudsLeft {
				left: 0;
				top: 10vw;
				animation: moveLeft 2s linear;
				animation-fill-mode: forwards;
				animation-delay: .2s;
				
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
			}
			
			&.cloudsRight {
				right: 0;
				top: 14vw;
				animation: moveRight 2s linear;
				animation-fill-mode: forwards;
				animation-delay: .2s;
				
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
