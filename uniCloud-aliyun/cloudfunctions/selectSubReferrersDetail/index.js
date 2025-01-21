'use strict';
const findDirectReferrers = require('findDirectReferrers'); // 引入直接推荐模块
const findIndirectReferrers = require('findIndirectReferrers'); // 引入间接推荐模块
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
      .orderBy('createTime', 'desc') // 按 createTime 字段降序排列
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
  const { userId, type, page = 1, limit = 5 } = event;

  try {
    let subReferrers;

    // 根据 type 调用不同的模块
    if (type === 'direct') {
      subReferrers = await findDirectReferrers(userId, page, limit); // 查询直接推荐用户
			console.log("直接用户的结果:", subReferrers)
    } else if (type === 'indirect') {
      subReferrers = await findIndirectReferrers(userId, page, limit); // 查询间接推荐用户
			subReferrers = subReferrers.data
			console.log("间接用户的结果:", subReferrers)
    } else {
      throw new Error('无效的查询类型');
    }
		
		

    // 获取推荐用户的收益记录
    const result = await getReferralEarnings(userId, subReferrers);

    // 返回结果给客户端
    return {
      code: 200,
      data: result,
      hasMore: subReferrers.length === limit // 判断是否还有更多数据
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