'use strict';

const addAssetsChangeRecord = require('addAssetsChangeRecord');
const { assetsNameMap } = require('const'); // 引入资源名称映射表

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
		
		const description = `交易集市中发布求购${assetsNameMap[addData.demType]}${addData.buyNum}个, 单价为${addData.buyPrice}, 共扣除${parseFloat((addData.buyNum * addData.buyPrice).toFixed(2))}个`
		await addAssetsChangeRecord(userId, 'jewel', description, new Date(), transaction);
		
		await transaction.commit();
		return true;
	}catch (e) {
		console.error('transaction error', e.message);
	  await transaction.rollback();
		return false;
	}	
};
