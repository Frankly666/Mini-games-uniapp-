'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {phone, userId, assetsType, sendNum, premium} = event;
	const db = uniCloud.database();
	const transaction = await db.startTransaction();
	
	const sendUser = await db.collection('user').where({phone: parseInt(phone)}).get()
	// 判断是否存在这个手机号
	if(sendUser.affectedDocs === 0) {
		return -1;
	}
	const sendUserId = sendUser.data[0]._id
	if(sendUserId === userId) {
		return -2
	}
	
	// 找到受赠者的资源表的id
	const sendUserAssets = await db.collection('assets').where({userId: sendUserId}).get()
	const sendUserassetsId = sendUserAssets.data[0]._id
	const sendUsernowNum = sendUserAssets.data[0][assetsType]
	console.log("sendUsernowNum:", sendUsernowNum)
	
	// 找到赠送者的id
	const userAssets = await db.collection('assets').where({userId}).get()
	const userAssetsId = userAssets.data[0]._id
	const userNowNum = userAssets.data[0][assetsType]
	console.log("userNowNum:", userNowNum)
	
	function roundToOneDecimal(num) {
	  return Math.round(num * 10) / 10;
	}
	
	try {
		// 减去赠送者的资源
		const res1 = await transaction.collection("assets").doc(userAssetsId).update({
			[assetsType]: roundToOneDecimal(userNowNum - (sendNum * (1 + premium)))
		})
		// 加上受赠者的资源
		const res2 = await transaction.collection('assets').doc(sendUserassetsId).update({
			[assetsType]: roundToOneDecimal(sendUsernowNum + sendNum)
		})
		
		// 增添转赠记录
		const res3 = await transaction.collection('sendRecord').add({
			userId,
			sendUserId,
			assetsType,
			sendNum,
			sendTime: new Date(),
		})
		
		await transaction.commit();
		return 1;
	}catch(e) {
		console.error('transaction error', e.message);
		await transaction.rollback();
		return 0;
	}

};
