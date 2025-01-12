'use strict';
const updateUserResource = require('updateUserResource'); // 引入更新用户资源模块

exports.main = async (event, context) => {
  // event 为客户端上传的参数
  console.log('event : ', event);
  const { userId, hirePrice, workerType, groundType, groundIndex, workerEndTime } = event;

  const db = uniCloud.database();
  const transaction = await db.startTransaction();

  try {
    // 1. 找到用户租用地皮记录的 id
    const userGrounds = await db.collection('userGrounds').where({ groundType }).get();
    let groundId = null;

    // 遍历找到指定 groundIndex 的地皮记录
    userGrounds.data.forEach(item => {
      if (item.groundIndex === groundIndex) {
        groundId = item._id;
      }
    });

    if (!groundId) {
      throw new Error('未找到对应的地皮记录');
    }

    // 2. 更新地皮记录（设置工人信息）
    await transaction.collection('userGrounds').doc(groundId).update({
      isHaveWorker: true,
      workerType: workerType,
      workerEndTime: workerEndTime
    });

    // 3. 更新用户资源（扣除 powerStone）
    const resourceName = 'powerStone'; // 资源名称
    const resourceAmount = -hirePrice; // 扣除的资源数量
    await updateUserResource(userId, resourceName, resourceAmount, transaction);

    // 4. 提交事务
    await transaction.commit();

    // 返回成功信息
    return {
      code: 0,
      message: '工人聘用成功！',
      data: {
        groundId: groundId, // 更新的地皮记录 ID
        workerType: workerType, // 工人类型
        workerEndTime: workerEndTime // 工人结束时间
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