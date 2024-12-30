'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {addData, inputNumValue, gameInfo} = event;
	const db = uniCloud.database();
	const transaction = await db.startTransaction();
	
	const userAssets = await db.collection('assets').where({userId: gameInfo.id}).get()
	const assetsId = userAssets.data[0]._id
	const nowNum = userAssets.data[0][addData.gemType]
	
	function roundToOneDecimal(num) {
	  return Math.round(num * 10) / 10;
	}
	
	try {
		const res1 = await transaction.collection("sellRequirement").add(addData)
		const res2 = await transaction.collection("assets").doc(assetsId).update({
			[addData.gemType]: roundToOneDecimal(nowNum - inputNumValue)
		})
		console.log("assetsId", res2)
		await transaction.commit();
		return "成功发布!";
	}catch (e) {
		console.error('transaction error', e.message);
	  await transaction.rollback();
		return e.message
	}	
};
