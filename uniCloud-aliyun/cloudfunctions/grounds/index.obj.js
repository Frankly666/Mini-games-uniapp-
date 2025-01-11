module.exports = {
  /**  查询用户所拥有的所有地皮
   * @param {String} userId
   */
  async selectAllGrounds(userId) {
    try {
      console.log('userId:', userId); // 打印 userId
      if (!userId) {
        throw new Error('userId 为空');
      }

      const ground = uniCloud.database().collection("userGrounds");
      const res = await ground.where({ userId }).get();
      console.log('查询结果:', res); // 打印查询结果

      if (res.data.length === 0) {
        console.warn('未找到与 userId 匹配的地皮数据');
        return {};
      }

      // 中间可考虑处理一下数据
      const allGrounds = res.data;
      const classifyGrounds = {};
      allGrounds.map(item => {
        if (classifyGrounds[item.groundType]) {
          classifyGrounds[item.groundType].push(item);
        } else {
          classifyGrounds[item.groundType] = [item];
        }
      });

      console.log('分类后的地皮数据:', classifyGrounds); // 打印分类后的数据
      return classifyGrounds;
    } catch (error) {
      console.error('selectAllGrounds 出错:', error.message);
      throw error;
    }
  }
};