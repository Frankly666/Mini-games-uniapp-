<template>
	<view class="container">
		<!-- 标题 -->
		<view class="title">趣选云城</view>
		
		<!-- Tab 切换 -->
		<view class="tab">
			<button class="tab-btn" :class="{ active: isLogin }" @click="switchTab('login')">登录</button>
			<button class="tab-btn" :class="{ active: !isLogin }" @click="switchTab('register')">注册</button>
		</view>

		<!-- 提示信息 -->
		<view class="tip">
			<text>老用户需要使用原手机号进行重新注册后进行使用\n</text>
			新用户可随意初始化账户名(建议使用手机号)
		</view>
		
		<!-- 登录表单 -->
		<view class="form" v-if="isLogin">
			<view class="input-group">
				<text class="label">电话/帐号</text>
				<input class="input" type="text" placeholder="请输入" v-model="phone" @input="handleInput('phone', $event)" />
			</view>
			<view class="input-group">
				<text class="label">密码</text>
				<input class="input" type="password" placeholder="请输入密码" v-model="password" @input="handleInput('password', $event)" />
			</view>
			<button class="btn login-btn" @click="handleLogin">登录</button>
		</view>
		
		<!-- 注册表单 -->
		<view class="form" v-else>
			<view class="input-group">
				<text class="label">电话/帐号</text>
				<input class="input" type="text" placeholder="请输入" v-model="phone" @input="handleInput('phone', $event)" />
			</view>
			<view class="input-group">
				<text class="label">密码</text>
				<input class="input" type="password" placeholder="请输入密码" v-model="password" @input="handleInput('password', $event)" />
			</view>
			<view class="input-group">
				<text class="label">重复密码</text>
				<input class="input" type="password" placeholder="请再次输入密码" v-model="repeatPassword" @input="handleInput('repeatPassword', $event)" />
			</view>
			<view class="input-group">
				<text class="label">邀请码</text>
				<input class="input" type="text" placeholder="请输入邀请码(选填)" v-model="inviteCode" @input="handleInput('inviteCode', $event)" />
			</view>
			<button class="btn register-btn" @click="handleRegister">注册</button>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { AVATAR, ID, PHONE, USERNAME, useGameInfoStore } from '../../stores/gameInfo';
import { updateOwnGrounds } from '../../utils/updateOwnGrounds';

// 定义绑定变量
const phone = ref('');
const password = ref('');
const repeatPassword = ref('');
const inviteCode = ref('');
const isLogin = ref(true); // 默认显示登录表单
const gameInfo = useGameInfoStore()

// 切换 Tab
function switchTab(tab) {
	isLogin.value = tab === 'login';
}

// 输入框调试
function handleInput(field, event) {
	// console.log(`${field} 输入内容:`, event.target.value);
}

// 登录逻辑
function handleLogin() {
  if (!phone.value || !password.value) {
    uni.showToast({
      title: '请输入手机号和密码',
      icon: 'none'
    });
    return;
  }

  // 显示加载中的动画
  uni.showLoading({
    title: '登录中...',
    mask: true // 防止用户点击穿透
  });

  // 调用云函数进行登录
  uniCloud.callFunction({
    name: "login",
    data: {
      phone: phone.value,
      password: password.value
    }
  }).then(res => {
    // 隐藏加载中的动画
    uni.hideLoading();

    const { code, message, data } = res.result;

    if (code === 200) {
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      });
			
			// 1. 将用户的信息存储到本地
			uni.setStorageSync("userInfo", data);
			uni.setStorageSync(PHONE, data.phone);
			uni.setStorageSync(USERNAME, data.userName);
			uni.setStorageSync(PHONE, data.phone);
			uni.setStorageSync(ID, data.userId);
			uni.setStorageSync(AVATAR, data.avatar);
			gameInfo.id = data.userId;
			gameInfo.userName = data.userName;
			gameInfo.phone = data.phone;
			gameInfo.isFirst = data.isFirst;
			gameInfo.avatar = data.avatar;
			
			// 加载地皮
			updateOwnGrounds()
			
			// 2. 登录成功后的跳转逻辑
			uni.navigateTo({
				url:"/pages/HomePage/HomePage"
			})
			
    } else {
      uni.showToast({
        title: message || '登录失败，请重试',
        icon: 'none'
      });
    }
  }).catch(err => {
    // 隐藏加载中的动画
    uni.hideLoading();

    console.error('登录失败:', err);
    uni.showToast({
      title: '登录失败，服务器错误',
      icon: 'none'
    });
  });
}

