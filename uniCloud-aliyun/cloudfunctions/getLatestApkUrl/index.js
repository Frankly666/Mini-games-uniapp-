// 云函数 getLatestApkUrl
'use strict';
exports.main = async (event, context) => {
  // 返回最新 APK 的下载链接
  const latestApkUrl = "https://mp-4de62d5a-2380-467f-b109-457713276d05.cdn.bspapp.com/cloudstorage/quxuancheng.apk";
  return {
    code: 0,
    data: latestApkUrl
  };
};