// utils/getLatestApkUrl.js
export async function getLatestApkUrl() {
  try {
    // 调用云函数 getLatestApkUrl
    const res = await uniCloud.callFunction({
      name: 'getLatestApkUrl'
    });

    if (res.result.code === 0) {
      // 返回最新 APK 的下载链接
      return res.result.data;
    } else {
      throw new Error(res.result.message || '未找到最新版本');
    }
  } catch (err) {
    throw new Error('获取下载链接失败：' + err.message);
  }
}