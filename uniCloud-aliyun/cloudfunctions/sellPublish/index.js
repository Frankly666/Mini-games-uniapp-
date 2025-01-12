'use strict';
const updateUserResource = require('updateUserResource'); // 引入更新用户资源模块

exports.main = async (event, context) => {
  // event 为客户端上传的参数
  console.log('event : ', event);
  const { addData, inputNumValue, userId } = event;
  const db = uniCloud.database();
  const transaction = await db.startTransaction();

  try {
    // 1. 添加 sellRequirement 记录
    const res1 = await transaction.collection('sellRequirement').add(addData);

    // 2. 更新用户资源（减少资源数量）
    const resourceName = addData.gemType; // 资源名称
    const resourceAmount = -inputNumValue; // 减少的资源数量
    const updateResult = await updateUserResource(userId, resourceName, resourceAmount, transaction);
		console.log("更新结果:",  resourceName,)

    // 3. 提交事务
    await transaction.commit();

    // 返回成功信息
    return {
      code: 0,
      message: '成功发布!',
      data: {
        sellRequirementId: res1.id, // 新增的 sellRequirement 记录 ID
        updatedResource: updateResult // 更新后的资源信息
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