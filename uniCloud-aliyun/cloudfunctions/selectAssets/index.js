// 云函数入口文件
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId } = event;

  // 查询assets表中对应userId的资源
  const res = await db.collection('assets').where({
    userId: userId
  }).get();

  // 返回查询结果
  return {
    code: 0,
    message: '查询成功',
    data: res.data
  };
};