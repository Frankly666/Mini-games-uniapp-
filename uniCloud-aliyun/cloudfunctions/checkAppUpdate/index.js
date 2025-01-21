'use strict';
exports.main = async (event, context) => {
  // 直接在云函数中维护最新版本信息
  const latestVersion = {
    versionCode: 100, // 最新版本号（用于比较版本）
    versionName: "1.0.1", // 最新版本名称（用于显示）
    url: "https://mp-4de62d5a-2380-467f-b109-457713276d05.cdn.bspapp.com/cloudstorage/quxuancheng.apk", // 最新 APK 下载地址
    note: "小bug修复" // 更新说明
  };

  return {
    code: 0,
    data: latestVersion
  };
};