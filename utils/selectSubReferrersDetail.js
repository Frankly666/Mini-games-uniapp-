/**
 * 调用云函数获取推荐用户及其收益记录
 * @param {string} userId - 用户ID
 * @returns {Promise<Array>} - 返回推荐用户及其收益记录
 */
export async function getReferralUsersWithEarnings(userId) {
  try {
    const res = await uniCloud.callFunction({
      name: 'selectSubReferrersDetail', // 替换为你的云函数名称
      data: {
        userId: userId
      }
    });
    return res.result; // 返回云函数的结果
  } catch (err) {
    console.error('调用云函数失败:', err);
    throw err;
  }
}