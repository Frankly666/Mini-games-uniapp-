<template>
	<view>
		<button type="primary" @click="() => {addAssets('672864e999c624e44f8ecb57', 'meteorite', 70)}">加一</button>
		<button type="primary" @click="toGame">点击进入云城</button>
	</view>
</template>

<script setup>
	import {ASSETS, AVATAR, ID, ISFIRST, PHONE, USERNAME, useGameInfoStore} from '../../stores/gameInfo.js'
	import Cache from '../../utils/cache';
	
	const gameInfo = useGameInfoStore()
	const setCache = Cache.setCache; // 这里使用的是实例化函数
	const getCache = Cache.getCache;  // 使用的是静态函数
	gameInfo.bgm.stop()
	
	// 测试增添资源的接口
	const assetsDB = uniCloud.importObject('assets')
	async function addAssets(userId, type, number) {
		const res = await assetsDB.update(userId, type, number)
		if(gameInfo.assets[type] += number < 0) return;
		gameInfo.assets[type] += number
	}
	
	async function toGame() {
		const phone = 12345678902, avatar = 'https://ts1.cn.mm.bing.net/th?id=OIP-C.1PjYL0WYwiZAYSWtOQryjwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2';
		setCache(PHONE, phone)
		setCache(AVATAR, avatar)
		gameInfo.isLoad = 0
		
		// 跳转游戏主页
		uni.navigateTo({
			url:'/pages/Home/Home'
		})
	}
</script>

<style>

</style>
