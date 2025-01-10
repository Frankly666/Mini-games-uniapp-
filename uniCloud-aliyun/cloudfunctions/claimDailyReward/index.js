'use strict';
exports.main = async (event, context) => {
	const { userId, activityId, dailyReward } = event;
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

		// 2. 增加用户宝石
		const newJewel = parseFloat((nowJewel + dailyReward).toFixed(2)); // 保留两位小数

		await transaction.collection('assets').doc(assetsId).update({
			jewel: newJewel
		});

		// 3. 更新活动的 lastClaimTime
		const activityRecord = await db.collection('activityPurchaseRecord')
			.where({
				userId,
				activityId
			})
			.get();

		if (activityRecord.data.length === 0) {
			throw new Error('未找到活动记录');
		}

		const recordId = activityRecord.data[0]._id;

		await transaction.collection('activityPurchaseRecord').doc(recordId).update({
			lastClaimTime: new Date() // 更新为当前时间
		});

		// 4. 提交事务
		await transaction.commit();

		return {
			code: 0,
			message: '签到成功'
		};
	} catch (err) {
		console.error('签到失败:', err.message);
		await transaction.rollback();
		return {
			code: -1,
			message: err.message
		};
	}
};