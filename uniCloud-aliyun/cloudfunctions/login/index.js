'use strict';
const db = uniCloud.database(); // 获取数据库引用
const crypto = require('crypto'); // 引入加密模块

// 对密码进行加密
function encryptPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex'); // 使用 SHA-256 加密
}

exports.main = async (event, context) => {
  const { phone, password } = event; // 从事件中解构出参数

  try {
    // 1. 检查手机号和密码是否为空
    if (!phone || !password) {
      return {
        code: 400,
        message: '手机号和密码不能为空',
      };
    }

    // 2. 查询 user 表，检查用户是否存在
    const userCollection = db.collection('user');
    const userQuery = await userCollection.where({ phone }).get();

    if (userQuery.data.length === 0) {
      // 如果用户不存在，返回错误信息
      return {
        code: 404,
        message: '用户不存在，请检查手机号是否正确',
      };
    }

    const userData = userQuery.data[0]; // 获取用户数据

    // 3. 验证密码是否正确
    const encryptedPassword = encryptPassword(password); // 对输入的密码进行加密
    if (encryptedPassword !== userData.password) {
      return {
        code: 401,
        message: '密码错误，请重试',
      };
    }

    // 4. 登录成功，返回用户信息
    return {
      code: 200,
      message: '登录成功',
      data: {
        userId: userData._id, // 用户唯一标识
        gameID: userData.gameID, // 用户游戏 ID
        userName: userData.userName, // 用户名
        phone: userData.phone, // 手机号
        avatar: userData.avatar, // 用户头像 ID
        isMerchant: userData.isMerchant, // 是否为商人
        isFirst: userData.isFirst, // 修改名字的次数
        inviteCode: userData.inviteCode, // 用户的邀请码
        pusherCode: userData.pusherCode || null, // 推荐者的邀请码，如果不存在则返回 null
        wechat: userData.wechat || "", // 用户的微信号，如果不存在则返回空字符串
      },
    };
  } catch (error) {
    console.error('登录失败:', error);
    return {
      code: 500,
      message: '登录失败，服务器内部错误',
    };
  }
};