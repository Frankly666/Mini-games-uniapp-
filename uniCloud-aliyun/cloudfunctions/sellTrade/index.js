'use strict';
// 这个云函数是出售市场中用户进行购买资源对用户资源进行操作的事务云函数
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {sellNum, id, sellPrice, demType, userId, totalPrice, inputNumValue, sellerId} = event
	const db = uniCloud.database();
	const transaction = await db.startTransaction();
	
	// 寻找该用户assets的索引id
	const userAssets = await db.collection('assets').where({userId}).get()
	const assetsId = userAssets.data[0]._id
	const nowNum = userAssets.data[0].jewel
	console.log("nowNum", nowNum)
	
	
	// 寻找发布者的assets的索引id
	const publishAssets = await db.collection('assets').where({userId: sellerId}).get()
	console.log("hhhh",publishAssets.data[0])
	const publishAssetsId = publishAssets.data[0]._id
	const publlishNowNum = publishAssets.data[0].jewel
	
	// 1表示购买者和发布者不同, 2表示两者相同
	let code = userId === sellerId ? 2 : 1;
	
	function roundToOneDecimal(num) {
	  return Math.round(num * 100) / 100;
	}
	
	try {
		// 如果购买者和发布者都一样就直接扣除0.05的手续费就行
		if(code === 2) {
			const res5 = await transaction.collection('assets').doc(assetsId).update({
				jewel: roundToOneDecimal(nowNum - (totalPrice * 0.05))
			}) 
		}else {
			// 加上发布者应获得的宝石, 需要打上折扣0.95
			const res4 = await transaction.collection('assets').doc(publishAssetsId).update({
				jewel: roundToOneDecimal(publlishNowNum + (totalPrice * 0.95))
			}) 
			// 扣除该用户的宝石
			const res3 = await transaction.collection('assets').doc(assetsId).update({
				jewel: roundToOneDecimal(nowNum - totalPrice)	
			})
		}
		
		  
		// 加上用户买的相应资源
		const res5 = await transaction.collection('assets').doc(assetsId).update({
		  [demType]: db.command.inc(inputNumValue),
		});
		
	  // 增加这一条购买记录, 如果用户刚好购买完就消除这条需求
	  const res1 = await transaction
											.collection('transactionRecord')
											.add({
														buyerId: userId,
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
		return code
	} catch (e) {
		console.error('transaction error', e.message);
	  await transaction.rollback();
	  
	  // 这里可以处理错误，比如显示错误消息等
		return -1
	}	
};
