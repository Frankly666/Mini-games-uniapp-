import { useGameInfoStore } from "../stores/gameInfo"



/** 用户找到该类型地皮没有工人正在工作的地皮下标
 * @param {Number} groundType 地皮类型
 */
export function findEmptyGround(groundType) {
	const gameInfo = useGameInfoStore();
	const thisTypeGrounds = gameInfo.ownGrounds[groundType];
	
	for(let i = 0; i < thisTypeGrounds.length; i ++) {
		const item = thisTypeGrounds[i];
		if(!item.isHaveWorker) return i+1;
	}
	
	return false;
}