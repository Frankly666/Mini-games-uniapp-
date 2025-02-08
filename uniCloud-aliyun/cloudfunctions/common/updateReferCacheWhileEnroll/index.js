'use strict';
const db = uniCloud.database(); // 初始化数据库实例
const redis = uniCloud.redis(); // 初始化 Redis 实例

/**
 * 查找当前用户的所有推荐用户（包括直接和间接推荐）
 * @param {string} userId - 用户 ID
 * @returns {Promise<Array>} - 返回当前用户的所有推荐用户列表
 */
async function findAllReferrers(userId) {
  const cacheKey = `referral:${userId}`; // Redis 缓存键名
  let result = [];

  // 1. 使用队列存储待查找的用户 ID
  const queue = [userId];
  const visited = new Set(); // 记录已访问的用户 ID，避免重复查询

  while (queue.length > 0) {
    const currentUserId = queue.shift(); // 取出队列中的第一个用户 ID

    // 如果已经访问过该用户，跳过
    if (visited.has(currentUserId)) {
      continue;
    }
    visited.add(currentUserId);

    // 2. 获取当前用户信息
    const userInfo = await db.collection('user').where({ _id: currentUserId }).get();
    if (userInfo.data.length === 0) {
      continue; // 如果用户不存在，跳过
    }

    const userPhone = userInfo.data[0].phone; // 获取当前用户的手机号

    // 3. 查找所有 pusherCode 等于当前用户 phone 的用户
    const promotedUsers = await db.collection('user')
      .where({ pusherCode: userPhone })
      .get();

    // 4. 将找到的用户加入结果数组
    result.push(...promotedUsers.data);

    // 5. 将找到的用户 ID 加入队列，继续查找他们的推荐用户
    for (const user of promotedUsers.data) {
      queue.push(user._id);
    }
  }

  // 6. 将查询结果缓存到 Redis
  await redis.set(cacheKey, JSON.stringify(result)); // 永久缓存

  return result;
}

/**
 * 更新指定用户 ID 数组的推荐关系缓存
 * @param {Array<string>} userIds - 用户 ID 数组
 * @returns {Promise<Object>} - 返回操作结果
 */
module.exports = async function updateReferCacheWhileEnroll(userIds) {
  try {
    if (!Array.isArray(userIds) || userIds.length === 0) {
      throw new Error('用户 ID 数组不能为空');
    }

    // 遍历用户 ID 数组并更新缓存
    for (const userId of userIds) {
      console.log(`开始更新用户 ${userId} 的推荐关系缓存`);
      await findAllReferrers(userId);
      console.log(`用户 ${userId} 的推荐关系缓存更新完成`);
    }

    return {
      code: 200,
      message: '缓存更新成功'
    };
  } catch (err) {
    console.error('更新缓存失败:', err.message);
    return {
      code: 500,
      message: '更新缓存失败',
      error: err.message
    };
  }
};