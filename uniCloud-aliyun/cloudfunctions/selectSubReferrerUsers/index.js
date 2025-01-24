'use strict';
const findSubReferrers = require('findSubReferrers'); // 引入间接推荐模块
const db = uniCloud.database();

// 只获取推荐用户, 不携带收益记录
exports.main = async (event, context) => {
  const { userId, page = 1, limit = 5 } = event;

  try {
    let subReferrers;
		
		// 分页查询所有的推荐用户
		subReferrers = await findSubReferrers(userId, page, limit);
		console.log("间接用户的结果:", subReferrers)


    // 返回结果给客户端
    return {
      code: 200,
      data: subReferrers.data,
      hasMore: subReferrers.hasMore,
			directNum: subReferrers.directNum,
			indirectNum: subReferrers.indirectNum,
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