'use strict';
const updateUserResource = require('updateUserResource'); // 引入更新用户资源模块

exports.main = async (event, context) => {
  // event 为客户端上传的参数
  console.log('event : ', event);
  const { buyNum, id, buyPrice, demType, userId, expected, inputNumValue, buyerId } = event;
  const db = uniCloud.database();
  const transaction = await db.startTransaction();

  try {
    // 1. 获取出售者和购买者的 assets 记录
    const sellerAssets = await db.collection('assets').where({ userId }).get();
    const buyerAssets = await db.collection('assets').where({ userId: buyerId }).get();

    if (sellerAssets.data.length === 0 || buyerAssets.data.length === 0) {
      throw new Error('用户资产记录不存在');
    }

    const sellerAssetsId = sellerAssets.data[0]._id;
    const buyerAssetsId = buyerAssets.data[0]._id;

    // 2. 判断出售者和购买者是否是同一用户
    const isSameUser = userId === buyerId;

    // 3. 扣除出售者的资源（如果不是同一用户）
    if (!isSameUser) {
      await updateUserResource(userId, demType, -inputNumValue, transaction); // 扣除出售的资源
    }

    // 4. 更新购买者的 jewel 资源（增加出售者应得的宝石）
    await updateUserResource(buyerId, 'jewel', expected, transaction);

    // 5. 添加交易记录
    await transaction.collection('transactionRecord').add({
      buyerId,
      sellerId: userId,
      transactionType: 2, // 2 表示出售交易
      transactionId: id,
      transactionNum: inputNumValue,
      transactionTime: new Date()
    });

    // 6. 更新求购需求状态
    if (buyNum === inputNumValue) {
      // 如果需求全部完成，标记为已完成
      await transaction.collection('buyRequirement').doc(id).update({
        isFinished: true
      });
    } else {
      // 如果需求未全部完成，更新剩余数量
      await transaction.collection('buyRequirement').doc(id).update({
        buyNum: buyNum - inputNumValue
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