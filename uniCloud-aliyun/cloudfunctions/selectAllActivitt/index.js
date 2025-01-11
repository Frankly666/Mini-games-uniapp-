'use strict';
exports.main = async (event, context) => {
  const { userId } = event; // 从客户端传入的用户 ID
  const db = uniCloud.database();
  const now = new Date(); // 当前时间

  try {
    // 查询用户已购买的所有活动记录
    const res = await db.collection('activityPurchaseRecord')
      .where({
        userId: userId, // 根据用户 ID 查询
      })
      .get();

    // 返回所有活动记录，并标记是否过期
    return {
      code: 0,
      data: res.data.map(record => ({
        activityId: record.activityId, // 活动 ID
        name: record.name, // 礼包名字
        dailyReward: record.dailyReward, // 每日收获数量
        endTime: record.endTime, // 结束时间
        lastClaimTime: record.lastClaimTime, // 最近一次领取时间
        isExpired: new Date(record.endTime) < now // 是否已过期
      }))
    };
  } catch (err) {
    console.error('查询失败:', err);
    return {
      code: -1,
      message: '查询失败，请重试！'
    };
  }
};