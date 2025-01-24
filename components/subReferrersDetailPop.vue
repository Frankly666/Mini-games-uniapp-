<template>
  <view class="content-container">
    <!-- 加载中状态 -->
    <view v-if="loading" class="loading-tip">
      <text>加载中...</text>
    </view>

    <!-- 用户列表 -->
    <view v-else-if="filteredUsers.length > 0" class="user-list">
      <view
        v-for="user in filteredUsers"
        :key="user._id"
        class="user-card"
        @click="toggleCard(user._id)"
      >
        <!-- 用户基本信息 -->
        <view class="user-info">
          <image :src="user.avatar" class="user-avatar"></image>
          <view class="user-details">
            <text class="user-name">{{ user.userName }}</text>
            <text class="game-id">游戏ID: {{ user.gameID }}</text>
          </view>
					<view class="referType">
						<text>{{ user.pusherCode === phone+'' ? '直推' : '间推' }}</text>
					</view>
        </view>

        <!-- 收益记录 -->
        <view
          :class="['earnings-list', expandedCardId === user._id ? 'expanded' : '']"
        >
          <view class="earnings-table">
            <view class="table-header">
              <text class="header-item">收益来源</text>
              <text class="header-item">收益金额</text>
              <text class="header-item">收益时间</text>
            </view>

            <view v-for="(record, index) in recordList" :key="index" class="table-row">
              <text class="table-item">
                {{ getEarningsSource(record) }}
              </text>
              <text class="table-item">{{ record.amount }}能量石</text>
              <text class="table-item">{{ formatDate(record.createTime) }}</text>
            </view>

            <view v-if="recordList.length === 0" class="no-earnings-tip">
              <text>{{tips}}</text>
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
      <text>{{ 暂无推荐用户 }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getReferralEarnings } from '../utils/selectSubReferrersDetail.js';
import { selectReferralUsers } from '../utils/selectReferralUsers.js';

const props = defineProps(["setNum"]);

// 用户列表
const users = ref([]);

// 加载状态
const loading = ref(true);

// 加载更多状态
const loadingMore = ref(false);

// 当前展开的卡片 ID
const expandedCardId = ref(null);

// 当前点击展开的收益列表
const recordList = ref([]);

// 提示字符
const tips = ref("加载中...")

const phone = uni.getStorageSync('phone');

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

// 筛选后的用户列表
const filteredUsers = computed(() => {
  return users.value;
});

// 切换卡片展开状态
const toggleCard = async (subReferrerId) => {
  if (expandedCardId.value === subReferrerId) {
    expandedCardId.value = null; // 如果已经展开，则收起
  } else {
    expandedCardId.value = subReferrerId; // 否则展开
		recordList.value = [];
		tips.value = '加载中...';
		const res = await getReferralEarnings({
			userId: uni.getStorageSync('id'),
			subReferrerId: subReferrerId
		});
		recordList.value = res.data;
		if(res.data.length === 0) tips.value = '暂无收益记录'
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


// 获取推广用户数据
const fetchReferralUsers = async () => {
  try {
    const result = await selectReferralUsers({
      userId: uni.getStorageSync('id'),
      page: page.value,
      limit: limit.value
    });

    if (result.code === 200) {
      props.setNum(1, result.directNum);
      props.setNum(2, result.indirectNum);

      // 如果是第一页，直接覆盖数据；否则追加数据
      if (page.value === 1) {
        users.value = result.data;
      } else {
        users.value = [...users.value, ...result.data];
      }

      hasMore.value = result.hasMore; // 更新是否有更多数据

      // 将当前用户列表和分页状态保存到缓存
      uni.setStorageSync('cachedUsers', users.value);
      uni.setStorageSync('cachedPage', page.value);
      uni.setStorageSync('cachedHasMore', hasMore.value);
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
  if (loadingMore.value || !hasMore.value) return; // 防止重复点击或没有更多数据
  loadingMore.value = true; // 显示加载提示
  page.value += 1; // 增加分页页码
  fetchReferralUsers(); // 加载更多数据
};

// 页面加载时获取数据
onMounted(() => {
  // 从缓存中读取用户列表和分页状态
  const cachedUsers = uni.getStorageSync('cachedUsers');
  const cachedPage = uni.getStorageSync('cachedPage');
  const cachedHasMore = uni.getStorageSync('cachedHasMore');

  if (cachedUsers && cachedUsers.length > 0) {
    // 如果缓存中有数据，直接使用缓存数据
    users.value = cachedUsers;
    page.value = cachedPage;
    hasMore.value = cachedHasMore;
    loading.value = false; // 关闭加载状态
  } else {
    // 如果缓存中没有数据，重新请求数据
    fetchReferralUsers();
  }
});
</script>


<style lang="less">
/* 内容容器 */
.content-container {
  width: 90vw;
	height: 100%;
	padding: 3vw;
	box-sizing: border-box;
	border-radius: 2vw;
	text-align: center;
	position: relative;

  /* 加载中提示 */
  .loading-tip {
    font-size: 4vw;
    color: #999;
    margin-top: 10vw;
    text-align: center;
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

    /* 用户卡片 */
    .user-card {
			display: flex;
			flex-direction: column;
			width: 100%;
			border: 1px solid #eee;
			border-radius: 2vw;
			padding: 4vw;
			margin-bottom: 3vw;
			box-sizing: border-box;
      /* 用户基本信息 */
      .user-info {
				width: 100%;
        display: flex;
				align-items: center;

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
        }
      }

			// 推荐类型
			.referType {
				margin-left: auto;
				text-align: right;
				font-weight: bold;
				font-size: 3vw;
				padding: 1vw;
				box-sizing: border-box;
				background: bisque;
				border-radius: 1vw;
			}
			
      /* 收益记录 */
      .earnings-list {
        max-height: 0; /* 默认收起 */
        overflow: hidden; /* 隐藏溢出内容 */
        transition: max-height 0.5s ease-in-out; /* 添加过渡效果 */

        /* 展开时的样式 */
        &.expanded {
          max-height: 1000px; /* 设置一个足够大的值 */
        }

        /* 收益记录表格 */
        .earnings-table {
          width: 100%;
          border: 1px solid #eee;
          border-radius: 2vw;
          overflow: hidden;

          /* 表头 */
          .table-header {
            display: flex;
            background-color: #f9f9f9;
            padding: 2vw;
            border-bottom: 1px solid #eee;

            .header-item {
              flex: 1;
              font-size: 3.5vw;
              font-weight: bold;
              color: #333;
              text-align: center;
            }
          }

          /* 表格行 */
          .table-row {
            display: flex;
            padding: 2vw;
            border-bottom: 1px solid #eee;

            &:last-child {
              border-bottom: none;
            }

            .table-item {
              flex: 1;
              font-size: 3.5vw;
              color: #666;
              text-align: center;
            }
          }

          /* 没有收益记录时的提示 */
          .no-earnings-tip {
            font-size: 3.5vw;
            color: #999;
            text-align: center;
            padding: 3vw;
          }
        }
      }
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

      &:hover {
        background-color: #005bb5;
      }

      /* 加载提示 */
      .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #fff;

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
      }
    }
  }

  /* 没有数据时的提示 */
  .no-data-tip {
    font-size: 4vw;
    color: #999;
    margin-top: 10vw;
    text-align: center;
  }
}

/* 加载动画 */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>