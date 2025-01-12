<template>
  <view class="userInfoWrap">
    <view class="infoBgc">
      <view class="closeBtn" @click="props.closeInfo"></view>
      <view class="wrap1">
        <!-- 头像区域 -->
        <view class="avatar" :style="`background-image: url(${avatarUrl});`" @click="changeAvatar">
          <view class="avatarTip" v-if="showAvatarTip">点击更换头像</view>
        </view>
        <view class="userName">
          <text>{{ gameInfo.userName }}</text>
          <text v-if="userInfo.isMerchant" class="merchantTag">(商人)</text>
        </view>
        <view class="desc">
          <text v-if="isFirstEdit">(首次免费修改)</text>
          <text v-else>(修改需消耗100能量石)</text>
        </view>
        <view class="editName" @click="openEditNamePop">
          <text>修改</text>
        </view>
      </view>

      <!-- 展示 gameID 和 inviteCode -->
      <view class="infoRow">
        <text class="infoText">游戏ID: {{ gameID }}</text>
        <text class="infoText">邀请码: {{ inviteCode }}</text>
      </view>

      <!-- 功能按钮区域 -->
      <view class="actionButtons">
        <view class="buttonRow">
          <view class="button" @click="() => {handleSendRecordPop(true)}">
            <text>转赠记录</text>
          </view>
          <view class="button" @click="() => {handleTransactionRecord(true)}">
            <text>交易记录</text>
          </view>
        </view>
        <view class="button" @click="handlePromoEarnings">
          <text>推广收益</text>
        </view>
      </view>
    </view>

    <!-- 修改名字弹窗 -->
    <view class="editPop" v-if="isShowEditPop">
      <view class="bgc">
        <view class="close" @click="closeEditNamePop"></view>
        <view class="confirm" @click="handleConfirm">
          <text>确定修改</text>
        </view>
        <view class="inputBgc">
          <input
            type="text"
            v-model="newName"
            maxlength="6"
            :auto-focus="true"
            placeholder="名字最大长度为6"
          />
        </view>
        <view class="tip" v-if="isShowTip">
          <text>能量石余额不足</text>
        </view>
      </view>
    </view>

    <!-- 二次确认弹窗 -->
    <view class="confirmPop" v-if="isShowConfirmPop">
      <view class="confirmBgc">
        <view class="confirmTitle">确认修改</view>
        <view class="confirmContent">
          <text>修改名字将消耗 100 能量石，是否继续？</text>
        </view>
        <view class="confirmButtons">
          <view class="confirmButton cancel" @click="isShowConfirmPop = false">
            <text>取消</text>
          </view>
          <view class="confirmButton ok" @click="handleRealConfirm">
            <text>确定</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 记录弹窗区域 -->
    <user-send-record-vue 
      v-if="isShowSendRecordPop" 
      @close="() => {handleSendRecordPop(false)}"
    />
    <user-transaction-record-vue
      v-if="isShowTransationPop"
      @close="() => {handleTransactionRecord(false)}"
    />
    <referral-earnings-record-vue
      v-if="isShowReferralPop"
      @close="() => {isShowReferralPop = false}"
    />
  </view>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
import { AVATAR, POWERSTONE, USERNAME, useGameInfoStore } from '../stores/gameInfo';
import Cache from '../utils/cache';
import userSendRecordVue from './userSendRecord.vue';
import userTransactionRecordVue from './userTransactionRecord.vue';
import referralEarningsRecordVue from './referralEarningsRecord.vue';
import { roundToOneDecimal } from '../utils/roundToOneDecimal';
import { getUserAssets } from '../utils/updateGameInfo';

const gameInfo = useGameInfoStore();
const props = defineProps(['closeInfo']);
const avatarUrl = ref(Cache.getCache(AVATAR) || '');
const userName = ref(Cache.getCache(USERNAME) || '');
const isShowEditPop = ref(false);
const isShowTip = ref(false);
const newName = ref('');
const isFirstEdit = ref(gameInfo.isFirst == 0);
const showAvatarTip = ref(false);
const isShowSendRecordPop = ref(false);
const isShowTransationPop = ref(false);
const isShowReferralPop = ref(false);
const isShowConfirmPop = ref(false); // 控制二次确认弹窗的显示和隐藏

