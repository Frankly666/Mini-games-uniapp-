export function checkUpdate() {
  const appVersionCode = plus.runtime.versionCode; // 获取当前 App 的版本号
  const appVersionName = plus.runtime.version; // 获取当前 App 的版本名称
	

  uniCloud.callFunction({
    name: 'checkAppUpdate', // 云函数名称
    success: (res) => {
      const latestVersion = res.result.data; // 获取最新版本信息
      console.log("版本号:", appVersionCode, latestVersion.versionCode);
      if (latestVersion.versionCode > appVersionCode) {
        // 如果有新版本
        uni.showModal({
          title: '发现新版本',
          content: `最新版本：${latestVersion.versionName}\n更新说明：${latestVersion.note}\n请更新后继续使用。`,
          showCancel: false, // 禁用取消按钮
          confirmText: '立即更新', // 设置确认按钮的文本
          success: (modalRes) => {
            if (modalRes.confirm) {
              plus.runtime.openURL(latestVersion.url); // 跳转到浏览器下载
            }
          }
        });

        // 监听返回键事件，阻止用户关闭弹窗
        uni.onBackPress(() => {
          uni.showToast({
            title: '请更新后继续使用',
            icon: 'none'
          });
          return true; // 阻止返回键关闭弹窗
        });
      } else {
        // 当前已是最新版本
        // uni.showToast({
        //   title: '当前已是最新版本',
        //   icon: 'none'
        // });
      }
    },
    fail: (err) => {
      console.error('检查更新失败:', err);
      uni.showToast({
        title: '检查更新失败',
        icon: 'none'
      });
    }
  });
}