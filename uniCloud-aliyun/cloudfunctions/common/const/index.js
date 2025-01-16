// assetsUtils.js
'use strict';

const assetsNameMap = {
  powerStone: '能量石',
  diamond: '金刚石',
  resourceStone: '资源石',
  jewel: '宝石',
};

groundsMeta: {
	"1": {
		"groundName": "一级土地",
		"unlockFunds": 98,  // 解锁租金 
		"duration": 30,  // 租用时限
		"dailyEarnings": 5.6,  // 每日收益
		"directPushEarnings": 0.1,  // 直推收益
		"inDepthReturns": 0.01  // 间推收益
	},
	"2": {
		"groundName": "资源地皮",
		"unlockFunds": 298,
		"duration": 48,
		"dailyEarnings": 10.3,
		"directPushEarnings": 0.12,
		"inDepthReturns": 0.02
	},
	"3": {
		"groundName": "二级土地",
		"unlockFunds": 698,
		"duration": 118,
		"dailyEarnings": 10.7,
		"directPushEarnings": 0.15,
		"inDepthReturns": 0.03
	},
	"4": {
		"groundName": "三级土地",
		"unlockFunds": 1690,
		"duration": 240,
		"dailyEarnings": 12.5,
		"directPushEarnings": 0.20,
		"inDepthReturns": 0.04
	},
	"5": {
		"groundName": "四级土地",
		"unlockFunds": 5980,
		"duration": 450,
		"dailyEarnings": 35.3,
		"directPushEarnings": 0.25,
		"inDepthReturns": 0.05
	},
	"6": {
		"groundName":"五级土地",
		"unlockFunds": 15980,
		"duration": 900,
		"dailyEarnings": 50,
		"directPushEarnings": 0.3,
		"inDepthReturns": 0.07
	}
},

module.exports = {
  assetsNameMap,
	groundsMeta
};