'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {phone, userId, assetsType, sentNum, premium} = event;
	const db = uniCloud.database();
	const transaction = await db.startTransaction();
	
	const sentUser = await db.collection('user').where({phone: parseInt(phone)}).get()
	// 判断是否存在这个手机号
	if(sentUser.affectedDocs === 0) {
		return -1;
	}
	const sentUserId = sentUser.data[0]._id
	if(sentUserId === userId) {
		return -2
	}
	
	// 找到受赠者的资源表的id
	const sentUserAssets = await db.collection('assets').where({userId: sentUserId}).get()
	const sentUserassetsId = sentUserAssets.data[0]._id
	const sentUsernowNum = sentUserAssets.data[0][assetsType]
	console.log("sentUsernowNum:", sentUsernowNum)
	
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
			[assetsType]: roundToOneDecimal(userNowNum - sentNum)
		})
		// 加上受赠者的资源
		const res2 = await transaction.collection('assets').doc(sentUserassetsId).update({
			[assetsType]: roundToOneDecimal(sentUsernowNum + (sentNum * (1 - premium)))
		})
		await transaction.commit();
		return 1;
	}catch(e) {
		console.error('transaction error', e.message);
		await transaction.rollback();
		return 0;
	}

};
