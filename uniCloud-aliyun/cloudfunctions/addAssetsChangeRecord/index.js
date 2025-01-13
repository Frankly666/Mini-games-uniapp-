'use strict';

exports.main = async (event, context) => {
  console.log('event : ', event);

  const { userId, resourceType, description, num } = event;
  const db = uniCloud.database();
  const transaction = await db.startTransaction();

  try {
    // 1. 生成当前时间
    const time = new Date().toISOString();

    // 2. 插入记录到 assetsChangeRecord 表
    const result = await transaction.collection('assetsChangeRecord').add({
      userId,
      resourceType,
      description,
			num,
      time, // 使用当前时间
    });

    // 3. 提交事务
    await transaction.commit();

    // 4. 返回添加的记录信息
    return {
      code: 0,
      message: '资源变动记录添加成功',
      data: {
        userId,
        resourceType,
        description,
        time,
				num,
        recordId: result.id, // 返回新记录的 _id
      },
    };
  } catch (err) {
    console.error('添加资源变动记录失败:', err.message);
    await transaction.rollback(); // 回滚事务
    return {
      code: -1,
      message: '资源变动记录添加失败',
      error: err.message,
    };
  }
};