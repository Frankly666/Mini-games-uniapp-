import { useGameInfoStore } from "../stores/gameInfo";

const gameInfo = useGameInfoStore();

/** 得到租用结束时间
 * @param {Number} groundType
 */
export function getGroundEndTime (groundType) {
	const duration = gameInfo.groundsMeta[groundType].duration;
	const now = new Date();
	const timestamp = now.getTime();
	const newTimestamp = timestamp + duration * 24 * 3600 * 1000;
	const newDate = new Date(newTimestamp);
	return newDate.toISOString()
}