'use strict';
exports.main = async (event, context) => {
  // event为客户端上传的参数
  console.log('event : ', event);

  const { addUserGroundData, userId, unlockFunds } = event;
  const db = uniCloud.database();
  const transaction = await db.startTransaction();

  // 获取用户资产
  const userAssets = await db.collection('assets').where({ userId }).get();
  const assetsId = userAssets.data[0]._id;
  const nowNum = userAssets.data[0].powerStone;

  // 四舍五入到一位小数
  function roundToOneDecimal(num) {
    return Math.round(num * 10) / 10;
  }

  try {
    // 添加地皮记录，初始化 lastSignInTime 为 null
    const res1 = await transaction.collection('userGrounds').add({
      ...addUserGroundData,
    });

    // 更新用户资产
    const res2 = await transaction.collection('assets').doc(assetsId).update({
      powerStone: roundToOneDecimal(nowNum - unlockFunds)
    });

    // 提交事务
    await transaction.commit();
    return true;
  } catch (e) {
    console.error('transaction error', e.message);
    await transaction.rollback();
    return false;
  }
};