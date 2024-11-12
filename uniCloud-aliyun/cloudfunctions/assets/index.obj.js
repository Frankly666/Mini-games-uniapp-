module.exports = {
	_before: function () { // 通用预处理器

	},
	
	/** 初始化用户的财产
	 * @param {String} userId
	 */
	async init(userId) {
		const assets = uniCloud.database().collection('assets');
		assets.add({userId, powerStone: 0, diamond: 0, resourceStone: 0, meteorite: 0}).then(res => {
			return res
		})
	},
	
	/**查询用户的资源
	 * @param {String} userId
	 */
	async select(userId) {
		const assets = uniCloud.database().collection('assets');
		try {
			const res = await assets.where({
				userId: userId
			}).get()
			
			return {
				res
			}
		}catch(err) {
			return {
				err
			}
		}
	},
	

	/** 更新用户资源
	 * @param {String} userId 用户的id
	 * @param {String} type 资源类型
	 * @param {Number} number 增减数量可正可负
	 */
	async update(userId, type, number) {
		const assets = uniCloud.database().collection('assets');
		try {
			const res1 = await assets.where({
				userId: userId
			})
			
			// 得到原本真正的资源
			const data = await res1.get()
			const realData = data.data[0];
			if(realData[type] + number < 0) return {
				err: "资源不能为零"
			}
			const res2 = await res1.update({
				[type]: realData[type] + parseFloat((number*1.0).toFixed(2))
			})
			
			return res2
			
		}catch(err) {
			return err
		}
	}
}