// 从缓存中获取 userInfo
const userInfo = uni.getStorageSync('userInfo') || {};
const gameID = computed(() => userInfo.gameID || '');
const inviteCode = computed(() => userInfo.inviteCode || '');

// 打开修改名字弹窗
function openEditNamePop() {
  isShowEditPop.value = true;
}

// 关闭修改名字弹窗
function closeEditNamePop() {
  isShowEditPop.value = false;
  isShowTip.value = false;
  newName.value = '';
}

// 转赠记录弹窗控制
function handleSendRecordPop(type) {
  isShowSendRecordPop.value = type;
}

// 交易记录弹窗控制
function handleTransactionRecord(type) {
  isShowTransationPop.value = type;
}

// 推广收益弹窗控制
function handlePromoEarnings() {
  isShowReferralPop.value = true;
}

// 点击“确认修改”按钮
function handleConfirm() {
  if (!newName.value) return;

  if (!isFirstEdit.value && gameInfo.assets.powerStone < 100) {
    isShowTip.value = true;
    return;
  }

  // 显示二次确认弹窗
  isShowConfirmPop.value = true;
}

// 二次确认弹窗的“确定”按钮
async function handleRealConfirm() {
  isShowConfirmPop.value = false; // 关闭二次确认弹窗

  try {
    if (!isFirstEdit.value) {
      getUserAssets()
      const assetsDB = uniCloud.importObject('assets');
      await assetsDB.update(uni.getStorageSync('id'), POWERSTONE, -100);
    }

    const user = uniCloud.importObject('user');
    const id = uni.getStorageSync('id');
    await user.changeName(id, newName.value);

    // 更新本地数据
    userName.value = newName.value;
    Cache.setCache(USERNAME, newName.value);
    gameInfo.userName = newName.value;
    gameInfo.isFirst = 1;
    isFirstEdit.value = false;
		
		getUserAssets()
    closeEditNamePop();
    uni.showToast({ title: '修改成功', icon: 'success' });
  } catch (err) {
    console.error('修改失败', err);
    uni.showToast({ title: '修改失败', icon: 'none' });
  }
}

// 更换头像
async function changeAvatar() {
  showAvatarTip.value = false;
  try {
    const res = await uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
    });
    const tempFilePath = res.tempFilePaths[0];
    await uploadAvatarToUniCloud(tempFilePath);
  } catch (err) {
    console.error('选择图片失败', err);
    uni.showToast({ title: '选择图片失败', icon: 'none' });
  }
}

// 上传头像到 uniCloud 云存储
async function uploadAvatarToUniCloud(filePath) {
  uni.showLoading({ title: '上传中...' });

  try {
    // 1. 上传文件到云存储
    const result = await uniCloud.uploadFile({
      filePath,
      cloudPath: `avatars/${Date.now()}_${Math.random().toString(36).substring(2)}.jpg`,
    });

    // 2. 获取永久有效的 avatarUrl
    const avatarUrlValue = await getTempFileURL(result.fileID);

    // 3. 调用云函数更新用户头像
    const id = uni.getStorageSync('id');
    const updateResult = await uniCloud.callFunction({
      name: 'updateAvatar',
      data: { userId: id, avatarUrl: avatarUrlValue },
    });

    // 4. 根据云函数返回结果处理
    if (updateResult.result.code === 200) {
      // 更新本地缓存
      uni.setStorageSync('avatar', avatarUrlValue);
      avatarUrl.value = avatarUrlValue;
      // 更新 gameInfo 中的 avatar
      gameInfo.avatar = avatarUrlValue;

      // 提示用户
      uni.showToast({ title: '头像更新成功', icon: 'success' });
    } else {
      // 处理云函数返回的错误
      uni.showToast({ title: '头像更新失败', icon: 'none' });
      console.error('云函数返回错误:', updateResult.result.message);
    }
  } catch (err) {
    // 处理上传或云函数调用失败
    console.error('上传失败', err);
    uni.showToast({ title: '上传失败', icon: 'none' });
  } finally {
    // 隐藏加载状态
    uni.hideLoading();
  }
}

