'use strict';

/**
 * 更新用户资源
 * @param {string} userId - 用户ID
 * @param {string} resourceName - 资源名称（如 jewel、coin 等）
 * @param {number} resourceAmount - 资源数量（可以是正数或负数）
 * @param {object} transaction - 事务对象（用于事务操作）
 * @returns {Promise<object>} - 返回更新后的资源信息
 */
module.exports = function(userId, resourceName, resourceAmount, transaction) {
  const db = uniCloud.database();

  return new Promise(async (resolve, reject) => {
    try {
      // 1. 查找用户的 assets 记录
      const userAssets = await db.collection('assets').where({ userId }).get();
      if (userAssets.data.length === 0) {
        throw new Error('用户资产记录不存在');
      }

      const assetsId = userAssets.data[0]._id;
      const currentResource = userAssets.data[0][resourceName] || 0; // 如果资源不存在，默认为 0

      // 2. 计算新的资源值
      const newResource = parseFloat((currentResource + resourceAmount).toFixed(2)); // 保留两位小数
			
			if (newResource < 0) {
				throw new Error('请刷新页面后重试');
			}
			
      // 3. 更新资源
      await transaction.collection('assets').doc(assetsId).update({
        [resourceName]: newResource
      });

      resolve({
        userId,
        resourceName,
        newResource
      });
    } catch (err) {
      reject(err);
    }
  });
};