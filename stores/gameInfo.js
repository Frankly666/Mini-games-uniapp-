import { defineStore } from 'pinia';
import Cache from '../utils/cache';
const getCache = Cache.getCache;
const setCache = Cache.setCache;

export const useGameInfoStore = defineStore('gameInfo', {
	state: () => {
		return { 
			id: getCache(ID) | '', 
			userName: getCache(USERNAME), 
			phone: '', 
			avatar: getCache(AVATAR) | '', 
			isFirst: getCache(ISFIRST),
			bgm: uni.createInnerAudioContext(),
			assets: {},
			isLoad: false,
			translateX: -340,
			translateY: -320,
			bgmIsOpen: true,
			ownGrounds: null,
			workersMeta: {
				"1": {
					"workerType": 1,
					"name": "艾伦",
					"ability": "每日自动签到",  // 人才的能力描述
					"retainerPrice": 38,  // 人才的聘用价格
					"retainerDuration": 10,  // 人才的雇佣时间    
				},
				"2": {
					"workerType": 2,
					"name": "索菲亚",
					"ability": "加成效率30%",
					"retainerPrice": 288,
					"retainerDuration": 10,
				},
				"3": {
					"workerType": 3,
					"name": "杰克",
					"ability": "加成效率50%",
					"retainerPrice": 588,
					"retainerDuration": 10,
				},
				"4": {
					"workerType": 4,
					"name": "莱塔",
					"ability": "加成效率70%",
					"retainerPrice": 988,
					"retainerDuration": 10,
				},
				"5": {
					"workerType": 5,
					"name": "亚历山大",
					"ability": "加成效率90%",
					"retainerPrice": 1988,
					"retainerDuration": 10,
				}
			},
			groundsMeta: {
				"1": {
					"groundName": "小地皮",
					"unlockFunds": 30,  // 解锁租金 
					"duration": 30,  // 租用时限
					"dailyEarnings": 5,  // 每日收益
					"directPushEarnings": 0.1,  // 直推收益
					"inDepthReturns": 0.01  // 间推收益
				},
				"2": {
					"groundName": "稀缺地皮",
					"unlockFunds": 698,
					"duration": 118,
					"dailyEarnings": 9,
					"directPushEarnings": 0.15,
					"inDepthReturns": 0.03
				},
				"3": {
					"groundName": "大地皮",
					"unlockFunds": 1698,
					"duration": 240,
					"dailyEarnings": 12.5,
					"directPushEarnings": 0.2,
					"inDepthReturns": 0.04
				},
				"4": {
					"groundName": "资源地皮",
					"unlockFunds": 698,
					"duration": 48,
					"dailyEarnings": 5,
					"directPushEarnings": 0.12,
					"inDepthReturns": 0.02
				},
				"5": {
					"groundName": "黑土地皮",
					"unlockFunds": 5980,
					"duration": 450,
					"dailyEarnings": 24,
					"directPushEarnings": 0.25,
					"inDepthReturns": 0.05
				},
				"6": {
					"groundName":"钻石地皮",
					"unlockFunds": 16980,
					"duration": 900,
					"dailyEarnings": 50,
					"directPushEarnings": 0.3,
					"inDepthReturns": 0.07
				}
			},
		};

	}
});

export const ID = 'id';
export const USERNAME ='userName'
export const PHONE = 'phone'
export const AVATAR = 'avatar'
export const ISFIRST = 'isFirst'
export const ASSETS = 'assets'
export const POWERSTONE = 'powerStone'
export const DIAMOND = 'diamond'
export const RESOURCESTONE = 'resourceStone'

