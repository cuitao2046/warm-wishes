<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <input 
        class="search-input"
        v-model="searchKeyword"
        placeholder="搜索亲友..."
        @confirm="handleSearch"
      />
    </view>
    
    <!-- 添加按钮 -->
    <view class="add-btn" @tap="handleAdd">
      <text>➕ 添加亲友</text>
    </view>
    
    <!-- 亲友列表 -->
    <view class="friend-list">
      <friend-card
        v-for="friend in filteredFriends"
        :key="friend.id"
        :friend="friend"
        @edit="handleEdit"
        @delete="handleDelete"
      />
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="filteredFriends.length === 0">
        <text class="empty-icon">👥</text>
        <text class="empty-text">还没有添加亲友</text>
        <text class="empty-hint">点击上方按钮添加</text>
      </view>
    </view>
    
    <!-- 统计信息 -->
    <view class="stats-bar" v-if="filteredFriends.length > 0">
      <text>共 {{ filteredFriends.length }} 位亲友</text>
    </view>
  </view>
</template>

<script>
import { useFriendStore } from '@/store/friend.js'
import FriendCard from '@/components/friend-card/friend-card.vue'

export default {
  components: {
    FriendCard
  },
  
  data() {
    return {
      friendStore: null,
      searchKeyword: ''
    }
  },
  
  computed: {
    filteredFriends() {
      if (!this.searchKeyword) {
        return this.friendStore ? this.friendStore.friends : []
      }
      return this.friendStore ? this.friendStore.searchFriends(this.searchKeyword) : []
    }
  },
  
  onLoad() {
    this.friendStore = useFriendStore()
    this.friendStore.loadFromStorage()
  },
  
  methods: {
    handleSearch() {
      // computed 会自动更新
    },
    
    handleAdd() {
      uni.showToast({
        title: '添加功能开发中',
        icon: 'none'
      })
    },
    
    handleEdit(friend) {
      uni.showToast({
        title: '编辑功能开发中',
        icon: 'none'
      })
    },
    
    handleDelete(friend) {
      uni.showModal({
        title: '确认删除',
        content: `确定要删除 ${friend.name} 吗？`,
        success: (res) => {
          if (res.confirm) {
            this.friendStore.deleteFriend(friend.id)
            this.friendStore.saveToStorage()
            uni.showToast({
              title: '已删除',
              icon: 'success'
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.search-bar {
  margin-bottom: 20rpx;
}

.search-input {
  width: 100%;
  height: 80rpx;
  padding: 0 30rpx;
  background: #f5f5f5;
  border-radius: 40rpx;
  font-size: 28rpx;
}

.add-btn {
  height: 90rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 45rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #fff;
  font-weight: 500;
  margin-bottom: 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(102, 126, 234, 0.3);
}

.add-btn:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.friend-list {
  min-height: 400rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 30rpx;
  opacity: 0.3;
}

.empty-text {
  font-size: 32rpx;
  color: #999;
  margin-bottom: 10rpx;
}

.empty-hint {
  font-size: 24rpx;
  color: #ccc;
}

.stats-bar {
  text-align: center;
  padding: 30rpx;
  font-size: 24rpx;
  color: #999;
}
</style>
