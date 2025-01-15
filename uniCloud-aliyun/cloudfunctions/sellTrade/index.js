'use strict';
const redis = uniCloud.redis();
const updateUserResource = require('updateUserResource'); // 引入更新用户资源模块

exports.main = async (event, context) => {
  const { sellNum, id, sellPrice, gemType, userId, totalPrice, inputNumValue, sellerId } = event;

  const db = uniCloud.database();
  const transaction = await db.startTransaction();

  try {
    // 1. 获取 Redis 分布式锁
    const lockKey = `lock:${id}`;
    const lockValue = `lock:${userId}:${Date.now()}`;
    const lockAcquired = await redis.setnx(lockKey, lockValue);

    if (!lockAcquired) {
      return {
        code: -4, // 特定状态码，表示获取锁失败
        message: '操作过于频繁，请稍后重试',
      };
    }

    // 设置锁的过期时间，防止死锁
    await redis.expire(lockKey, 10); // 10秒后自动释放锁

    // 2. 查询云端当前的 sellNum
    const sellRequirementDoc = await db.collection('sellRequirement').doc(id).get();
    if (!sellRequirementDoc.data) {
      throw new Error('需求记录不存在');
    }

    const cloudSellNum = sellRequirementDoc.data[0].sellNum;
    console.log("cloudSellNum:", cloudSellNum, sellNum);

    // 3. 校验传入的 sellNum 是否与云端一致
    if (sellNum !== cloudSellNum) {
      return {
        code: -2, // 特定状态码，表示数据过期
        message: '请刷新同步'
      };
    }

    // 4. 获取购买者和发布者的 assets 记录
    const buyerAssets = await db.collection('assets').where({ userId }).get();
    const sellerAssets = await db.collection('assets').where({ userId: sellerId }).get();

    if (buyerAssets.data.length === 0 || sellerAssets.data.length === 0) {
      throw new Error('用户资产记录不存在');
    }

    const buyerAssetsId = buyerAssets.data[0]._id;
    const sellerAssetsId = sellerAssets.data[0]._id;

    // 5. 判断购买者和发布者是否是同一用户
    const isSameUser = userId === sellerId;

    // 6. 更新购买者和发布者的 jewel 资源
    if (isSameUser) {
      // 如果是同一用户，只需扣除手续费
      await updateUserResource(userId, 'jewel', -(totalPrice * 0.05), transaction);
    } else {
      // 如果是不同用户，更新双方的 jewel 资源
      await updateUserResource(sellerId, 'jewel', totalPrice * 0.95, transaction); // 发布者增加 95%
      await updateUserResource(userId, 'jewel', -totalPrice, transaction); // 购买者扣除全额
    }

    // 7. 更新购买者的资源（增加购买的资源）
    await transaction.collection('assets').doc(buyerAssetsId).update({
      [gemType]: db.command.inc(inputNumValue)
    });

    // 8. 添加交易记录
    await transaction.collection('transactionRecord').add({
      buyerId: userId,
      sellerId,
      transactionType: 1,
      transactionId: id,
      transactionNum: inputNumValue,
      transactionTime: new Date()
    });

    // 9. 更新需求状态
    if (cloudSellNum === inputNumValue) {
      // 如果需求全部完成，标记为已完成
      await transaction.collection('sellRequirement').doc(id).update({
				sellNum: 0,
        isFinished: true
      });
    } else {
      // 如果需求未全部完成，更新剩余数量
      await transaction.collection('sellRequirement').doc(id).update({
        sellNum: cloudSellNum - inputNumValue
      });
    }

    // 10. 提交事务
    await transaction.commit();

    // 释放 Redis 锁
    await redis.del(lockKey);

    // 返回成功信息
    return {
      code: 0,
      message: '交易成功',
      data: {
        isSameUser: isSameUser // 返回是否是同一用户
      }
    };
  } catch (e) {
    console.error('transaction error', e.message);
    await transaction.rollback(); // 回滚事务

    // 释放 Redis 锁
    await redis.del(lockKey);

    return {
      code: -1,
      message: e.message
    };
  }
};