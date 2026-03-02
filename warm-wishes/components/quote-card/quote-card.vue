<template>
  <view class="quote-card" :class="{ 'is-favorite': isFavorite }">
    <!-- 标签 -->
    <view class="quote-tag" v-if="showTag">
      <text>{{ tagName }}</text>
    </view>
    
    <!-- 问候语内容 -->
    <view class="quote-content">
      <text>{{ quote.content }}</text>
    </view>
    
    <!-- 操作栏 -->
    <view class="quote-actions" v-if="showActions">
      <view class="action-item" @tap="handleRefresh">
        <text class="icon">🔄</text>
        <text>换一句</text>
      </view>
      <view class="action-item" @tap="handleFavorite">
        <text class="icon">{{ isFavorite ? '⭐' : '☆' }}</text>
        <text>{{ isFavorite ? '已收藏' : '收藏' }}</text>
      </view>
      <view class="action-item" @tap="handleShare" v-if="showShare">
        <text class="icon">📤</text>
        <text>分享</text>
      </view>
    </view>
  </view>
</template>

<script>
import { QUOTE_TAG_LABELS } from '@/store/quote.js'
import { useQuoteStore } from '@/store/quote.js'

export default {
  props: {
    quote: {
      type: Object,
      required: true
    },
    showTag: {
      type: Boolean,
      default: true
    },
    showActions: {
      type: Boolean,
      default: true
    },
    showShare: {
      type: Boolean,
      default: true
    }
  },
  
  data() {
    return {
      quoteStore: null
    }
  },
  
  computed: {
    tagName() {
      return this.quote?.tag ? QUOTE_TAG_LABELS[this.quote.tag] : ''
    },
    
    isFavorite() {
      return this.quoteStore && this.quote ? this.quoteStore.isFavorite(this.quote.id) : false
    }
  },
  
  created() {
    this.quoteStore = useQuoteStore()
  },
  
  methods: {
    handleRefresh() {
      this.$emit('refresh')
    },
    
    handleFavorite() {
      this.quoteStore.toggleFavorite(this.quote)
      this.$emit('favorite', this.quoteStore.isFavorite(this.quote.id))
    },
    
    handleShare() {
      this.$emit('share', this.quote)
    }
  }
}
</script>

<style scoped>
.quote-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20rpx;
  padding: 40rpx;
  margin: 20rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.quote-card.is-favorite {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.quote-tag {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 8rpx 24rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
  color: #fff;
  margin-bottom: 20rpx;
}

.quote-content {
  font-size: 36rpx;
  line-height: 1.8;
  color: #fff;
  font-weight: 500;
  min-height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.quote-actions {
  display: flex;
  justify-content: center;
  gap: 40rpx;
  margin-top: 40rpx;
  padding-top: 30rpx;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  font-size: 24rpx;
  color: #fff;
  cursor: pointer;
  padding: 10rpx;
  border-radius: 10rpx;
  transition: all 0.3s;
}

.action-item:active {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(0.95);
}

.action-item .icon {
  font-size: 40rpx;
}
</style>