// 注册逻辑
function handleRegister() {
  // 校验手机号长度
  if (phone.value.length < 6) {
    uni.showToast({
      title: '手机号/帐号长度不能少于6个字符',
      icon: 'none'
    });
    return;
  }

  // 校验密码是否一致
  if (password.value !== repeatPassword.value) {
    uni.showToast({
      title: '两次输入的密码不一致',
      icon: 'none'
    });
    return;
  }

  // 校验必填字段
  if (!phone.value || !password.value || !repeatPassword.value) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none'
    });
    return;
  }

  // 显示加载中的动画
  uni.showLoading({
    title: '注册中...',
    mask: true // 防止用户点击穿透
  });

  // 调用云函数进行注册
  uniCloud.callFunction({
    name: "enroll",
    data: {
      phone: phone.value,
      password: password.value,
      inviteCode: inviteCode.value
    }
  }).then(res => {
    // 隐藏加载中的动画
    uni.hideLoading();

    const { code, message, data } = res.result;

    if (code === 200) {
      uni.showToast({
        title: '注册成功',
        icon: 'success'
      });

      // 清空表单数据
      phone.value = '';
      password.value = '';
      repeatPassword.value = '';
      inviteCode.value = '';

      // 切换到登录 Tab
      isLogin.value = true;

      // 注册成功后的跳转逻辑（可选）
      // uni.navigateTo({ url: '/pages/home/index' });
    } else if (code === 400) {
      uni.showToast({
        title: message || '该账号已注册，请直接登录或修改账号名',
        icon: 'none'
      });
    } else {
      uni.showToast({
        title: message || '注册失败，请重试',
        icon: 'none'
      });
    }
  }).catch(err => {
    // 隐藏加载中的动画
    uni.hideLoading();

    console.error('注册失败:', err);
    uni.showToast({
      title: '注册失败，服务器错误',
      icon: 'none'
    });
  });
}

// 页面加载时检查本地存储
// onMounted(() => {
//   const storedPhone = uni.getStorageSync(PHONE);
//   if (storedPhone) {
//     // 如果本地存储中有电话号码，直接跳转到首页
//     uni.navigateTo({
//       url: "/pages/HomePage/HomePage"
//     });
//   }
// });
</script>

<style lang="less">
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	background: linear-gradient(135deg, #6a11cb, #2575fc); /* 渐变背景 */
	color: #fff;
	padding: 5vw; /* 20px -> 5vw */
	box-sizing: border-box;
}

.title {
	font-size: 8vw; /* 6vw -> 8vw */
	font-weight: bold;
	color: #fff;
	margin-top: 10vw;
	margin-bottom: 8vw;
	text-shadow: 0.53vw 0.53vw 1.07vw rgba(0, 0, 0, 0.3); /* 2px -> 0.53vw, 4px -> 1.07vw */
}

.tab {
	display: flex;
	justify-content: center;
	margin-bottom: 5vw;
}

.tab-btn {
	flex: 1;
	height: 10vw;
	font-size: 4vw;
	color: #333;
	background-color: rgba(255, 255, 255, 0.8);
	border: 0.27vw solid #ccc; /* 1px -> 0.27vw */
	border-radius: 2vw;
	margin: 0 2vw;
	cursor: pointer;
	transition: background-color 0.3s ease, color 0.3s ease;
}

.tab-btn.active {
	background-color: #007aff;
	color: #fff;
	border-color: #007aff;
}

.form {
	width: 80vw;
	padding: 5vw;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 2vw;
	box-shadow: 0 0 2.67vw rgba(0, 0, 0, 0.1); /* 10px -> 2.67vw */
}

.input-group {
	margin-bottom: 4vw;
}

.label {
	display: block;
	font-size: 3.5vw;
	margin-bottom: 1.5vw;
	color: #333;
}

.input {
	width: 100%;
	height: 8vw;
	padding: 2vw;
	font-size: 3.5vw;
	border: 0.27vw solid #ccc; /* 1px -> 0.27vw */
	border-radius: 1.5vw;
	box-sizing: border-box;
	background-color: rgba(255, 255, 255, 0.8);
	color: #333; /* 确保字体颜色可见 */
}

.btn {
	width: 100%;
	height: 10vw;
	font-size: 4vw;
	color: #fff;
	border: none;
	border-radius: 2vw;
	margin-top: 3vw;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.login-btn {
	background-color: #007aff;
}

.login-btn:active {
	background-color: #005bb5;
}

.register-btn {
	background-color: #34c759;
}

.register-btn:active {
	background-color: #248a3d;
}

/* 提示信息样式 */
.tip {
	font-size: 3.5vw;
	color: #fff;
	text-align: center;
	margin-top: 2vw;
	margin-bottom: 4vw;
}
</style>