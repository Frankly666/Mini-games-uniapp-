/** 如果有新用户注册那么会主动进行更新用户的推荐关系
 * @param {String} userId 新注册用户的id
 */
export default async function updateReferCacheAfterEnroll(userId) {
	console.log()
	try {
		const res = await uniCloud.callFunction({
			name:'updateReferCacheAfterEnroll',
			data: {
				userId: userId,
			}
		})
		
		console.log("结果:", res);
	}catch(err) {
		console.log("错误信息:", err);
	}
}
