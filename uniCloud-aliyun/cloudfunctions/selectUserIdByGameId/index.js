'use strict';
exports.main = async (event, context) => {
    // event 为客户端上传的参数
    console.log('event : ', event);

    const { gameID } = event; // 从事件中获取 gameID

    if (!gameID) {
        return {
            code: -1,
            message: 'gameID 不能为空',
        };
    }

    const db = uniCloud.database();
    const usersCollection = db.collection('user'); 

    try {
        // 根据 gameID 查询用户
        const res = await usersCollection.where({
            gameID: gameID
        }).get();

        if (res.data.length === 0) {
            return {
                code: 404,
                message: '未找到对应的用户',
            };
        }

        // 返回用户的唯一 _id
        return {
            code: 0,
            message: '查询成功',
            data: {
                _id: res.data[0]._id // 返回用户的唯一 _id
            }
        };
    } catch (e) {
        console.error('查询失败:', e);
        return {
            code: -1,
            message: '查询失败，请稍后重试',
        };
    }
};