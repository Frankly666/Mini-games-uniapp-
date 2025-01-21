'use strict';
exports.main = async (event, context) => {
  const db = uniCloud.database();
  const { userId } = event; // 从客户端传入的用户 ID

  try {
    // 1. 查询用户的基本信息（userName、avatar、gameID）
    const userInfo = await db.collection('user').doc(userId).get();
    if (!userInfo.data || userInfo.data.length === 0) {
      return { code: -1, message: '用户不存在' };
    }

    console.log('用户信息:', userInfo.data); // 打印用户信息

    const { userName, avatar, gameID } = userInfo.data[0];

    // 2. 查询别人转赠给我的记录（sendUserId === userId）
    const receiveRecords = await db.collection('sendRecord')
      .where({
        $or: [
          { sendUserId: userId },
          { userId: userId }
        ]
      })
      .get();

    if (receiveRecords.data.length === 0) {
      return { code: 0, data: [] }; // 没有转赠记录
    }

    console.log('接收的转赠记录:', receiveRecords.data); // 打印接收的转赠记录

    // 3. 遍历转赠记录，查询相关用户信息
    const recordList = await Promise.all(
      receiveRecords.data.map(async (record) => {
        // 查询转赠者的信息
        const senderInfo = await db.collection('user')
          .doc(record.userId)
          .get();
					
				const receiverInfo = await db.collection('user')
					.doc(record.sendUserId)
					.get();

        const sender = senderInfo.data[0];
				const receiver = receiverInfo.data[0];

        // 将每条记录的相关信息包裹到一个对象中
        const recordItem = {
          transferRecord: {
            assetsType: record.assetsType,
            sendNum: record.sendNum,
            sendTime: record.sendTime,
          },
          senderInfo: { // 转赠者信息
            userName: sender.userName,
            avatar: sender.avatar,
            gameID: sender.gameID,
          },
          receiverInfo: { // 接收者信息（当前用户）
            userName: receiver.userName,
            avatar: receiver.avatar,
            gameID: receiver.gameID,
          },
        };

        return recordItem; // 返回包裹后的对象
      })
    );

    // 4. 按照 sendTime 从最新到最旧排序
    recordList.sort((a, b) => {
      return new Date(b.transferRecord.sendTime) - new Date(a.transferRecord.sendTime);
    });

    // 5. 返回结果
    return { code: 200, data: recordList };
  } catch (err) {
    console.error('查询失败', err);
    return { code: -2, message: '查询失败' };
  }
};