'use strict';
// 这个云函数是出售市场中用户进行购买资源对用户资源进行操作的事务云函数
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {sellNum, id, sellPrice, demType, gameInfo, totalPrice, inputNumValue, sellerId} = event
	const db = uniCloud.database();
	const dbCmd = db.command
	const transaction = await db.startTransaction();
	
	// 寻找assets的索引id
	const userAssets = await db.collection('assets').where({userId: gameInfo.id}).get()
	const assetsId = userAssets.data[0]._id
	const nowNum = userAssets.data[0].powerStone
	
	function roundToOneDecimal(num) {
	  return Math.round(num * 10) / 10;
	}
	
	try {
		// 扣除能量石
		const res3 = await transaction.collection('assets').doc(assetsId).update({
			powerStone: roundToOneDecimal(nowNum-totalP0rice)
		})
		  
		// 加上用户买的宝石
		const res4 = await transaction.collection('assets').doc(assetsId).update({
		  [demType]: db.command.inc(inputNumValue),
		});
		
	  // 增加这一条购买记录, 如果用户刚好购买完就消除这条需求
	  const res1 = await transaction
											.collection('transactionRecord')
											.add({
														buyerId: gameInfo.id,
														sellerId, 
														transactionType:  1,
														transactionId: id,
														transactionNum: inputNumValue,
														transactionTime: new Date()
													})
		// 对这条需求进行操作
	  if (sellNum === inputNumValue) {
	    await transaction.collection('sellRequirement').doc(id).update({
	      isFinished: true
	    });
	  } else {
	    await transaction.collection('sellRequirement').doc(id).update({
	      sellNum: sellNum - inputNumValue
	    });
	  }
	
	  await transaction.commit();
		return res3;
	} catch (e) {
		console.error('transaction error', e.message);
	  await transaction.rollback();
	  
	  // 这里可以处理错误，比如显示错误消息等
		return e.message
	}	
};
