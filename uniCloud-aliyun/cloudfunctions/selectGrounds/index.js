'use strict';
exports.main = async (event, context) => {
  const { userId } = event;

  // 获取数据库实例
  const db = uniCloud.database();
  const groundCollection = db.collection('userGrounds');

  // 查询用户所有地皮
  const res = await groundCollection.where({ userId }).get();
  const allGrounds = res.data;

  // 过滤未过期地皮
  const now = new Date();
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

  // 返回分类后的数据
  return {
    code: 0,
    message: '查询成功',
    data: classifyGrounds
  };
};