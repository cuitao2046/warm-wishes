import { defineStore } from 'pinia'

export const useEmotionStore = defineStore('emotion', {
  state: () => ({
    // 能量值（0-100）
    energy: 50,
    
    // 活跃度等级（0-5）
    activeLevel: 0,
    
    // 每日情绪记录（最近7天）
    dailyEmotions: [],
    
    // 累计收到的问候数
    totalReceived: 0,
    
    // 累计发送的问候数
    totalSent: 0
  }),

  getters: {
    // 能量等级描述
    energyLevelDesc: (state) => {
      if (state.energy >= 90) return '能量爆表！'
      if (state.energy >= 70) return '活力满满'
      if (state.energy >= 50) return '状态不错'
      if (state.energy >= 30) return '需要充电'
      return '能量不足'
    },
    
    // 活跃度等级名称
    activeLevelName: (state) => {
      const levels = ['萌新', '初学者', '活跃', '达人', '专家', '大神']
      return levels[state.activeLevel] || '萌新'
    },
    
    // 今日是否已记录情绪
    hasTodayRecord: (state) => {
      const today = new Date().toDateString()
      return state.dailyEmotions.some(e => e.date === today)
    },
    
    // 最近7天情绪趋势
    emotionTrend: (state) => {
      const recent7Days = state.dailyEmotions.slice(0, 7)
      if (recent7Days.length < 2) return 'stable'
      
      const recent = recent7Days[0].energy || 0
      const previous = recent7Days[1].energy || 0
      
      if (recent > previous + 10) return 'up'
      if (recent < previous - 10) return 'down'
      return 'stable'
    }
  },

  actions: {
    // 增加能量
    addEnergy(amount) {
      this.energy = Math.min(100, this.energy + amount)
      this.updateActiveLevel()
    },
    
    // 消耗能量
    consumeEnergy(amount) {
      this.energy = Math.max(0, this.energy - amount)
      this.updateActiveLevel()
    },
    
    // 更新活跃度等级
    updateActiveLevel() {
      const levels = [
        { min: 0, level: 0 },    // 萌新
        { min: 20, level: 1 },   // 初学者
        { min: 40, level: 2 },   // 活跃
        { min: 60, level: 3 },   // 达人
        { min: 80, level: 4 },   // 专家
        { min: 95, level: 5 }    // 大神
      ]
      
      for (let i = levels.length - 1; i >= 0; i--) {
        if (this.energy >= levels[i].min) {
          this.activeLevel = levels[i].level
          break
        }
      }
    },
    
    // 收到问候
    receiveGreeting() {
      this.addEnergy(5)
      this.totalReceived++
    },
    
    // 发送问候
    sendGreeting() {
      this.consumeEnergy(2)
      this.totalSent++
    },
    
    // 记录每日情绪
    recordDailyEmotion(emotionValue) {
      const today = new Date().toDateString()
      
      // 检查今天是否已记录
      const existingIndex = this.dailyEmotions.findIndex(e => e.date === today)
      
      if (existingIndex > -1) {
        // 更新今天的记录
        this.dailyEmotions[existingIndex] = {
          date: today,
          energy: emotionValue,
          timestamp: Date.now()
        }
      } else {
        // 添加新记录
        this.dailyEmotions.unshift({
          date: today,
          energy: emotionValue,
          timestamp: Date.now()
        })
      }
      
      // 只保留最近30天
      if (this.dailyEmotions.length > 30) {
        this.dailyEmotions = this.dailyEmotions.slice(0, 30)
      }
      
      // 保存到本地存储
      this.saveToStorage()
    },
    
    // 从本地存储加载
    loadFromStorage() {
      try {
        const saved = uni.getStorageSync('emotionData')
        if (saved) {
          this.energy = saved.energy || 50
          this.activeLevel = saved.activeLevel || 0
          this.dailyEmotions = saved.dailyEmotions || []
          this.totalReceived = saved.totalReceived || 0
          this.totalSent = saved.totalSent || 0
        }
      } catch (e) {
        console.error('加载情绪数据失败:', e)
      }
    },
    
    // 保存到本地存储
    saveToStorage() {
      try {
        uni.setStorageSync('emotionData', {
          energy: this.energy,
          activeLevel: this.activeLevel,
          dailyEmotions: this.dailyEmotions,
          totalReceived: this.totalReceived,
          totalSent: this.totalSent
        })
      } catch (e) {
        console.error('保存情绪数据失败:', e)
      }
    },
    
    // 重置能量
    resetEnergy() {
      this.energy = 50
      this.updateActiveLevel()
      this.saveToStorage()
    }
  }
})
