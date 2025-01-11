'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId } = event;

  // 查询 referralEarningsRecord 表中 referrerId 等于 userId 的记录
  const referralRecords = await db.collection('referralEarningsRecord')
    .where({
      referrerId: userId
    })
    .get();

  // 如果没有记录，直接返回空数组
  if (referralRecords.data.length === 0) {
    return [];
  }

  // 获取所有 userIds
  const userIds = referralRecords.data.map(record => record.userId);

  // 查询 user 表中对应的用户信息
  const users = await db.collection('user')
    .where({
      _id: db.command.in(userIds)
    })
    .get();

  // 将用户信息映射到 referralRecords 中
  const result = referralRecords.data.map(record => {
    const user = users.data.find(u => u._id === record.userId);
    return {
      avatar: user.avatar,
      userName: user.userName,
      gameID: user.gameID,
      createTime: record.createTime,
      type: record.type === 'direct' ? '直接推荐' : '间接推荐',
      amount: record.amount
    };
  });

  // 按照 createTime 从最新到最旧排序
  result.sort((a, b) => {
    return new Date(b.createTime) - new Date(a.createTime);
  });

  // 返回排序后的结果
  return result;
};