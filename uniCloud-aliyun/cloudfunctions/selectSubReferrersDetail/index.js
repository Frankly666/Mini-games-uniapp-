'use strict';
const findSubReferrers = require('findSubReferrers'); // 引入明细模块
const db = uniCloud.database();

/**
 * 获取推荐用户的收益记录
 * @param {string} userId - 推荐人用户ID
 * @param {Array} subReferrers - 推荐用户列表
 * @returns {Promise<Array>} - 返回包含用户信息和收益记录的数组
 */
async function getReferralEarnings(userId, subReferrers) {
  const subReferrerIds = subReferrers.map(user => user._id); // 提取所有推荐用户的ID

  // 批量查询推荐收益记录
  const earningsRecords = await db.collection('referralEarningsRecord')
    .where({
      referrerId: userId,
      userId: db.command.in(subReferrerIds) // 使用 in 操作符批量查询
    })
    .get();

  // 将收益记录按 userId 分组
  const earningsMap = earningsRecords.data.reduce((map, record) => {
    if (!map[record.userId]) {
      map[record.userId] = [];
    }
    map[record.userId].push(record);
    return map;
  }, {});

  // 构建结果数组
  return subReferrers.map(user => ({
    userInfo: user,
    recordList: earningsMap[user._id] || [] // 如果没有收益记录，返回空数组
  }));
}

exports.main = async (event, context) => {
  const { userId } = event;

  try {
    // 获取所有推荐的用户
    const subReferrers = await findSubReferrers(userId);

    // 获取推荐用户的收益记录
    const result = await getReferralEarnings(userId, subReferrers);

    // 返回结果给客户端
    return result;
  } catch (err) {
    console.error('云函数执行失败:', err.message);
    return {
      code: 500,
      message: '服务器内部错误',
      error: err.message
    };
  }
};