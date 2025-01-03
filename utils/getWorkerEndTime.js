import { useGameInfoStore } from "../stores/gameInfo";

/** 得到租用结束时间
 * @param {Number} groundType
 */
export function getWorkerEndTime (workerType) {
	const gameInfo = useGameInfoStore();
	const duration = gameInfo.workersMeta[workerType].retainerDuration;
	const now = new Date();
	const timestamp = now.getTime();
	const newTimestamp = timestamp + duration * 24 * 3600 * 1000;
	const newDate = new Date(newTimestamp);
	return newDate.toISOString()
}