<template>
  <view>
    <view class="assetsBar1" v-if="props.judge === 2">
      <view
        class="asset"
        v-for="(item, index) in assets"
        :key="index"
        @click="handleAssetClick(item)"
      >
        <view
          class="dem"
          :style="`background: url(${getImageUrl(item)}) no-repeat center center / contain;`"
        ></view>
        <span>{{ formatLargeNumber(gameInfo.assets?.[item]) }}</span>
      </view>
    </view>

    <view class="assetsBar2" v-if="props.judge === 1">
      <view
        class="asset"
        v-for="(item, index) in assets"
        :key="index"
        @click="handleAssetClick(item)"
      >
        <view
          class="dem"
          :style="`background: url(${getImageUrl(item)}) no-repeat center center / contain;`"
        ></view>
        <span>{{ formatLargeNumber(gameInfo.assets?.[item]) }}</span>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted } from 'vue';
import { useGameInfoStore } from '../stores/gameInfo';
import { formatLargeNumber } from '../utils/formatLargeNumber';
import { updateAssets } from '../utils/updateGameInfo'; // 确保引入 updateAssets

// 资源类型
const assets = ['powerStone', 'diamond', 'resourceStone', 'jewel'];
const gameInfo = useGameInfoStore();

// 接收 props
const props = defineProps({
  judge: {
    type: Number,
    required: true,
  },
  openRecordPopup: {
    type: Function,
    required: true,
  },
});

// 获取资源图片 URL
function getImageUrl(name) {
  return `../static/market/${name}.png`;
}

// 点击资源项时触发
function handleAssetClick(assetType) {
  // 调用传入的 openRecordPopup 方法
  props.openRecordPopup(assetType);
}

// 防止刷新丢失数据
onMounted(async () => {
  try {
    updateAssets(); // 调用 updateAssets
  } catch (error) {
    console.error('初始化失败:', error);
  }
});
</script>



<style lang="less">
	// 交易中心所用的
	.assetsBar1 {
		position: fixed;
		flex-wrap: wrap;
		right: 2vw;
		top: 7vw;
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
				 transform: scale(.85);
			}
			&:last-of-type>.dem {
			   transform: scale(.85	);
			}
			
			.dem {
				width: 8vw;
				height: 8vw;
			}

			span {
				position: relative;
			}
		}
	}
	
	// 主页所用的
	.assetsBar2 {
		position: fixed;
		flex-wrap: wrap;
		right: 2vw;
		top: 8vw;
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
				 transform: scale(.85	);
			}
			&:last-of-type>.dem {
			  transform: scale(.85	);
			}
			
			.dem {
				width: 8vw;
				height: 8vw;
			}

			span {
				position: relative;
			}
		}
}
</style>