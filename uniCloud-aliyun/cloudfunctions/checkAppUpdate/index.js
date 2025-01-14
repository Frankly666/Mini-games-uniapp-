// 云函数 checkUpdate
'use strict';
exports.main = async (event, context) => {
  // 从云存储中获取最新的版本信息
  const latestVersion = {
    versionCode: 2, // 最新版本号
    versionName: "1.0.0", // 最新版本名称
    url: "https://your-unicloud-file-id.file.tcloudbase.com/__UNI__1B67F5F_20250114141841.apk", // 最新 APK 下载地址
    note: "第一个版本" // 更新说明
  };

  return {
    code: 0,
    data: latestVersion
  };
};