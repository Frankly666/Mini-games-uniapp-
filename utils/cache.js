class Cache {  
  // 设置缓存
  static setCache(key, value) {
    // 序列化对象为 JSON 字符串
    uni.setStorageSync(key, value);
  }

  // 获取缓存
  static getCache(key) {
    const value = uni.getStorageSync(key);
    if (value) {
      return value;
    }
    return null;
  }

  // 移除缓存
  static removeCache(key) {
    uni.removeStorageSync(key);
  }

  // 清除所有缓存
  static clearAllCache() {
    uni.clearStorageSync();
  }
}

export default Cache;