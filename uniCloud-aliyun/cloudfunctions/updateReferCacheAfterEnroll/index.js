'use strict';

const findReferrers = require('findReferrers');
const updateReferCacheWhileEnroll = require('updateReferCacheWhileEnroll');

// 如果有新用户注册那么会主动进行更新用户的推荐关系
const db = uniCloud.database(); 
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {userId} = event;
	
	// 找到所有的上级推荐者
	const referrers = await findReferrers(userId);
	const updateUserList = [...referrers, userId];
	const res = await updateReferCacheWhileEnroll(updateUserList)
	
	return res;
	//返回数据给客户端
	return event
};
