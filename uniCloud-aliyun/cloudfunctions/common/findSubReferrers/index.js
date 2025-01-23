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

  // 1. 尝试从 Redis 中获取缓存数据
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    console.log('从 Redis 缓存中获取数据');
    return JSON.parse(cachedData); // 返回缓存数据
  }

  // 2. 如果 Redis 中没有缓存数据，则从数据库查询
  console.log('从数据库查询数据');
  const queue = [userId]; // 使用队列存储待查找的用户 ID
  const visited = new Set(); // 记录已访问的用户 ID，避免重复查询

  while (queue.length > 0) {
    const currentUserId = queue.shift(); // 取出队列中的第一个用户 ID

    // 如果已经访问过该用户，跳过
    if (visited.has(currentUserId)) {
      continue;
    }
    visited.add(currentUserId);

    // 3. 获取当前用户信息
    const userInfo = await db.collection('user').where({ _id: currentUserId }).get();
    if (userInfo.data.length === 0) {
      continue; // 如果用户不存在，跳过
    }

    const userPhone = userInfo.data[0].phone; // 获取当前用户的手机号

    // 4. 查找所有 pusherCode 等于当前用户 phone 的用户
    const promotedUsers = await db.collection('user')
      .where({ pusherCode: userPhone })
      .get();

    // 5. 将找到的用户加入结果数组
    result.push(...promotedUsers.data);

    // 6. 将找到的用户 ID 加入队列，继续查找他们的推荐用户
    for (const user of promotedUsers.data) {
      queue.push(user._id);
    }
  }

  // 7. 将查询结果缓存到 Redis
  await redis.set(cacheKey, JSON.stringify(result), 'EX', 86400); // 缓存 24 小时（86400 秒）

  return result;
}

/**
 * 查找当前用户的间接推荐用户（分页）
 * @param {string} userId - 用户 ID
 * @param {number} page - 当前页码
 * @param {number} limit - 每页条数
 * @returns {Promise<Array>} - 返回分页后的间接推荐用户列表
 */
module.exports = async function findIndirectReferrersWithPagination(userId, page = 1, limit = 5) {
  try {
    // 1. 获取当前用户的 phone
    const currentUser = await db.collection('user').where({ _id: userId }).get();
    if (currentUser.data.length === 0) {
      throw new Error('当前用户不存在');
    }
    const currentUserPhone = currentUser.data[0].phone;

    // 2. 获取所有推荐用户
    const allReferrers = await findAllReferrers(userId);

    // 3. 过滤出间接推荐用户
    const allIndirectReferrers = allReferrers.filter(user => user.pusherCode !== currentUserPhone);

    // 4. 分页逻辑
    const startIndex = (page - 1) * limit; // 计算起始索引
    const endIndex = startIndex + limit; // 计算结束索引
    const paginatedResult = allReferrers.slice(startIndex, endIndex); // 分页

    console.log('所有推荐用户数量:', allReferrers.length);
    console.log('所有间接推荐用户数量:', allIndirectReferrers.length);

    // 5. 返回分页结果
    return {
      data: paginatedResult,
      total: allReferrers.length, // 返回总数量
      hasMore: endIndex < allReferrers.length, // 是否还有更多数据
			directNum: allReferrers.length - allIndirectReferrers.length,
			indirectNum: allIndirectReferrers.length
    };
  } catch (err) {
    console.error('查找间接推荐用户失败:', err.message);
    throw err; // 抛出错误，由调用方处理
  }
};