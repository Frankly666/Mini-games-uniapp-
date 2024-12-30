// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	workersMeta: {
		"1": {
			"ability": "产能提高",  // 人才的能力描述
			"retainerPrice": 38,  // 人才的聘用价格
			"retainerDuration": 10,  // 人才的雇佣时间
		},
		"2": {
			"ability": "自动签到",
			"retainerPrice": 288,
			"retainerDuration": 10,
		},
		"3": {
			"ability": "自动领取产能",
			"retainerPrice": 588,
			"retainerDuration": 10,
		},
		"4": {
			"ability": "",
			"retainerPrice": 988,
			"retainerDuration": 10,
		}
	},
	
	
	/** 得到聘用结束时间
	 * @param {String} talentType
	 */
	getEndTime (talentType) {
		const duration = this.talentsMeta[talentType].retainerDuration;
		const now = new Date();
		const timestamp = now.getTime();
		const newTimestamp = timestamp + duration * 24 * 3600 * 1000;
		const newDate = new Date(newTimestamp);
		return newDate.toISOString()
	},
	
	/**  聘用工人
	 * @param {String} userId
	 * @param {String} talentType
	 * @param {String} groundType  // 该人才工作的地皮类型
	 */
	async hireTalent(userId, talentType, groundType) {
		const workers = uniCloud.database().collection("workers");
		const res = await workers.add({
			userId,
			talentType,
			hireStartTime: new Date(),
			hireEndTime: this.getEndTime(talentType)
		});
		return res;
	},
	
	
	/**  查询用户所聘用的人才, 注意该人才所工作地皮的租用时间
	 * @param {String} userId
	 */
	async selectOwnTalent(userId) {
		const workers = uniCloud.database().collection("workers");
		const res = await workers.where({userId}).get();
		return res;
	}
	
}
