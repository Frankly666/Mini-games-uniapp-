'use strict';
const db = uniCloud.database(); // 初始化数据库实例

/**
 * 递归查找推荐用户
 * @param {string} userId - 用户 ID
 * @param {Array} result - 结果数组（递归时传递）
 * @returns {Promise<Array>} - 返回当前用户所推广的用户信息列表
 */
async function findReferrersRecursive(userId, result = []) {
  try {
    // 1. 获取当前用户信息
    const userInfo = await db.collection('user').where({ _id: userId }).get();
    if (userInfo.data.length === 0) {
      return result; // 如果用户不存在，返回当前结果
    }

    const userPhone = userInfo.data[0].phone; // 获取当前用户的手机号

    // 2. 查找所有 pusherCode 等于当前用户 phone 的用户
    const promotedUsers = await db.collection('user').where({ pusherCode: userPhone }).get();

    // 3. 将找到的用户加入结果数组
    result.push(...promotedUsers.data);

    // 4. 递归查找每个推荐用户的推荐用户
    for (const user of promotedUsers.data) {
      await findReferrersRecursive(user._id, result); // 递归查找
    }

    return result;
  } catch (err) {
    console.error('查找推荐用户失败:', err.message);
    throw err; // 抛出错误，由调用方处理
  }
}

/**
 * 查找当前用户所推广的所有用户（直接推荐和间接推荐）
 * @param {string} userId - 用户 ID
 * @returns {Promise<Array>} - 返回当前用户所推广的用户信息列表
 */
module.exports = async function findSubReferrers(userId) {
  return findReferrersRecursive(userId);
};