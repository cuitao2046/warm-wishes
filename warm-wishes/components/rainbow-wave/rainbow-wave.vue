<template>
  <view class="rainbow-wave-container">
    <view class="wave-center">
      <view 
        v-for="i in 6"
        :key="i"
        class="wave-ring"
        :style="{
          width: (60 + i * 30) + 'rpx',
          height: (60 + i * 30) + 'rpx',
          animationDelay: (i * 0.3) + 's',
          borderColor: colors[i % colors.length]
        }"
      ></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'rgba(255, 107, 107, 0.6)',   // 红色
        'rgba(255, 159, 67, 0.6)',    // 橙色
        'rgba(255, 205, 86, 0.6)',   // 黄色
        'rgba(82, 196, 26, 0.6)',     // 绿色
        'rgba(52, 168, 83, 0.6)',    // 青色
        'rgba(41, 128, 185, 0.6)'    // 蓝色
      ],
      isAnimating: false
    }
  },
  
  methods: {
    // 触发电波动画
    triggerEffect() {
      this.isAnimating = true
      
      // 2秒后停止
      setTimeout(() => {
        this.isAnimating = false
      }, 2000)
      
      this.$emit('wave-triggered')
    }
  }
}
</script>

<style scoped>
.rainbow-wave-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wave-center {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wave-ring {
  position: absolute;
  border-radius: 50%;
  border: 3rpx solid;
  opacity: 0;
  animation: wave-expand 2s ease-out;
}

.wave-container.animating .wave-ring {
  animation: wave-expand-active 2s ease-out;
}

@keyframes wave-expand {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.5);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

@keyframes wave-expand-active {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  30% {
    opacity: 0.6;
    transform: scale(0.8);
  }
  60% {
    opacity: 0.4;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}
</style>
