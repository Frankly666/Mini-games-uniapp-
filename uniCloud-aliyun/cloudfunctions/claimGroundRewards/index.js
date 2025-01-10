'use strict';
const db = uniCloud.database();

/**
 * 更新用户资源（能量石）
 * @param {string} userId - 用户 ID
 * @param {number} earnings - 要增加的能量石数量
 * @returns {Promise<{code: number, message: string}>} - 返回操作结果
 */
async function updateUserAssets(userId, earnings) {
  const transaction = await db.startTransaction();

  try {
    // 获取用户资产
    const userAssets = await db.collection('assets').where({ userId }).get();
    if (userAssets.data.length === 0) {
      throw new Error('用户资产不存在');
    }

    const assetsId = userAssets.data[0]._id;
    const nowNum = userAssets.data[0].powerStone;

    // 计算新的能量石数量，并保留两位小数
    const newPowerStone = parseFloat((nowNum + (earnings || 0)).toFixed(2));

    // 更新用户资产（增加能量石）
    await transaction.collection('assets').doc(assetsId).update({
      powerStone: newPowerStone
    });

    // 提交事务
    await transaction.commit();
    return {
      code: 0,
      message: '更新成功'
    };
  } catch (e) {
    console.error('更新用户资源失败:', e.message);
    await transaction.rollback();
    return {
      code: -1,
      message: '更新失败，请重试'
    };
  }
}

/**
 * 递归查找推荐人
 * @param {string} userId - 用户 ID
 * @param {string[]} referrers - 推荐人列表（递归时传递）
 * @returns {Promise<string[]>} - 返回推荐人 ID 列表
 */
async function findReferrers(userId, referrers = []) {
  // 获取当前用户信息
  const userInfo = await db.collection('user').where({ _id: userId }).get();
  if (userInfo.data.length === 0) {
    return referrers; // 如果用户不存在，返回当前结果
  }

  const pusherCode = userInfo.data[0].pusherCode; // 获取推荐人手机号
  if (!pusherCode) {
    return referrers; // 如果没有推荐人，返回当前结果
  }

  // 查找推荐人信息
  const referrerInfo = await db.collection('user').where({ phone: pusherCode }).get();
  if (referrerInfo.data.length === 0) {
    return referrers; // 如果推荐人不存在，返回当前结果
  }

  const referrerId = referrerInfo.data[0]._id; // 获取推荐人 ID
  referrers.push(referrerId); // 将推荐人 ID 加入列表

  // 递归查找推荐人的推荐人
  return findReferrers(referrerId, referrers);
}

/**
 * 更新用户土地的 lastClaimTime
 * @param {string} userId - 用户 ID
 * @returns {Promise<{code: number, message: string, updatedCount: number}>} - 返回操作结果
 */
async function updateUserGroundsLastClaimTime(userId) {
  const transaction = await db.startTransaction();

  try {
    // 获取用户所有土地
    const userGrounds = await db.collection('userGrounds').where({ userId }).get();
    if (userGrounds.data.length === 0) {
      return {
        code: 0,
        message: '用户没有土地',
        updatedCount: 0
      };
    }

    const today = new Date().toDateString(); // 获取今天的日期
    let updatedCount = 0; // 记录更新的土地数量

    // 遍历用户的土地
    for (const ground of userGrounds.data) {
      const endTime = new Date(ground.endTime).getTime(); // 土地到期时间
      const lastClaimTime = ground.lastClaimTime ? new Date(ground.lastClaimTime).toDateString() : null; // 上次领取时间
      const isExpired = endTime < Date.now(); // 土地是否已过期
      const isClaimedToday = lastClaimTime === today; // 土地今天是否已领取

      // 如果土地未过期且今天未领取，则更新 lastClaimTime
      if (!isExpired && !isClaimedToday) {
        await transaction.collection('userGrounds').doc(ground._id).update({
          lastClaimTime: new Date() // 更新为当前时间
        });
        updatedCount++; // 更新计数
      }
    }

    // 提交事务
    await transaction.commit();
    return {
      code: 0,
      message: '更新成功',
      updatedCount // 返回更新的土地数量
    };
  } catch (e) {
    console.error('更新土地 lastClaimTime 失败:', e.message);
    await transaction.rollback();
    return {
      code: -1,
      message: '更新失败，请重试',
      updatedCount: 0
    };
  }
}

