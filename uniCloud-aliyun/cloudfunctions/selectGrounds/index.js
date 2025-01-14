'use strict';

exports.main = async (event, context) => {
  const { userId } = event;

  // 获取数据库实例
  const db = uniCloud.database();
  const groundCollection = db.collection('userGrounds');
  const now = new Date(); // 当前服务器时间

  try {
    // 查询用户所有地皮
    const res = await groundCollection.where({ userId }).get();
    const allGrounds = res.data;

    // 过滤未过期地皮
    const validGrounds = allGrounds.filter(item => {
      const endTime = new Date(item.endTime);
      return endTime > now; // 只保留未过期的地皮
    });

    // 分类地皮数据
    const classifyGrounds = {};
    validGrounds.forEach(item => {
      if (classifyGrounds[item.groundType]) {
        classifyGrounds[item.groundType].push(item);
      } else {
        classifyGrounds[item.groundType] = [item];
      }
    });

    // 返回分类后的数据及服务器时间
    return {
      code: 0,
      message: '查询成功',
      data: classifyGrounds,
      serverTime: now.toISOString() // 返回服务器时间
    };
  } catch (err) {
    console.error('查询失败:', err);
    return {
      code: -1,
      message: '查询失败，请重试！',
      serverTime: now.toISOString() // 返回服务器时间
    };
  }
};