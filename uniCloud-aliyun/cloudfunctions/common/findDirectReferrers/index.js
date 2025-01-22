'use strict';
const db = uniCloud.database(); // 初始化数据库实例
const redis = uniCloud.redis(); // 初始化 Redis 实例

/**
 * 查找当前用户的直接推荐用户（分页）
 * @param {string} userId - 用户 ID
 * @param {number} page - 当前页码
 * @param {number} limit - 每页条数
 * @returns {Promise<Array>} - 返回分页后的直接推荐用户列表
 */
module.exports = async function findDirectReferrers(userId, page = 1, limit = 5) {
  try {
    const cacheKey = `directReferrers:${userId}`; // Redis 缓存键名
    let allDirectReferrers = [];

    // 1. 尝试从 Redis 中获取缓存数据
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log('从 Redis 缓存中获取直接推荐用户数据');
      allDirectReferrers = JSON.parse(cachedData); // 解析缓存数据
    } else {
      console.log('从数据库查询直接推荐用户数据');
      // 2. 如果 Redis 中没有缓存数据，则从数据库查询
      const userInfo = await db.collection('user').where({ _id: userId }).get();
      if (userInfo.data.length === 0) {
        return []; // 如果用户不存在，返回空数组
      }

      const userPhone = userInfo.data[0].phone; // 获取当前用户的手机号

      // 3. 查找所有 pusherCode 等于当前用户 phone 的用户（直接推荐用户）
      const promotedUsers = await db.collection('user')
        .where({ pusherCode: userPhone })
        .get();

      allDirectReferrers = promotedUsers.data;

      // 4. 将查询结果缓存到 Redis
      await redis.set(cacheKey, JSON.stringify(allDirectReferrers), 'EX', 86400); // 缓存 24 小时（86400 秒）
    }

    // 5. 分页逻辑
    const startIndex = (page - 1) * limit; // 计算起始索引
    const endIndex = startIndex + limit; // 计算结束索引
    const paginatedResult = allDirectReferrers.slice(startIndex, endIndex); // 分页

    // 6. 返回分页结果
    return {
      data: paginatedResult,
      total: allDirectReferrers.length, // 返回总数量
      hasMore: endIndex < allDirectReferrers.length // 是否还有更多数据
    };
  } catch (err) {
    console.error('查找直接推荐用户失败:', err.message);
    throw err; // 抛出错误，由调用方处理
  }
};