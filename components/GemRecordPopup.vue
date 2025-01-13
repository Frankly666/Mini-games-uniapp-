<template>
  <!-- 背景遮罩 -->
  <view v-if="visible" class="popup-mask" @click="closePopup"></view>

  <!-- 弹窗内容 -->
  <view v-if="visible" class="popup-content">
    <view class="header">
      <text class="title">{{ assetsNameMap[gemType] }}明细记录</text>
      <!-- 添加关闭按钮 -->
      <text class="close-btn" @click="closePopup">×</text>
    </view>
    <view class="list">
      <view v-if="loading" class="loading">加载中...</view>
      <view v-else-if="records.length === 0" class="empty">暂无记录</view>
      <view v-else v-for="(record, index) in records" :key="index" class="record-item">
        <text class="time">{{ formatTime(record.time) }}</text>
        <text class="description">{{ record.description }}</text>
        <text class="num">{{ record.num }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getAssetChangeRecord } from '../utils/getAssetChangeRecord ';


const assetsNameMap = {
  powerStone: '能量石',
  diamond: '金刚石',
  resourceStone: '资源石',
  jewel: '宝石',
};

// 定义 props
const props = defineProps({
  gemType: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
});

// 定义 emits
const emit = defineEmits(['update:visible']);

// 定义响应式数据
const records = ref([]);
const loading = ref(false);

// 监听 visible 变化
watch(
  () => props.visible,
  async (newVal) => {
    if (newVal) {
      await fetchRecords();
    }
  }
);

// 获取记录
const fetchRecords = async () => {
  loading.value = true;
  records.value = await getAssetChangeRecord(props.gemType); // 调用工具函数获取数据
  loading.value = false;
};

// 格式化时间
const formatTime = (time) => {
  const date = new Date(time);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(
    date.getDate()
  ).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

// 关闭弹窗
const closePopup = () => {
  emit('update:visible', false);
};
</script>

<style scoped>
/* 背景遮罩 */
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* 弹窗内容 */
.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 70vh;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  z-index: 1000;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

/* 关闭按钮样式 */
.close-btn {
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #333;
}

.list {
  max-height: 60vh;
  overflow-y: auto;
}

.record-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.time {
  font-size: 14px;
  color: #666;
  flex: 2;
}

.description {
  font-size: 14px;
  color: #333;
  flex: 3;
  margin: 0 10px;
}

.num {
  font-size: 14px;
  color: #333;
  flex: 1;
  text-align: right;
}

.loading,
.empty {
  text-align: center;
  font-size: 14px;
  color: #666;
  padding: 20px 0;
}
</style>