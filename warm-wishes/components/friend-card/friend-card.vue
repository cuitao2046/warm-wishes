<template>
  <view class="friend-card">
    <view class="friend-avatar">
      <text>{{ avatarText }}</text>
    </view>
    
    <view class="friend-info">
      <view class="friend-name">
        <text>{{ friend.name }}</text>
      </view>
      <view class="friend-relation">
        <text class="tag">{{ relationText }}</text>
        <text class="remark" v-if="friend.remark">{{ friend.remark }}</text>
      </view>
    </view>
    
    <view class="friend-actions" v-if="showActions">
      <view class="action-btn" @tap="handleEdit" v-if="editable">
        <text>✏️</text>
      </view>
      <view class="action-btn" @tap="handleDelete" v-if="deletable">
        <text>🗑️</text>
      </view>
    </view>
  </view>
</template>

<script>
import { RELATION_LABELS } from '@/store/friend.js'

export default {
  props: {
    friend: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: true
    },
    deletable: {
      type: Boolean,
      default: true
    },
    showActions: {
      type: Boolean,
      default: true
    }
  },
  
  computed: {
    avatarText() {
      return this.friend.name.charAt(0).toUpperCase()
    },
    
    relationText() {
      return RELATION_LABELS[this.friend.relation] || '其他'
    }
  },
  
  methods: {
    handleEdit() {
      this.$emit('edit', this.friend)
    },
    
    handleDelete() {
      this.$emit('delete', this.friend)
    }
  }
}
</script>

<style scoped>
.friend-card {
    display: flex;
  align-items: center;
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}

.friend-avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #fff;
  font-weight: bold;
  margin-right: 30rpx;
}

.friend-info {
  flex: 1;
}

.friend-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 10rpx;
}

.friend-relation {
  display: flex;
  align-items: center;
  gap: 15rpx;
}

.friend-relation .tag {
  background: #f0f0f0;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  color: #666;
}

.friend-relation .remark {
  font-size: 24rpx;
  color: #999;
}

.friend-actions {
  display: flex;
  gap: 15rpx;
}

.action-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:active {
  background: #e0e0e0;
  transform: scale(0.9);
}
</style>
