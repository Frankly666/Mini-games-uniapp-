// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	
	/** 发布出售需求
	 * @param {String} sellerId 卖家id
	 * @param {String} demType 资源类型
	 * @param {Number} sellNum 出售数量
	 * @param {Number} sellPrice 出售单价
	 * @param {Boolean} isFinish 是否完成交易
	 * @param {Date} publishTime 发表时间
	 */
	async publishSellRequirement(sellerId, gemType, sellNum, sellPrice) {
		const sellRequirement = uniCloud.database().collection('sellRequirement');
		const res = await sellRequirement.add({sellerId, gemType, sellNum: parseInt(sellNum), sellPrice: parseFloat(sellPrice), isFinished: false, publishTime: new Date()})
		return res;
	},
	
	//  发布求购需求
	async publishBuyRequirement(buyerId, gemType, buyNum, buyPrice) {
		const buyRequirement = uniCloud.database().collection('buyRequirement');
		const res = await buyRequirement.add({buyerId, gemType, buyNum: parseInt(buyNum), buyPrice: parseFloat(buyPrice), isFinished: false, publishTime: new Date()})
		return res;
	},
	
	/** 添加交易记录
	 * @param {String} buyerId 买家d
	 * @param {String} sellerId 卖家id
	 * @param {Number} transactionType 交易类型, 1在出售市场, 2在求购市场
	 * @param {String} transactionId 交易id
	 * @param {Number} transactionNum 交易数量
	 * @param {Date} transactionTime 交易时间
	 */
	async addTransactionRecord(buyerId, sellerId, transactionType, transactionId, transactionNum) {
		const transactionRecord = uniCloud.database().collection('transactionRecord');
		const res = await transactionRecord.add({buyerId, sellerId, transactionType, transactionId, transactionNum, transactionTime: new Date()})
		return res;
	},
	
	// 设置此条交易完成的接口
	async finishSellRequirement(id) {
		const sellRequirement = uniCloud.database().collection('sellRequirement');
		const res = sellRequirement.doc(id).update({isFinished: true});
		return res;
	},
	async finishBuyRequirement(id) {
		const buyRequirement = uniCloud.database().collection('buyRequirement');
		const res = buyRequirement.doc(id).update({isFinished: true});
		return res;
	},
	
	// 如果没有买完,就减去
	async subSellNum(id, nowNum) {
		const sellRequirement = uniCloud.database().collection('sellRequirement');
		const res = sellRequirement.doc(id).update({sellNum: nowNum});
		return res
	},
	async subBuyNum(id, nowNum) {
		const buyRequirement = uniCloud.database().collection('buyRequirement');
		const res = buyRequirement.doc(id).update({buyNum: nowNum});
		return res
	},
	
	/** 检索所有的出售需求
	 * @param {String} gemType
	 */
	async selectSellRequirement(gemType) {
			const db = uniCloud.database();
			const _ = db.command; // 引入数据库操作符
	    const sellRequirement = uniCloud.database().collection('sellRequirement');
	    const res = await sellRequirement
	        .where({
	            gemType,          // 宝石类型
	            isFinished: false, // 未完成的出售需求
	            sellNum: _.gt(0)  // sellNum 大于 0
	        })
					.limit(50)
	        .orderBy("sellPrice", 'asc') // 按照 sellPrice 升序排列
	        .get();
	    return res;
	},

	
	// 检索所有的求购需求
	async selectBuyRequirement(gemType) {
			const db = uniCloud.database();
			const _ = db.command; // 引入数据库操作符
	    const buyRequirement = uniCloud.database().collection('buyRequirement');
	    const res = await buyRequirement
	        .where({
	            gemType,          // 宝石类型
	            isFinished: false, // 未完成的求购
	            buyNum: _.gt(0)   // buyNum 大于 0
	        })
					.limit(50)
	        .orderBy("buyPrice", 'desc')
	        .get();
	    return res;
	},
	
	/** 检索所有的我发布的出售需求
	 * @param {String} gemType
	 * @param {String} userId
	 */
	async selectMySellRequirement(userId, gemType) {
			const db = uniCloud.database();
			const _ = db.command; // 引入数据库操作符
	    const sellRequirement = uniCloud.database().collection('sellRequirement');
	    const res = await sellRequirement
	        .where({
							sellerId: userId,
	            gemType,          // 宝石类型
	            isFinished: false, // 未完成的出售需求
	            sellNum: _.gt(0)  // sellNum 大于 0
	        })
	        .orderBy("sellPrice", 'asc') // 按照 sellPrice 升序排列
	        .get();
	    return res;
	},
	
	
	// 检索所有的求购需求
	async selectMyBuyRequirement(userId, gemType) {
			const db = uniCloud.database();
			const _ = db.command; // 引入数据库操作符
	    const buyRequirement = uniCloud.database().collection('buyRequirement');
	    const res = await buyRequirement
	        .where({
							buyerId: userId,
							userId: userId,
	            gemType,          // 宝石类型
	            isFinished: false, // 未完成的求购
	            buyNum: _.gt(0)   // buyNum 大于 0
	        })
	        .orderBy("buyPrice", 'desc')
	        .get();
	    return res;
	},
}
