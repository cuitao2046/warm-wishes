<template>
  <view class="floating-bubbles">
    <view 
      v-for="bubble in bubbles"
      :key="bubble.id"
      class="bubble"
      :class="{ 'active': bubble.active }"
      :style="{
        left: bubble.x + '%',
        top: bubble.y + '%',
        animationDuration: bubble.duration + 's',
        transform: `scale(${bubble.scale})`
      }"
      @tap="handleBubbleTap(bubble)"
    >
      <view class="bubble-inner" :style="{ background: bubble.color }"></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 8
    }
  },
  
  data() {
    return {
      bubbles: [],
      colors: [
        'rgba(102, 126, 234, 0.6)',  // 紫色
        'rgba(118, 75, 162, 0.6)',  // 紫色
        'rgba(240, 147, 251, 0.6)',  // 粉色
        'rgba(245, 87, 108, 0.6)',   // 红色
        'rgba(82, 196, 26, 0.6)',    // 绿色
        'rgba(250, 173, 20, 0.6)'    // 橙色
      ]
    }
  },
  
  created() {
    this.initBubbles()
    this.startAnimation()
  },
  
  methods: {
    initBubbles() {
      this.bubbles = []
      for (let i = 0; i < this.count; i++) {
        this.bubbles.push({
          id: i,
          x: Math.random() * 80 + 10,  // 10% - 90%
          y: Math.random() * 80 + 10,  // 10% - 90%
          scale: Math.random() * 0.5 + 0.5,  // 0.5 - 1.0
          duration: Math.random() * 3 + 4,  // 4s - 7s
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          active: false
        })
      }
    },
    
    startAnimation() {
      setInterval(() => {
        this.bubbles.forEach(bubble => {
          // 随机移动
          bubble.x += (Math.random() - 0.5) * 2
          bubble.y += (Math.random() - 0.5) * 2
          
          // 边界检查
          bubble.x = Math.max(5, Math.min(95, bubble.x))
          bubble.y = Math.max(5, Math.min(95, bubble.y))
        })
      }, 3000)
    },
    
    handleBubbleTap(bubble) {
      // 触发点击效果
      bubble.active = true
      setTimeout(() => {
        bubble.active = false
      }, 500)
      
      this.$emit('bubble-tap', bubble)
    },
    
    triggerGreetingEffect() {
      // 收到问候时的效果：泡泡加速扩散
      this.bubbles.forEach(bubble => {
        bubble.active = true
        bubble.scale = Math.min(1.5, bubble.scale * 1.5)
        
        setTimeout(() => {
          bubble.active = false
          bubble.scale = Math.random() * 0.5 + 0.5
        }, 2000)
      })
    }
  }
}
</script>

<style scoped>
.floating-bubbles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.bubble {
  position: absolute;
  width: 100rpx;
  height: 100rpx;
  animation: float ease-in-out infinite alternate;
  pointer-events: auto;
}

.bubble-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  backdrop-filter: blur(10rpx);
  box-shadow: 0 0 40rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.bubble.active .bubble-inner {
  transform: scale(1.5);
  box-shadow: 0 0 60rpx rgba(0, 0, 0, 0.2);
}

@keyframes float {
  0% {
    transform: translateY(0rpx) rotate(0deg);
  }
  50% {
    transform: translateY(-40rpx) rotate(180deg);
  }
  100% {
    transform: translateY(0rpx) rotate(360deg);
  }
}
</style>
