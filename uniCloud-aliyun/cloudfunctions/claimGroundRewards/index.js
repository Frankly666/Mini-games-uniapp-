'use strict';
const updateUserResource = require('updateUserResource'); // 引入更新用户资源模块
const findReferrers = require('findReferrers'); // 引入查找推荐人模块
const addAssetsChangeRecord = require('addAssetsChangeRecord'); // 引入明细模块
const db = uniCloud.database();

/**
 * 主函数
 * @param {Object} event - 事件对象
 * @param {string} event.userId - 用户 ID
 * @param {number} event.earnings - 要增加的能量石数量
 * @param {number} event.directEarning - 直接收益
 * @param {number} event.indirectEarning - 间接收益
 * @param {List} event.claimGroundList - 具体的土地收益
 * @returns {Promise<{code: number, message: string, data?: Object}>} - 返回操作结果
 */
exports.main = async (event, context) => {
  console.log("event:", event); // 打印 event 对象
  const { userId, earnings, directEarning, indirectEarning, gameID, claimGroundList } = event;

  const transaction = await db.startTransaction();

  try {
    // 1. 更新用户资源（能量石）
    await updateUserResource(userId, 'powerStone', parseFloat((earnings).toFixed(2)), transaction);

    // 2. 添加领取记录到 groundRecieveRecord 表
    await transaction.collection('groundRecieveRecord').add({
      userId, // 用户 ID
      powerStoneAmount: parseFloat((earnings).toFixed(2)), // 领取的能量石数量（保留两位小数）
      receiveTime: new Date() // 领取时间
    });

    // 3. 更新用户土地的 lastClaimTime
    const userGrounds = await db.collection('userGrounds').where({ userId }).get();
    let updatedCount = 0; // 记录更新的土地数量

    if (userGrounds.data.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 设置为今天的0点
      const todayTimestamp = today.getTime(); // 今天的0点时间戳

      // 遍历用户的土地
      for (const ground of userGrounds.data) {
        const endTime = new Date(ground.endTime).getTime(); // 土地到期时间
        const lastClaimTime = ground.lastClaimTime ? new Date(ground.lastClaimTime).getTime() : 0; // 上次领取时间的时间戳
        const isExpired = endTime < Date.now(); // 土地是否已过期
        const dontClaimedToday = lastClaimTime < todayTimestamp; // 上次领取时间是否在今天之前

        // 如果土地未过期且今天未领取，则更新 lastClaimTime
        if (!isExpired && dontClaimedToday) {
          await transaction.collection('userGrounds').doc(ground._id).update({
            lastClaimTime: new Date() // 更新为当前时间
          });
          updatedCount++; // 更新计数
        }
      }
    }

    // 4. 查找推荐人
    const referrers = await findReferrers(userId);

    // 5. 更新推荐人能量石并添加收益记录
    if (referrers.length > 0) {
      for (let i = 0; i < referrers.length; i++) {
        const referrerId = referrers[i];
        const isDirect = i === 0; // 第一个推荐人是直接推荐人
        const earnings = isDirect ? directEarning : indirectEarning; // 直接收益或间接收益

        // 保留两位小数
        const earningsRounded = parseFloat((earnings || 0).toFixed(2));

        // 调用公共模块更新推荐人的能量石
        await updateUserResource(referrerId, 'powerStone', earningsRounded, transaction);

        // 添加收益记录到 referralEarningsRecord 表
        await transaction.collection('referralEarningsRecord').add({
          userId, // 当前用户 ID
          referrerId, // 推荐人 ID
          amount: earningsRounded, // 收益数量（保留两位小数）
          type: isDirect ? 'direct' : 'indirect', // 收益类型（直接或间接）
          originType: 1,
          claimGroundList: claimGroundList,
          createTime: new Date() // 当前时间
        });

        // 直接收益明细
        if (isDirect) {
          await addAssetsChangeRecord(referrerId, 'powerStone', directEarning, `游戏ID为${gameID}的用户地皮收益所得到的直推收益, 增加: `, transaction);
        } else {
          await addAssetsChangeRecord(referrerId, 'powerStone', indirectEarning, `游戏ID为${gameID}的用户地皮收益所得到的间推收益, 增加: `, transaction);
        }
      }
    }

    // 提交事务
    await transaction.commit();

    // 返回成功结果
    return {
      code: 0,
      message: '操作成功',
      data: {
        updatedCount, // 返回更新的土地数量
        referrers // 返回推荐人列表
      }
    };
  } catch (e) {
    console.error('操作失败:', e.message);
    await transaction.rollback();
    return {
      code: -1,
      message: '操作失败，请重试'
    };
  }
};