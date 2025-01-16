'use strict';
exports.main = async (event, context) => {
  const { phone } = event; // 获取手机号

  // 生成随机 6 位验证码
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // 调用 uniCloud 短信服务发送验证码
    const res = await uniCloud.sendSms({
      appid: '__UNI__xxxxxxx', // 替换为你的 appid
      phone, // 接收短信的手机号
      templateId: '100**', // 替换为你的短信模板 ID
      data: {
        code, // 验证码
        expMinute: '3', // 验证码有效期（分钟）
      },
    });

    // 将验证码存储到数据库，用于后续验证
    const db = uniCloud.database();
    await db.collection('smsCodes').add({
      phone,
      code,
      createdAt: new Date().toISOString(), // 记录验证码生成时间
    });

    return {
      code: 200,
      message: '验证码发送成功',
      data: {
        phone,
      },
    };
  } catch (err) {
    console.error('短信发送失败:', err);
    return {
      code: err.errCode || 500,
      message: err.errMsg || '短信发送失败',
    };
  }
};