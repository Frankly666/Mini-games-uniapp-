// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	
	/**
	 * 用来初始化地皮的类型
	 */
	async init(){
		const groundType = uniCloud.database().collection('groundType');
		const res1 = await groundType.add([
				{	
					"type": 1,
					"groundName": "小地皮",
					"unlockFunds": 30,  // 解锁租金 
					"duration": 30,  // 租用时限
					"dailyEarnings": 5,  // 每日收益
					"directPushEarnings": 0.1,  // 直推收益
					"inDepthReturns": 0.01  // 间推收益
				},
				{
					"type": 2,
					"groundName": "稀缺地皮",
					"unlockFunds": 698,
					"duration": 118,
					"dailyEarnings": 9,
					"directPushEarnings": 0.15,
					"inDepthReturns": 0.03
				},
				{
					"type": 3,
					"groundName": "资源地皮",
					"unlockFunds": 698,
					"duration": 48,
					"dailyEarnings": 5,
					"directPushEarnings": 0.12,
					"inDepthReturns": 0.02
				},
				{
					"type": 4,
					"groundName": "大地皮",
					"unlockFunds": 1698,
					"duration": 240,
					"dailyEarnings": 12.5,
					"directPushEarnings": 0.2,
					"inDepthReturns": 0.04
				},
				{
					"type": 5,
					"groundName": "黑土地皮",
					"unlockFunds": 5980,
					"duration": 450,
					"dailyEarnings": 24,
					"directPushEarnings": 0.25,
					"inDepthReturns": 0.05
				},
				{
					"type": 6,
					"groundName":"钻石地皮",
					"unlockFunds": 16980,
					"duration": 900,
					"dailyEarnings": 50,
					"directPushEarnings": 0.3,
					"inDepthReturns": 0.07
				}
			])
			
		return res1;	
	},
}
