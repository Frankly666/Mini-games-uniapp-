'use strict';

const db = uniCloud.database(); // 初始化数据库实例

/**
 * 递归查找推荐人
 * @param {string} userId - 用户 ID
 * @param {string[]} referrers - 推荐人列表（递归时传递）
 * @returns {Promise<string[]>} - 返回推荐人 ID 列表
 */
module.exports = async function findReferrers(userId, referrers = []) {
  try {
    // 1. 获取当前用户信息
    const userInfo = await db.collection('user').where({ _id: userId }).get();
    if (userInfo.data.length === 0) {
      return referrers; // 如果用户不存在，返回当前结果
    }

    const pusherCode = userInfo.data[0].pusherCode; // 获取推荐人手机号
    if (!pusherCode) {
      return referrers; // 如果没有推荐人，返回当前结果
    }

    // 2. 查找推荐人信息
    const referrerInfo = await db.collection('user').where({ phone: pusherCode }).get();
    if (referrerInfo.data.length === 0) {
      return referrers; // 如果推荐人不存在，返回当前结果
    }

    const referrerId = referrerInfo.data[0]._id; // 获取推荐人 ID
    referrers.push(referrerId); // 将推荐人 ID 加入列表

    // 3. 递归查找推荐人的推荐人
    return findReferrers(referrerId, referrers);
  } catch (err) {
    console.error('查找推荐人失败:', err.message);
    throw err; // 抛出错误，由调用方处理
  }
};