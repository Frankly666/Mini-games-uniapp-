/**
 * 根据 avatarID 获取可访问的图片 URL
 * @param {string} avatarID - 头像的唯一标识
 * @returns {Promise<string>} - 返回图片的访问 URL
 */
export async function getAvatarUrl(avatarID) {
  try {
    // 1. 将 avatarID 转换为 fileID
    const fileID = `cloud://${avatarID}`;

    // 2. 获取云存储文件的临时访问 URL
    const result = await uniCloud.getTempFileURL({
      fileList: [fileID] // 传入 fileID
    });

    // 3. 返回图片的访问 URL
    if (result.fileList && result.fileList.length > 0) {
      return result.fileList[0].tempFileURL;
			console.log("url:", result.fileList)
    } else {
      throw new Error('未找到对应的图片');
    }
  } catch (error) {
    console.error('获取图片 URL 失败:', error);
    throw error;
  }
}