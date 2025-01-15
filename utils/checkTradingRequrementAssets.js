/**
 * 调用云函数检查数据一致性
 * @param {Object} data - 传入的数据
 * @returns {Promise<Object>} - 返回云函数的执行结果
 */
export async function checkTradingRequrementAssets(data) {
  try {
    // 调用云函数
    const result = await uniCloud.callFunction({
      name: 'checkTradingRequrementAssets', // 云函数名称
      data: data, // 传入的数据
    });

    // 返回云函数的执行结果
    return result.result;
  } catch (error) {
    console.error('调用云函数失败:', error);
    return { code: -5, message: '调用云函数失败' };
  }
}
