<template>
  <view>
    <view class="assetsBar1" v-if="props.judge === 2">
      <view class="asset" 
            v-for="(item, index) in assets" 
            :key="index" 
            >
				<view class="dem" :style="`background: url(${getImageUrl(item)}) no-repeat center center / contain;`"></view>
        <span>{{gameInfo.assets[item]}}</span>
      </view>
    </view>
	
	<view class="assetsBar2" v-if="props.judge === 1">
	    <view class="asset" 
	          v-for="(item, index) in assets" 
	          :key="index" 
	          >
				<view class="dem" :style="`background: url(${getImageUrl(item)}) no-repeat center center / contain;`"></view>
	      <span>{{gameInfo.assets[item]}}</span>
	    </view>
	</view>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { PHONE, useGameInfoStore } from '../stores/gameInfo';
import Cache from '../utils/cache';
	
// 这里是详情页中的资源展示
const assets = ['powerStone', 'diamond', 'resourceStone', 'jewel'];

const gameInfo = useGameInfoStore()
// const userAssets = reactive({})
const props = defineProps(['judge'])
const getCache = Cache.getCache;
const assetsDB = uniCloud.importObject('assets')
const userDB  = uniCloud.importObject('user')

onMounted(async () => {
	if(gameInfo.isLoad) return;
	const phone = getCache(PHONE);
	const res1 = await userDB.select(phone)
	const id = res1.res.data[0]._id;
	const res2 = await assetsDB.select(id);
	// Object.assign(userAssets, res2.res.data[0]);
	gameInfo.assets = res2.res.data[0]
	gameInfo.isLoad = true;
})

function getImageUrl(name) {
	return `../static/market/${name}.png`;
}
</script>

<style lang="less">
	// 交易中心所用的
	.assetsBar1 {
		position: fixed;
		flex-wrap: wrap;
		right: 2vw;
		top: 3vw;
		display: flex;
		justify-content: space-between;
		width: 100vw;
		z-index: 99;
		color: aliceblue;
		box-sizing: border-box;
		padding: 0 10vw 0 10vw;
		font-size: 3.6vw;
		font-weight: bold;

		.asset {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: left;
			box-sizing: border-box;
			width: 33.67vw;
			height: 10vw;
			padding-left: 3vw;
			box-sizing: border-box;
			background: url("../static/assetsHeader/assets_bar.png") no-repeat center center / contain;
			
			&:first-of-type>.dem {
				 width: 6vw;
				 height: 6vw;
			}
			&:last-of-type>.dem {
			   width: 6vw;
			   height: 6vw;
			}
			
			.dem {
				width: 8vw;
				height: 8vw;
				margin-right: 4vw;
			}

			span {
				position: relative;
				top: -0.53vw;
			}
		}
	}
	
	// 主页所用的
	.assetsBar2 {
		position: fixed;
		flex-wrap: wrap;
		right: 2vw;
		top: 3vw;
		display: flex;
		justify-content: space-between;
		width: 70vw;
		z-index: 99;
		color: aliceblue;
		font-size: 3.6vw;
		font-weight: bold;

		.asset {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: left;
			width: 31.67vw;
			height: 10vw;
			line-height: 7vw;
			margin-bottom: 1vw;
			padding-left: 3vw;
			box-sizing: border-box;
			background: url("../static/assetsHeader/assets_bar.png") no-repeat center center / contain;
			
			&:first-of-type>.dem {
				 width: 6vw;
				 height: 6vw;
			}
			&:last-of-type>.dem {
			   width: 6vw;
			   height: 6vw;
			}
			
			.dem {
				width: 8vw;
				height: 8vw;
				margin-right: 4vw;
			}

			span {
				position: relative;
			}
		}
}
</style>