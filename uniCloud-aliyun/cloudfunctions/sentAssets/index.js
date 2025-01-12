'use strict';
exports.main = async (event, context) => {
  console.log('event:', event);

  const { gameID, userId, assetsType, sendNum, premium } = event;
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

    // 5. 执行事务
    await transaction.collection('assets').doc(senderAssetsId).update({
      [assetsType]: roundToOneDecimal(senderCurrentAmount - totalDeduction),
    });
		
		const abtainNum = sendNum + sendNum * 0.03
    await transaction.collection('assets').doc(recipientAssetsId).update({
      [assetsType]: roundToOneDecimal(recipientCurrentAmount + abtainNum),
    });

    await transaction.collection('sendRecord').add({
      userId,
      sendUserId: recipientId,
      assetsType,
      sendNum: abtainNum,
      sendTime: new Date(),
    });

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
 * 四舍五入保留一位小数
 * @param {number} num - 需要处理的数字
 * @returns {number} - 处理后的数字
 */
function roundToOneDecimal(num) {
  return Math.round(num * 10) / 10;
}
