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

    const userData = userInfo.data[0]; // 获取用户信息
    const { userName, avatar, gameID } = userData;

    console.log('用户信息:', userData); // 打印用户信息

    // 2. 查询交易记录
    // 2.1 查询我是购买者的记录（buyerId === userId）
    const buyerRecords = await db.collection('transactionRecord')
      .where({ buyerId: userId })
      .get();

    // 2.2 查询我是发布者的记录（sellerId === userId）
    const sellerRecords = await db.collection('transactionRecord')
      .where({ sellerId: userId })
      .get();

    // 合并两种记录
    const allRecords = [...(buyerRecords.data || []), ...(sellerRecords.data || [])];

    if (allRecords.length === 0) {
      return { code: 0, data: [] }; // 没有交易记录
    }

    console.log('所有交易记录:', allRecords); // 打印所有交易记录

    // 3. 遍历交易记录，查询相关用户信息
    const recordList = await Promise.all(
      allRecords.map(async (record) => {
        try {
          // 判断当前记录是“我是购买者”还是“我是发布者”
          const isBuyer = record.buyerId === userId; // 是否为购买者

          // 查询对方用户的信息（发布者或购买者）
          const targetUserId = isBuyer ? record.sellerId : record.buyerId;
          const targetUserInfo = await db.collection('user')
            .doc(targetUserId)
            .get();

          // 检查目标用户信息是否存在
          if (!targetUserInfo.data || targetUserInfo.data.length === 0) {
            console.warn('目标用户信息不存在:', targetUserId);
            return null; // 跳过此条记录
          }

          const targetUser = targetUserInfo.data[0];
          console.log('目标用户信息:', targetUser); // 打印目标用户信息

          // 将每条记录的相关信息包裹到一个对象中
          const recordItem = {
            transactionRecord: {
              transactionType: record.transactionType,
              transactionNum: record.transactionNum,
              transactionTime: record.transactionTime,
            },
            buyerInfo: isBuyer
              ? { // 购买者信息（当前用户）
                  userName,
                  avatar,
                  gameID,
                }
              : { // 购买者信息（对方用户）
                  userName: targetUser.userName,
                  avatar: targetUser.avatar,
                  gameID: targetUser.gameID,
                },
            sellerInfo: isBuyer
              ? { // 发布者信息（对方用户）
                  userName: targetUser.userName,
                  avatar: targetUser.avatar,
                  gameID: targetUser.gameID,
                }
              : { // 发布者信息（当前用户）
                  userName,
                  avatar,
                  gameID,
                },
          };

          return recordItem; // 返回包裹后的对象
        } catch (err) {
          console.error('处理记录时出错:', err);
          return null; // 跳过此条记录
        }
      })
    );

    // 过滤掉 null 的记录
    const filteredRecordList = recordList.filter(record => record !== null);

    // 4. 返回结果
    return { code: 200, data: filteredRecordList };
  } catch (err) {
    console.error('查询失败', err);
    return { code: -2, message: '查询失败' };
  }
};