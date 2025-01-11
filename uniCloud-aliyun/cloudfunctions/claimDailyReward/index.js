'use strict';
const updateUserResource = require('../common/updateUserResource'); // 引入公共模块

// 活动签到函数逻辑
exports.main = async (event, context) => {
  const { userId, activityId, dailyReward } = event;
  const db = uniCloud.database();
  const transaction = await db.startTransaction();

  try {
    // 1. 调用公共模块更新用户资源
    const resourceUpdateResult = await updateUserResource(
      userId,
      'diamond', // 资源名称
      dailyReward, // 资源数量
      transaction // 事务对象
    );

    // 2. 更新活动的 lastClaimTime
    const activityRecord = await db.collection('activityPurchaseRecord')
      .where({
        userId,
        activityId
      })
      .get();

    if (activityRecord.data.length === 0) {
      throw new Error('未找到活动记录');
    }

    const recordId = activityRecord.data[0]._id;

    await transaction.collection('activityPurchaseRecord').doc(recordId).update({
      lastClaimTime: new Date() // 更新为当前时间
    });

    // 3. 提交事务
    await transaction.commit();

    return {
      code: 0,
      message: '签到成功',
      data: resourceUpdateResult // 返回资源更新结果
    };
  } catch (err) {
    console.error('签到失败:', err.message);
    await transaction.rollback();
    return {
      code: -1,
      message: err.message
    };
  }
};