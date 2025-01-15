'use strict';
const updateUserResource = require('updateUserResource'); // 引入更新用户资源模块

exports.main = async (event, context) => {
  console.log('event:', event);

  // type=1是交易市场中的转赠, 所有人都需要付手续费, type=2是商人集市中的转赠,只有商人不付手续费
  const { gameID, userId, assetsType, sendNum, premium, type } = event;
  const db = uniCloud.database();
  const transaction = await db.startTransaction();

  try {
    // 1. 获取受赠者信息
    const recipient = await getUserByGameID(db, gameID);
    if (!recipient) {
      console.error('受赠者不存在');
      return { code: -1, message: '受赠者不存在' };
    }

    const recipientId = recipient._id;
    if (recipientId === userId) {
      console.error('赠送者和受赠者不能为同一用户');
      return { code: -2, message: '赠送者和受赠者不能为同一用户' };
    }

    // 2. 获取受赠者的资产信息
    const recipientAssets = await getAssetsByUserId(db, recipientId);
    if (!recipientAssets) {
      console.error('受赠者资产信息不存在');
      return { code: -3, message: '受赠者资产信息不存在' };
    }

    const recipientAssetsId = recipientAssets._id;
    const recipientCurrentAmount = recipientAssets[assetsType] || 0;

    // 3. 获取赠送者的资产信息
    const senderAssets = await getAssetsByUserId(db, userId);
    if (!senderAssets) {
      console.error('赠送者资产信息不存在');
      return { code: -4, message: '赠送者资产信息不存在' };
    }

    const senderAssetsId = senderAssets._id;
    const senderCurrentAmount = senderAssets[assetsType] || 0;

    // 4. 检查赠送者资源是否足够
    const totalDeduction = sendNum * (1 + premium);
    if (senderCurrentAmount < totalDeduction) {
      console.error('赠送者资源不足');
      return { code: -5, message: '赠送者资源不足' };
    }

    // 5. 使用公共模块更新赠送者资源
    await updateUserResource(
      userId,
      assetsType,
      -totalDeduction, // 扣除资源
      transaction
    );

    // 6. 计算受赠者获得的资源
    let abtainNum;
    if (type === 1) {
      abtainNum = sendNum; // 交易市场，只能获得 sendNum
    } else {
      abtainNum = premium === 0 ? sendNum : sendNum * 1.03; // 商人集市，根据 premium 计算
    }

    // 7. 使用公共模块更新受赠者资源
    await updateUserResource(
      recipientId,
      assetsType,
      abtainNum, // 增加资源
      transaction
    );

    // 8. 添加转赠记录
    await transaction.collection('sendRecord').add({
      userId,
      sendUserId: recipientId,
      assetsType,
      sendNum: roundToOneDecimal(abtainNum),
      sendTime: new Date(),
    });

    // 9. 提交事务
    await transaction.commit();
    console.log('资源转移成功');
    return { code: 1, message: '资源转移成功' };
  } catch (error) {
    console.error('事务执行失败:', error.message);
    await transaction.rollback();
    return { code: 0, message: '资源转移失败' };
  }
};

/**
 * 根据 gameID 获取用户信息
 * @param {object} db - 数据库实例
 * @param {string} gameID - 游戏ID
 * @returns {object|null} - 用户信息或 null
 */
async function getUserByGameID(db, gameID) {
  const res = await db.collection('user').where({ gameID }).get();
  return res.data && res.data[0] ? res.data[0] : null;
}

/**
 * 根据 userId 获取资产信息
 * @param {object} db - 数据库实例
 * @param {string} userId - 用户ID
 * @returns {object|null} - 资产信息或 null
 */
async function getAssetsByUserId(db, userId) {
  const res = await db.collection('assets').where({ userId }).get();
  return res.data && res.data[0] ? res.data[0] : null;
}

/**
 * 四舍五入保留二位小数
 * @param {number} num - 需要处理的数字
 * @returns {number} - 处理后的数字
 */
function roundToOneDecimal(num) {
  return Math.round(num * 100) / 100;
}