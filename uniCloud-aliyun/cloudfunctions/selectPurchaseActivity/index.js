'use strict';
exports.main = async (event, context) => {
  const { userId } = event; // 从客户端传入的用户 ID
  const db = uniCloud.database();
  const now = new Date(); // 当前服务器时间

  try {
    // 查询用户已购买且未过期的活动记录
    const res = await db.collection('activityPurchaseRecord')
      .where({
        userId: userId, // 根据用户 ID 查询
        endTime: db.command.gt(now) // 结束时间大于当前时间
      })
      .get();

    // 返回未过期的活动详细信息及服务器时间
    return {
      code: 0,
      data: res.data.map(record => ({
        activityId: record.activityId, // 活动 ID
        name: record.name, // 礼包名字
        dailyReward: record.dailyReward, // 每日收获数量
        endTime: record.endTime, // 结束时间
        lastClaimTime: record.lastClaimTime // 最近一次领取时间
      })),
      serverTime: now.toISOString() // 返回最新的云端时间
    };
  } catch (err) {
    console.error('查询失败:', err);
    return {
      code: -1,
      message: '查询失败，请重试！'
    };
  }
};