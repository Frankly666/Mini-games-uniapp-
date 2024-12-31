// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	
	/**
	 * 工人类型初始化
	 */
	async init () {
		const workerType = uniCloud.database().collection('workerType');
		const res1 = await workerType.add([
			{
				"type": 1,
				"ability": "产能提高",  // 人才的能力描述
				"retainerPrice": 38,  // 人才的聘用价格
				"retainerDuration": 10,  // 人才的雇佣时间    
			},
			{
				"type": 2,
				"ability": "自动签到",
				"retainerPrice": 288,
				"retainerDuration": 10,
			},
			{
				"type": 3,
				"ability": "自动领取产能",
				"retainerPrice": 588,
				"retainerDuration": 10,
			},
			{
				"type": 4,
				"ability": "",
				"retainerPrice": 988,
				"retainerDuration": 10,
			}
		])
	}
}
