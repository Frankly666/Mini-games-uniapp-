<template>
  <view>
    <view class="assetsBar1" v-if="props.judge === 2">
      <view class="asset" 
            v-for="(item, index) in assets" 
            :key="index" 
            :style="`background: url(${getImageUrl(item)}) no-repeat center center / contain;`">		
        <span>{{gameInfo.assets[item]}}</span>
      </view>
    </view>
	
	<view class="assetsBar2" v-if="props.judge === 1">
	    <view class="asset" 
	          v-for="(item, index) in assets" 
	          :key="index" 
	          :style="`background: url(${getImageUrl(item)}) no-repeat center center / contain;`">		
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
	return `../static/assetsHeader/${name}.png`;
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
		color: #dcc5ab;
		box-sizing: border-box;
		padding: 0 10vw 0 10vw;
		font-size: 3.6vw;
		
		font-weight: bold;

		.asset {
			position: relative;
			display: flex;
			align-items: center;
			text-align: center;
			justify-content: center;
			box-sizing: border-box;
			width: 33.67vw;
			height: 10vw;
		
			&:first-of-type {
				// margin-left: 4vw;
			}
		 //  &:last-of-type {
		 //    width: 16vw;
		 //    height: 8vw;
		 //  }

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
		color: #dcc5ab;
		font-size: 3.6vw;
		font-weight: bold;

		.asset {
			position: relative;
			display: flex;
			align-items: center;
			text-align: center;
			justify-content: center;
			width: 31.67vw;
			height: 10vw;
			line-height: 7vw;
			margin-bottom: 1vw;
			&:first-of-type {
				// width: 26vw;
				// height: 8vw;
			}
			&:last-of-type {
				// width: 26vw;
				// height: 8vw;
			}

			span {
				position: relative;
			}
		}
}
</style>