<template>
  <view class="container">
    <!-- 问候语卡片 -->
    <quote-card
      v-if="currentQuote"
      :quote="currentQuote"
      @refresh="handleRefresh"
      @favorite="handleFavorite"
      @share="handleShare"
    />
    
    <!-- 标签筛选 -->
    <view class="tag-filter">
      <view 
        class="tag-item" 
        v-for="label in tagOptions"
        :key="label.value"
        :class="{ active: selectedTag === label.value }"
        @tap="handleTagSelect(label.value)"
      >
        <text>{{ label.text }}</text>
      </view>
    </view>
    
    <!-- 今日统计 -->
    <view class="stats-card">
      <view class="stats-item">
        <text class="stats-value">{{ todayCount }}</text>
        <text class="stats-label">今日发送</text>
      </view>
      <view class="stats-divider"></view>
      <view class="stats-item">
        <text class="stats-value">{{ favoriteCount }}</text>
        <text class="stats-label">已收藏</text>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useQuoteStore, QUOTE_TAG_LABELS } from '@/store/quote.js'
import QuoteCard from '@/components/quote-card/quote-card.vue'

export default {
  components: {
    QuoteCard
  },
  
  data() {
    return {
      quoteStore: null,
      currentQuote: null,
      selectedTag: '',
      todayCount: 0
    }
  },
  
  computed: {
    tagOptions() {
      return [
        { text: '全部', value: '' },
        ...Object.entries(QUOTE_TAG_LABELS).map(([value, text]) => ({ text, value }))
      ]
    },
    
    favoriteCount() {
      return this.quoteStore ? this.quoteStore.favorites.length : 0
    }
  },
  
  onLoad() {
    this.quoteStore = useQuoteStore()
    
    // 初始化问候语
    this.currentQuote = this.quoteStore.getRandomQuote()
    this.quoteStore.setCurrentQuote(this.currentQuote)
    
    // 加载今日统计数据
    const today = new Date().toDateString()
    const savedCount = uni.getStorageSync(`sendCount_${today}`)
    this.todayCount = savedCount || 0
  },
  
  onUnload() {
    this.saveTodayCount()
  },
  
  onPullDownRefresh() {
    this.handleRefresh()
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  
  onShareAppMessage() {
    return {
      title: this.currentQuote?.content || '温暖问候',
      path: 'pages/index/index',
      imageUrl: ''
    }
  },
  
  watch: {
    todayCount() {
      this.saveTodayCount()
    }
  },
  
  methods: {
    saveTodayCount() {
      const today = new Date().toDateString()
      uni.setStorageSync(`sendCount_${today}`, this.todayCount)
    },
    
    handleRefresh() {
      const newQuote = this.quoteStore.refreshQuote()
      this.currentQuote = newQuote
      this.todayCount++
      uni.showToast({
        title: '已刷新',
        icon: 'success'
      })
    },
    
    handleFavorite(isFav) {
      uni.showToast({
        title: isFav ? '已收藏' : '已取消收藏',
        icon: 'success'
      })
    },
    
    handleShare(quote) {
      uni.showShareMenu({
        withShareTicket: true
      })
      uni.showToast({
        title: '点击右上角分享',
        icon: 'none'
      })
    },
    
    handleTagSelect(tag) {
      this.selectedTag = tag
      this.quoteStore.selectTag(tag)
      this.currentQuote = this.quoteStore.currentQuote
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  padding: 20rpx;
  margin: 20rpx 0;
}

.tag-item {
  padding: 12rpx 28rpx;
  background: #f5f5f5;
  border-radius: 30rpx;
  font-size: 26rpx;
  color: #666;
  transition: all 0.3s;
}

.tag-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.stats-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  margin: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}

.stats-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.stats-value {
  font-size: 48rpx;
  font-weight: bold;
  color: #667eea;
}

.stats-label {
  font-size: 24rpx;
  color: #999;
}

.stats-divider {
  width: 2rpx;
  height: 80rpx;
  background: #e0e0e0;
}
</style>
