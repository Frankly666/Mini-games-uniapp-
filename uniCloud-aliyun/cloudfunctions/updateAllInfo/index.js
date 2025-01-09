'use strict';
const db = uniCloud.database();

// 查询user表和assets表
exports.main = async (event, context) => {
  // 获取客户端传入的参数
  const { userId } = event;

  if (!userId) {
    return {
      code: 400,
      message: '参数错误：缺少 userId',
    };
  }

  try {
    // 1. 查询 user 表
    const userCollection = db.collection('user');
    const userRes = await userCollection.doc(userId).get();

    if (userRes.data.length === 0) {
      return {
        code: 404,
        message: '用户不存在',
      };
    }

    const userInfo = userRes.data[0];

    // 2. 查询 assets 表
    const assetsCollection = db.collection('assets');
    const assetsRes = await assetsCollection.where({ userId }).get();

    let assetsInfo = {};
    if (assetsRes.data.length > 0) {
      assetsInfo = assetsRes.data[0];
    }

    // 3. 返回合并后的数据
    return {
      code: 200,
      message: '查询成功',
      data: {
        userInfo,
        assetsInfo,
      },
    };
  } catch (err) {
    console.error('云函数执行失败', err);
    return {
      code: 500,
      message: '服务器内部错误',
    };
  }
};