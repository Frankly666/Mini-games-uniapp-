'use strict';

const db = uniCloud.database(); // 初始化数据库

exports.main = async (event, context) => {
  // event 为客户端上传的参数
  console.log('event:', event);

  const { userId, wechat } = event; // 从 event 中解构出 userId 和 wechat

  // 参数校验
  if (!userId || !wechat) {
    return {
      code: 400,
      message: '参数错误：userId 和 wechat 不能为空',
    };
  }

  try {
    // 更新 user 表中的 wechat 字段
    const res = await db.collection('user').doc(userId).update({
      wechat: wechat, // 更新 wechat 字段
    });

    // 判断是否更新成功
    if (res.updated === 1) {
      return {
        code: 200,
        message: '更新成功',
      };
    } else {
      return {
        code: 404,
        message: '用户不存在或未更新',
      };
    }
  } catch (err) {
    console.error('更新失败:', err);
    return {
      code: 500,
      message: '更新失败，服务器错误',
    };
  }
};