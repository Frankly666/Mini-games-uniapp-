'use strict';
const addAssetsChangeRecord = require('../common/addAssetsChangeRecord');
const { assetsNameMap } = require('../common/const'); // 引入资源名称映射表


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
	const nowNum = userAssets.data[0].jewel
	
	// 寻找发布者的assets的索引id
	const publishAssets = await db.collection('assets').where({userId: buyerId}).get()
	const publishAssetsId = publishAssets.data[0]._id
	const publlishNowNum = publishAssets.data[0].jewel
	
	// 1表示购买者和发布者不同, 2表示两者相同
	let code = userId === buyerId ? 2 : 1;
	
	function roundToOneDecimal(num) {
	  return Math.round(num * 10) / 10;
	}
	
	try {
		// 扣除所出售的资源, 只有出售者和发布者id不同时才会进行扣除出售的资源, 要不就是自需自售, 支付出0.05的宝石手续费
		// 只有不是同一个人的时候才进行扣除用户的资源
		if(code === 1) {
			const res3 = await transaction.collection('assets').doc(assetsId).update({
				[demType]: db.command.inc(-inputNumValue)
			})
		}
		
		// 加上用户出售所得到的宝石
		const res4 = await transaction.collection('assets').doc(publishAssetsId).update({
		  jewel: roundToOneDecimal(nowNum+expected),
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
		
		// // 购买者需要减少资源
		// const description1 = `交易集市中出售${assetsNameMap[demType]}${inputNumValue}个, 单价为${buyPrice}, 共${parseFloat((inputNumValue * buyPrice).toFixed(2))}宝石`;
		// await addAssetsChangeRecord(buyerId, demType, description1, new Date(), transaction);

		// // 出售者需要增加宝石
		// const description2 = `交易集市中求购成功${assetsNameMap[demType]}${inputNumValue}个, 单价为${buyPrice}, 共得到${parseFloat((inputNumValue * buyPrice).toFixed(2))}宝石`;
		// await addAssetsChangeRecord(userId, 'jewel', description2, new Date(), transaction);
	  
	  await transaction.commit();
		return code;
	} catch (e) {
		console.error('transaction error', e.message);
	  await transaction.rollback();
	  
	  // 这里可以处理错误，比如显示错误消息等
		return -1;
	}	
};
