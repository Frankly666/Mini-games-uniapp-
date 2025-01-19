'use strict';

/**
 * 添加资源变动记录  
 * @param {string} userId - 用户ID
 * @param {string} resourceType - 资源类型（如 diamond、resourceStone、powerStone 等）
 * @param {number} num - 数量
 * @param {string} description - 描述信息
 * @param {object} [transaction] - 可选的事务对象（用于事务操作）
 * @returns {Promise<object>} - 返回添加的记录信息
 */
module.exports = function(userId, resourceType, num, description, transaction) {
  const db = uniCloud.database();
  const time = new Date().toISOString();

  return new Promise(async (resolve, reject) => {
    try {
      let result;

      if (transaction) {
        // 如果有事务对象，使用事务操作
        result = await transaction.collection('assetsChangeRecord').add({
          userId,
          resourceType,
          num,
          description,
          time,
        });
      } else {
        // 如果没有事务对象，直接使用数据库操作
        result = await db.collection('assetsChangeRecord').add({
          userId,
          resourceType,
          num,
          description,
          time,
        });
      }

      // 返回添加的记录信息
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