'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  console.log('event : ', event);

  const { _id, buyerId, sellerId, gemType, buyNum, sellNum, buyPrice, sellPrice, isFinished, publishTime } = event;

  try {
    // 检查是购买需求还是出售需求
    if (buyerId) {
      // 查询 buyRequirement 表
      const buyRecord = await db.collection('buyRequirement').doc(_id).get();
      if (buyRecord.data.length === 0) {
        return { code: -1, message: '未找到对应的购买需求记录' };
      }

      const dbBuyRecord = buyRecord.data[0];
			console.log("dbBuyRecord:", dbBuyRecord)

      // 检查字段是否一致
      if (
        dbBuyRecord.buyNum !== buyNum
      ) {
        return { code: -2, message: '数据不一致，请刷新后重试' };
      }

      return { code: 1, message: '数据一致，操作成功' };
    } else if (sellerId) {
      // 查询 sellRequirement 表
      const sellRecord = await db.collection('sellRequirement').doc(_id).get();
      if (sellRecord.data.length === 0) {
        return { code: -1, message: '未找到对应的出售需求记录' };
      }

      const dbSellRecord = sellRecord.data[0];

      // 检查字段是否一致
      if (
        dbSellRecord.sellNum !== sellNum
      ) {
        return { code: -2, message: '数据不一致，请刷新后重试' };
      }

      return { code: 1, message: '数据一致，操作成功' };
    } else {
      return { code: -3, message: '无效的请求数据' };
    }
  } catch (error) {
    console.error('云函数执行失败:', error);
    return { code: -4, message: '服务器内部错误' };
  }
};