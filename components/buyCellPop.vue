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
import { getUserAssets } from "../utils/updateGameInfo";
import { addAssetsChangeRecord, assetsNameMap } from "../utils/addAssetsChangeRecord ";

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
    const gemType = props.certainItem.gemType;

    // 如果输入的数值不合理直接跳出
    if (inputNumValue.value <= 0 || inputNumValue.value > sellNum) {
        showTips("数量有误");
        return;
    }
    // 如果超过自己的余额就直接跳出
    if (totalPrice.value > gameInfo.assets[JEWEL]) {
        handleShowWran(true);
        showTips("余额不足");
        return;
    }

    uni.showLoading({
        title: '购买中...',
        mask: true
    });

    // 进行数据库操作
    uniCloud.callFunction({
        name: "sellTrade",
        data: {
            sellNum: sellNum,
            id: id,
            sellPrice: sellPrice,
            sellerId: props.certainItem.sellerId,
            gemType: gemType,
            userId: uni.getStorageSync('id'),
            totalPrice: totalPrice.value,
            inputNumValue: inputNumValue.value,
        }
    }).then(res => {
        uni.hideLoading(); // 隐藏加载动画
        if (res.result.code === 0) {
            showTips("交易成功！");
            // 实时更新资源数量
            getUserAssets();

            // 需要加上用户所购买的石头,再减去用户花费的宝石
            addAssetsChangeRecord(uni.getStorageSync('id'), gemType, inputNumValue.value, `出售市场中购买${inputNumValue.value}个(单价${sellPrice}), 获得:`);
            addAssetsChangeRecord(uni.getStorageSync('id'), JEWEL, totalPrice.value, `出售市场中购买${assetsNameMap[gemType]}${inputNumValue.value}个(单价${sellPrice}),扣除:`);

            // 加上sellerId的宝石
            addAssetsChangeRecord(props.certainItem.sellerId, JEWEL, roundToOneDecimal(totalPrice.value * 0.95), `所发布的${assetsNameMap[gemType]}(单价${sellPrice})被购买${inputNumValue.value}个,共获得(减去5%手续费):`);

            // 关闭弹窗
            props.controlShowPop(false);
            props.updateData();
        } else if (res.result.code === -2) {
            // 数据过期，提示用户刷新
            showTips("请刷新同步数据");
            props.updateData(); // 刷新数据
        } else {
            // 其他错误
            showTips(`交易失败: ${res.result.message}`);
        }
    }).catch(err => {
        uni.hideLoading(); // 隐藏加载动画
        showTips("网络错误，请稍后重试");
        console.error('云函数调用失败:', err);
    });
}

// 出售操作逻辑
async function confirmNeedPublish() {
    const buyNum = props.certainItem.buyNum; // 这条需求的最大值
    const id = props.certainItem._id;
    const buyPrice = props.certainItem.buyPrice;
    const gemType = props.certainItem.gemType;

    // 确保输入值为正确范围
    if (inputNumValue.value <= 0 || inputNumValue.value > buyNum) {
        showTips("数量有误");
        return;
    }
    // 如果自己没那么多的宝石也直接跳出
    if (inputNumValue.value > gameInfo.assets[gemType]) {
        handleShowWran(true);
        showTips("余额不足");
        return;
    }

    uni.showLoading({
        title: '出售中...',
        mask: true
    });

    // 进行数据库操作
    uniCloud.callFunction({
        name: "needTrade",
        data: {
            buyNum: buyNum,
            id: id,
            buyPrice: buyPrice,
            buyerId: props.certainItem.buyerId,
            gemType: gemType,
            userId: uni.getStorageSync('id'),
            expected: expected.value,
            inputNumValue: inputNumValue.value,
        },
    })
    .then((res) => {
        uni.hideLoading(); // 隐藏加载动画
        if (res.result.code === 0) {
            showTips("交易成功！");
            // 实时更新资源数量
            getUserAssets();

            // 出售扣除用户的该类型的石头, 然后加上卖出成功得到的宝石
            addAssetsChangeRecord(uni.getStorageSync('id'), gemType, inputNumValue.value, `求购市场中出售${assetsNameMap[gemType]}(单价${buyPrice}), 扣除:`);
            addAssetsChangeRecord(uni.getStorageSync('id'), JEWEL, expected.value, `求购市场中出售${assetsNameMap[gemType]}${inputNumValue.value}个(单价${buyPrice}), 共获得(扣除5%手续费):`);

            // 需要向buyerId加上他所求购的石头
            addAssetsChangeRecord(props.certainItem.buyerId, gemType, inputNumValue.value, `所发布求购需求${assetsNameMap[gemType]}(单价${buyPrice}), 成功求购:`);

            // 关闭弹窗
            props.controlShowPop(false);
            props.updateData();
        } else if (res.result.code === -2) {
            // 数据过期，提示用户刷新
            showTips("请刷新同步数据");
            props.updateData(); // 刷新数据
        } else {
            // 其他错误
            showTips(`交易失败: ${res.result.message}`);
        }
    })
    .catch((err) => {
        uni.hideLoading(); // 隐藏加载动画
        showTips("网络错误，请稍后重试");
        console.error('云函数调用失败:', err);
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
    height: 90vw;
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
