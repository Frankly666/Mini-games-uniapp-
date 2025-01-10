'use strict';
const db = uniCloud.database(); // 获取数据库引用

exports.main = async (event, context) => {
  try {
    // 查询 user 表中 isMerchant 为 true 的记录
    const merchantQuery = await db.collection('user')
      .where({ isMerchant: true })
      .get();

    // 如果没有找到商人，返回空数组
    if (merchantQuery.data.length === 0) {
      return {
        code: 200,
        message: '未找到商人',
        data: [],
      };
    }

    // 返回查询到的商人列表
    return {
      code: 200,
      message: '查询成功',
      data: merchantQuery.data.map(merchant => ({
        avatar: merchant.avatar, // 头像
        name: merchant.userName, // 用户名
        gameId: merchant.gameID, // 游戏ID
        wechat: merchant.wechat || "", // 微信号，如果不存在则返回空字符串
      })),
    };
  } catch (error) {
    console.error('查询失败:', error);
    return {
      code: 500,
      message: '查询失败，服务器内部错误',
    };
  }
};