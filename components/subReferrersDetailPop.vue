<template>
  <view class="popup-overlay" @click="handleClose">
    <view class="popup-content" @click.stop>
      <!-- 关闭按钮 -->
      <view class="close-button" @click="handleClose">×</view>

      <text class="popup-title">{{ title }}</text>

      <!-- 加载中状态 -->
      <view v-if="loading" class="loading-tip">
        <text>加载中...</text>
      </view>

      <!-- 用户列表 -->
      <view v-else-if="filteredUsers.length > 0" class="user-list">
        <view
          v-for="user in filteredUsers"
          :key="user.userInfo._id"
          class="user-card"
          @click="toggleCard(user.userInfo._id)"
        >
          <!-- 用户基本信息 -->
          <view class="user-info">
            <image :src="user.userInfo.avatar" class="user-avatar"></image>
            <view class="user-details">
              <text class="user-name">{{ user.userInfo.userName }}</text>
              <text class="game-id">游戏ID: {{ user.userInfo.gameID }}</text>
            </view>
            <!-- 总收益 -->
            <view class="total-earnings">
              <text class="total-earnings-label">总收益</text>
              <text class="total-earnings-value">{{ calculateTotalEarnings(user.recordList) }}能量石</text>
            </view>
          </view>

          <!-- 收益记录 -->
          <view
            :class="['earnings-list', expandedCardId === user.userInfo._id ? 'expanded' : '']"
          >
            <view class="earnings-table">
              <!-- 表头 -->
              <view class="table-header">
                <text class="header-item">收益来源</text>
                <text class="header-item">收益金额</text>
                <text class="header-item">收益时间</text>
              </view>

              <!-- 表格内容 -->
              <view v-for="(record, index) in user.recordList" :key="index" class="table-row">
                <text class="table-item">
                  {{ getEarningsSource(record) }} <!-- 动态展示收益来源 -->
                </text>
                <text class="table-item">{{ record.amount }}能量石</text>
                <text class="table-item">{{ formatDate(record.createTime) }}</text>
              </view>

              <!-- 没有收益记录时的提示 -->
              <view v-if="user.recordList.length === 0" class="no-earnings-tip">
                <text>暂无收益记录</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 加载更多按钮 -->
        <view v-if="hasMore" class="load-more" @click="loadMore">
          <view v-if="loadingMore" class="loading-spinner">
            <view class="spinner"></view>
            <text>正在加载...</text>
          </view>
          <text v-else>加载更多</text>
        </view>
      </view>

      <!-- 没有推荐用户时的提示 -->
      <view v-else class="no-data-tip">
        <text>没有更多推荐用户</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getReferralUsersWithEarnings } from '../utils/selectSubReferrersDetail.js';

// 接收父组件传递的 type 参数
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['direct', 'indirect'].includes(value)
  }
});

// 用户列表
const users = ref([]);

// 加载状态
const loading = ref(true);

// 加载更多状态
const loadingMore = ref(false);

// 当前展开的卡片 ID
const expandedCardId = ref(null);

// 分页相关
const page = ref(1);
const limit = ref(5);
const hasMore = ref(true);

// 地皮类型和名字的映射表
const groundsMeta = {
  "1": { "groundName": "一级土地" },
  "2": { "groundName": "资源地皮" },
  "3": { "groundName": "二级土地" },
  "4": { "groundName": "三级土地" },
  "5": { "groundName": "四级土地" },
  "6": { "groundName": "五级土地" }
};

const groundNameMap = Object.keys(groundsMeta).reduce((map, key) => {
  map[key] = groundsMeta[key].groundName;
  return map;
}, {});

// 根据 type 动态设置弹窗标题和内容
const title = computed(() => {
  return props.type === 'direct' ? '直接推荐用户列表' : '间接推荐用户列表';
});

// 筛选后的用户列表
const filteredUsers = computed(() => {
  const userPhone = uni.getStorageSync('phone');
  return users.value.filter(user => {
    if (props.type === 'direct') {
      return user.userInfo.pusherCode === userPhone; // 直推用户：pusherCode 等于当前用户 ID
    } else {
      return user.userInfo.pusherCode !== userPhone; // 间推用户：pusherCode 不等于当前用户 ID
    }
  });
});

// 关闭弹窗事件
const emit = defineEmits(['close']);
const handleClose = () => {
  emit('close');
};

// 切换卡片展开状态
const toggleCard = (userId) => {
  if (expandedCardId.value === userId) {
    expandedCardId.value = null; // 如果已经展开，则收起
  } else {
    expandedCardId.value = userId; // 否则展开
  }
};

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

// 获取收益来源
const getEarningsSource = (record) => {
  if (record.claimGroundList && record.claimGroundList.length > 0) {
    // 如果有 claimGroundList，展示地皮名称
    return record.claimGroundList
      .map(groundId => groundNameMap[groundId] || '未知地皮')
      .join('\n'); // 多项用逗号分隔
  }
  return '土地收益'; // 默认值
};

