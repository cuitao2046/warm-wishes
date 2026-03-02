import { defineStore } from 'pinia'

// 问候语标签
export const QUOTE_TAGS = {
  MORNING: 'morning',
  EVENING: 'evening',
  ENCOURAGE: 'encourage',
  THANKS: 'thanks',
  BLESSING: 'blessing'
}

// 问候语标签显示名称
export const QUOTE_TAG_LABELS = {
  [QUOTE_TAGS.MORNING]: '早安',
  [QUOTE_TAGS.EVENING]: '晚安',
  [QUOTE_TAGS.ENCOURAGE]: '鼓励',
  [QUOTE_TAGS.THANKS]: '感谢',
  [QUOTE_TAGS.BLESSING]: '祝福'
}

// 预设问候语
export const PRESET_QUOTES = [
  // 早安
  { id: 1, content: '早安！愿你今天的每个瞬间都充满阳光。', tag: QUOTE_TAGS.MORNING },
  { id: 2, content: '新的一天开始了，希望你有个好心情！', tag: QUOTE_TAGS.MORNING },
  { id: 3, content: '早安，记得吃早餐，照顾好自己。', tag: QUOTE_TAGS.MORNING },
  
  // 晚安
  { id: 4, content: '晚安，愿你做个好梦。', tag: QUOTE_TAGS.EVENING },
  { id: 5, content: '忙碌了一天，好好休息吧，晚安。', tag: QUOTE_TAGS.EVENING },
  { id: 6, content: '晚安，明天又是新的一天。', tag: QUOTE_TAGS.EVENING },
  
  // 鼓励
  { id: 7, content: '你比你想象的更强大。', tag: QUOTE_TAGS.ENCOURAGE },
  { id: 8, content: '每一步努力都算数，继续加油！', tag: QUOTE_TAGS.ENCOURAGE },
  { id: 9, content: '相信自己，你可以做到的。', tag: QUOTE_TAGS.ENCOURAGE },
  
  // 感谢
  { id: 10, content: '谢谢你一直以来的陪伴。', tag: QUOTE_TAGS.THANKS },
  { id: 11, content: '有你在身边，真好。', tag: QUOTE_TAGS.THANKS },
  { id: 12, content: '感谢有你，让生活更美好。', tag: QUOTE_TAGS.THANKS },
  
  // 祝福
  { id: 13, content: '愿你平安喜乐，万事顺遂。', tag: QUOTE_TAGS.BLESSING },
  { id: 14, content: '愿所有的美好如期而至。', tag: QUOTE_TAGS.BLESSING },
  { id: 15, content: '愿你被世界温柔以待。', tag: QUOTE_TAGS.BLESSING }
]

export const useQuoteStore = defineStore('quote', {
  state: () => ({
    currentQuote: null,
    selectedTag: '',
    favorites: [],
    history: []
  }),

  getters: {
    // 获取当前选中的问候语
    getCurrentQuote: (state) => {
      return state.currentQuote || getRandomQuote()
    },
    
    // 根据标签筛选问候语
    getQuotesByTag: (state) => (tag) => {
      if (!tag) return PRESET_QUOTES
      return PRESET_QUOTES.filter(q => q.tag === tag)
    }
  },

  actions: {
    // 随机获取一句问候语
    getRandomQuote(tag = '') {
      let quotes = this.getQuotesByTag(tag)
      const randomIndex = Math.floor(Math.random() * quotes.length)
      return quotes[randomIndex]
    },

    // 设置当前问候语
    setCurrentQuote(quote) {
      this.currentQuote = quote
      this.addToHistory(quote)
    },

    // 刷新问候语
    refreshQuote() {
      const quote = this.getRandomQuote(this.selectedTag)
      this.setCurrentQuote(quote)
      return quote
    },

    // 选择标签
    selectTag(tag) {
      this.selectedTag = tag
      this.refreshQuote()
    },

    // 添加到历史
    addToHistory(quote) {
      this.history.unshift({
        ...quote,
        timestamp: Date.now()
      })
      // 只保留最近 100 条
      if (this.history.length > 100) {
        this.history = this.history.slice(0, 100)
      }
    },

    // 切换收藏状态
    toggleFavorite(quote) {
      const index = this.favorites.findIndex(f => f.id === quote.id)
      if (index > -1) {
        this.favorites.splice(index, 1)
        return false
      } else {
        this.favorites.push(quote)
        return true
      }
    },

    // 检查是否收藏
    isFavorite(quoteId) {
      return this.favorites.some(f => f.id === quoteId)
    }
  }
})

// 辅助函数：获取随机问候语
function getRandomQuote(tag = '') {
  let quotes = tag 
    ? PRESET_QUOTES.filter(q => q.tag === tag)
    : PRESET_QUOTES
  const randomIndex = Math.floor(Math.random() * quotes.length)
  return quotes[randomIndex]
}
