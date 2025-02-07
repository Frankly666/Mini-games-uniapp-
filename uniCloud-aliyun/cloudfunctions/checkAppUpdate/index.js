'use strict';
exports.main = async (event, context) => {
  // 直接在云函数中维护最新版本信息
  const latestVersion = {
    versionCode: 101, // 最新版本号（用于比较版本）
    versionName: "1.1.1", // 最新版本名称（用于显示）
    url: "https://mp-4de62d5a-2380-467f-b109-457713276d05.cdn.bspapp.com/cloudstorage/__UNI__1B67F5F_20250124210033.apk", // 最新 APK 下载地址
    note: "推广页面更新" // 更新说明
  };

  return {
    code: 0,
    data: latestVersion
  };
};