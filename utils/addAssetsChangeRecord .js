// utils/addAssetsChangeRecord.js

/**
 * 添加资源变动记录的工具函数
 * @param {string} userId - 用户ID
 * @param {string} resourceType - 资源类型（如 diamond、resourceStone、powerStone 等）
 * @param {string} description - 描述信息
 * @returns {Promise<object>} - 返回云函数的调用结果
 */
export const addAssetsChangeRecord = async (userId, resourceType, description) => {
  try {
    // 调用云函数
    const result = await uniCloud.callFunction({
      name: 'addAssetsChangeRecord', // 云函数名称
      data: {
        userId,
        resourceType,
        description,
      },
    });

    if (result.result.code === 0) {
      return result.result.data; // 返回添加的记录信息
    } else {
      throw new Error(result.result.message);
    }
  } catch (err) {
    console.error('调用云函数失败:', err.message);
    throw err;
  }
};