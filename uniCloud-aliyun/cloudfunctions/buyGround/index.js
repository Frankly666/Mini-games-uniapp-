'use strict';
const db = uniCloud.database();
const updateUserResource = require('updateUserResource'); // 引入更新用户资源模块

// 购买地皮的逻辑
exports.main = async (event, context) => {
  // event为客户端上传的参数
  console.log('event : ', event);

  const { addUserGroundData, userId, unlockFunds, duration } = event;
  const transaction = await db.startTransaction();
	
	const now = new Date();
	const timestamp = now.getTime();
	const newTimestamp = timestamp + duration * 24 * 3600 * 1000;
	const newDate = new Date(newTimestamp);
	addUserGroundData.endTime = newDate.toISOString();
	addUserGroundData.rentTime = now.toISOString();
	 

  try {
    // 1. 添加地皮记录，初始化 lastSignInTime 为 null
    const res1 = await transaction.collection('userGrounds').add({
      ...addUserGroundData,
    });

    // 2. 调用公共模块更新用户资产（减少 powerStone）
    await updateUserResource(userId, 'powerStone', -unlockFunds, transaction);

    // 3. 提交事务
    await transaction.commit();
    return {
      code: 0,
      message: '操作成功',
      data: {
        groundId: res1.id // 返回新添加的地皮记录 ID
      }
    };
  } catch (e) {
    console.error('操作失败:', e.message);
    await transaction.rollback();
    return {
      code: -1,
      message: '操作失败，请重试'
    };
  }
};