import { defineStore } from 'pinia'

export const QUOTE_TAGS = {
  MORNING: 'morning',
  EVENING: 'evening',
  ENCOURAGE: 'encourage',
  THANKS: 'thanks',
  BLESSING: 'blessing'
}

export const QUOTE_TAG_LABELS = {
  [QUOTE_TAGS.MORNING]: '早安',
  [QUOTE_TAGS.EVENING]: '晚安',
  [QUOTE_TAGS.ENCOURAGE]: '鼓励',
  [QUOTE_TAGS.THANKS]: '感谢',
  [QUOTE_TAGS.BLESSING]: '祝福'
}

export const PRESET_QUOTES = [
  { id: 1, content: '早安！愿你今天的每个瞬间都充满阳光。', tag: QUOTE_TAGS.MORNING },
  { id: 2, content: '新的一天开始了，希望你有个好心情！', tag: QUOTE_TAGS.MORNING },
  { id: 3, content: '早安，记得吃早餐，照顾好自己。', tag: QUOTE_TAGS.MORNING },
  { id: 4, content: '晚安，愿你做个好梦。', tag: QUOTE_TAGS.EVENING },
  { id: 5, content: '忙碌了一天，好好休息吧，晚安。', tag: QUOTE_TAGS.EVENING },
  { id: 6, content: '晚安，明天又是新的一天。', tag: QUOTE_TAGS.EVENING },
  { id: 7, content: '你比你想象的更强大。', tag: QUOTE_TAGS.ENCOURAGE },
  { id: 8, content: '每一步努力都算数，继续加油！', tag: QUOTE_TAGS.ENCOURAGE },
  { id: 9, content: '相信自己，你可以做到的。', tag: QUOTE_TAGS.ENCOURAGE },
  { id: 10, content: '谢谢你一直以来的陪伴。', tag: QUOTE_TAGS.THANKS },
  { id: 11, content: '有你在身边，真好。', tag: QUOTE_TAGS.THANKS },
  { id: 12, content: '感谢有你，让生活更美好。', tag: QUOTE_TAGS.THANKS },
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
    getCurrentQuote: (state) => {
      return state.currentQuote
    },
    
    getQuotesByTag: (state) => (tag) => {
      if (!tag) return PRESET_QUOTES
      return PRESET_QUOTES.filter(q => q.tag === tag)
    }
  },

  actions: {
    getRandomQuote(tag = '') {
      let quotes = this.getQuotesByTag(tag)
      const randomIndex = Math.floor(Math.random() * quotes.length)
      return quotes[randomIndex]
    },

    setCurrentQuote(quote) {
      this.currentQuote = quote
      this.addToHistory(quote)
    },

    refreshQuote() {
      const quote = this.getRandomQuote(this.selectedTag)
      this.setCurrentQuote(quote)
      return quote
    },

    selectTag(tag) {
      this.selectedTag = tag
      this.refreshQuote()
    },

    addToHistory(quote) {
      this.history.unshift({
        ...quote,
        timestamp: Date.now()
      })
      if (this.history.length > 100) {
        this.history = this.history.slice(0, 100)
      }
    },

    toggleFavorite(quote) {
      const index = this.favorites.findIndex(f => f.id === quote.id)
      if (index !== -1) {
        this.favorites.splice(index, 1)
        return false
      } else {
        this.favorites.push(quote)
        return true
      }
    },

    isFavorite(quoteId) {
      return this.favorites.some(f => f.id === quoteId)
    }
  }
})
