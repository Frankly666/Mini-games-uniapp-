'use strict';
exports.main = async (event, context) => {
	const { userId, activityId, price, duration, dailyReward, name } = event; // 新增 name
	const db = uniCloud.database();
	const transaction = await db.startTransaction();

	try {
		// 1. 查找用户的 assets 记录
		const userAssets = await db.collection('assets').where({ userId }).get();
		if (userAssets.data.length === 0) {
			throw new Error('用户资产记录不存在');
		}
		const assetsId = userAssets.data[0]._id;
		const nowJewel = userAssets.data[0].jewel;

		// 2. 检查余额是否足够
		if (nowJewel < price) {
			throw new Error('余额不足');
		}

		// 3. 扣除用户余额，并保留两位小数
		const newJewel = parseFloat((nowJewel - price).toFixed(2)); // 保留两位小数

		await transaction.collection('assets').doc(assetsId).update({
			jewel: newJewel
		});

		// 4. 添加购买记录到 activityPurchaseRecord 表
		const purchaseTime = new Date(); // 购买时间
		const endTime = new Date(purchaseTime.getTime() + duration * 24 * 60 * 60 * 1000); // 结束时间

		await transaction.collection('activityPurchaseRecord').add({
			userId,
			activityId,
			name, // 新增礼包名字
			purchaseTime,
			endTime,
			dailyReward, // 每日收获数量
			lastClaimTime: null // 最近一次领取时间，初始化为 null
		});

		// 5. 提交事务
		await transaction.commit();

		return {
			code: 0,
			message: '购买成功'
		};
	} catch (err) {
		console.error('购买失败:', err.message);
		await transaction.rollback();
		return {
			code: -1,
			message: err.message
		};
	}
};