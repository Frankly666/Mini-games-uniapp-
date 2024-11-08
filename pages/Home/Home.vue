<template>
	<view class="pages">
			<!-- 头像, 资源, 工具栏 -->
			<avatar @click="() => {handleInfo(true)}"></avatar>
			<assets-header :judge='1'></assets-header>
			<tools-bar :handleShow="handleShow"></tools-bar>
			
			<!-- 弹出组件 -->
			<user-info-pop v-if="isShowInfo" :closeInfo='() => {handleInfo(false)}'></user-info-pop>
			<setting-pop v-if="isShowSettingPop" :handleShow="handleShow"></setting-pop>
			<rule-pop v-if="isShowRulePop" :handleShow="handleShow"></rule-pop>
			<announcement-pop v-if="isShowAnnouncementPop" :handleShow="handleShow"></announcement-pop>
			
			<view class="map-container"
				@touchstart="handleTouchStart"
				@touchmove="handleTouchMove"
				@touchend="handleTouchEnd">
				<view 
					ref="mapRef"
					class="map-image"
					:style="{ transform: `translate(${translateX}px, ${translateY}px)`}"
					>
					<dynamic-people></dynamic-people>
					<cloud-tip></cloud-tip>
					<click-mask></click-mask>
				</view>
			</view>
	</view>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import assetsHeader from '../../components/assetsHeader.vue';
import avatar from '../../components/avatar.vue';
import toolsBar from '../../components/toolsBar.vue';
import cloudTip from '../../components/cloudTip.vue';
import dynamicPeople from '../../components/dynamicPeople.vue';
import clickMask from '../../components/clickMask.vue';
import userInfoPop from '../../components/userInfoPop.vue';
import settingPop from '../../components/settingPop.vue';
import rulePop from '../../components/rulePop.vue';
import announcementPop from '../../components/announcementPop.vue';
import { ASSETS, AVATAR, ID, ISFIRST, PHONE, USERNAME, useGameInfoStore } from '../../stores/gameInfo';
import Cache from '../../utils/cache';

const keyword = ref('');
const screenWidth = ref(0);
const screenHeight = ref(0);
const mapWidth = ref(0);
const mapHeight = ref(0);
const startX = ref(0);
const startY = ref(0);
const translateX = ref(-340);
const translateY = ref(-320);
const isShowInfo = ref(false);
const isShowSettingPop = ref(false);
const isShowRulePop = ref(false);
const isShowAnnouncementPop = ref(false);
const gameInfo = useGameInfoStore()
const bgm = gameInfo.bgm;
const setCache = Cache.setCache; // 这里使用的是实例化函数
const getCache = Cache.getCache;  // 使用的是静态函数

// 获取vw对应多少px
getVwVhInPx();
const systemInfo = uni.getSystemInfoSync();
screenWidth.value = systemInfo.screenWidth; 
screenHeight.value = systemInfo.screenHeight;

function getVwVhInPx() {
	const systemInfo = uni.getSystemInfoSync();
	const screenWidthValue = systemInfo.screenWidth;
	const vw = screenWidthValue / 100;
	
	mapWidth.value = 300 * vw;
	mapHeight.value = 300 * vw;
}

function handleTouchStart(event) {
	startX.value = event.touches[0].clientX;
	startY.value = event.touches[0].clientY;
}

function handleTouchMove(event) {
	let currentX = event.touches[0].clientX;
	let currentY = event.touches[0].clientY;
	if(currentX > mapWidth.value) currentX = mapWidth.value;
	else if(currentX < 0) currentX = 0;
	if(currentY > mapHeight.value) currentY = mapHeight.value;
	else if(currentY < 0) currentY = 0;
	
	// 计算手指移动的距离
	const deltaX = currentX - startX.value;
	const deltaY = currentY - startY.value;
	
	// 使用之前的位移判断手指移动的距离是否越界
	let temX = translateX.value + deltaX;
	let temY = translateY.value + deltaY;
	if(temX > 0) temX = 0;
	else if(temX < -(mapWidth.value - screenWidth.value)){temX = -(mapWidth.value - screenWidth.value)}
	if(temY > 0) temY = 0;
	else if(temY < -(mapHeight.value - screenHeight.value)) {temY = -(mapHeight.value - screenHeight.value)}
	
	// 更新图片的偏移量
	translateX.value = temX; // 向右为正，向左为负
	translateY.value = temY; // 向下为正，向上为负
	
	// 更新初始坐标为当前坐标，为下次移动做准备
	startX.value = currentX;
	startY.value = currentY;
}

function handleTouchEnd() {}

// 控制展示工具栏中的弹窗
function handleShow(type, bool) {
	if(type === 0) isShowSettingPop.value = bool;
	if(type === 3) isShowAnnouncementPop.value = bool;
	if(type === 4) isShowRulePop.value = bool;
}

// 控制用户信息弹窗展示
function handleInfo(type){
	isShowInfo.value = type;
}

onMounted(async () => {
	if(gameInfo.isLoad) return;  // 只执行一次
	
	// bgm播放设置
	bgm.src ='/static/bgm/bgm.mp3'
	bgm.autoplay = true;
	bgm.loop = true;
	bgm.play()
	bgm.onError((err) => {
		console.log(err)
	})
	
	
	const phone = getCache(PHONE), avatar = getCache(AVATAR)
	
	// 在数据库中进行查询是否存在不存在进行增添数据
	const user = uniCloud.importObject('user');
	const assets = uniCloud.importObject('assets')
	
	// 查询是否存在此用户
	const res1 = await user.select(phone)
	if(res1.res.affectedDocs === 0) {
		// 初始化用户的游戏信息
		console.log('该用户没有激活过云城', res1)
		const res2 = await user.init(phone, avatar)
		await assets.init(res2.res.id)
		
		setCache(USERNAME, '趣选云城')
		setCache(ISFIRST, 0)
		gameInfo.userName = '趣选云城'
		gameInfo.isFirst = 0;
	}else {
		console.log("该用户已经激活过云城(在mock页面中)", res1)
		const data = res1.res.data[0]
	
		gameInfo.userName = data.userName;
		gameInfo.isFirst = data.isFirst;
		gameInfo.id = data._id;
		setCache( USERNAME,data.userName)
		setCache(ID, data._id)
		setCache(ISFIRST, data.isFirst)
	}
})
</script>

<style scoped lang="less">
	.pages {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		
		.map-container {
			width: 300vw; 
			height: 300vw; 
			touch-action: none;
			
			.map-image {
				position: relative;
				display: block;
				width: 100%;
				height: 100%;
				max-width: none; 
				max-height: none;
				pointer-events: none;
				background: url('@/static/home/bgc1.png') no-repeat  left top / contain;
			}
			
		}
		
	}
</style>