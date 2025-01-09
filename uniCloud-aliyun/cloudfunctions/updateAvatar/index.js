'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId, avatarUrl } = event;

  if (!userId || !avatarUrl) {
    return {
      code: 400,
      message: '参数错误',
    };
  }

  try {
    // 更新用户头像
    const res = await db.collection('user').doc(userId).update({
      avatar: avatarUrl, // 直接存储 avatarUrl
    });

    if (res.updated === 1) {
      return {
        code: 200,
        message: '头像更新成功',
      };
    } else {
      return {
        code: 404,
        message: '用户不存在',
      };
    }
  } catch (err) {
    console.error('更新头像失败', err);
    return {
      code: 500,
      message: '服务器内部错误',
    };
  }
};