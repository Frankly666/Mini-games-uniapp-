module.exports = {
	_before: function () { // 通用预处理器

	},
	
	
	/**  进入云城时用户信息进行初始化
	 * @param {Number} phone
	 * @param {String} avatar
	 */
	async init(phone, avatar) {
		const cloudInfo = this.getCloudInfo()
		const db = uniCloud.database()
		const collection = db.collection('user')
		const res = await collection.add({phone, avatar, userName: '趣选云城', createTime: new Date(), isFirst: 0})
		
		// 返回结果
		return {
			res 
		}
	},
	
	
	/**  使用用户电话查询用户是否存在
	 * @param {Number} phone
	 */
	async select(phone) {
		const db = uniCloud.database()
		const res = await db.collection('user').where({
			phone: phone
		}).get()
		
		return {
			res
		}
	},
	

	/**  修改用户名
	 * @param {String} id
	 * @param {String} name
	 */
	async changeName(id, name) {
		if(name.length > 10) {
			return {
				message:'用户名长度最长为6'
			}
		}
		
		const db = uniCloud.database()
		const certainUser = db.collection('user').doc(id)
		try {
				const res = await certainUser.update({ userName: name, isFirst: 1 });
				return {
					res
				};
			} catch (error) {
				return {
					errCode: 'UPDATE_ERROR',
					errMsg: '更新用户名失败',
					detail: error
				};
			}
		
		
		return {
			res
		}
	}
	
}
