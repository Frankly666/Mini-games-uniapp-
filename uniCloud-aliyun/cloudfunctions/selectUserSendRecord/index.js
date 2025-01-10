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

    // 2. 查询转赠记录
    // 2.1 查询我转赠给别人的记录（userId === userId）
    const sendRecords = await db.collection('sendRecord')
      .where({ userId })
      .get();

    // 2.2 查询别人转赠给我的记录（sendUserId === userId）
    const receiveRecords = await db.collection('sendRecord')
      .where({ sendUserId: userId })
      .get();

    // 合并两种记录
    const allRecords = [...sendRecords.data, ...receiveRecords.data];

    if (allRecords.length === 0) {
      return { code: 0, data: [] }; // 没有转赠记录
    }

    console.log('所有转赠记录:', allRecords); // 打印所有转赠记录

    // 3. 遍历转赠记录，查询相关用户信息
    const recordList = await Promise.all(
      allRecords.map(async (record) => {
        // 判断当前记录是“我转赠给别人”还是“别人转赠给我”
        const isSender = record.userId === userId; // 是否为转赠者

        // 查询接收者或转赠者的信息
        const targetUserId = isSender ? record.sendUserId : record.userId;
        const targetUserInfo = await db.collection('user')
          .doc(targetUserId)
          .get();

        const targetUser = targetUserInfo.data[0];
        console.log('目标用户信息:', targetUser); // 打印目标用户信息

        // 将每条记录的相关信息包裹到一个对象中
        const recordItem = {
          transferRecord: {
            assetsType: record.assetsType,
            sendNum: record.sendNum,
            sendTime: record.sendTime,
          },
          senderInfo: isSender
            ? { // 转赠者信息（当前用户）
                userName,
                avatar,
                gameID,
              }
            : { // 转赠者信息（别人）
                userName: targetUser.userName,
                avatar: targetUser.avatar,
                gameID: targetUser.gameID,
              },
          receiverInfo: isSender
            ? { // 接收者信息（别人）
                userName: targetUser.userName,
                avatar: targetUser.avatar,
                gameID: targetUser.gameID,
              }
            : { // 接收者信息（当前用户）
                userName,
                avatar,
                gameID,
              },
        };

        return recordItem; // 返回包裹后的对象
      })
    );

    // 4. 返回结果
    return { code: 200, data: recordList };
  } catch (err) {
    console.error('查询失败', err);
    return { code: -2, message: '查询失败' };
  }
};