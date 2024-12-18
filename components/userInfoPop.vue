<template>
	<view class="userInfoWrap">
		<view class="infoBgc">
			<view class="closeBtn" @click="props.closeInfo"></view>
			<view class="avatar" :style="`background-image: url(${avatar});`"></view>
			<view class="userName">
				<text>{{userName}}</text>
			</view>
			<view class="desc">
				<text v-if="isFirstEdit">(首次免费修改)</text>
				<text v-else>(修改需消耗100能量石)</text>
			</view>
			<view class="editName" @click="openEditNamePop">
				<text>修改</text>
			</view>
			<view class="assetsArea"></view>
		</view>
		
		<view class="editPop" v-if="isShowEditPop">
			<view class="bgc">
				<view class="close" @click="closeEditNamePop"></view>
				<view class="confirm" @click="confirm">
					<text>确定修改</text>
				</view>
				<view class="inputBgc">
					<input 
						type="text"
						:value="newName" 
						maxlength="6" 
						@input="updateName" 
						:auto-focus="true" 
						placeholder="名字最大长度为6"
						/>
				</view>
				<view class="tip" v-if="isShowTip">
					<text>能量石余额不足</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script setup>
	import { defineProps, ref } from 'vue';
	import { AVATAR, POWERSTONE, USERNAME, useGameInfoStore } from '../stores/gameInfo';
	import Cache from '../utils/cache';
	
	const gameInfo = useGameInfoStore()
	const props = defineProps(['closeInfo'])
	const avatar = Cache.getCache(AVATAR);
	const userName = ref(Cache.getCache(USERNAME));
	const isShowEditPop = ref(false);
	const isShowTip = ref(false)
	const newName = ref('')
	const isFirstEdit = ref(gameInfo.isFirst === 0)
	
	function openEditNamePop () {
		isShowEditPop.value = true;
	}
	
	function closeEditNamePop() {
		isShowEditPop.value = false;
	}
	
	function updateName(e) {
		newName.value = e.detail.value
	}
	
	function confirm() {
		if(newName.value === '')return
		
		// 判断能量石余额
		if(!isFirstEdit.value && gameInfo.assets.powerStone < 100) {
			isShowTip.value = true;
			return;
		}
		
		if(!isFirstEdit.value) {
			gameInfo.assets.powerStone -= 100
			const assetsDB = uniCloud.importObject('assets')
			assetsDB.update(gameInfo.id, POWERSTONE, -100)
		}
		
		// 改名
		const user = uniCloud.importObject('user');
		const id = uni.getStorageSync('id');
		user.changeName(id, newName.value)
		
		// 更新新名字和记录已经修改过名字
		uni.setStorageSync('userName', newName.value)
		gameInfo.userName = newName.value
		userName.value = newName.value;
		gameInfo.isFirst = 1
		isShowEditPop.value = false;
		isFirstEdit.value = false;
		
		
	}
	
</script>

<style lang="less">
	.userInfoWrap {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 999;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0,0,0,.7);
		color: #dcc5aa;
		
		.editPop {
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			z-index: 1000;
			width: 100vw;
			height: 100vh;
			background-color: rgba(0,0,0,.7);
			
			.bgc {
				position: absolute;
				top: 50vw;
				width: 50vw;
				height: 60vw;
				background-color: #fff;
				background: url('/static/home/changeName.png') no-repeat center center / contain;
				
				.tip {
					position: absolute;
					top:28vw;
					left: 8.6vw;
					width: 30vw;
					text-align: center;
					font-size: 3vw;
				}
				
				.close {
					position: absolute;
					right: 0;
					top: 3vw;
					width: 8vw;
					height: 8vw;
				}
				
				.confirm {
					position: absolute;
					left: 16.6vw;
					bottom: 12.8vw;
				}
				
				.inputBgc {
					position: absolute;
					top: 15vw;
					left: 4.8vw;
					display: flex;
					align-items: center;
					width: 40vw;
					height: 10vw;
					border-radius: 4vw;
					background: url('/static/home/edit.png') no-repeat center center / cover;
					
					input {
						margin-left: 3vw;
					}
				} 
			}
		}
		
		.infoBgc {
			position: relative;
			width: 80vw;
			height: 115vw;
			background-color: #fff;
			background: url('/static/home/userInfo.png') no-repeat center center / contain;
			
			.closeBtn {
				position: absolute;
				right: 1vw;
				top: 9vw;
				width: 15vw;
				height: 15vw;
				background: url('/static/home/button_close.png') no-repeat center center / contain;
			}
			
			.avatar {
				position: absolute;
				width: 24vw;
				height: 24vw;
				border-radius: 50%;
				left: 28vw;
				top: 3vw;
				background: no-repeat center center / contain;
			}
			
			.userName {
				position: absolute;
				width: 32vw;
				text-align: center;
				top:35.4vw;
				left: 15vw;
				font-weight: bold;
				font-size: 5vw;
				
			}
			
			.desc {
				position: absolute;
				top: 45vw;
				left: 15vw;
				text-align: center;
				width: 50vw;
				font-size: 3vw;
			}
			
			.editName {
				position: absolute;
				top: 35.4vw;
				right: 16vw;
				width: 15vw;
				height: 8vw;
				background: url('../static/home/edit.png') no-repeat center center / contain;
				text-align: center;
				line-height: 8vw;
			}
			
			.assetsArea {
				
			}
		}
	}
</style>