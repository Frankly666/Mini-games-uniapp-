'use strict';
const db = uniCloud.database();
const updateUserResource = require('updateUserResource'); // 引入更新用户资源模块

// 购买地皮的逻辑
exports.main = async (event, context) => {
  // event为客户端上传的参数
  console.log('event : ', event);

  const { addUserGroundData, userId, unlockFunds, duration } = event;
  const transaction = await db.startTransaction();
	console.log("事务对象:", transaction.id)

  const now = new Date(); // 当前时间
  const endDate = new Date(now);
  endDate.setDate(now.getDate() + duration);
  // 将结束时间设置为当天的0点
  endDate.setHours(0, 0, 0, 0);
  addUserGroundData.endTime = endDate.toISOString();
  addUserGroundData.rentTime = now.toISOString();

  try {
    // 1. 查询 userGrounds 表中是否存在相同 userId、groundType 和 groundIndex 的记录
    const existingGround = await db.collection('userGrounds')
      .where({
        userId: userId,
        groundType: addUserGroundData.groundType,
        groundIndex: addUserGroundData.groundIndex
      })
      .get();
			
			console.log("重复的结果:", existingGround.data)

    // 如果存在相同记录，返回错误信息
    if (existingGround.data.length > 0) {
      return {
        code: -1,
        message: '已解锁该地皮, 请刷新'
      };
    }

    // 2. 添加地皮记录，初始化 lastSignInTime 为 null
    const res1 = await transaction.collection('userGrounds').add({
      ...addUserGroundData,
    });

    // 3. 调用公共模块更新用户资产（减少 powerStone）
    await updateUserResource(userId, 'powerStone', -unlockFunds, transaction);

    // 4. 提交事务
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