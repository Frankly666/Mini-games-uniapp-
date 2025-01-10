'use strict';
const db = uniCloud.database(); // 获取数据库引用
const crypto = require('crypto'); // 引入加密模块
const defaultAvatar = 'https://mp-4de62d5a-2380-467f-b109-457713276d05.cdn.bspapp.com/cloudstorage/c9e58edf-ac5f-4890-88bc-aa8a8f3951a5.jpg';

// 生成一个随机的 8 位数字
function generateRandomCode() {
  return Math.floor(10000000 + Math.random() * 90000000).toString(); // 生成 8 位数字
}

// 检查邀请码是否已存在
async function isInviteCodeUnique(inviteCode) {
  const userCollection = db.collection('user');
  const queryResult = await userCollection.where({ inviteCode }).get();
  return queryResult.data.length === 0; // 如果不存在，返回 true
}

// 生成唯一的邀请码
async function generateUniqueInviteCode() {
  let inviteCode;
  let isUnique = false;

  while (!isUnique) {
    inviteCode = generateRandomCode(); // 生成一个邀请码
    isUnique = await isInviteCodeUnique(inviteCode); // 检查是否唯一
  }

  return inviteCode;
}

// 生成一个随机的 8 位数字 gameId
function generateGameId() {
  return Math.floor(10000000 + Math.random() * 90000000).toString(); // 生成 8 位数字
}

// 检查 gameId 是否已存在
async function isGameIdUnique(gameId) {
  const userCollection = db.collection('user');
  const queryResult = await userCollection.where({ gameID: gameId }).get();
  return queryResult.data.length === 0; // 如果不存在，返回 true
}

// 生成唯一的 gameId
async function generateUniqueGameId() {
  let gameId;
  let isUnique = false;

  while (!isUnique) {
    gameId = generateGameId(); // 生成一个 gameId
    isUnique = await isGameIdUnique(gameId); // 检查是否唯一
  }

  return gameId;
}

// 对密码进行加密
function encryptPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex'); // 使用 SHA-256 加密
}

exports.main = async (event, context) => {
  const { phone, password, inviteCode, userName } = event; // 从事件中解构出参数

  try {
    // 1. 检查 user 表中是否已存在该手机号
    const userCollection = db.collection('user');
    const userQuery = await userCollection.where({ phone }).get();

    if (userQuery.data.length > 0) {
      // 如果 user 表中已存在该手机号，返回错误信息
      return {
        code: 400,
        message: '手机号已注册，请直接登录',
      };
    }

    // 2. 查询 oldUser 表，判断用户是否存在
    const oldUserCollection = db.collection('oldUser');
    const oldUserQuery = await oldUserCollection.where({ phone }).get();

    let userData, isOldUser = false;

    if (oldUserQuery.data.length > 0) {
      // 如果 oldUser 中存在该用户
      const oldUserData = oldUserQuery.data[0]; // 获取 oldUser 中的用户数据
      isOldUser = true;

      // 使用 oldUser 中的数据
      userData = {
        phone: oldUserData.phone,
        avatar: defaultAvatar,
        userName: oldUserData.name, // 使用 oldUser 中的用户名
        createTime: new Date().toISOString(), // 当前时间
        isFirst: 0, // 初始化为 0
        pusherCode: oldUserData.pusherPhone || null, // 如果 oldUser 中的 pusherPhone 有值，则将其添加到 pusherCode 字段
        isMerchant: oldUserData.isMerchant || false, // 使用 oldUser 中的 isMerchant 字段，如果没有则默认为 false
        wechat: "", // 初始化 wechat 字段为空字符串
      };
    } else {
      // 如果 oldUser 中不存在该用户，直接使用传入的数据注册
      userData = {
        phone,
        avatar: defaultAvatar,
        userName: userName || "趣选云城", // 使用传入的用户名，如果没有则初始化为 "趣选云城"
        createTime: new Date().toISOString(), // 当前时间
        isFirst: 0, // 初始化为 0
        pusherCode: null, // 初始化为 null，后续会根据 inviteCode 更新
        isMerchant: false, // 初始化为 false
        wechat: "", // 初始化 wechat 字段为空字符串
      };

      // 如果新用户提供了 inviteCode，则根据 inviteCode 查找 pusherCode
      if (inviteCode) {
        const pusherQuery = await userCollection.where({ inviteCode }).get();
        if (pusherQuery.data.length > 0) {
          // 如果找到了对应的用户，将其 phone 赋值给 pusherCode
          userData.pusherCode = pusherQuery.data[0].phone;
        }
      }
    }

    // 3. 对密码进行加密
    const encryptedPassword = encryptPassword(password);
    userData.password = encryptedPassword; // 将加密后的密码存储到用户数据中

    // 4. 生成唯一的 gameId
    const gameId = await generateUniqueGameId();
    userData.gameID = gameId; // 将生成的 gameId 添加到用户数据中

    // 5. 生成唯一的邀请码
    const inviteCodeUnique = await generateUniqueInviteCode();
    userData.inviteCode = inviteCodeUnique; // 将生成的邀请码添加到用户数据中

    // 6. 插入新用户到 user 表
    const userInsertResult = await userCollection.add(userData);
    const userId = userInsertResult.id; // 获取新插入用户的 userId

    // 7. 插入用户资源到 assets 表
    const assetsCollection = db.collection('assets');
    const assetsData = {
      userId,
      gameID: gameId, // 将生成的 gameId 添加到 assets 表中
      powerStone: isOldUser ? Number(oldUserQuery.data[0].power) : 0, // 如果是老用户，使用 oldUser 中的 power；否则初始化为 0
      diamond: 0, // 初始化为 0
      resourceStone: 0, // 初始化为 0
      jewel: 0, // 初始化为 0
      meteorite: 0, // 初始化为 0
    };

    await assetsCollection.add(assetsData);

    // 返回成功信息
    return {
      code: 200,
      message: '注册成功',
      data: {
        userId,
        gameId,
        userName: userData.userName,
        phone: userData.phone,
        avatar: defaultAvatar, // 返回默认头像
        isOldUser, // 标识是否为老用户
        inviteCode: inviteCodeUnique, // 返回生成的邀请码
        wechat: userData.wechat, // 返回初始化的 wechat 字段
      },
    };
  } catch (error) {
    console.error('注册失败:', error);
    return {
      code: 500,
      message: '注册失败，服务器内部错误',
    };
  }
};