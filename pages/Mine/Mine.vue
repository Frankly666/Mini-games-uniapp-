<template>
  <view class="mineWrap">
    <!-- 激活矿洞弹窗 -->
    <activate-mine-pop-vue 
      v-if="isShowActivatePop" 
      :closePop="() => {handlePop(false)}"
    />

    <!-- 蒙版 -->
    <view class="mask" v-if="isMaskVisible" @click="closeMask">
      <view class="maskContent">
        <text class="maskText">该功能暂未开放，敬请期待！</text>
      </view>
    </view>

    <view class="mineBg">
      <view class="stonesWrap">
        <view class="stone item1"></view>
        <view class="stone item2"></view>
        <view class="stone item3"></view>
        <view class="stone item4"></view>
        <view class="stone item5"></view>
        <view class="stone item6"></view>
        <view class="stone item7"></view>
        <view class="stone item8"></view>
        <view class="stone item9"></view>
        <view class="stone item10"></view>
      </view>
      
      <view class="miner"></view>
    </view>
    <view class="header1">
      <view class="return" @click="back"></view>
    </view>
    <view class="scrollArea">
      <view class="mineContent">
        <view class="normalArea">
          <view class="header2">
            <view class="left">
              <text>需要:</text>
              <view class="gemImg1" style="background-image: url('../../static/market/jewel.png');"></view>
              <text>{{834}}</text>
							<view class="gemImg1" style="background-image: url('../../static/market/diamond.png');"></view>
							<text>{{695}}</text>
							<view class="gemImg1" style="background-image: url('../../static/market/resourceStone.png');"></view>
							<text>{{1338}}</text>
							<view class="gemImg1" style="background-image: url('../../static/market/powerStone.png');"></view>
							<text>{{1248}}</text>
            </view>
          </view>
          <!-- 可收获数量 -->
          <view class="nowHarvest">
            <text>当前可收获:</text>
            <view class="wrap">
              <view class="gemImg1" style="background-image: url('../../static/market/jewel.png');"></view>
              <text>{{0}}</text>
              <view class="gemImg1" style="background-image: url('../../static/market/diamond.png');"></view>
              <text>{{0}}</text>
              <view class="gemImg1" style="background-image: url('../../static/market/resourceStone.png');"></view>
              <text>{{0}}</text>
              <view class="gemImg1" style="background-image: url('../../static/market/powerStone.png');"></view>
              <text>{{0}}</text>
            </view>
          </view>
          <!-- 按钮 -->
          <view class="btn harvest">收获</view>
          <view class="btn add" @click="() => handlePop(true)">激活</view>
        </view>
        
        <view class="bigArea">
          <view class="header2">
            <view class="left">
              <text>需要:</text>
              <view class="gemImg1" style="background-image: url('../../static/market/jewel.png');"></view>
              <text>{{3336}}</text>
              <view class="gemImg1" style="background-image: url('../../static/market/diamond.png');"></view>
              <text>{{2780}}</text>
              <view class="gemImg1" style="background-image: url('../../static/market/resourceStone.png');"></view>
              <text>{{5552}}</text>
              <view class="gemImg1" style="background-image: url('../../static/market/powerStone.png');"></view>
              <text>{{4992}}</text>
            </view>
          </view>
          <!-- 可收获数量 -->
          <view class="nowHarvest">
            <text>当前可收获:</text>
            <view class="wrap">
              <view class="gemImg1" style="background-image: url('../../static/market/jewel.png');"></view>
              <text>{{0}}</text>
              <view class="gemImg1" style="background-image: url('../../static/market/diamond.png');"></view>
              <text>{{0}}</text>
              <view class="gemImg1" style="background-image: url('../../static/market/resourceStone.png');"></view>
              <text>{{0}}</text>
              <view class="gemImg1" style="background-image: url('../../static/market/powerStone.png');"></view>
              <text>{{0}}</text>
            </view>
          </view>
          <!-- 按钮 -->
          <view class="btn harvest">收获</view>
          <view class="btn add" @click="() => {handlePop(true)}">激活</view>
        </view>
      </view>
      
      <view class="intro"></view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import activateMinePopVue from '../../components/activateMinePop.vue';

const isShowActivatePop = ref(false);
const isMaskVisible = ref(true); // 控制蒙版显示

function handlePop(flag) {
  isShowActivatePop.value = flag;
}

function back() {
  uni.navigateBack({
    delta: 1
  });
}

// 关闭蒙版
function closeMask() {
  isMaskVisible.value = false;
	back()
	isMaskVisible.value = true;
}
</script>

