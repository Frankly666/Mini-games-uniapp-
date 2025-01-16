'use strict';

/**
 * 添加资源变动记录  
 * @param {string} userId - 用户ID
 * @param {string} resourceType - 资源类型（如 diamond、resourceStone、powerStone 等）
 * @param {string} description - 描述信息
 * @param {object} transaction - 事务对象（用于事务操作）
 * @param {Number} num - 数量
 * @returns {Promise<object>} - 返回添加的记录信息
 */
module.exports = function(userId, resourceType, num, description, transaction) {
  const db = uniCloud.database();
	const time = new Date().toISOString();

  return new Promise(async (resolve, reject) => {
    try {
      // 1. 插入记录到 assetsChangeRecord 表
      const result = await transaction.collection('assetsChangeRecord').add({
        userId,
        resourceType,
				num,
        description,
        time,
      });

      // 2. 返回添加的记录信息
      resolve({
        userId,
        resourceType,
				num,
        description,
        time,
        recordId: result.id, // 返回新记录的 _id
      });
    } catch (err) {
      reject(err);
    }
  });
};