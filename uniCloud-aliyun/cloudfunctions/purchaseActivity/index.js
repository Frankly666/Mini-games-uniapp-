'use strict';
const updateUserResource = require('updateUserResource'); // 引入更新用户资源模块

exports.main = async (event, context) => {
  const { userId, activityId, price, duration, dailyReward, name } = event; // 新增 name
  const db = uniCloud.database();
  const transaction = await db.startTransaction();

  try {
    // 1. 检查用户余额是否足够并扣除 jewel
    const resourceName = 'jewel'; // 资源名称
    const resourceAmount = -price; // 扣除的资源数量
    const updateResult = await updateUserResource(userId, resourceName, resourceAmount, transaction);

    // 2. 添加购买记录到 activityPurchaseRecord 表
    const purchaseTime = new Date(); // 购买时间
		const startOfDay = new Date(purchaseTime);
		startOfDay.setHours(0, 0, 0, 0);
    const endTime = new Date(startOfDay.getTime() + duration * 24 * 60 * 60 * 1000); // 结束时间

    await transaction.collection('activityPurchaseRecord').add({
      userId,
      activityId,
      name, // 新增礼包名字
      purchaseTime,
      endTime,
      dailyReward, // 每日收获数量
      lastClaimTime: null // 最近一次领取时间，初始化为 null
    });

    // 3. 提交事务
    await transaction.commit();

    // 返回成功信息
    return {
      code: 0,
      message: '购买成功',
      data: {
        updatedResource: updateResult, // 更新后的资源信息
        purchaseTime: purchaseTime, // 购买时间
        endTime: endTime // 活动结束时间
      }
    };
  } catch (err) {
    console.error('购买失败:', err.message);
    await transaction.rollback(); // 回滚事务
    return {
      code: -1,
      message: err.message
    };
  }
};