'use strict';

// 引入公共云函数
const updateUserResource = require('../common/updateUserResource'); // 引入更新用户资源模块
const addAssetsChangeRecord = require('../common/addAssetsChangeRecord');
const { assetsNameMap } = require('../common/const'); // 引入资源名称映射表

exports.main = async (event, context) => {
  const { userId, recordId, resourceType, resourceAmount, price, type } = event;

  const db = uniCloud.database();
  const transaction = await db.startTransaction(); // 初始化事务
  let description = '';

  try {
    if (type === 0) {
      // 取消出售记录
      // 1. 从 sellRequirement 表中删除记录
      await transaction.collection('sellRequirement').doc(recordId).remove();

      // 2. 调用公共云函数，返还资源给用户
      await updateUserResource(userId, resourceType, resourceAmount, transaction);

      // 3. 记录这次资源的变动信息
      description = `交易集市中取消出售${assetsNameMap[resourceType]}, 共返回${resourceAmount}个`;
      await addAssetsChangeRecord(userId, resourceType, description, new Date(), transaction);
    } else if (type === 1) {
      // 取消求购记录
      // 1. 从 buyRequirement 表中删除记录
      await transaction.collection('buyRequirement').doc(recordId).remove();

      // 2. 计算需要返还的 jewel 数量，并保留两位小数
      const totalJewel = parseFloat((resourceAmount * price).toFixed(2));

      // 3. 调用公共云函数，返还 jewel 给用户
      await updateUserResource(userId, 'jewel', totalJewel, transaction);

      // 4. 记录这次资源的变动
      description = `交易集市中取消求购${assetsNameMap[resourceType]}${resourceAmount}个单价为${price}, 共返回${totalJewel}个`;
      await addAssetsChangeRecord(userId, 'jewel', description, new Date(), transaction);
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