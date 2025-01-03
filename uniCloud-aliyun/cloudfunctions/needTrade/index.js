'use strict';
// 这个云函数是求购市场中用户进行出售资源对用户资源进行操作的事务云函数
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log(event)
	const {buyNum, id, buyPrice, demType, userId, expected, inputNumValue, buyerId} = event
	const db = uniCloud.database();
	const dbCmd = db.command
	const transaction = await db.startTransaction();
	
	// 寻找assets的索引id
	const userAssets = await db.collection('assets').where({userId}).get()
	const assetsId = userAssets.data[0]._id
	const nowNum = userAssets.data[0].powerStone
	console.log("userAssets", userAssets)
	
	function roundToOneDecimal(num) {
	  return Math.round(num * 10) / 10;
	}
	
	try {
		// 扣除宝石
		const res3 = await transaction.collection('assets').doc(assetsId).update({
			[demType]: db.command.inc(-inputNumValue)
		})
		
		// 加上用户出售所得到的能量石
		const res4 = await transaction.collection('assets').doc(assetsId).update({
		  powerStone: roundToOneDecimal(nowNum+expected),
		});
		
	  // 增加这一条购买记录, 如果用户刚好购买完就消除这条需求
	  const res1 = await transaction
											.collection('transactionRecord')
											.add({
														buyerId,
														sellerId: userId, 
														transactionType:  2,
														transactionId: id,
														transactionNum: inputNumValue,
														transactionTime: new Date()
													})
										
		// 对这条求购需求进行操作
	  if (buyNum === inputNumValue) {
	    await transaction.collection('buyRequirement').doc(id).update({
	      isFinished: true
	    });
	  } else {
	    await transaction.collection('buyRequirement').doc(id).update({
	      buyNum: buyNum - inputNumValue
	    });
	  }
	  
	  await transaction.commit();
		return true;
	} catch (e) {
		console.error('transaction error', e.message);
	  await transaction.rollback();
	  
	  // 这里可以处理错误，比如显示错误消息等
		return false;
	}	
};
