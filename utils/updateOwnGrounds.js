import { useGameInfoStore } from '../stores/gameInfo';

export async function updateOwnGrounds() {
  const gameInfo = useGameInfoStore();
  const userId = uni.getStorageSync('id');

  try {
    if (!userId) {
      console.error('用户 ID 为空');
      return;
    }

    // 调用云函数
    const res = await uniCloud.callFunction({
      name: 'selectGrounds', // 云函数名称
      data: { userId } // 传入参数
    });

    console.log('云函数返回结果:', res); // 打印云函数返回结果

    if (res.result.code === 0) {
      const classifyGrounds = res.result.data;
      gameInfo.ownGrounds = classifyGrounds; // 更新 Pinia 状态
    } else {
      console.error('云函数调用失败:', res.result.message);
    }
  } catch (error) {
    console.error('updateOwnGrounds 出错:', error.message);
  }
}