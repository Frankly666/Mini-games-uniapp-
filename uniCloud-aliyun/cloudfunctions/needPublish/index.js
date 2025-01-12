'use strict';
const updateUserResource = require('updateUserResource'); // 引入更新用户资源模块

exports.main = async (event, context) => {
  // event 为客户端上传的参数
  console.log('event : ', event);
  const { addData, totalPrice, userId } = event;
  const db = uniCloud.database();
  const transaction = await db.startTransaction();

  try {
    // 1. 检查用户余额是否足够并扣除 jewel
    const resourceName = 'jewel'; // 资源名称
    const resourceAmount = -totalPrice; // 扣除的资源数量
    await updateUserResource(userId, resourceName, resourceAmount, transaction);

    // 2. 添加购买需求记录
    const res1 = await transaction.collection('buyRequirement').add(addData);

    // 3. 提交事务
    await transaction.commit();

    // 返回成功信息
    return {
      code: 0,
      message: '购买需求发布成功',
      data: {
        buyRequirementId: res1.id // 新增的购买需求记录 ID
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