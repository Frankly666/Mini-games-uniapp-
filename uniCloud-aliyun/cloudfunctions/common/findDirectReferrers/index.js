'use strict';
const db = uniCloud.database(); // 初始化数据库实例

/**
 * 查找当前用户所推广的所有用户（直接推荐和间接推荐）
 * @param {string} userId - 用户 ID
 * @param {string} type - 查询类型（direct 或 indirect）
 * @param {number} page - 当前页码
 * @param {number} limit - 每页条数
 * @returns {Promise<Array>} - 返回当前用户所推广的用户信息列表
 */
module.exports = async function findSubReferrers(userId, type, page = 1, limit = 5) {
  try {
    const result = []; // 最终结果
    const queue = [userId]; // 使用队列存储待查找的用户 ID
    let currentPage = 1;

    // 循环处理队列中的用户
    while (queue.length > 0) {
      const currentUserId = queue.shift(); // 取出队列中的第一个用户 ID

      // 1. 获取当前用户信息
      const userInfo = await db.collection('user').where({ _id: currentUserId }).get();
      if (userInfo.data.length === 0) {
        continue; // 如果用户不存在，跳过
      }

      const userPhone = userInfo.data[0].phone; // 获取当前用户的手机号

      // 2. 查找所有 pusherCode 等于当前用户 phone 的用户
      const promotedUsers = await db.collection('user')
        .where({ pusherCode: userPhone })
        .skip((page - 1) * limit)
        .limit(limit)
        .get();

      // 3. 将找到的用户加入结果数组
      result.push(...promotedUsers.data);

      // 4. 如果是直接推荐用户，不需要继续查找间接推荐用户
      if (type === 'direct') {
        break;
      }

      // 5. 将找到的用户 ID 加入队列，继续查找他们的推荐用户
      for (const user of promotedUsers.data) {
        queue.push(user._id);
      }

      // 6. 如果已经达到分页限制，退出循环
      if (result.length >= limit) {
        break;
      }
    }

    return result;
  } catch (err) {
    console.error('查找推荐用户失败:', err.message);
    throw err; // 抛出错误，由调用方处理
  }
};