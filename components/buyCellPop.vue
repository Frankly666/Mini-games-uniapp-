<template>
  <view class="buyCellPopWrap">
    <view class="board">
      <view
        class="close"
        @click="
          () => {
            controlShowPop(false);
          }
        ">
			</view>
      <view
        class="gemImg"
        :style="`background-image: url(${getGemImg(gemName)});`" >
			</view>
      <view class="gemChName">
        <text>{{ gemChName }}</text>
      </view>

      <view class="publishNum">
        <view
          class="sub"
          @click="
            () => {
              handleSellNum(-1);
            }
          "
        >
        </view>
        <view class="inputWrap">
          <input
            type="number"
            :value="inputNumValue"
            @input="
              (res) => {
                setNumValue(res.detail.value);
              }
            "
          />
        </view>
        <view
          class="add"
          @click="
            () => {
              handleSellNum(1);
            }
          "
        ></view>
        <view
          class="max"
          @click="
            () => {
              handleSellNum(true);
            }
          "
        >
          <text>最大</text>
        </view>
      </view>

      <!-- 求购市场 -->
      <view class="tip" v-if="!isSellMarket">
        <view class="own item">
          <text>可出售</text>
          <view
            class="itemImg"
            :style="`background-image: url(${getGemImg(gemName)});`"
          ></view>
          <text>{{ gameInfo.assets[gemName] }}</text>
        </view>
        <view class="premium item">
          <text>手续费</text>
          <view
            class="itemImg"
            :style="`background-image: url(${getGemImg('jewel')});`"
          ></view>
          <text>5%</text>
        </view>
        <view class="obtain item">
          <text>预获得</text>
          <view
            class="itemImg"
            :style="`background-image: url(${getGemImg('jewel')});`"
          ></view>
          <text>{{ expected }}</text>
        </view>
      </view>

      <!-- 出售市场 -->
      <view class="tip" v-else>
        <view class="premium item">
          <text>购买单价</text>
          <view
            class="itemImg"
            :style="`background-image: url(${getGemImg('jewel')});`"
          ></view>
          <text>{{ certainItem.sellPrice }}</text>
        </view>
        <view class="obtain item">
          <text>购买总价</text>
          <view
            class="itemImg"
            :style="`background-image: url(${getGemImg('jewel')});`"
          ></view>
          <text>{{ totalPrice }}</text>
        </view>
      </view>

      <view class="warn" v-if="isShowWarn">
        <text>{{ isSellMarket ? "(能量石不足)" : `${gemChName}不足` }}</text>
      </view>

      <view class="confirmBtn" @click="confirmFun">
        <text>确认{{ btnWord }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { JEWEL, POWERSTONE, useGameInfoStore } from "../stores/gameInfo";
import { roundToOneDecimal } from "../utils/roundToOneDecimal";
import { netWorkError, showTips } from "../utils/error";

const props = defineProps([
  "controlShowPop",
  "gemName",
  "gemChName",
  "marketName",
  "certainItem",
  "updateData",
]);
const inputNumValue = ref(0);
const isShowWarn = ref(false);
const assetsDB = uniCloud.importObject("assets");
const marketDB = uniCloud.importObject("market");
const gameInfo = useGameInfoStore();

const isSellMarket = computed(() => {
  return props.marketName === "出售";
});
const totalPrice = computed(() => {
  return roundToOneDecimal(inputNumValue.value * props.certainItem.sellPrice);
});
const expected = computed(() => {
  return roundToOneDecimal(
    inputNumValue.value * props.certainItem.buyPrice * 0.95
  );
});
const btnWord = computed(() => {
  return props.marketName === "出售" ? "购买" : "出售";
});
const confirmFun = computed(() => {
  return props.marketName === "出售" ? confirmSellPublish : confirmNeedPublish;
});

function getGemImg(item) {
  return `../static/market/${item}.png`;
}
function setNumValue(num) {
  inputNumValue.value = num;
}
function handleShowWran(type) {
  isShowWarn.value = type;
}
function handleSellNum(num) {
  const max = props.certainItem.sellNum | props.certainItem.buyNum;
  if (num === true) {
    inputNumValue.value = max;
    return;
  }
  const tem = inputNumValue.value + num;
  if (tem < 0) return;
  if (tem > max) return;
  inputNumValue.value += num;
}

// 购买操作逻辑
async function confirmSellPublish() {
  const sellNum = props.certainItem.sellNum;
  const id = props.certainItem._id;
  const sellPrice = props.certainItem.sellPrice;
  const demType = props.certainItem.demType;

  // 如果输入的数值不合理直接跳出
  if (inputNumValue.value <= 0 || inputNumValue.value > sellNum) {
		showTips("数量有误")
		return
	};
  // 如果超过自己的余额就直接跳出
  if (totalPrice.value > gameInfo.assets[JEWEL]) {
    handleShowWran(true);
		showTips("余额不足")
    return;
  }

	uni.showLoading({
		title: '购买中...',
		mask: true
	})
	
  // 进行数据库操作
	uniCloud.callFunction({
			name: "sellTrade",
			data: {
				sellNum: sellNum,
				id: id,
				sellPrice: sellPrice,
				sellerId: props.certainItem.sellerId,
				demType: demType,
				userId: gameInfo.id,
				totalPrice: totalPrice.value,
				inputNumValue: inputNumValue.value,
			}
		}).then(res => {
			// console.log("code:",res.result)
			if(res.result) {
				// 关闭弹窗
				props.controlShowPop(false);
				props.updateData();
				
				// 实时更新资源数量
				gameInfo.assets[demType] += inputNumValue.value;
				
				// 表示购买者和发布者不是同一个人
				if(res.result === 1) {
					gameInfo.assets[JEWEL] = roundToOneDecimal(
						gameInfo.assets[JEWEL] - totalPrice.value
					);
				}else {
					gameInfo.assets[JEWEL] = roundToOneDecimal(
						gameInfo.assets[JEWEL] - (totalPrice.value * 0.05)
					);
				}
				
				uni.hideLoading();
			}else {
				netWorkError()
			}
		});
}

// 出售操作逻辑
async function confirmNeedPublish() {
  const buyNum = props.certainItem.buyNum; // 这条需求的最大值
  const id = props.certainItem._id;
  const buyPrice = props.certainItem.buyPrice;
  const demType = props.certainItem.demType;

  // 确保输入值为正确范围
  if (inputNumValue.value <= 0 || inputNumValue.value > buyNum) {
		showTips("数量有误")
		return
	};
  // 如果自己没那么多的宝石也直接跳出
  if (inputNumValue.value > gameInfo.assets[demType]) {
    handleShowWran(true);
		showTips("余额不足")
    return;
  }
	
	uni.showLoading({
		title: '出售中...',
		mask: true
	})

  // 进行数据库操作
	uniCloud.callFunction({
			name: "needTrade",
			data: {
				buyNum: buyNum,
				id: id,
				buyPrice: buyPrice,
				buyerId: props.certainItem.buyerId,
				demType: demType,
				userId: gameInfo.id,
				expected: expected.value,
				inputNumValue: inputNumValue.value,
			},
		})
		.then((res) => {
			if(res.result) {
				// 关闭弹窗
				props.controlShowPop(false);
				props.updateData();
				
				// 实时更新资源数量
				if(res.result === 1) gameInfo.assets[demType] -= inputNumValue.value;
				gameInfo.assets[JEWEL] = roundToOneDecimal(
					gameInfo.assets[JEWEL] + expected.value
				);
				uni.hideLoading()
			}else {
				netWorkError()
			}
		});
}
</script>

<style lang="less">
.buyCellPopWrap {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.7);

  .board {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 73vw;
    height: 50vh;
    background: url("../static/market/table.png") no-repeat center center /
      contain;

    .close {
      position: absolute;
      top: 1vw;
      right: 1vw;
      width: 12vw;
      height: 12vw;
      background: url("../static/market/lamb-close.png") no-repeat center center /
        contain;
    }

    .gemImg {
      position: absolute;
      top: 8vw;
      width: 20vw;
      height: 20vw;
      background: no-repeat center center / contain;
    }

    .gemChName {
      position: absolute;
      top: 28vw;
    }

    .publishNum {
      position: absolute;
      top: 37.3vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 3vw;
      width: 81%;
      height: 12vw;
      padding: 0 3vw;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.1);

      .add {
        width: 7vw;
        height: 7vw;
        background: url("../static/market/add_btn.png") no-repeat center center /
          contain;
      }

      .sub {
        width: 7vw;
        height: 7vw;
        background: url("../static/market/sub_btn.png") no-repeat center center /
          contain;
      }

      .max {
        margin-left: 2.7vw;
        width: 9vw;
        height: 7vw;
        font-size: 3vw;
        text-align: center;
        line-height: 6vw;
        color: #863f10;
        background: url("../static/market/btn_frame.png") no-repeat center
          center / contain;
      }

      .inputWrap {
        flex: 1;
        margin: 0 2vw;
        height: 9vw;
        line-height: 9vw;
        text-align: center;
        border-radius: 3vw;
        background-color: #fff;
        border: black 1px solid;

        input {
          width: 100%;
          height: 100%;
        }
      }
    }

    .tip {
      position: absolute;
      width: 90%;
      height: 7vw;
      bottom: 28vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 3.1vw;
      padding: 0 5vw;
      box-sizing: border-box;

      .item {
        display: flex;
        align-items: center;

        .itemImg {
          width: 4vw;
          height: 4vw;
          background: no-repeat center center / contain;
          margin: 0 1vw;
        }
      }

      .own {
        width: 100%;
        margin-bottom: 3vw;
      }
    }

    .warn {
      position: absolute;
      bottom: 35vw;
      font-weight: normal;
      font-size: 3vw;
      color: red;
    }

    .confirmBtn {
      position: absolute;
      bottom: 11vw;
      width: 24vw;
      height: 10vw;
      text-align: center;
      color: aliceblue;
      line-height: 10vw;
      font-size: 3.4vw;
      background: url("../static/market/btn_Purple.png") no-repeat center center /
        contain;
    }
  }
}
</style>
