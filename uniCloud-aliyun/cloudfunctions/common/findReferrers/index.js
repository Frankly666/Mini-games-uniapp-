'use strict';

const db = uniCloud.database(); // 初始化数据库实例

/**
 * 查找推荐人
 * @param {string} userId - 用户 ID
 * @returns {Promise<string[]>} - 返回推荐人 ID 列表
 */
module.exports = async function findReferrers(userId) {
  const MAX_DEPTH = 20; // 最大查找深度
  const referrers = []; // 推荐人列表
  const visitedUsers = new Set(); // 用于记录已访问的用户 ID，避免重复和循环
  let currentUserId = userId; // 当前用户 ID
  let depth = 0; // 当前查找深度

  try {
    while (depth < MAX_DEPTH) {
      console.log(`当前查找深度: ${depth}, 当前用户 ID: ${currentUserId}`);

      // 1. 检查是否已经访问过当前用户
      if (visitedUsers.has(currentUserId)) {
        console.warn('检测到循环推荐关系，停止查找');
        break;
      }
      visitedUsers.add(currentUserId); // 标记当前用户为已访问

      // 2. 获取当前用户信息
      const userInfo = await db.collection('user').doc(currentUserId).get(); // 使用 doc 查询用户信息
      console.log('用户信息:', userInfo.data);

      if (!userInfo.data || userInfo.data.length === 0) {
        console.warn('用户不存在，退出查找');
        break; // 如果用户不存在，退出循环
      }

      const userData = userInfo.data[0]; // 获取用户数据（数组中的第一个元素）
      const pusherCode = userData.pusherCode; // 获取推荐人手机号
      console.log('推荐人手机号:', pusherCode);

      if (!pusherCode) {
        console.warn('用户没有推荐人，退出查找');
        break; // 如果没有推荐人，退出循环
      }

      // 3. 查找推荐人信息
      const referrerQuery = await db.collection('user').where({ phone: pusherCode }).get(); // 使用 where 查询推荐人信息
      console.log('推荐人查询结果:', referrerQuery.data);

      if (referrerQuery.data.length === 0) {
        console.warn('推荐人不存在，退出查找');
        break; // 如果推荐人不存在，退出循环
      }

      const referrerId = referrerQuery.data[0]._id; // 获取推荐人 ID
      console.log('推荐人 ID:', referrerId);

      // 4. 检查是否已经存在推荐人列表中（避免重复）
      if (referrers.includes(referrerId)) {
        console.warn('推荐人已存在，停止查找');
        break;
      }

      referrers.push(referrerId); // 将推荐人 ID 加入列表
      console.log('当前推荐人列表:', referrers);

      // 5. 更新当前用户 ID 为推荐人 ID，继续查找
      currentUserId = referrerId;
      depth++; // 增加查找深度
    }

    return referrers; // 返回推荐人列表
  } catch (err) {
    console.error('查找推荐人失败:', err.message);
    throw err; // 抛出错误，由调用方处理
  }
};