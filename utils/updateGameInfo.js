import { useGameInfoStore } from '@/stores/gameInfo'; // 导入 Pinia store
import { ID, USERNAME, PHONE, AVATAR, ISFIRST } from '../stores/gameInfo'; // 导入常量

/**
 * 从本地存储中获取用户信息并更新 gameInfo
 */
export function updateGameInfoFromStorage() {
  const gameInfoStore = useGameInfoStore(); // 获取 Pinia store 实例

  // 从本地存储中获取用户信息
  const userInfo = uni.getStorageSync('userInfo');

  if (userInfo) {
    // 更新 gameInfo 状态
    gameInfoStore.$patch((state) => {
      state.id = userInfo.userId || '';
      state.userName = userInfo.userName || '';
      state.phone = userInfo.phone || '';
      state.avatar = userInfo.avatar || '';
      state.isFirst = userInfo.isFirst || 0;
    });

    console.log('从本地存储更新 gameInfo 成功');
  } else {
    console.warn('本地存储中未找到 userInfo');
  }
}