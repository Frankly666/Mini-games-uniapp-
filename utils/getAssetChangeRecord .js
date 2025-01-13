export const getAssetChangeRecord = async (resourceType) => {
  const userId = uni.getStorageSync('id'); // 获取用户ID

  try {
    const res = await uniCloud.callFunction({
      name: 'getAssetsChangeRecord',
      data: {
        userId: userId,
        resourceType: resourceType
      }
    });

    if (res.result.code === 200) {
      return res.result.data; // 返回查询结果
    } else {
      console.error('查询失败:', res.result);
      return [];
    }
  } catch (err) {
    console.error('调用云函数失败:', err);
    return [];
  }
};