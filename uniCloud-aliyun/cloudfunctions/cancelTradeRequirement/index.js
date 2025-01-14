'use strict';

// 引入公共云函数
const updateUserResource = require('updateUserResource'); // 引入更新用户资源模块
const { assetsNameMap } = require('const'); // 引入资源名称映射表

exports.main = async (event, context) => {
  const { userId, recordId, resourceType, resourceAmount, price, type } = event;

  const db = uniCloud.database();
  const transaction = await db.startTransaction(); // 初始化事务

  try {
    // 1. 根据 type 查询云端当前的资源数量
    let cloudResourceAmount;
    if (type === 0) {
      // 取消出售记录
      const sellRequirementDoc = await db.collection('sellRequirement').doc(recordId).get();
      if (!sellRequirementDoc.data) {
        return {
          code: -3, // 特定状态码，表示数据过期
          message: '该条记录已被取消',
        };
      }
      cloudResourceAmount = sellRequirementDoc.data[0].sellNum;
    } else if (type === 1) {
      // 取消求购记录
      const buyRequirementDoc = await db.collection('buyRequirement').doc(recordId).get();
      if (!buyRequirementDoc.data) {
        return {
          code: -3, // 特定状态码，表示数据过期
          message: '该条记录已被取消',
        };
      }
      cloudResourceAmount = buyRequirementDoc.data[0].buyNum;
    } else {
      throw new Error('无效的 type 值');
    }

    // 2. 校验传入的 resourceAmount 是否与云端一致
    if (resourceAmount !== cloudResourceAmount) {
      return {
        code: -2, // 特定状态码，表示数据过期
        message: '数据已过期，请刷新后重试',
      };
    }

    // 3. 根据 type 执行取消操作
    if (type === 0) {
      // 取消出售记录
      // 1. 从 sellRequirement 表中删除记录
      await transaction.collection('sellRequirement').doc(recordId).remove();

      // 2. 调用公共云函数，返还资源给用户
      await updateUserResource(userId, resourceType, resourceAmount, transaction);
      console.log('资源信息记录:', userId, resourceType, resourceAmount);
    } else if (type === 1) {
      // 取消求购记录
      // 1. 从 buyRequirement 表中删除记录
      await transaction.collection('buyRequirement').doc(recordId).remove();

      // 2. 计算需要返还的 jewel 数量，并保留两位小数
      const totalJewel = parseFloat((resourceAmount * price).toFixed(2));

      // 3. 调用公共云函数，返还 jewel 给用户
      await updateUserResource(userId, 'jewel', totalJewel, transaction);
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