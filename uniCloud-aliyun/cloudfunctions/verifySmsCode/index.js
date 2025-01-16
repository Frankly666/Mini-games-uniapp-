'use strict';
exports.main = async (event, context) => {
  const { phone, code } = event; // 获取手机号和验证码

  try {
    const db = uniCloud.database();
    const smsCodesCollection = db.collection('smsCodes');

    // 查询最新的验证码记录
    const queryRes = await smsCodesCollection
      .where({
        phone,
      })
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (queryRes.data.length === 0) {
      return {
        code: 404,
        message: '未找到验证码记录',
      };
    }

    const latestCodeRecord = queryRes.data[0];

    // 检查验证码是否匹配
    if (latestCodeRecord.code !== code) {
      return {
        code: 400,
        message: '验证码错误',
      };
    }

    // 检查验证码是否过期（3 分钟内有效）
    const createdAt = new Date(latestCodeRecord.createdAt).getTime();
    const now = new Date().getTime();
    const expireTime = 3 * 60 * 1000; // 3 分钟

    if (now - createdAt > expireTime) {
      return {
        code: 401,
        message: '验证码已过期',
      };
    }

    // 验证成功，删除验证码记录
    await smsCodesCollection.doc(latestCodeRecord._id).remove();

    return {
      code: 200,
      message: '验证码验证成功',
    };
  } catch (err) {
    console.error('验证码验证失败:', err);
    return {
      code: 500,
      message: '验证码验证失败',
    };
  }
};