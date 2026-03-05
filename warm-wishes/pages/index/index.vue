<template>
  <view class="container">
    <!-- 漂浮泡泡背景 -->
    <floating-bubbles ref="bubbleRef" @bubble-tap="handleBubbleTap" />
    
    <!-- 电波中心 -->
    <rainbow-wave ref="waveRef" />
    
    <!-- 主内容区（玻璃质感） -->
    <view class="glass-card">
      <!-- 头部：能量和活跃度 -->
      <view class="header">
        <view class="energy-section">
          <text class="energy-label">能量值</text>
          <view class="energy-bar">
            <view class="energy-fill" :style="{ width: energy + '%' }"></view>
          </view>
          <text class="energy-value">{{ energy }}/100</text>
        </view>
        
        <view class="level-badge">
          <text class="level-text">{{ activeLevelName }}</text>
        </view>
      </view>
      
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
        <view class="stats-divider"></view>
        <view class="stats-item">
          <text class="stats-value">{{ totalReceived }}</text>
          <text class="stats-label">总收到</text>
        </view>
      </view>
    </view>
    
    <!-- 底部 Slogan -->
    <view class="slogan">
      <text>传递温暖，找到同好</text>
    </view>
  </view>
</template>

<script>
import { useQuoteStore, QUOTE_TAG_LABELS } from '@/store/quote.js'
import { useEmotionStore } from '@/store/emotion.js'
import QuoteCard from '@/components/quote-card/quote-card.vue'
import FloatingBubbles from '@/components/floating-bubbles/floating-bubbles.vue'
import RainbowWave from '@/components/rainbow-wave/rainbow-wave.vue'

export default {
  components: {
    QuoteCard,
    FloatingBubbles,
    RainbowWave
  },
  
  data() {
    return {
      quoteStore: null,
      emotionStore: null,
      currentQuote: null,
      selectedTag: '',
      todayCount: 0,
      totalReceived: 0
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
    },
    
    energy() {
      return this.emotionStore ? this.emotionStore.energy : 50
    },
    
    activeLevelName() {
      return this.emotionStore ? this.emotionStore.activeLevelName : '萌新'
    },
    
    totalReceived() {
      return this.emotionStore ? this.emotionStore.totalReceived : 0
    }
  },
  
  onLoad() {
    // 初始化 Store
    this.quoteStore = useQuoteStore()
    this.emotionStore = useEmotionStore()
    
    // 加载情绪数据
    this.emotionStore.loadFromStorage()
    
    // 初始化问候语
    this.currentQuote = this.quoteStore.getRandomQuote()
    this.quoteStore.setCurrentQuote(this.currentQuote)
    
    // 加载今日统计数据
    const today = new Date().toDateString()
    const savedCount = uni.getStorageSync(`sendCount_${today}`)
    this.todayCount = savedCount || 0
    this.totalReceived = this.emotionStore.totalReceived
    
    // 记录今日情绪
    if (!this.emotionStore.hasTodayRecord) {
      this.emotionStore.recordDailyEmotion(this.emotionStore.energy)
    }
  },
  
  onUnload() {
    this.saveTodayCount()
  },
  
  methods: {
    saveTodayCount() {
      const today = new Date().toDateString()
      uni.setStorageSync(`sendCount_${today}`, this.todayCount)
    },
    
    handleBubbleTap(bubble) {
      // 点击泡泡效果
      console.log('Bubble tapped:', bubble)
    },
    
    handleRefresh() {
      // 触发电波动画
      if (this.$refs.waveRef) {
        this.$refs.waveRef.triggerEffect()
      }
      
      // 触发泡泡效果
      if (this.$refs.bubbleRef) {
        this.$refs.bubbleRef.triggerGreetingEffect()
      }
      
      // 刷新问候语
      const newQuote = this.quoteStore.refreshQuote()
      this.currentQuote = newQuote
      this.todayCount++
      this.emotionStore.sendGreeting()
      
      uni.showToast({
        title: '已刷新',
        icon: 'success'
      })
    },
    
    handleFavorite(isFav) {
      // 触发电波动画
      if (this.$refs.waveRef) {
        this.$refs.waveRef.triggerEffect()
      }
      
      if (isFav) {
        // 收到问候，增加能量
        this.emotionStore.receiveGreeting()
        
        // 触发泡泡效果
        if (this.$refs.bubbleRef) {
          this.$refs.bubbleRef.triggerGreetingEffect()
        }
        
        uni.showToast({
          title: `能量+5！当前: ${this.emotionStore.energy}`,
          icon: 'success'
        })
      } else {
        uni.showToast({
          title: '已取消收藏',
          icon: 'none'
        })
      }
    },
    
    handleShare(quote) {
      // 触发电波动画
      if (this.$refs.waveRef) {
        this.$refs.waveRef.triggerEffect()
      }
      
      // 触发泡泡效果
      if (this.$refs.bubbleRef) {
        this.$refs.bubbleRef.triggerGreetingEffect()
      }
      
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
  },
  
  onPullDownRefresh() {
    this.handleRefresh()
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  
  onShareAppMessage() {
    return {
      title: this.currentQuote?.content || '为爱发电',
      path: 'pages/index/index',
      imageUrl: ''
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  overflow: hidden;
}

/* 玻璃质感卡片 */
.glass-card {
  position: relative;
  z-index: 10;
  margin: 40rpx;
  padding: 50rpx;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20rpx);
  -webkit-backdrop-filter: blur(20rpx);
  border-radius: 30rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.3);
}

/* 头部 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40rpx;
}

.energy-section {
  flex: 1;
  margin-right: 30rpx;
}

.energy-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10rpx;
}

.energy-bar {
  width: 100%;
  height: 20rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10rpx;
  overflow: hidden;
}

.energy-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #f093fb 50%, #f5576c 100%);
  transition: width 0.5s ease;
}

.energy-value {
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
  margin-left: 20rpx;
}

.level-badge {
  padding: 15rpx 30rpx;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(240, 147, 251, 0.3) 100%);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 20rpx;
}

.level-text {
  font-size: 26rpx;
  color: #fff;
  font-weight: 500;
}

/* 标签筛选 */
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin: 30rpx 0;
}

.tag-item {
  padding: 12rpx 28rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 30rpx;
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s;
}

.tag-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 10rpx 30rpx rgba(102, 126, 234, 0.3);
}

.tag-item:active {
  transform: scale(0.95);
}

/* 统计卡片 */
.stats-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20rpx;
  padding: 40rpx;
  margin: 30rpx 0 0 0;
  border: 1rpx solid rgba(255, 255, 255, 0.1);
}

.stats-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.stats-value {
  font-size: 40rpx;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.3);
}

.stats-label {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.6);
}

.stats-divider {
  width: 2rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.1);
}

/* 底部 Slogan */
.slogan {
  position: fixed;
  bottom: 40rpx;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 10;
}

.slogan text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  letter-spacing: 4rpx;
}
</style>