/**
 * 更新推荐人能量石并添加收益记录
 * @param {string} userId - 当前用户 ID
 * @param {string[]} referrers - 推荐人列表
 * @param {number} directEarning - 直接收益
 * @param {number} indirectEarning - 间接收益
 * @returns {Promise<{code: number, message: string}>} - 返回操作结果
 */
async function updateReferrersAssets(userId, referrers, directEarning, indirectEarning) {
  const transaction = await db.startTransaction();

  try {
    // 遍历推荐人列表
    for (let i = 0; i < referrers.length; i++) {
      const referrerId = referrers[i];
      const isDirect = i === 0; // 第一个推荐人是直接推荐人
      const earnings = isDirect ? directEarning : indirectEarning; // 直接收益或间接收益

      // 保留两位小数
      const earningsRounded = parseFloat((earnings || 0).toFixed(2));

      // 调用 updateUserAssets 更新推荐人的能量石
      const updateResult = await updateUserAssets(referrerId, earningsRounded);
      if (updateResult.code !== 0) {
        throw new Error(`更新推荐人 ${referrerId} 的能量石失败: ${updateResult.message}`);
      }

      // 添加收益记录到 referralEarningsRecord 表
      await transaction.collection('referralEarningsRecord').add({
        userId, // 当前用户 ID
        referrerId, // 推荐人 ID	
        amount: earningsRounded, // 收益数量（保留两位小数）
        type: isDirect ? 'direct' : 'indirect', // 收益类型（直接或间接）
        createTime: new Date() // 当前时间
      });
    }

    // 提交事务
    await transaction.commit();
    return {
      code: 0,
      message: '更新推荐人收益成功'
    };
  } catch (e) {
    console.error('更新推荐人收益失败:', e.message);
    await transaction.rollback();
    return {
      code: -1,
      message: '更新推荐人收益失败，请重试'
    };
  }
}

/**
 * 主函数
 * @param {Object} event - 事件对象
 * @param {string} event.userId - 用户 ID
 * @param {number} event.earnings - 要增加的能量石数量
 * @param {number} event.directEarning - 直接收益
 * @param {number} event.indirectEarning - 间接收益
 * @returns {Promise<{code: number, message: string, data?: Object}>} - 返回操作结果
 */
exports.main = async (event, context) => {
  console.log("event:", event); // 打印 event 对象
  const { userId, earnings, directEarning, indirectEarning } = event;

  try {
    // 1. 更新用户资源（能量石）
    const updateAssetsResult = await updateUserAssets(userId, parseFloat((earnings).toFixed(2)));
    if (updateAssetsResult.code !== 0) {
      return updateAssetsResult; // 如果更新失败，直接返回错误信息
    }

    // 2. 更新用户土地的 lastClaimTime
    const updateGroundsResult = await updateUserGroundsLastClaimTime(userId);
    if (updateGroundsResult.code !== 0) {
      return updateGroundsResult; // 如果更新失败，直接返回错误信息
    }

    // 3. 查找推荐人
    const referrers = await findReferrers(userId);

    // 4. 更新推荐人能量石并添加收益记录
    if (referrers.length > 0) {
      const updateReferrersResult = await updateReferrersAssets(
        userId,
        referrers,
        parseFloat((directEarning).toFixed(2)),
        parseFloat((indirectEarning).toFixed(2))
      );
      if (updateReferrersResult.code !== 0) {
        return updateReferrersResult; // 如果更新失败，直接返回错误信息
      }
    }

    // 返回成功结果
    return {
      code: 0,
      message: '操作成功',
      data: {
        updateAssetsResult,
        updateGroundsResult,
        referrers // 返回推荐人列表
      }
    };
  } catch (e) {
    console.error('操作失败:', e.message);
    return {
      code: -1,
      message: '操作失败，请重试'
    };
  }
};