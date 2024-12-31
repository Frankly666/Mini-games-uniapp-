// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	// /** 得到租用结束时间
	//  * @param {String} groundType
	//  */
	// getEndTime (groundType) {
	// 	const duration = this.groundMeta[groundType].duration;
	// 	const now = new Date();
	// 	const timestamp = now.getTime();
	// 	const newTimestamp = timestamp + duration * 24 * 3600 * 1000;
	// 	const newDate = new Date(newTimestamp);
	// 	return newDate.toISOString()
	// },
	
	
	// /**  用户租用地皮时调用的接口
	//  * @param {String} userId  用户的Id
	//  * @param {String} groundType  地皮类型
	//  * @param {Number} groundIndex 该地皮类型在同类型中的下标位置
	//  */
	// async addUserGround(userId, groundType, groundIndex) {
	// 	const ground = uniCloud.database().collection("ground");
	// 	const res = await ground.add({userId, groundType, groundIndex, rentTime: new Date(), endTime: this.getEndTime(groundType)});
	// 	return res;
	// },
	
	
	/**  查询用户所拥有的所有地皮
	 * @param {String} userId
	 */
	async selectAllGrounds(userId) {
		const ground = uniCloud.database().collection("userGrounds");
		const res = await ground.where({userId}).get();
		
		// 中间可考虑处理一下数据
		const allGrounds = res.data;
		const classifyGrounds = {};
		allGrounds.map(item => {
			if(classifyGrounds[item.groundType]) {
				classifyGrounds[item.groundType].push(item);
			}else {
				classifyGrounds[item.groundType] = [item];
			}
		})
		
		return classifyGrounds;
	}
}
