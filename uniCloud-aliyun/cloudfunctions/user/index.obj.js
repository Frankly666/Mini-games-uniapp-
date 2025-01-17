module.exports = {
	_before: function () { // 通用预处理器

	},
	
	
	/**  进入云城时用户信息进行初始化
	 * @param {Number} phone
	 * @param {String} avatar
	 */
	async init(phone, avatar, pusherId) {
		const cloudInfo = this.getCloudInfo()
		const db = uniCloud.database()
		const collection = db.collection('user')
		const res = await collection.add({phone, avatar, userName: '趣选城', createTime: new Date(), isFirst: 0, pusherId: pusherId | null})
		
		// 返回结果
		return {
			res 
		}
	},
	
	
	/**  使用用户电话查询用户是否存在
	 * @param {String} id
	 */
	async  getUserById(id) {
	  const db = uniCloud.database();
	  try {
	    // 查询用户数据
	    const res = await db.collection('user').doc(id).get();
	
	    // 如果查询结果为空（文档不存在）
	    if (!res.data || res.data.length === 0) {
	      return {
	        code: 404,
	        message: '用户不存在',
	      };
	    }
	
	    // 返回查询结果
	    return {
	      code: 200,
	      message: '查询成功',
	      data: res.data[0], // 返回用户数据
	    };
	  } catch (error) {
	    console.error('查询用户失败:', error);
	    return {
	      code: 500,
	      message: '查询用户失败，服务器内部错误',
	    };
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
