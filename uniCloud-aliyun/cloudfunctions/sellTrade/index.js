'use strict';
const updateUserResource = require('updateUserResource'); // 引入更新用户资源模块

exports.main = async (event, context) => {
  // event 为客户端上传的参数
  console.log('event : ', event);
  const { sellNum, id, sellPrice, gemType, userId, totalPrice, inputNumValue, sellerId } = event;
  const db = uniCloud.database();
  const transaction = await db.startTransaction();

  try {
    // 1. 获取购买者和发布者的 assets 记录
    const buyerAssets = await db.collection('assets').where({ userId }).get();
    const sellerAssets = await db.collection('assets').where({ userId: sellerId }).get();

    if (buyerAssets.data.length === 0 || sellerAssets.data.length === 0) {
      throw new Error('用户资产记录不存在');
    }

    const buyerAssetsId = buyerAssets.data[0]._id;
    const sellerAssetsId = sellerAssets.data[0]._id;
    const buyerJewel = buyerAssets.data[0].jewel;
    const sellerJewel = sellerAssets.data[0].jewel;

    // 2. 判断购买者和发布者是否是同一用户
    const isSameUser = userId === sellerId;

    // 3. 更新购买者和发布者的 jewel 资源
    if (isSameUser) {
      // 如果是同一用户，只需扣除手续费
      await updateUserResource(userId, 'jewel', -(totalPrice * 0.05), transaction);
    } else {
      // 如果是不同用户，更新双方的 jewel 资源
      await updateUserResource(sellerId, 'jewel', totalPrice * 0.95, transaction); // 发布者增加 95%
      await updateUserResource(userId, 'jewel', -totalPrice, transaction); // 购买者扣除全额
    }

    // 4. 更新购买者的资源（增加购买的资源）
    await transaction.collection('assets').doc(buyerAssetsId).update({
      [gemType]: db.command.inc(inputNumValue)
    });

    // 5. 添加交易记录
    await transaction.collection('transactionRecord').add({
      buyerId: userId,
      sellerId,
      transactionType: 1,
      transactionId: id,
      transactionNum: inputNumValue,
      transactionTime: new Date()
    });

    // 6. 更新需求状态
    if (sellNum === inputNumValue) {
      // 如果需求全部完成，标记为已完成
      await transaction.collection('sellRequirement').doc(id).update({
        isFinished: true
      });
    } else {
      // 如果需求未全部完成，更新剩余数量
      await transaction.collection('sellRequirement').doc(id).update({
        sellNum: sellNum - inputNumValue
      });
    }

    // 7. 提交事务
    await transaction.commit();

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
    return {
      code: -1,
      message: e.message
    };
  }
};