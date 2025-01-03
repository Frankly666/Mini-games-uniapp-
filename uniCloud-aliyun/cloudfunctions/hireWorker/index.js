'use strict';
// 聘用工人时添加记录和扣除余额
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {userId, hirePrice, workerType, groundType, groundIndex, workerEndTime} = event;
	
	const db = uniCloud.database();
	const transaction = await db.startTransaction();
	
	// 找到用户资源的id
	const userAssets = await db.collection('assets').where({userId: userId}).get()
	const assetsId = userAssets.data[0]._id
	const nowNum = userAssets.data[0].powerStone
	
	// 找到用户租用地皮记录的id
	const userGrounds = await db.collection('userGrounds').where({groundType}).get()
	console.log(userGrounds)
	let groundId = userGrounds.data[0]._id;
	userGrounds.data.map(item => {
		if(item.groundIndex === groundIndex) {
			groundId = item._id;
		}
	})
	
	// 去除小数点
	function roundToOneDecimal(num) {
	  return Math.round(num * 10) / 10;
	}
	
	try {
		const res1 = await transaction.collection("userGrounds").doc(groundId).update({
			isHaveWorker: true,
			workerType: workerType,
			workerEndTime: workerEndTime
		})
		const res2 = await transaction.collection("assets").doc(assetsId).update({
			powerStone: roundToOneDecimal(nowNum - hirePrice)
		})
		await transaction.commit();
		return true;
	}catch(e) {
		console.error('transaction error', e.message);
		await transaction.rollback();
		return false;
	}
};
