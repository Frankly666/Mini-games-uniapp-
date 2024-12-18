// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	// 地皮类型及其信息
	groundMeta: {
		"samll": {
			"unlockFunds": 30,  // 解锁租金 
			"duration": 30,  // 租用时限
			"dailyEarnings": 5,  // 每日收益
			"directPushEarnings": 0.1,  // 直推收益
			"in_depthReturns": 0.01  // 间推收益
		},
		"scarce": {
			"unlockFunds": 698,
			"duration": 118,
			"dailyEarnings": 9,
			"directPushEarnings": 0.15,
			"in_depthReturns": 0.03
		},
		"big": {
			"unlockFunds": 1698,
			"duration": 240,
			"dailyEarnings": 12.5,
			"directPushEarnings": 0.2,
			"in_depthReturns": 0.04
		},
		"resource": {
			"unlockFunds": 698,
			"duration": 48,
			"dailyEarnings": 5,
			"directPushEarnings": 0.12,
			"in_depthReturns": 0.02
		},
		"black": {
			"unlockFunds": 5980,
			"duration": 450,
			"dailyEarnings": 24,
			"directPushEarnings": 0.25,
			"in_depthReturns": 0.05
		},
		"diamond": {
			"unlockFunds": 16980,
			"duration": 900,
			"dailyEarnings": 50,
			"directPushEarnings": 0.3,
			"in_depthReturns": 0.07
		}
	},
	
	
	/** 得到租用结束时间
	 * @param {String} groundType
	 */
	getEndTime (groundType) {
		const duration = this.groundMeta[groundType].duration;
		const now = new Date();
		const timestamp = now.getTime();
		const newTimestamp = timestamp + duration * 24 * 3600 * 1000;
		const newDate = new Date(newTimestamp);
		return newDate.toISOString()
	},
	
	
	/**  用户租用地皮时调用的接口
	 * @param {String} userId  用户的Id
	 * @param {String} groundType  地皮类型
	 */
	async addUserGround(userId, groundType) {
		const ground = uniCloud.database().collection("ground");
		const res = await ground.add({userId, groundType, rentTime: new Date(), endTime: this.getEndTime(groundType)});
		return res;
	},
	
	
	/**  查询用户所拥有的所有地皮
	 * @param {String} userId
	 */
	async selectAllGrounds(userId) {
		const ground = uniCloud.database().collection("ground");
		const res = await ground.where({userId}).get();
		
		// 中间可考虑处理一下数据
		
		return res;
	}
}
