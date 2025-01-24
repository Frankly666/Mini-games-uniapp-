'use strict';
const findSubReferrers = require('findSubReferrers'); // 引入间接推荐模块
const db = uniCloud.database();

/**
 * 获取推荐用户的收益记录
 * @param {string} userId - 推荐人用户ID
 * @param {Array} subReferrerId - 推荐用户列表
 * @returns {Promise<Array>} - 返回包含用户信息和收益记录的数组
 */
async function getReferralEarnings(userId, subReferrerId) {
	console.log("查询收益记录:", userId, subReferrerId)

  // 批量查询推荐收益记录
  const earningsRecords = await db.collection('referralEarningsRecord')
      .where({
        referrerId: userId,
        userId: subReferrerId
      })
      .orderBy('createTime', 'desc') // 按 createTime 字段降序排列
      .get();
	

  // 构建结果数组
  return earningsRecords.data
}

exports.main = async (event, context) => {
  const { userId, subReferrerId } = event;
	console.log("推荐用户的收益ID:", event)

  try {
    // 获取推荐用户的收益记录
    const result = await getReferralEarnings(userId, subReferrerId);
		console.log("推荐用户的收益记录:", result)

    // 返回结果给客户端
    return {
      code: 200,
      data: result,
    };
  } catch (err) {
    console.error('云函数执行失败:', err.message);
    return {
      code: 500,
      message: '服务器内部错误',
      error: err.message
    };
  }
};