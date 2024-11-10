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
			translateY: -320
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

