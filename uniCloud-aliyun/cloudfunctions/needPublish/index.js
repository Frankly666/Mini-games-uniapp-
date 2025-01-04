'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {addData, totalPrice, userId} = event;
	const db = uniCloud.database();
	const transaction = await db.startTransaction();
	
	const userAssets = await db.collection('assets').where({userId}).get()
	const assetsId = userAssets.data[0]._id
	const nowNum = userAssets.data[0].jewel
	
	function roundToOneDecimal(num) {
	  return Math.round(num * 10) / 10;
	}
	
	try {
		const res1 = await transaction.collection("buyRequirement").add(addData)
		const res2 = await transaction.collection("assets").doc(assetsId).update({
			jewel: roundToOneDecimal(nowNum - totalPrice)
		})
		await transaction.commit();
		return true;
	}catch (e) {
		console.error('transaction error', e.message);
	  await transaction.rollback();
		return false;
	}	
};