// 获取临时文件 URL
async function getTempFileURL(fileID) {
  if (!fileID) return '';
  try {
    const result = await uniCloud.getTempFileURL({ fileList: [fileID] });
    return result.fileList[0].tempFileURL;
  } catch (err) {
    console.error('获取文件 URL 失败', err);
    return '';
  }
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
  background-color: rgba(0, 0, 0, 0.7);
  color: black;

  .editPop {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);

    .bgc {
      position: absolute;
      top: 50vw;
      width: 50vw;
      height: 60vw;
      background: url('/static/home/table.png') no-repeat center center / contain;

      .tip {
        position: absolute;
        top: 28vw;
        left: 8.6vw;
        width: 30vw;
        text-align: center;
        font-size: 3vw;
        color: red;
      }

      .close {
        position: absolute;
        right: 2vw;
        top: 2vw;
        width: 6vw;
        height: 6vw;
        background: url('/static/home/close.png') no-repeat center center / contain;
      }

      .confirm {
        position: absolute;
        width: 22vw;
        height: 10vw;
        left: 13vw;
        bottom: 12.8vw;
        text-align: center;
        line-height: 9vw;
        font-weight: bold;
        color: beige;
        background: url('/static/home/btn_Green.png') no-repeat center center / contain;
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
        background-color: rgba(0, 0, 0, 0.1);

        input {
          margin-left: 3vw;
        }
      }
    }
  }

  .confirmPop {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1001;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);

    .confirmBgc {
      width: 70vw;
      padding: 5vw;
      background-color: #fff;
      border-radius: 3vw;
      text-align: center;

      .confirmTitle {
        font-size: 5vw;
        font-weight: bold;
        margin-bottom: 3vw;
      }

      .confirmContent {
        font-size: 4vw;
        margin-bottom: 5vw;
      }

      .confirmButtons {
        display: flex;
        justify-content: space-between;

        .confirmButton {
          width: 45%;
          padding: 2vw;
          border-radius: 2vw;
          font-size: 4vw;
          cursor: pointer;

          &.cancel {
            background-color: #ccc;
          }

          &.ok {
            background-color: #4cd964;
            color: #fff;
          }
        }
      }
    }
  }

  .infoBgc {
    position: relative;
    width: 85vw;
    height: 142vw;
    background: url('/static/home/table.png') no-repeat center center / contain;

    .closeBtn {
      position: absolute;
      z-index: 99;
      right: 3vw;
      top: 23vw;
      width: 8vw;
      height: 8vw;
      background: url('/static/home/close.png') no-repeat center center / contain;
    }

    .wrap1 {
      position: absolute;
      top: 18vw;
      left: 3vw;
      width: 100%;
      height: 100%;

      .avatar {
        position: absolute;
        width: 20vw;
        height: 20vw;
        border-radius: 50%;
        left: 28vw;
        top: 14vw;
        background: no-repeat center center / contain;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .avatarTip {
          position: absolute;
          bottom: -5vw;
          font-size: 3vw;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 1vw 2vw;
          border-radius: 2vw;
          white-space: nowrap;
        }
      }

      .userName {
        position: absolute;
        width: 42vw;
        text-align: center;
        top: 35.4vw;
        left: 12vw;
        font-weight: bold;
        font-size: 5vw;
        color: black;

        .merchantTag {
          color: red;
          font-weight: bold;
          margin-left: 1vw;
          font-size: 3vw;
        }
      }

      .desc {
        position: absolute;
        top: 45vw;
        left: 15vw;
        text-align: center;
        width: 50vw;
        font-size: 3vw;
        color: black;
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
        color: #fff;
      }
    }

    .infoRow {
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 69vw;
      left: 9vw;
      width: 78vw;
      display: flex;
      justify-content: space-between;
      font-size: 3.5vw;
      color: black;
      font-weight: bold;

      .infoText {
        width: 50%;
        box-sizing: border-box;
      }
    }

    .actionButtons {
      position: absolute;
      top: 75vw;
      left: 11vw;
      width: 60vw;
      display: flex;
      flex-direction: column;
      font-weight: bold;

      .buttonRow {
        display: flex;
        justify-content: left;
        width: 100%;
      }

      .button {
        width: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 2vw;
        text-align: center;
        color: black;
        font-size: 4vw;
        cursor: pointer;
        padding: 3vw;
        margin-right: 2vw;
        box-sizing: border-box;
        margin-top: 2vw;

        &:active {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
}
</style>