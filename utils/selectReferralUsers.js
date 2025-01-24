/**
 * 调用云函数获取推荐用户及其收益记录
 * @param {Object} params - 参数对象
 * @param {string} params.userId - 用户ID
 * @param {string} params.type - 查询类型（direct 或 indirect）
 * @param {number} params.page - 当前页码
 * @param {number} params.limit - 每页条数
 * @returns {Promise<Array>} - 返回推荐用户及其收益记录
 */
export async function selectReferralUsers(params) {
  try {
    const res = await uniCloud.callFunction({
      name: 'selectSubReferrerUsers', // 替换为你的云函数名称
      data: params
    });
    return res.result; // 返回云函数的结果
  } catch (err) {
    console.error('调用云函数失败:', err);
    throw err;
  }
}