import { useGameInfoStore } from '../stores/gameInfo';

const groundsDB = uniCloud.importObject("grounds");
const gameInfo = useGameInfoStore()

export async function updateOwnGrounds() {
	const res = await groundsDB.selectAllGrounds(gameInfo.id)
	gameInfo.ownGrounds = res;
}