<style lang="less">
.mineWrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
	
	.gemImg1 {
	  width: 7vw;
	  height: 7vw;
	  margin: 0 2vw;
	  background:no-repeat center center / contain;
	}

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .maskContent {
      background-color: #fff;
      padding: 5vw;
      border-radius: 3vw;
      text-align: center;

      .maskText {
        font-size: 4.5vw;
        font-weight: bold;
        color: #333;
      }
    }
  }

  .mineBg {
    position: fixed;
    top: 0;
    width: 100%;
    height: 70vw;
    background: url('../../static/mine/mineBg.webp') no-repeat center center /cover;

    .miner {
      position: absolute;
      left: 0vw;
      top: 12vw;
      width: 30vw;
      height: 30vw;
      background: url('../../static/mine/spr_axe.gif') no-repeat center center /cover;
      animation: minerRun 15s linear infinite;
    }

    .stonesWrap {
      position: absolute;
      .stone {
        position: absolute;
        width: 25vw;
        height: 25vw;
        background:  no-repeat center center /contain;
        background-image: url("../../static/mine/stone1.gif");

        &.item1 {
          width: 30vw;
          height: 30vw;
          left: 5vw;
          top: 28vw;
        }
        &.item2 {
          left: 70vw;
          top: 10vw;
        }
        &.item3 {
          width: 20vw;
          height: 20vw;
          left: 50vw;
          top: 7vw;
        }
        &.item4 {
          width: 17vw;
          height: 17vw;
          left: 53vw;
          top: 7vw;
        }
        &.item5 {
          width: 20vw;
          height: 20vw;
          left: 6vw;
          top: 12vw;
        }
        &.item6 {
          width: 16vw;
          height: 16vw;
          left: 0vw;
          top: 12vw;
        }
        &.item7 {
          width: 22vw;
          height: 22vw;
          left: -6vw;
          top: 16vw;
        }
        &.item8 {
          width: 39vw;
          height: 39vw;
          left: -10vw;
          top: 33vw;
        }
        &.item9 {
          width: 39vw;
          height: 39vw;
          left: 60vw;
          top: 30vw;
        }
        &.item10 {
          width: 34vw;
          height: 34vw;
          left: 79vw;
          top: 12vw;
        }
      }
    }
  }

  .header1 {
    position: fixed;
    z-index: 99;
    top: 30vh;
    width: 100%;
    height: 20vw;
    background: url("../../static/mine/mineHeader.png") no-repeat center center / contain;
  }

  .scrollArea {
    position: absolute;
    top: 40vh;
    width: 100%;
    height: 61vh;
    overflow: auto;

    .mineContent {
      position: relative;
      bottom: -1vw;
      width: 100%;
      height: 85vh;
      background: url("../../static/mine/mineContent.png") no-repeat center center / contain;

      // 按钮的公共样式
      .btn {
        position: absolute;
        width: 30vw;
        height: 14vw;
        line-height: 12vw;
        font-size: 5vw;
        font-weight: bold;
        color: #fff;
        text-align: center;
        background:  no-repeat center center / contain;
      }

      // 已添加的资源header公共样式
      .header2 {
        position: absolute;
        top: -44vw;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 10vw;
        background-color: #fff;
        border-radius: 4vw;
        box-sizing: border-box;
        padding: 0 3vw;
        line-height: 9vw;
        font-weight: bold;
				font-size: 3.5vw;

        .gemImg1 {
          width: 7vw;
          height: 7vw;
          margin: 0 2vw;
          background:no-repeat center center / contain;
        }

        .gemImg2 {
          width: 20vw;
          height: 20vw;
          background: url('../../static/market/resourceStone.png') no-repeat center center / contain;
        }

        .left {
          display: flex;
          align-items: center;
          .gemImg1 {
            
          }
        }

        .right {
          display: flex;
          align-items: center;
          .gemImg1 {
            width: 10vw;
            height: 10vw;
            background-image: url('../../static/market/resourceStone.png');
          }
        }
      }

      // 可收获数量的公共样式
      .nowHarvest {
        position: absolute;
        top: -29vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        font-weight: bold;

        .wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: 4vw;
          margin-left: -3.5vw;

          .gemImg2 {
            width: 16vw;
            height: 16vw;
            background: url('../../static/market/resourceStone.png') no-repeat center center / contain;
          }
        }
      }

      .normalArea {
        position: absolute;
        top: 58vw;
        display: flex;
        justify-content: center;
        width: 100%;

        .harvest {
          left: 15vw;
          background-image: url("../../static/mine/btn_Purple.png");
        }

        .add {
          right: 15vw;
          background-image: url("../../static/mine/btn_Green.png");
        }
      }

      .bigArea {
        position: absolute;
        top: 135vw;
        display: flex;
        justify-content: center;
        width: 100%;

        .harvest {
          left: 15vw;
          background-image: url("../../static/mine/btn_Purple.png");
        }

        .add {
          right: 15vw;
          background-image: url("../../static/mine/btn_Green.png");
        }
      }
    }

    .intro {
      width: 100%;
      height: 80vh;
      background: url("../../static/mine/intro.png") no-repeat center center / contain;;
    }
  }

  .return {
    position: absolute;
    top: 6vw;
    z-index: 999;
    left: 3vw;
    width: 10vw;
    height: 10vw;
    background: url("../../static/mine/return.png") no-repeat center center /contain;
  }
}

@keyframes minerRun {
  // 前20%进行挖矿
  0% {
    left: 0;
    background-image: url('../../static/mine/spr_axe.gif');
    transform: scaleX(-1);
  }
  19.99% {
    left: 0;
    background-image: url('../../static/mine/spr_axe.gif');
    transform: scaleX(-1);
  }

  // 跑动到最右边
  20% {
    background-image: url('../../static/mine/spr_run.gif');
    left: 0;
    transform: scaleX(1);
  }
  49.9%{
    background-image: url('../../static/mine/spr_run.gif');
  }
  50% {
    left: 68vw;
    background-image: url('../../static/mine/spr_axe.gif');
  }

  // 又开始进行挖矿, 方向进行转换
  50.1% {
    left: 68vw;
    background-image: url('../../static/mine/spr_axe.gif');
  }
  69.99% {
    left: 68vw;
    background-image: url('../../static/mine/spr_axe.gif');
    transform: scaleX(1);
  }

  // 开始往回跑
  70% {
    background-image: url('../../static/mine/spr_run.gif');
    transform: scaleX(-1);
  }
  100% {
    left: 0vw;
    background-image: url('../../static/mine/spr_run.gif');
    transform: scaleX(-1);
  }
}
</style>