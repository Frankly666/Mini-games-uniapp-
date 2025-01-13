/**
 * 根据 gameID 获取用户的唯一 _id
 * @param {string} gameID - 用户的 gameID
 * @returns {Promise<{code: number, message: string, data: {_id: string} | null}>} - 返回结果
 */
export async function getUserIDByGameID(gameID) {
    if (!gameID) {
        return {
            code: -1,
            message: 'gameID 不能为空',
            data: null,
        };
    }

    try {
        // 调用云函数
        const res = await uniCloud.callFunction({
            name: 'selectUserIdByGameId', // 云函数名称
            data: {
                gameID: gameID, // 传入的 gameID
            },
        });

        // 返回云函数的结果
        return res.result;
    } catch (err) {
        console.error('调用云函数失败:', err);
        return {
            code: -1,
            message: '网络错误，请稍后重试',
            data: null,
        };
    }
}

export default getUserIDByGameID;