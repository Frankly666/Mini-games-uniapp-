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
 * @param {List} event.claimCroundIdList - 需要更新的土地 ID 列表
 * @returns {Promise<{code: number, message: string, data?: Object}>} - 返回操作结果
 */
exports.main = async (event, context) => {
  console.log("event:", event); // 打印 event 对象
  const { userId, earnings, directEarning, indirectEarning, gameID, claimGroundList, claimCroundIdList } = event;
	
	if(!claimGroundList) {
		return {
		  code: -1,
		  message: '请重试'
		};
	}
	
  const transaction = await db.startTransaction();
  console.log("开始事务执行:");

  try {
    // 1. 更新用户资源（能量石）
    await updateUserResource(userId, 'powerStone', parseFloat((earnings).toFixed(2)), transaction);
    console.log('资源更新完成');

    // 2. 添加领取记录到 groundRecieveRecord 表
    await transaction.collection('groundRecieveRecord').add({
      userId, // 用户 ID
      powerStoneAmount: parseFloat((earnings).toFixed(2)), // 领取的能量石数量（保留两位小数）
      receiveTime: new Date().toISOString() // 领取时间
    });

    console.log('地皮领取记录完成');

    // 3. 更新用户土地的 lastClaimTime
    let updatedCount = 0; // 记录更新的土地数量
    if (claimCroundIdList && claimCroundIdList.length > 0) {
      for (const groundId of claimCroundIdList) {
        // 更新土地的 lastClaimTime
        await transaction.collection('userGrounds').doc(groundId).update({
          lastClaimTime: new Date().toISOString() // 更新为当前时间
        });
        updatedCount++; // 更新计数
      }
    }
    console.log('更新土地数量:', updatedCount);

    // 4. 查找推荐人
    const referrers = await findReferrers(userId); // 直接调用 findReferrers，不传递事务对象
    console.log("推荐人查找结果:", referrers);

    // 5. 更新推荐人能量石并添加收益记录
    if (referrers.length > 0) {
      for (let i = 0; i < referrers.length; i++) {
        const referrerId = referrers[i];
        const isDirect = i === 0; // 第一个推荐人是直接推荐人
        const earnings = isDirect ? directEarning : indirectEarning; // 直接收益或间接收益

        // 保留两位小数
        const earningsRounded = parseFloat((earnings || 0).toFixed(2));
        console.log("增加的数量:", earningsRounded);

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
    console.error(e.message);
    await transaction.rollback();
    return {
      code: -1,
      message: '请重试'
    };
  }
};