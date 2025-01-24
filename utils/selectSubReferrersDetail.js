/**
 * 调用云函数获取推荐用户及其收益记录
 * @param {Object} params - 参数对象
 * @param {string} params.userId - 这个下级用户的id
 * @returns {Promise<Array>} - 返回其收益记录
 */
export async function getReferralEarnings(params) {
  try {
    const res = await uniCloud.callFunction({
      name: 'selectSubReferrersDetail', // 替换为你的云函数名称
      data: params
    });
    return res.result; // 返回云函数的结果
  } catch (err) {
    console.error('调用云函数失败:', err);
    throw err;
  }
}