// 计算总收益
const calculateTotalEarnings = (recordList) => {
  if (!recordList || recordList.length === 0) return 0;
  return recordList.reduce((total, record) => total + (record.amount || 0), 0).toFixed(2);
};

// 获取推广用户数据
const fetchReferralUsers = async () => {
  try {
    const result = await getReferralUsersWithEarnings({
      userId: uni.getStorageSync('id'),
      type: props.type,
      page: page.value,
      limit: limit.value
    });

    if (result.code === 200) {
      users.value = [...users.value, ...result.data]; // 追加新数据
      hasMore.value = result.hasMore; // 更新是否有更多数据
    } else {
      uni.showToast({
        title: '获取数据失败，请稍后重试',
        icon: 'none'
      });
    }
  } catch (err) {
    console.error('获取推广用户数据失败:', err);
    uni.showToast({
      title: '获取数据失败，请稍后重试',
      icon: 'none'
    });
  } finally {
    loading.value = false; // 无论成功或失败，都关闭加载状态
    loadingMore.value = false; // 关闭加载更多状态
  }
};

// 加载更多数据
const loadMore = () => {
  if (loadingMore.value) return; // 防止重复点击
  loadingMore.value = true; // 显示加载提示
  page.value += 1;
  fetchReferralUsers();
};

// 页面加载时获取数据
onMounted(() => {
  fetchReferralUsers();
});
</script>



<style>
/* 弹窗遮罩层 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 90vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* 弹窗内容 */
.popup-content {
  position: absolute;
  width: 84vw;
  height: 70vh;
	padding: 3vw;
	box-sizing: border-box;
  background-color: #fff;
  border-radius: 2vw;
  text-align: center;
  position: relative;
}

/* 关闭按钮 */
.close-button {
  position: absolute;
  top: 2vw;
  right: 2vw;
  font-size: 6vw;
  color: #999;
  cursor: pointer;
}

.close-button:hover {
  color: #333;
}

/* 弹窗标题 */
.popup-title {
  font-size: 4.5vw;
  font-weight: bold;
  color: #333;
  margin-bottom: 2.5vw;
}

/* 弹窗消息 */
.popup-message {
  font-size: 3.5vw;
  color: #666;
  margin-bottom: 5vw;
}

/* 加载中提示 */
.loading-tip {
  font-size: 4vw;
  color: #999;
  margin-top: 10vw;
}

/* 用户列表 */
.user-list {
  width: 100%;
  max-height: 93%;
  overflow-y: auto;
  margin-bottom: 5vw;
  display: flex;
  flex-direction: column;
  align-items: left;
}

/* 用户卡片 */
.user-card {
  border: 1px solid #eee;
  border-radius: 2vw;
  padding: 3vw;
  margin-bottom: 3vw;
  cursor: pointer;
}

/* 用户基本信息 */
.user-info {
  display: flex;
  align-items: center;
}

/* 用户头像 */
.user-avatar {
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  margin-right: 3vw;
}

/* 用户详情 */
.user-details {
  display: flex;
  flex-direction: column;
}

/* 用户名称 */
.user-name {
  font-size: 3.5vw;
  color: #333;
}

/* 游戏ID */
.game-id {
  font-size: 3vw;
  color: #666;
}

/* 总收益 */
.total-earnings {
  margin-left: auto; /* 靠右对齐 */
  text-align: right;
  font-size: 3vw;
}

.total-earnings-label {
  font-size: 3vw;
  color: #666;
}

.total-earnings-value {
  font-size: 3vw;
  color: #333;
  font-weight: bold;
}

/* 收益记录表格 */
.earnings-table {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 2vw;
  overflow: hidden;
}

/* 表头 */
.table-header {
  display: flex;
  background-color: #f9f9f9;
  padding: 2vw;
  border-bottom: 1px solid #eee;
}

.header-item {
  flex: 1;
  font-size: 3.5vw;
  font-weight: bold;
  color: #333;
  text-align: center;
}

/* 表格行 */
.table-row {
  display: flex;
  padding: 2vw;
  border-bottom: 1px solid #eee;
}

.table-row:last-child {
  border-bottom: none;
}

/* 收益记录列表 */
.earnings-list {
  max-height: 0; /* 默认收起 */
  overflow: hidden; /* 隐藏溢出内容 */
  transition: max-height 0.5s ease-in-out; /* 添加过渡效果 */
}

/* 展开时的样式 */
.earnings-list.expanded {
  max-height: 1000px; /* 设置一个足够大的值 */
}

/* 表格项 */
.table-item {
  flex: 1;
  font-size: 3.5vw;
  color: #666;
  text-align: center;
}

/* 没有收益记录时的提示 */
.no-earnings-tip {
  font-size: 3.5vw;
  color: #999;
  text-align: center;
  padding: 3vw;
}

/* 没有数据时的提示 */
.no-data-tip {
  font-size: 4vw;
  color: #999;
  margin-top: 10vw;
}

/* 加载更多按钮 */
.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  background-color: #007aff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.load-more:hover {
  background-color: #005bb5;
}

/* 加载提示 */
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #fff;
}

/* 加载动画 */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>