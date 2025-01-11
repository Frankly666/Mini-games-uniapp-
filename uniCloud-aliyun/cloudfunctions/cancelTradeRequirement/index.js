'use strict';

// 引入公共云函数
const updateUserResource = require('../common/updateUserResource'); // 引入更新用户资源模块

exports.main = async (event, context) => {
  const { userId, recordId, resourceType, resourceAmount, price, type } = event;

  const db = uniCloud.database();
  const transaction = await db.startTransaction(); // 开启事务

  try {
    if (type === 0) {
      // 取消出售记录
      // 1. 从 sellRequirement 表中删除记录
      await transaction.collection('sellRequirement').doc(recordId).remove();

      // 2. 调用公共云函数，返还资源给用户
      await updateUserResource(userId, resourceType, resourceAmount, transaction);
    } else if (type === 1) {
      // 取消求购记录
      // 1. 从 buyRequirement 表中删除记录
      await transaction.collection('buyRequirement').doc(recordId).remove();

      // 2. 计算需要返还的 jewel 数量，并保留两位小数
      const totalJewel = parseFloat((resourceAmount * price).toFixed(2));

      // 3. 调用公共云函数，返还 jewel 给用户
      await updateUserResource(userId, 'jewel', totalJewel, transaction);
    } else {
      throw new Error('无效的 type 值');
    }

    // 提交事务
    await transaction.commit();
    return {
      code: 0,
      message: '取消成功',
    };
  } catch (err) {
    // 回滚事务
    await transaction.rollback();
    return {
      code: -1,
      message: '取消失败',
      error: err.message,
    };
  }
};