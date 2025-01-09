import { useGameInfoStore } from '../stores/gameInfo';

export async function updateOwnGrounds() {
	const groundsDB = uniCloud.importObject("grounds");
	const gameInfo = useGameInfoStore()
	const res = await groundsDB.selectAllGrounds(gameInfo.id)
	gameInfo.ownGrounds = res;
}

