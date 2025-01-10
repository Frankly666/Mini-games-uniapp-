import { useGameInfoStore } from '@/stores/gameInfo'; // 导入 Pinia store
import { ID, USERNAME, PHONE, AVATAR, ISFIRST } from '../stores/gameInfo'; // 导入常量
import Cache from '../utils/cache'; // 导入缓存工具函数

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
      state.avatar = uni.getStorageSync(AVATAR);
      state.isFirst = userInfo.isFirst || 0;
    });
		

    console.log('从本地存储更新 gameInfo 成功');
  } else {
    console.warn('本地存储中未找到 userInfo');
  }
}


/**
 * 更新用户游戏信息的工具函数
 * @returns {Promise<void>}
 */
export const updateAssets = async () => {
  const gameInfoStore = useGameInfoStore(); // 获取 Pinia store 实例
  const userId = Cache.getCache('id'); // 从缓存中获取用户 ID

  if (!userId) {
    console.error('用户 ID 不存在');
    return;
  }

  try {
    // 1. 查询用户信息
    const userRes = await uniCloud.importObject('user').getUserById(userId);

    if (userRes.code !== 200 || !userRes.data) {
      console.error('查询用户信息失败:', userRes.message);
      return;
    }

    const userInfo = userRes.data;
    const id = userInfo._id; // 获取用户 ID

    // 2. 查询资产信息
    const assetsRes = await uniCloud.importObject('assets').select(id);
    console.log('assetsRes: ', assetsRes);

    if (assetsRes.res.affectedDocs === 0 || !assetsRes.res.data) {
      console.error('查询资产信息失败:', assetsRes.message);
      return;
    }

    // 3. 更新 gameInfo 状态
    gameInfoStore.$patch((state) => {
      state.assets = assetsRes.res.data[0];
    });

    console.log('用户资产信息更新成功');
  } catch (error) {
    console.error('初始化失败:', error);
  }
};