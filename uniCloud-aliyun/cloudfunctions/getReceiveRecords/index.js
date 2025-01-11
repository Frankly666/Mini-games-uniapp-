'use strict';
const db = uniCloud.database();

/**
 * 获取用户的领取记录
 * @param {Object} event - 事件对象
 * @param {string} event.userId - 用户 ID
 * @returns {Promise<{code: number, message: string, data?: Object[]}>} - 返回操作结果
 */
exports.main = async (event, context) => {
  const { userId } = event;

  try {
    // 查询 groundRecieveRecord 表中该用户的领取记录
    const res = await db.collection('groundRecieveRecord')
      .where({ userId })
      .get();

    return {
      code: 0,
      message: '查询成功',
      data: res.data // 返回查询到的记录
    };
  } catch (e) {
    console.error('查询领取记录失败:', e.message);
    return {
      code: -1,
      message: '查询失败，请重试'
    };
  }
};