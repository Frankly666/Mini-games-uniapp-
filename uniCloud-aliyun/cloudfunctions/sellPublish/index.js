'use strict';
const addAssetsChangeRecord = require('addAssetsChangeRecord');
const { assetsNameMap } = require('const'); // 引入资源名称映射表

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {addData, inputNumValue, userId} = event;
	const db = uniCloud.database();
	const transaction = await db.startTransaction();
	
	const userAssets = await db.collection('assets').where({userId}).get()
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
		
		const description = `交易集市中发布出售${assetsNameMap[addData.demType]}${addData.sellNum}个, 单价为${addData.sellPrice}, 共扣除${addData.sellNum}个`
		await addAssetsChangeRecord(userId, addData.demType, description, new Date(), transaction);
		
		await transaction.commit();
		return "成功发布!";
	}catch (e) {
		console.error('transaction error', e.message);
	  await transaction.rollback();
		return e.message
	}	
};
