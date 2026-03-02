import { defineStore } from 'pinia'

// 亲友关系标签
export const FRIEND_RELATION = {
  FAMILY: 'family',
  FRIEND: 'friend',
  COLLEAGUE: 'colleague',
  OTHER: 'other'
}

// 关系标签显示名称
export const RELATION_LABELS = {
  [FRIEND_RELATION.FAMILY]: '家人',
  [FRIEND_RELATION.FRIEND]: '朋友',
  [FRIEND_RELATION.COLLEAGUE]: '同事',
  [FRIEND_RELATION.OTHER]: '其他'
}

export const useFriendStore = defineStore('friend', {
  state: () => ({
    friends: []
  }),

  getters: {
    // 获取所有亲友
    getAllFriends: (state) => state.friends,
    
    // 根据关系标签筛选
    getFriendsByRelation: (state) => (relation) => {
      if (!relation) return state.friends
      return state.friends.filter(f => f.relation === relation)
    },
    
    // 统计数量
    getCount: (state) => state.friends.length,
    
    // 按关系分组
    getGroupedFriends: (state) => {
      const groups = {}
      Object.values(FRIEND_RELATION).forEach(rel => {
        groups[rel] = state.friends.filter(f => f.relation === rel)
      })
      return groups
    }
  },

  actions: {
    // 添加亲友
    addFriend(friend) {
      const newFriend = {
        id: Date.now(),
        name: friend.name,
        relation: friend.relation || FRIEND_RELATION.OTHER,
        remark: friend.remark || '',
        createdAt: Date.now(),
        ...friend
      }
      this.friends.push(newFriend)
      return newFriend
    },

    // 更新亲友
    updateFriend(id, data) {
      const index = this.friends.findIndex(f => f.id === id)
      if (index > -1) {
        this.friends[index] = {
          ...this.friends[index],
          ...data,
          updatedAt: Date.now()
        }
        return this.friends[index]
      }
      return null
    },

    // 删除亲友
    deleteFriend(id) {
      const index = this.friends.findIndex(f => f.id === id)
      if (index > -1) {
        this.friends.splice(index, 1)
        return true
      }
      return false
    },

    // 获取单个亲友
    getFriendById(id) {
      return this.friends.find(f => f.id === id)
    },

    // 搜索亲友
    searchFriends(keyword) {
      if (!keyword) return this.friends
      const lowerKeyword = keyword.toLowerCase()
      return this.friends.filter(f => 
        f.name.toLowerCase().includes(lowerKeyword) ||
        (f.remark && f.remark.toLowerCase().includes(lowerKeyword))
      )
    },

    // 从本地存储加载
    loadFromStorage() {
      try {
        const saved = uni.getStorageSync('friends')
        if (saved) {
          this.friends = saved
        }
      } catch (e) {
        console.error('加载亲友数据失败:', e)
      }
    },

    // 保存到本地存储
    saveToStorage() {
      try {
        uni.setStorageSync('friends', this.friends)
      } catch (e) {
        console.error('保存亲友数据失败:', e)
      }
    }
  }
})
