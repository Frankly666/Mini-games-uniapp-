'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId, resourceType } = event;

  // 查询 assetsChangeRecord 表
  const res = await db.collection('assetsChangeRecord')
    .where({
      userId: userId,
      resourceType: resourceType
    })
    .orderBy('time', 'desc') // 按时间降序排列
    .get();

  return {
    code: 200,
    data: res.data
  };
};