'use strict';
exports.main = async (event, context) => {
  const { userId, earnings } = event;
  const db = uniCloud.database();
  const transaction = await db.startTransaction();

  try {
    // 1. 查找用户的 assets 记录
    const userAssets = await db.collection('assets').where({ userId }).get();
    if (userAssets.data.length === 0) {
      throw new Error('用户资产记录不存在');
    }
    const assetsId = userAssets.data[0]._id;
    const nowPowerStone = userAssets.data[0].powerStone;

    // 2. 增加用户能量石
    const newPowerStone = parseFloat((nowPowerStone + earnings).toFixed(2)); // 保留两位小数
    await transaction.collection('assets').doc(assetsId).update({
      powerStone: newPowerStone
    });

    // 3. 查找所有未过期且需要更新的 userGrounds 记录
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 将时间部分归零，只比较日期

    const userGroundsRecords = await db.collection('userGrounds')
      .where({
        userId,
        endTime: db.command.gt(new Date()) // 未过期
      })
      .get();

    // 4. 更新符合条件的 userGrounds 记录的 lastClaimTime
    for (const record of userGroundsRecords.data) {
      const lastClaimTime = record.lastClaimTime ? new Date(record.lastClaimTime) : null;
      if (!lastClaimTime || lastClaimTime < today) {
        await transaction.collection('userGrounds').doc(record._id).update({
          lastClaimTime: new Date() // 更新为当前时间
        });
      }
    }

    // 5. 提交事务
    await transaction.commit();

    return {
      code: 0,
      message: '签到成功'
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