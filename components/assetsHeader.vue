<template>
  <view>
    <view class="assetsBar1" v-if="props.judge === 2">
      <view class="asset" 
            v-for="(item, index) in assets" 
            :key="index" 
            :style="`background: url(${getImageUrl(item)}) no-repeat center center / cover;`">		
        <span>{{gameInfo.assets[item]}}</span>
      </view>
    </view>
	
	<view class="assetsBar2" v-if="props.judge === 1">
	    <view class="asset" 
	          v-for="(item, index) in assets" 
	          :key="index" 
	          :style="`background: url(${getImageUrl(item)}) no-repeat center center / cover;`">		
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
const assets = ['powerStone', 'diamond', 'resourceStone'];

const assetsMap = ['能', '金', '源'];
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
.assetsBar1 {
  position: fixed;
  flex-wrap: wrap;
  right: 2vw;
  top: 10vw;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  z-index: 99;
  color: #dcc5ab;
  font-weight: bold;

  .asset {
    position: relative;
    display: flex;
    align-items: center;
    width: 18.67vw;
    height: 8vw;
    padding-left: 13.33vw;
    &:first-of-type {
      width: 16vw;
      height: 8vw;
	  margin-left: 4vw;
    }
    &:last-of-type {
      width: 16vw;
      height: 8vw;
    }

    span {
      position: relative;
      top: -0.53vw;
    }
  }
}

.assetsBar2 {
  position: fixed;
  flex-wrap: wrap;
  right: 2vw;
  top: 3vw;
  display: flex;
  justify-content: space-between;
  width: 68vw;
  z-index: 99;
  color: #dcc5ab;
  font-weight: bold;

  .asset {
    position: relative;
    display: flex;
    align-items: center;
    width: 18.67vw;
    height: 8vw;
    padding-left: 13.33vw;
    &:first-of-type {
      width: 16vw;
      height: 8vw;
    }
    &:last-of-type {
      width: 16vw;
      height: 8vw;
	  margin-top: 2vw;
    }

    span {
      position: relative;
      top: -0.53vw;
    }
  }
}
</style>